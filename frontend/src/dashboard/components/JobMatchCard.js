import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../utils/api";
function JobMatchCard() {
  const [data, setData] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`${API}/api/jobmatch/analytics/${userId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  const score = data?.avgScore || 0;

  return (
    <div className="card border-0 shadow-sm h-100 rounded-4">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-3">🎯 Job Match Insights</h5>

        {data?.totalMatches > 0 ? (
          <>
            <h2 className="fw-bold text-primary">{score}%</h2>
            <p className="text-muted">Average Match Score</p>

            <div className="progress mb-3" style={{ height: 8 }}>
              <div
                className="progress-bar bg-primary"
                style={{ width: `${score}%` }}
              />
            </div>

            <p className="text-muted small">
              Based on your latest resume and job analysis
            </p>

            <button className="btn btn-primary w-100 mt-2">
              View Job Matches
            </button>
          </>
        ) : (
          <>
            <p className="text-muted">No job match data available yet.</p>

            <button className="btn btn-primary w-100">Try Job Match AI</button>
          </>
        )}
      </div>
    </div>
  );
}

export default JobMatchCard;
