import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "../../styles/interviewResult.css";

function InterviewResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state || {};

  const {
    score = 0,
    grade = "N/A",
    technicalScore = 0,
    communicationScore = 0,
    confidenceScore = 0,
    strengths = [],
    weakAreas = [],
    improvements = [],
    finalFeedback = "",
  } = data;

  const chartData = [
    { name: "Technical", value: technicalScore },
    { name: "Communication", value: communicationScore },
    { name: "Confidence", value: confidenceScore },
  ];

  return (
    <div className="result-container">
      <div className="result-card">
        {/* HEADER */}

        <div className="result-header">
          <div className="score-circle">
            <h1>{score}</h1>
            <span>/100</span>
          </div>

          <div className="grade-badge">Grade: {grade}</div>
        </div>

        {/* CHART */}

        <div className="breakdown-section">
          <h3>Performance Breakdown</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* STRENGTHS / WEAK AREAS */}

        <div className="analysis-section">
          <div className="analysis-box">
            <h4>Strengths</h4>

            <ul>
              {strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="analysis-box">
            <h4>Weak Areas</h4>

            <ul>
              {weakAreas.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* IMPROVEMENTS */}

        <div className="improvement-section">
          <h4>Recommended Improvements</h4>

          <ul>
            {improvements.map((imp, i) => (
              <li key={i}>{imp}</li>
            ))}
          </ul>
        </div>

        {/* FINAL FEEDBACK */}

        <div className="feedback-box">
          <h4>AI Feedback</h4>

          <p>{finalFeedback}</p>
        </div>

        {/* BUTTONS */}

        <div className="result-buttons">
          <button
            className="back-btn"
            onClick={() => navigate("/interview-selection")}
          >
            Take Another Interview
          </button>

          <button
            className="history-btn"
            onClick={() => navigate("/interview-history")}
          >
            View Interview History
          </button>

          <button className="back-btn" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default InterviewResult;
