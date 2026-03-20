const fs = require("fs/promises");
const mongoose = require("mongoose");
const path = require("path");
const Resume = require("../models/Resume");
const callOpenRouter = require("../services/openRouterClient");
const parseResume = require("../utils/resumeParser");

const KNOWN_SKILLS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "Mongoose",
  "SQL",
  "Python",
  "Java",
  "C++",
  "HTML",
  "CSS",
  "REST APIs",
  "Git",
  "Docker",
  "AWS",
  "Next.js",
];

const clampScore = (value) =>
  Math.max(0, Math.min(100, Math.round(Number(value) || 0)));

const normalizeList = (value) =>
  Array.isArray(value)
    ? [
        ...new Set(
          value
            .filter((item) => typeof item === "string" && item.trim())
            .map((item) => item.trim())
        ),
      ]
    : [];

const extractSkillsFromText = (resumeText) => {
  const normalizedText = resumeText.toLowerCase();

  return KNOWN_SKILLS.filter((skill) =>
    normalizedText.includes(skill.toLowerCase())
  );
};

const buildFallbackResumeAnalysis = (resumeText) => {
  const extractedSkills = extractSkillsFromText(resumeText);
  const hasMetrics = /\b\d+(\.\d+)?%?\b/.test(resumeText);
  const hasProjects = /(project|projects|portfolio)/i.test(resumeText);
  const hasExperience = /(experience|internship|work history)/i.test(resumeText);
  const hasEducation = /(education|university|college|b\.tech|bachelor|master)/i.test(
    resumeText
  );

  const score =
    35 +
    Math.min(extractedSkills.length * 4, 24) +
    (hasMetrics ? 12 : 0) +
    (hasProjects ? 10 : 0) +
    (hasExperience ? 10 : 0) +
    (hasEducation ? 6 : 0);

  const atsScore =
    40 +
    Math.min(extractedSkills.length * 4, 20) +
    (hasMetrics ? 10 : 0) +
    (hasProjects ? 8 : 0) +
    (hasExperience ? 8 : 0);

  const missingSkills = KNOWN_SKILLS.filter(
    (skill) => !extractedSkills.includes(skill)
  ).slice(0, 6);

  const recommendedRoles = extractedSkills.some((skill) =>
    ["React", "HTML", "CSS", "JavaScript", "TypeScript", "Next.js"].includes(skill)
  )
    ? ["Frontend Developer", "Full Stack Developer"]
    : extractedSkills.some((skill) =>
          ["Node.js", "Express", "MongoDB", "SQL", "Docker", "AWS"].includes(skill)
        )
      ? ["Backend Developer", "Full Stack Developer"]
      : ["Software Developer"];

  return {
    score: clampScore(score),
    atsScore: clampScore(atsScore),
    skills: extractedSkills,
    missingSkills,
    suggestions: [
      hasMetrics ? null : "Add measurable achievements to show impact.",
      hasProjects ? null : "Include at least one strong project with outcomes.",
      hasExperience ? null : "Highlight internships or practical experience clearly.",
      "Use concise bullet points and role-focused keywords.",
    ].filter(Boolean),
    recommendedRoles,
    recruiterScore: {
      impact: clampScore(score - 5),
      clarity: clampScore(atsScore + 2),
      experience: clampScore(score - 10),
    },
    roadmap: {
      beginner: [
        "Tighten resume formatting and section hierarchy.",
        "Add project bullets with tools and outcomes.",
      ],
      intermediate: [
        "Match resume keywords to your target job descriptions.",
        "Strengthen depth in your best 2-3 technical skills.",
      ],
      advanced: [
        "Quantify leadership, ownership, and production impact.",
        "Tailor resume variants for each target role.",
      ],
    },
  };
};

const mergeResumeAnalysis = (fallback, aiAnalysis) => ({
  score: clampScore(aiAnalysis?.score ?? fallback.score),
  atsScore: clampScore(aiAnalysis?.atsScore ?? fallback.atsScore),
  skills: normalizeList(aiAnalysis?.skills).length
    ? normalizeList(aiAnalysis.skills)
    : fallback.skills,
  missingSkills: normalizeList(aiAnalysis?.missingSkills).length
    ? normalizeList(aiAnalysis.missingSkills)
    : fallback.missingSkills,
  suggestions: normalizeList(aiAnalysis?.suggestions).length
    ? normalizeList(aiAnalysis.suggestions)
    : fallback.suggestions,
  recommendedRoles: normalizeList(aiAnalysis?.recommendedRoles).length
    ? normalizeList(aiAnalysis.recommendedRoles)
    : fallback.recommendedRoles,
  recruiterScore: {
    impact: clampScore(
      aiAnalysis?.recruiterScore?.impact ?? fallback.recruiterScore.impact
    ),
    clarity: clampScore(
      aiAnalysis?.recruiterScore?.clarity ?? fallback.recruiterScore.clarity
    ),
    experience: clampScore(
      aiAnalysis?.recruiterScore?.experience ??
        fallback.recruiterScore.experience
    ),
  },
  roadmap: {
    beginner: normalizeList(aiAnalysis?.roadmap?.beginner).length
      ? normalizeList(aiAnalysis.roadmap.beginner)
      : fallback.roadmap.beginner,
    intermediate: normalizeList(aiAnalysis?.roadmap?.intermediate).length
      ? normalizeList(aiAnalysis.roadmap.intermediate)
      : fallback.roadmap.intermediate,
    advanced: normalizeList(aiAnalysis?.roadmap?.advanced).length
      ? normalizeList(aiAnalysis.roadmap.advanced)
      : fallback.roadmap.advanced,
  },
});

const analyzeResumeWithAI = async (filePath) => {
  const absoluteFilePath = path.resolve(__dirname, "..", filePath);
  const resumeText = await parseResume(absoluteFilePath);

  if (!resumeText || !resumeText.trim()) {
    return null;
  }

  const fallbackAnalysis = buildFallbackResumeAnalysis(resumeText);
  const systemPrompt = `
You are an expert resume reviewer.

Analyze the resume and return strict JSON:
{
  "score": 0,
  "atsScore": 0,
  "skills": [],
  "missingSkills": [],
  "suggestions": [],
  "recommendedRoles": [],
  "recruiterScore": {
    "impact": 0,
    "clarity": 0,
    "experience": 0
  },
  "roadmap": {
    "beginner": [],
    "intermediate": [],
    "advanced": []
  }
}
`;

  const aiAnalysis = await callOpenRouter(
    systemPrompt,
    resumeText.slice(0, 8000),
    0.2
  );

  return mergeResumeAnalysis(fallbackAnalysis, aiAnalysis);
};

// ===============================
// UPLOAD RESUME + AI ANALYSIS
// ===============================
exports.uploadResume = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    console.log("📄 File received:", req.file.path);

    let aiAnalysis = null;
    let status = "pending";

    try {
      const result = await analyzeResumeWithAI(req.file.path);

      if (result) {
        aiAnalysis = result;
        status = "completed";
      }
    } catch (err) {
      console.log("⚠️ AI failed but upload continues:", err.message);
    }

    const newResume = new Resume({
      userId: new mongoose.Types.ObjectId(userId),
      fileName: req.file.originalname,
      fileUrl: req.file.path,
      score: aiAnalysis?.score ?? 0,
      atsScore: aiAnalysis?.atsScore ?? 0,
      skills: aiAnalysis?.skills ?? [],
      analysis: aiAnalysis ?? {},
      status,
    });

    console.log("💾 Saving resume:", newResume);

    await newResume.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeId: newResume._id,
      resume: newResume,
    });
  } catch (error) {
    console.error("❌ Resume Upload Error:", error);
    res.status(500).json({ message: "Resume upload failed" });
  }
};

// ===============================
// GET USER RESUMES
// ===============================
exports.getUserResumes = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const resumes = await Resume.find({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    res.status(200).json(resumes);
  } catch (error) {
    console.error("Fetch Resume Error:", error);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
};

// ===============================
// GET SINGLE RESUME
// ===============================
exports.getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume id" });
    }

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error("Fetch Resume Error:", error);
    res.status(500).json({ message: "Failed to fetch resume" });
  }
};

// ===============================
// GET LATEST RESUME
// ===============================
exports.getLatestResume = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const resume = await Resume.findOne({
      userId: new mongoose.Types.ObjectId(userId),
    }).sort({ createdAt: -1 });

    res.status(200).json(resume || null);
  } catch (error) {
    console.error("Get latest resume error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// DELETE RESUME
// ===============================
exports.deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid resume id" });
    }

    const resume = await Resume.findByIdAndDelete(id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    if (resume.fileUrl) {
      const absoluteFilePath = path.resolve(__dirname, "..", resume.fileUrl);
      await fs.unlink(absoluteFilePath).catch(() => null);
    }

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Delete Resume Error:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};
