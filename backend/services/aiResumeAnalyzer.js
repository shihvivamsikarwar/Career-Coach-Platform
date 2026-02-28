const axios = require("axios");

async function analyzeResume(text) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are an expert resume analyzer AI.

Analyze the resume and return JSON only with:

score (0-100)
skills (array)
missingSkills (array)
strengths (array)
weaknesses (array)
suggestions (array)
recommendedRoles (array)
summary (string)
`,
          },
          {
            role: "user",
            content: text,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiText = response.data.choices[0].message.content;

    return JSON.parse(aiText);
  } catch (err) {
    console.error("AI Error:", err.message);
    return null;
  }
}

module.exports = analyzeResume;
