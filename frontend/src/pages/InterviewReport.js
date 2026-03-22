import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function InterviewReport() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  const { domain, score, grade, feedback = {}, createdAt } = data;

  return (
    <div className="container py-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        Back
      </button>

      <h2>{domain} Interview Report</h2>

      <p>Date: {new Date(createdAt).toLocaleDateString()}</p>

      <h4>Score: {score}</h4>
      <h4>Grade: {grade}</h4>

      <hr />

      <h4>Strengths</h4>

      <ul>
        {(feedback.strengths || []).map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h4>Weak Areas</h4>

      <ul>
        {(feedback.weakAreas || []).map((w, i) => (
          <li key={i}>{w}</li>
        ))}
      </ul>

      <h4>Improvements</h4>

      <ul>
        {(feedback.improvements || []).map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>

      <h4>AI Feedback</h4>

      <p>{feedback.finalFeedback}</p>
    </div>
  );
}

export default InterviewReport;
