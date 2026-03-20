const axios = require("axios");

async function callOpenRouter(systemPrompt, userPrompt, temperature = 0.3) {
  try {
    if (!process.env.OPENROUTER_API_KEY) {
      throw new Error("OPENROUTER_API_KEY missing in .env");
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 15000, // prevents hanging requests
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("Empty AI response");
    }

    // extract JSON safely
    const jsonStart = content.indexOf("{");
    const jsonEnd = content.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("AI did not return JSON");
    }

    const jsonString = content.slice(jsonStart, jsonEnd + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error("OpenRouter Error:", error.message);

    return null;
  }
}

const normalizeStringList = (value, fallback = []) =>
  Array.isArray(value)
    ? value.filter((item) => typeof item === "string" && item.trim())
    : fallback;

const buildFallbackCareerRecommendations = (data = {}) => {
  const interviewScores = Array.isArray(data.interviewScores)
    ? data.interviewScores
    : [];
  const domains = Array.isArray(data.domains)
    ? data.domains.filter(Boolean)
    : [];
  const resumeAnalysis = data.resumeAnalysis || {};
  const resumeSkills = normalizeStringList(resumeAnalysis.skills);
  const missingSkills = normalizeStringList(resumeAnalysis.missingSkills);
  const recommendedRoles = normalizeStringList(resumeAnalysis.recommendedRoles);

  const averageScore = interviewScores.length
    ? Math.round(
        interviewScores.reduce((total, score) => total + Number(score || 0), 0) /
          interviewScores.length
      )
    : 0;

  const domainCounts = domains.reduce((counts, domain) => {
    counts[domain] = (counts[domain] || 0) + 1;
    return counts;
  }, {});

  const topDomain =
    Object.entries(domainCounts).sort((left, right) => right[1] - left[1])[0]?.[0] ||
    "Software Development";

  const strengths = [
    ...resumeSkills.slice(0, 3),
    averageScore >= 75 ? "Strong interview performance" : null,
    interviewScores.length >= 3 ? "Consistent practice habit" : null,
  ].filter(Boolean);

  const weakAreas = [
    ...missingSkills.slice(0, 3),
    averageScore > 0 && averageScore < 70
      ? `Strengthen ${topDomain} fundamentals`
      : null,
  ].filter(Boolean);

  return {
    recommendedRole: recommendedRoles[0] || topDomain,
    strengths: strengths.length ? strengths : ["Building foundational skills"],
    weakAreas: weakAreas.length ? weakAreas : ["Keep refining real-world projects"],
    nextStep:
      weakAreas[0] ||
      missingSkills[0] ||
      "Complete two focused mock interviews this week",
  };
};

async function generateCareerRecommendations(data = {}) {
  const fallback = buildFallbackCareerRecommendations(data);

  if (!process.env.OPENROUTER_API_KEY) {
    return fallback;
  }

  const systemPrompt = `
You are a career coach.

Use the candidate's interview and resume data to return strict JSON:
{
  "recommendedRole": "",
  "strengths": [],
  "weakAreas": [],
  "nextStep": ""
}
`;

  const aiResult = await callOpenRouter(
    systemPrompt,
    JSON.stringify(data, null, 2),
    0.2
  );

  return {
    recommendedRole: aiResult?.recommendedRole || fallback.recommendedRole,
    strengths: normalizeStringList(aiResult?.strengths).length
      ? normalizeStringList(aiResult.strengths)
      : fallback.strengths,
    weakAreas: normalizeStringList(aiResult?.weakAreas).length
      ? normalizeStringList(aiResult.weakAreas)
      : fallback.weakAreas,
    nextStep: aiResult?.nextStep || fallback.nextStep,
  };
}

module.exports = callOpenRouter;
module.exports.generateCareerRecommendations = generateCareerRecommendations;
module.exports.buildFallbackCareerRecommendations =
  buildFallbackCareerRecommendations;
