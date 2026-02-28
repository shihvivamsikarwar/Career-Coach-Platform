const axios = require("axios");

exports.analyzeJobMatch = async (resumeText, jobDescription) => {
  try {
    // ===============================
    // PROMPT
    // ===============================
    const prompt = `
You are an AI recruiter and ATS system.

Compare candidate resume with job description carefully.

Return ONLY valid JSON in this format:

{
  "matchScore": number,
  "selectionProbability": "Low | Medium | High",

  "strengths": [],
  "missingKeywords": [],
  "improvementTips": [],

  "skillGap": [
    {
      "skill": "",
      "required": number,
      "yourLevel": number
    }
  ]
}

Rules:
- matchScore = overall compatibility percentage
- selectionProbability:
    Low (0-50)
    Medium (51-75)
    High (76-100)

- required = industry expected level (0-100)
- yourLevel = candidate level (0-100)

Important:
- Minimum 5 skills in skillGap
- Be realistic recruiter-level evaluation
- No explanation outside JSON

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

    // ===============================
    // OPENROUTER CALL
    // ===============================
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a professional hiring expert and ATS analyzer.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response.data.choices[0].message.content;

    console.log("AI Job Match Raw:", aiText);

    // ===============================
    // SAFE JSON PARSE
    // ===============================
    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      console.log("JSON parse failed — extracting JSON");

      const match = aiText.match(/\{[\s\S]*\}/);

      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error("Invalid AI JSON");
      }
    }

    // ===============================
    // VALIDATION + DEFAULTS
    // ===============================
    const safeResult = {
      matchScore: parsed.matchScore || 0,
      selectionProbability: parsed.selectionProbability || "Unknown",

      strengths: parsed.strengths || [],
      missingKeywords: parsed.missingKeywords || [],
      improvementTips: parsed.improvementTips || [],

      skillGap: Array.isArray(parsed.skillGap) ? parsed.skillGap : [],
    };

    return safeResult;
  } catch (error) {
    console.error("Job Match AI Error:", error.message);

    // ===============================
    // FALLBACK RESULT
    // ===============================
    return {
      matchScore: 0,
      selectionProbability: "Unknown",
      strengths: [],
      missingKeywords: [],
      improvementTips: ["AI analysis failed. Try again."],
      skillGap: [],
    };
  }
};
