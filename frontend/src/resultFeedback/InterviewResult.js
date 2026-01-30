import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function InterviewResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const { score, feedback, domain } = location.state || {};

  // Prevent direct URL access
  if (!score) {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="container mt-5 text-center">
      <h2>Interview Result</h2>

      <div className="card mt-4 p-4 shadow">
        <h4 className="text-muted">Domain: {domain}</h4>
        <h1 className="text-success mt-3">{score}%</h1>
        <p className="mt-3">{feedback}</p>

        <button
          className="btn btn-primary mt-4"
          onClick={() => navigate("/dashboard")}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default InterviewResult;
