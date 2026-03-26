import React from "react";

function AlInsights({ data }) {
  if (!data) {
    return (
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h5>🤖 AI Career Insights</h5>
        <p className="text-muted mb-0">No AI insights available yet.</p>
      </div>
    );
  }

  return (
    <div className="card shadow-sm border-0 p-4 mb-4">
      <h5 className="mb-3">🤖 AI Career Insights</h5>

      <p>
        <strong>Recommended Role:</strong>{" "}
        {data.recommendedRole || "Not available"}
      </p>

      <div className="row">
        <div className="col-md-6">
          <p className="fw-bold mb-1">Strengths</p>
          <ul>
            {data.strengths?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="col-md-6">
          <p className="fw-bold mb-1">Areas to Improve</p>
          <ul>
            {data.weakAreas?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-3">
        <strong>Next Step:</strong> {data.nextStep || "Keep practicing"}
      </div>
    </div>
  );
}

export default AlInsights;
