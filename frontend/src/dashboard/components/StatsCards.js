import React from "react";
import { useNavigate } from "react-router-dom";
function StatsCards({ stats }) {
  const navigate = useNavigate();

  if (!stats) {
    return <p>Loading stats...</p>;
  }

  return (
    <div className="row g-3 mb-4">
      {/* Interviews Taken */}
      <div className="col-md-4">
        <div
          className="card shadow-sm border-0 p-3 stat-click-card"
          onClick={() => navigate("/interview-history")}
        >
          <h6 className="text-muted">Interviews Taken</h6>
          <h3 className="fw-bold text-primary">{stats.totalInterviews || 0}</h3>
        </div>
      </div>

      {/* Average Score */}
      <div className="col-md-4">
        <div
          className="card shadow-sm border-0 p-3 stat-click-card"
          onClick={() => navigate("/interview-history")}
        >
          <h6 className="text-muted">Average Score</h6>
          <h3 className="fw-bold text-success">{stats.averageScore || 0}%</h3>
        </div>
      </div>

      {/* Skill Level */}
      <div className="col-md-4">
        <div
          className="card shadow-sm border-0 p-3 stat-click-card"
          onClick={() => navigate("/interview-history")}
        >
          <h6 className="text-muted">Skill Level</h6>
          <h3 className="fw-bold text-warning">
            {stats.skillLevel || "Beginner"}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default StatsCards;
