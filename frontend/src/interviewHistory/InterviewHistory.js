import React, { useEffect, useState } from "react";
import axios from "axios";

function InterviewHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first");
      return;
    }

    axios
      .get(`http://localhost:5000/api/interview/history/${userId}`)
      .then((res) => {
        setHistory(res.data.history);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to fetch history");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Interview History</h2>

      {history.length === 0 ? (
        <p className="text-center">No interview attempts yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Domain</th>
                <th>Score</th>
                <th>Grade</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td>{item.domain}</td>
                  <td>{item.score}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.grade === "A"
                          ? "bg-success"
                          : item.grade === "B"
                          ? "bg-primary"
                          : item.grade === "C"
                          ? "bg-warning text-dark"
                          : item.grade === "D"
                          ? "bg-danger"
                          : "bg-dark"
                      }`}
                    >
                      {item.grade}
                    </span>
                  </td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default InterviewHistory;
