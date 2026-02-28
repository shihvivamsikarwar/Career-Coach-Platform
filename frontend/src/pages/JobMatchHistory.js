import React, { useEffect, useState } from "react";
import axios from "axios";

function JobMatchHistory() {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/job/history/${userId}`
      );

      setHistory(res.data); // ✅ important
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <h2>Job Match History</h2>

      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        history.map((item) => (
          <div key={item._id} className="card p-3 mb-3">
            <h5>Score: {item.matchScore}%</h5>
            <p>Probability: {item.selectionProbability}</p>
            <small>{new Date(item.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default JobMatchHistory;
