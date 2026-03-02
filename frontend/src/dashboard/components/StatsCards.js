import React from "react";

function StatsCards({ stats }) {
  if (!stats) {
    return <p>Loading stats...</p>;
  }

  return (
    <div className="row g-3 mb-4">
      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-3">
          <h6 className="text-muted">Interviews Taken</h6>
          <h3 className="fw-bold text-primary">{stats.totalInterviews || 0}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-3">
          <h6 className="text-muted">Average Score</h6>
          <h3 className="fw-bold text-success">{stats.averageScore || 0}%</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-3">
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
