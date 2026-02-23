import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ResumeAnalysis() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/resume/analysis/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!data) return <p className="text-center mt-5">Loading Analysis...</p>;

  const scoreColor =
    data.score >= 80 ? "success" : data.score >= 60 ? "warning" : "danger";

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #eef2ff, #f9fafc)",
      }}
    >
      <div className="container">
        <h2 className="fw-bold mb-4 text-center">
          Resume Intelligence Dashboard
        </h2>

        {/* SCORE CARD */}
        <div className="card shadow-lg border-0 rounded-4 p-4 mb-4 text-center">
          <h5 className="text-muted">Resume Score</h5>

          <div
            className={`display-1 fw-bold text-${scoreColor}`}
            style={{ fontSize: "80px" }}
          >
            {data.score}%
          </div>

          <p className="text-muted">
            AI evaluation based on skills, structure, and content quality
          </p>
        </div>

        <div className="row g-4">
          {/* SKILLS */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
              <h5 className="fw-bold mb-3">Detected Skills</h5>

              {data.skills.length === 0 ? (
                <p className="text-muted">No skills detected</p>
              ) : (
                data.skills.map((skill, i) => (
                  <span key={i} className="badge bg-success m-1 p-2">
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* MISSING SKILLS */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
              <h5 className="fw-bold mb-3">Missing Skills</h5>

              {data.missingSkills.length === 0 ? (
                <p className="text-muted">No missing skills 🎉</p>
              ) : (
                data.missingSkills.map((skill, i) => (
                  <span key={i} className="badge bg-danger m-1 p-2">
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* SUGGESTIONS */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
              <h5 className="fw-bold mb-3">AI Suggestions</h5>

              <ul className="list-group list-group-flush">
                {data.suggestions.map((s, i) => (
                  <li key={i} className="list-group-item border-0">
                    ✅ {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ROLES */}
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4 p-4 h-100">
              <h5 className="fw-bold mb-3">Recommended Roles</h5>

              {data.recommendedRoles.map((role, i) => (
                <span key={i} className="badge bg-primary m-1 p-2">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalysis;
