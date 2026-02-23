import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    avg: 0,
    level: "Beginner",
  });

  const [resume, setResume] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    // Interview Stats
    axios
      .get(`http://localhost:5000/api/interview/history/${userId}`)
      .then((res) => {
        const history = res.data.history;

        if (!history) return;

        const total = history.length;
        const avg =
          total > 0
            ? Math.round(history.reduce((s, i) => s + i.score, 0) / total)
            : 0;

        let level = "Beginner";
        if (avg >= 85) level = "Expert";
        else if (avg >= 70) level = "Advanced";
        else if (avg >= 55) level = "Intermediate";

        setStats({ total, avg, level });
      });

    // Latest Resume
    axios
      .get(`http://localhost:5000/api/resume/latest/${userId}`)
      .then((res) => {
        setResume(res.data);
      });
  }, [userId]);

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #eef2ff, #f8f9ff)",
      }}
    >
      <div className="container py-5">
        {/* HEADER */}
        <div className="mb-5">
          <h2 className="fw-bold">👋 Welcome Back</h2>
          <p className="text-muted">
            Track your progress and improve your interview skills.
          </p>
        </div>

        {/* STATS ROW */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4 text-center p-4">
              <h6 className="text-muted">Interviews Taken</h6>
              <h2 className="fw-bold text-primary">{stats.total}</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4 text-center p-4">
              <h6 className="text-muted">Average Score</h6>
              <h2 className="fw-bold text-success">{stats.avg}%</h2>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow border-0 rounded-4 text-center p-4">
              <h6 className="text-muted">Skill Level</h6>
              <h2 className="fw-bold text-warning">{stats.level}</h2>
            </div>
          </div>
        </div>

        {/* MAIN CARDS */}
        <div className="row g-4">
          {/* RESUME CARD */}
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4 h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">📄 Resume Center</h5>

                {resume ? (
                  <>
                    <p className="text-success fw-semibold">
                      Resume Uploaded ✅
                    </p>

                    <p className="small text-muted">
                      Last Upload:{" "}
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </p>

                    <button
                      className="btn btn-success w-100"
                      onClick={() => navigate(`/resume-analysis/${resume._id}`)}
                    >
                      View Analysis
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-muted">No resume uploaded yet.</p>
                  </>
                )}

                <Link
                  to="/upload-resume"
                  className="btn btn-primary mt-3 w-100"
                >
                  Upload Resume
                </Link>

                <Link
                  to="/my-resumes"
                  className="btn btn-outline-dark mt-2 w-100"
                >
                  My Resumes
                </Link>
              </div>
            </div>
          </div>

          {/* INTERVIEW CARD */}
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4 h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">🎤 Interview Practice</h5>

                <p className="text-muted">Improve with AI mock interviews.</p>

                <div className="progress mb-3" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${stats.avg}%` }}
                  ></div>
                </div>

                <Link
                  to="/interview-selection"
                  className="btn btn-success w-100"
                >
                  Start Interview
                </Link>

                <button
                  className="btn btn-outline-primary mt-2 w-100"
                  onClick={() => navigate("/interview-history")}
                >
                  Interview History
                </button>

                <button
                  className="btn btn-dark mt-2 w-100"
                  onClick={() => navigate("/analytics")}
                >
                  Performance Analytics
                </button>
              </div>
            </div>
          </div>

          {/* CAREER CARD */}
          <div className="col-md-4">
            <div className="card shadow-lg border-0 rounded-4 h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">🚀 Career Guidance</h5>

                <p className="text-muted">
                  Personalized recommendations based on your skills.
                </p>

                <Link
                  to="/career-guidance"
                  className="btn btn-warning text-white w-100"
                >
                  View Guidance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
