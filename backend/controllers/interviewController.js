// interviewController.js

// Start Interview: send questions based on domain
exports.startInterview = (req, res) => {
  try {
    const { domain } = req.body;

    if (!domain) {
      return res.status(400).json({
        success: false,
        message: "Interview domain is required",
      });
    }

    const questionsByDomain = {
      frontend: [
        "What is React?",
        "Difference between props and state?",
        "What is Virtual DOM?",
        "Explain useEffect hook",
      ],
      backend: [
        "What is Node.js?",
        "What is Express?",
        "Explain REST API",
        "What is middleware?",
      ],
      hr: [
        "Tell me about yourself",
        "What are your strengths?",
        "What are your weaknesses?",
        "Why should we hire you?",
      ],
    };

    const questions = questionsByDomain[domain];

    if (!questions) {
      return res.status(404).json({
        success: false,
        message: "Invalid interview domain",
      });
    }

    res.status(200).json({
      success: true,
      domain,
      totalQuestions: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to start interview",
      error: error.message,
    });
  }
};

// Submit Interview: evaluate answers & return result
exports.submitInterview = (req, res) => {
  try {
    const { answers, domain } = req.body;

    if (!answers || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Answers are required",
      });
    }

    // Basic evaluation logic (can be replaced by AI)
    const answeredCount = answers.filter(
      (ans) => ans && ans.trim().length > 5
    ).length;

    const score = Math.min(
      100,
      Math.round((answeredCount / answers.length) * 100)
    );

    let feedback = "Good effort!";
    if (score < 50) feedback = "Needs improvement. Practice fundamentals.";
    else if (score < 75) feedback = "Decent performance. Improve clarity.";
    else feedback = "Excellent! You are interview-ready.";

    res.status(200).json({
      success: true,
      domain,
      score,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Interview submission failed",
      error: error.message,
    });
  }
};
