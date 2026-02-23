import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaChartLine,
  FaRedo,
  FaHome,
} from "react-icons/fa";

function InterviewResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) return <p>No result data</p>;

  const {
    score,
    grade,
    performanceMessage,
    feedback,
    domain,
    difficulty,
    nextDifficulty,
  } = data;

  const gradeColor = {
    A: "success",
    B: "primary",
    C: "warning",
    D: "orange",
    F: "danger",
  };

  // Weak concepts extraction
  const conceptMap = {};

  feedback.forEach((item) => {
    item.missingConcepts.forEach((c) => {
      conceptMap[c] = (conceptMap[c] || 0) + 1;
    });
  });

  const weakAreas = Object.entries(conceptMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="container py-5">
      {/* SCORE SUMMARY */}
      <div className="card shadow-lg p-4 mb-4 text-center">
        <h2 className="mb-3">
          <FaChartLine /> Interview Result
        </h2>

        <h1 className="display-4 fw-bold text-success">{score}%</h1>

        <span className={`badge bg-${gradeColor[grade]} fs-5`}>
          Grade {grade}
        </span>

        <p className="mt-3 text-muted">{performanceMessage}</p>

        <div className="mt-2">
          <span className="me-3">
            Domain: <b>{domain}</b>
          </span>
          <span>
            Difficulty: <b>{difficulty}</b>
          </span>
        </div>
      </div>

      {/* WEAK AREAS */}
      <div className="card shadow-sm p-4 mb-4">
        <h5 className="mb-3">⚠ Weak Areas</h5>

        {weakAreas.length > 0 ? (
          weakAreas.map(([concept, count], i) => (
            <div
              key={i}
              className="d-flex justify-content-between border-bottom py-2"
            >
              <span>{concept}</span>
              <span className="badge bg-danger">{count}</span>
            </div>
          ))
        ) : (
          <p>No major weak areas detected 🎉</p>
        )}
      </div>

      {/* FEEDBACK */}
      <div className="mb-4">
        <h4 className="mb-3">Detailed Feedback</h4>

        {feedback.map((item, index) => (
          <div key={index} className="card shadow-sm p-3 mb-3">
            <h6>
              Q{index + 1}. {item.question}
            </h6>

            <p>
              Score: <b>{item.score}</b>
            </p>

            {item.missingConcepts.length > 0 ? (
              <div>
                <span className="text-danger">
                  <FaTimesCircle /> Missing:
                </span>

                <div className="mt-2">
                  {item.missingConcepts.map((c, i) => (
                    <span key={i} className="badge bg-danger me-2">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <span className="text-success">
                <FaCheckCircle /> Excellent Answer
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div className="text-center">
        <button
          className="btn btn-primary me-3"
          onClick={() => navigate("/interview-selection")}
        >
          <FaRedo /> Retake Interview
        </button>

        <button
          className="btn btn-success me-3"
          onClick={() => navigate("/dashboard")}
        >
          <FaHome /> Dashboard
        </button>

        {nextDifficulty && (
          <button
            className="btn btn-warning"
            onClick={() =>
              navigate("/interview-selection", {
                state: { difficulty: nextDifficulty },
              })
            }
          >
            Next Level ({nextDifficulty})
          </button>
        )}
      </div>
    </div>
  );
}

export default InterviewResult;
