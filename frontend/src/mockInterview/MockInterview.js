import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function MockInterview() {
  const navigate = useNavigate();
  const location = useLocation();

  const questions = location.state?.questions;
  const difficulty = location.state?.difficulty || "easy";

  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/interview-selection");
      return;
    }

    setAnswers(new Array(questions.length).fill(""));
  }, [questions, navigate]);

  const handleChange = (index, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    const isAnyEmpty = answers.some((ans) => ans.trim() === "");

    if (isAnyEmpty) {
      alert("Please answer all questions before submitting");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/interview/submit",
        {
          answers,
          domain: localStorage.getItem("interviewDomain"),
          difficulty,
          userId: localStorage.getItem("userId"),
        }
      );

      navigate("/interview-result", {
        state: {
          score: res.data.score,
          grade: res.data.grade,
          performanceMessage: res.data.performanceMessage,
          feedback: res.data.feedback,
          domain: res.data.domain,
          difficulty,
        },
      });
    } catch (error) {
      alert("Submission failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-2">Mock Interview</h2>

      <h5 className="text-muted mb-4">
        Difficulty Level: <strong>{difficulty}</strong>
      </h5>

      {!questions && <p>Preparing your interview...</p>}

      {questions &&
        questions.map((q, index) => (
          <div key={q._id} className="mb-4">
            <label className="form-label fw-bold">
              Q{index + 1}. {q.questionText}
            </label>
            <textarea
              className="form-control"
              rows="3"
              value={answers[index] || ""}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}

      {questions && (
        <div className="text-center mt-5">
          <button
            className="btn btn-success px-5 py-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Interview"}
          </button>
        </div>
      )}
    </div>
  );
}

export default MockInterview;
