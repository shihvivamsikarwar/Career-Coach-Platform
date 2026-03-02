import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

function InterviewSetup() {
  const { domain } = useParams();
  const navigate = useNavigate();

  const decodedDomain = decodeURIComponent(domain || "");

  const [difficulty, setDifficulty] = useState("easy");
  const [questionsCount, setQuestionsCount] = useState(5);
  const [mode, setMode] = useState("normal");

  const startInterview = () => {
    navigate("/mock-interview", {
      state: {
        domain: decodedDomain,
        difficulty,
        questionsCount: Number(questionsCount), // ✅ ensure number
        mode,
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">Interview Setup</h2>
          <p className="text-muted">
            Domain:{" "}
            <span className="fw-semibold text-primary">{decodedDomain}</span>
          </p>
        </div>

        {/* Card */}
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div
              className="card border-0 shadow-lg rounded-4 p-4"
              style={{
                background: "linear-gradient(135deg,#ffffff,#f8fafc)",
              }}
            >
              {/* Difficulty */}
              <div className="mb-4">
                <label className="fw-semibold mb-2">Select Difficulty</label>
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

              {/* Questions Count */}
              <div className="mb-4">
                <label className="fw-semibold mb-2">Number of Questions</label>
                <select
                  className="form-select"
                  value={questionsCount}
                  onChange={(e) => setQuestionsCount(e.target.value)}
                >
                  <option value={5}>5 Questions</option>
                  <option value={10}>10 Questions</option>
                  <option value={15}>15 Questions</option>
                </select>
              </div>

              {/* Mode */}
              <div className="mb-4">
                <label className="fw-semibold mb-2">Interview Mode</label>
                <select
                  className="form-select"
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                >
                  <option value="normal">Normal</option>
                  <option value="adaptive">AI Adaptive</option>
                  <option value="resume">Resume Based</option>
                </select>
              </div>

              {/* Button */}
              <button
                className="btn btn-lg w-100 text-white fw-semibold"
                style={{
                  background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                  borderRadius: "12px",
                }}
                onClick={startInterview}
              >
                🚀 Start Interview
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InterviewSetup;
