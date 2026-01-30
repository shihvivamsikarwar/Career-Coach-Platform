import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewSelection() {
  const [domain, setDomain] = useState("");
  const navigate = useNavigate();

  const startInterview = () => {
    if (!domain) {
      alert("Please select an interview domain");
      return;
    }

    // Save selected domain
    localStorage.setItem("interviewDomain", domain);

    // Navigate to mock interview page
    navigate("/mock-interview");
  };

  return (
    <div className="container mt-5">
      <h2>Select Interview Domain</h2>

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

      <button className="btn btn-success mt-4" onClick={startInterview}>
        Start Interview
      </button>
    </div>
  );
}

export default InterviewSelection;
