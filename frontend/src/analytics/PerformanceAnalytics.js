import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function PerformanceAnalytics() {
  const [history, setHistory] = useState([]);
  const [weakAreas, setWeakAreas] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    // Fetch interview history
    axios
      .get(`http://localhost:5000/api/interview/history/${userId}`)
      .then((res) => {
        setHistory(res.data.history.reverse());
      })
      .catch((err) => console.error(err));

    // Fetch weak areas
    axios
      .get(`http://localhost:5000/api/interview/weak-areas/${userId}`)
      .then((res) => {
        setWeakAreas(res.data.weakAreas);
      })
      .catch((err) => console.error(err));

    axios
      .get(`http://localhost:5000/api/interview/recommendations/${userId}`)
      .then((res) => {
        setRecommendations(res.data.recommendations);
      })
      .catch((err) => console.error(err));
  }, []);

  const chartData = {
    labels: history.map((_, index) => `Attempt ${index + 1}`),
    datasets: [
      {
        label: "Interview Score %",
        data: history.map((item) => item.score),
        borderColor: "#4e73df",
        backgroundColor: "rgba(78, 115, 223, 0.2)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Performance Analytics</h2>

      {/* Chart Section */}
      {history.length > 0 ? (
        <div
          className="card shadow-sm p-4 mx-auto"
          style={{ maxWidth: "700px" }}
        >
          <div style={{ height: "350px" }}>
            <Line
              data={chartData}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: "top" },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <p className="text-center">No performance data available.</p>
      )}

      {/* Weak Areas Section */}
      <div
        className="card shadow-sm p-4 mt-4 mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <h5 className="fw-bold mb-3">⚠ Weak Areas</h5>

        {weakAreas.length > 0 ? (
          <ul className="list-group">
            {weakAreas.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {item.concept}
                <span className="badge bg-danger rounded-pill">
                  {item.count} times
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">No weak areas detected yet.</p>
        )}
      </div>
      <div
        className="card shadow-sm p-4 mt-4 mx-auto"
        style={{ maxWidth: "700px" }}
      >
        <h5 className="fw-bold mb-3">📚 Personalized Study Plan</h5>

        {recommendations.length > 0 ? (
          <ul className="list-group">
            {recommendations.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.concept}</strong>
                  <div className="text-muted small">{item.title}</div>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  Open Resource
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">
            No recommendations yet. Complete more interviews to unlock smart
            guidance.
          </p>
        )}
      </div>
    </div>
  );
}

export default PerformanceAnalytics;
