import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MockInterview() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const domain = localStorage.getItem("interviewDomain");

    if (!domain) {
      alert("Please select interview first");
      navigate("/interview-selection");
      return;
    }

    axios
      .post("http://localhost:5000/api/interview/start", { domain })
      .then((res) => {
        setQuestions(res.data.questions);
        setAnswers(new Array(res.data.questions.length).fill(""));
      })
      .catch((err) => console.error(err));
  }, [navigate]);

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
        }
      );

      // Navigate to result page with data
      navigate("/interview-result", {
        state: {
          score: res.data.score,
          feedback: res.data.feedback,
          domain: res.data.domain,
        },
      });
    } catch (error) {
      alert("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Mock Interview</h2>

      {questions.length === 0 && <p>Loading questions...</p>}

      {questions.map((q, index) => (
        <div key={index} className="mb-4">
          <label className="form-label fw-bold">
            Q{index + 1}. {q}
          </label>
          <textarea
            className="form-control"
            rows="3"
            value={answers[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
        </div>
      ))}

      {questions.length > 0 && (
        <div className="text-center mt-5">
          <button
            className="btn btn-success px-5 py-2"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}

export default MockInterview;
