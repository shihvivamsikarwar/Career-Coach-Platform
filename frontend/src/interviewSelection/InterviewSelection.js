import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InterviewSelection() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const startInterview = async () => {
    if (!domain) {
      alert("Please select an interview domain");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/interview/adaptive-start",
        {
          userId,
          domain,
        }
      );

      // Save domain and difficulty
      localStorage.setItem("interviewDomain", domain);
      localStorage.setItem("interviewDifficulty", res.data.difficulty);

      // Navigate to mock interview with questions
      navigate("/mock-interview", {
        state: {
          questions: res.data.questions,
          difficulty: res.data.difficulty,
        },
      });
    } catch (error) {
      alert("Failed to start adaptive interview");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold">Select Interview Domain</h2>

      <select
        className="form-select mt-3"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      >
        <option value="">-- Select --</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="fullstack">Full Stack</option>
        <option value="java">Java</option>
        <option value="ai-ml">AI / ML</option>
      </select>

      <button
        className="btn btn-success mt-4"
        onClick={startInterview}
        disabled={loading}
      >
        {loading ? "Preparing Interview..." : "Start Interview"}
      </button>
    </div>
  );
}

export default InterviewSelection;
