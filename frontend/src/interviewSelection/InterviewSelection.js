import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewSelection() {
  const [domain, setDomain] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  const startInterview = () => {
    if (!domain) {
      alert("Please select domain");
      return;
    }

    navigate("/mock-interview", {
      state: { domain, difficulty },
    });
  };

  return (
    <div className="container mt-5">
      <h2>Select Interview Settings</h2>

      <div className="mb-3">
        <label className="form-label">Domain</label>
        <select
          className="form-select"
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
      </div>

      <div className="mb-3">
        <label className="form-label">Difficulty</label>
        <select
          className="form-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <button className="btn btn-success mt-3" onClick={startInterview}>
        Start Interview
      </button>
    </div>
  );
}

export default InterviewSelection;
