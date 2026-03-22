import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
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
import API from "../utils/api";

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
      .get(`${API}/api/interview/history/${userId}`)
      .then((res) => {
        setHistory(res.data.history.reverse());
      })
      .catch((err) => console.error(err));

    // Fetch weak areas
    axios
      .get(`${API}/api/interview/weak-areas/${userId}`)
      .then((res) => {
        setWeakAreas(res.data.weakAreas);
      })
      .catch((err) => console.error(err));

    axios
      .get(`${API}/api/interview/recommendations/${userId}`)
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
    <DashboardLayout>
      <div className="container-fluid">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="h2 mb-2 fw-bold text-primary">Performance Analytics</h1>
          <p className="text-muted">Track your interview performance and identify improvement areas</p>
        </div>

        {/* Chart Section */}
        {history.length > 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-header bg-light border-0">
                  <h5 className="mb-0 text-primary">📈 Performance Trend</h5>
                </div>
                <div className="card-body">
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
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center py-5">
                  <div className="display-4 text-muted mb-3">📊</div>
                  <h4 className="text-muted">No Performance Data Available</h4>
                  <p className="text-muted">Complete some mock interviews to see your performance analytics here.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => window.location.href = '/interview-selection'}
                  >
                    Start Interview Practice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weak Areas Section */}
        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-light border-0">
                <h5 className="mb-0 text-danger">⚠️ Weak Areas</h5>
              </div>
              <div className="card-body">
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
                  <div className="text-center py-3">
                    <div className="text-success mb-2">✅</div>
                    <p className="text-muted mb-0">No weak areas detected yet. Keep up the good work!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recommendations Section */}
          <div className="col-lg-6">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-header bg-light border-0">
                <h5 className="mb-0 text-success">📚 Personalized Study Plan</h5>
              </div>
              <div className="card-body">
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
                  <div className="text-center py-3">
                    <div className="text-muted mb-2">📖</div>
                    <p className="text-muted mb-0">
                      No recommendations yet. Complete more interviews to unlock smart guidance.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        {history.length > 0 && (
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h3 className="text-primary fw-bold">
                    {Math.max(...history.map(h => h.score))}%
                  </h3>
                  <p className="text-muted mb-0">Highest Score</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h3 className="text-success fw-bold">
                    {history.length > 0 ? Math.round(history.reduce((acc, h) => acc + h.score, 0) / history.length) : 0}%
                  </h3>
                  <p className="text-muted mb-0">Average Score</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card shadow-sm border-0">
                <div className="card-body text-center">
                  <h3 className="text-info fw-bold">{history.length}</h3>
                  <p className="text-muted mb-0">Total Interviews</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default PerformanceAnalytics;
