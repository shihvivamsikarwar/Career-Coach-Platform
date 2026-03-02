import React, { useEffect, useState } from "react";
import axios from "axios";

function RecentInterviews() {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/interview/history/${userId}`
      );

      setHistory(res.data.history || []);
    } catch (err) {
      console.error("History error", err);
    }
  };

  return (
    <div className="card shadow-sm border-0 p-4 mt-4">
      <h5 className="mb-3">Recent Interviews</h5>

      {history.length === 0 ? (
        <p className="text-muted">No interview attempts yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Difficulty</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {history.slice(0, 5).map((item, index) => (
                <tr key={index}>
                  <td>{item.domain}</td>
                  <td>{item.difficulty}</td>
                  <td>
                    <span className="fw-bold text-primary">{item.score}%</span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item.grade === "A"
                          ? "bg-success"
                          : item.grade === "B"
                          ? "bg-primary"
                          : item.grade === "C"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {item.grade}
                    </span>
                  </td>
                  <td>
                    {new Date(item.createdAt || item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default RecentInterviews;
