import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/jobMatch.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function JobMatch() {
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // ===============================
  // MATCH JOB
  // ===============================
  const handleMatch = async () => {
    if (!jobDesc.trim()) {
      alert("Please enter job description");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("http://localhost:5000/api/job/match", {
        userId,
        jobDescription: jobDesc,
      });

      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      alert("Job match failed");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // SCORE COLOR
  // ===============================
  const getScoreColor = (score) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "danger";
  };

  // ===============================
  // RESET
  // ===============================
  const resetAnalysis = () => {
    setResult(null);
    setJobDesc("");
  };

  return (
    <div className="job-bg py-5">
      <div className="container">
        {/* HEADER */}
        <div className="text-center mb-4">
          <h2 className="fw-bold">🎯 AI Job Match Analyzer</h2>
          <p className="text-muted">
            Compare your resume with job requirements and get hiring insights
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="glass-card p-4 mb-4">
          <h5>Paste Job Description</h5>

          <textarea
            className="form-control mt-3"
            rows="6"
            placeholder="Paste job description here..."
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
          />

          <div className="d-flex gap-3 mt-3">
            <button
              className="btn btn-primary px-4"
              onClick={handleMatch}
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Match With My Resume"}
            </button>

            {result && (
              <button
                className="btn btn-outline-secondary"
                onClick={resetAnalysis}
              >
                New Analysis
              </button>
            )}
          </div>
        </div>

        {/* RESULT */}
        {result && (
          <>
            {/* SCORE */}
            <div className="glass-card p-4 text-center mb-4">
              <h5>Match Score</h5>

              <h1
                className={`display-3 fw-bold text-${getScoreColor(
                  result.matchScore || 0
                )}`}
              >
                {result.matchScore || 0}%
              </h1>

              <p className="text-muted">
                Hiring Probability: {result.selectionProbability || "N/A"}
              </p>

              <div className="progress mt-3" style={{ height: "10px" }}>
                <div
                  className={`progress-bar bg-${getScoreColor(
                    result.matchScore || 0
                  )}`}
                  style={{ width: `${result.matchScore || 0}%` }}
                ></div>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="row g-4">
              {/* STRENGTHS */}
              <div className="col-md-6">
                <div className="glass-card p-4 h-100">
                  <h5>✅ Strengths</h5>

                  {result.strengths?.length > 0 ? (
                    <ul>
                      {result.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No strengths detected</p>
                  )}
                </div>
              </div>

              {/* MISSING */}
              <div className="col-md-6">
                <div className="glass-card p-4 h-100">
                  <h5>⚠ Missing Keywords</h5>

                  {result.missingKeywords?.length > 0 ? (
                    result.missingKeywords.map((k, i) => (
                      <span key={i} className="missing-badge">
                        {k}
                      </span>
                    ))
                  ) : (
                    <p className="text-muted">No missing keywords 🎉</p>
                  )}
                </div>
              </div>

              {/* IMPROVEMENTS */}
              <div className="col-md-12">
                <div className="glass-card p-4">
                  <h5>🚀 Improvement Tips</h5>

                  {result.improvementTips?.length > 0 ? (
                    <ul>
                      {result.improvementTips.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No suggestions</p>
                  )}
                </div>
              </div>
            </div>

            {/* SKILL GAP */}
            {result?.skillGap?.length > 0 && (
              <div className="glass-card p-4 mt-4">
                <h5>📊 Skill Gap Analysis</h5>

                <div style={{ width: "100%", height: 350 }}>
                  <ResponsiveContainer>
                    <BarChart data={result.skillGap}>
                      <XAxis dataKey="skill" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="required" fill="#6366f1" name="Required" />
                      <Bar
                        dataKey="yourLevel"
                        fill="#10b981"
                        name="Your Level"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="text-center mt-4 d-flex justify-content-center gap-3">
              <button
                className="btn btn-outline-dark"
                onClick={() => navigate(`/job/history/${userId}`)}
              >
                View Match History
              </button>

              <button
                className="btn btn-dark"
                onClick={() => navigate(`/job/analytics/${userId}`)}
              >
                View Analytics
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default JobMatch;
