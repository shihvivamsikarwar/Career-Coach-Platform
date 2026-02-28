const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");

exports.analyzeResumeWithAI = async (filePath) => {
  try {
    // ===============================
    // READ FILE
    // ===============================
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const resumeText = pdfData.text;

    console.log("Extracted Text Length:", resumeText.length);

    // ===============================
    // AI PROMPT (PREMIUM)
    // ===============================
    const prompt = `
You are an expert ATS and recruiter resume analyzer.

Return ONLY valid JSON in this format:

{
  "score": number,
  "atsScore": number,

  "recruiterScore": {
    "impact": number,
    "clarity": number,
    "experience": number
  },

  "skills": [],
  "missingSkills": [],
  "suggestions": [],
  "recommendedRoles": [],

  "roadmap": {
    "beginner": [],
    "intermediate": [],
    "advanced": []
  }
}

Scoring rules:
- score = overall resume quality
- atsScore = ATS compatibility
- recruiterScore:
  - impact = achievements strength
  - clarity = readability & formatting
  - experience = project & work strength

Do not include text outside JSON.

Resume:
${resumeText}
`;

    // ===============================
    // OPENROUTER CALL
    // ===============================
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini", // better than gpt-3.5
        messages: [
          {
            role: "system",
            content: "You are an expert resume analyzer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResult = response.data.choices[0].message.content;

    console.log("AI Raw Result:", aiResult);

    // ===============================
    // SAFE JSON PARSE
    // ===============================
    let parsed;

    try {
      parsed = JSON.parse(aiResult);
    } catch (err) {
      console.log("JSON Parse failed — attempting fix");

      // Try extracting JSON block
      const jsonMatch = aiResult.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        parsed = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Invalid JSON from AI");
      }
    }

    console.log("AI analysis completed");

    return parsed;
  } catch (error) {
    console.error("OpenRouter AI Error:", error.message);

    return {
      score: 0,
      atsScore: 0,
      skills: [],
      missingSkills: [],
      suggestions: ["AI analysis failed"],
      recommendedRoles: [],
      roadmap: {
        beginner: [],
        intermediate: [],
        advanced: [],
      },
    };
  }
};
