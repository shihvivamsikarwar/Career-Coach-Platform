import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    avg: 0,
    level: "Beginner",
    jobMatches: 0,
    jobAvg: 0,
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    Promise.all([
      axios.get(`http://localhost:5000/api/interview/history/${userId}`),
      axios.get(`http://localhost:5000/api/resume/latest/${userId}`),
      axios.get(`http://localhost:5000/api/job/analytics/${userId}`),
    ])
      .then(([historyRes, resumeRes, jobRes]) => {
        const history = historyRes?.data?.history || [];

        const total = history.length;

        const avg =
          total > 0
            ? Math.round(history.reduce((s, i) => s + i.score, 0) / total)
            : 0;

        let level = "Beginner";
        if (avg >= 85) level = "Expert";
        else if (avg >= 70) level = "Advanced";
        else if (avg >= 55) level = "Intermediate";

        const jobAnalytics = jobRes?.data || {};

        setStats({
          total,
          avg,
          level,
          jobMatches: jobAnalytics.totalMatches || 0,
          jobAvg: jobAnalytics.avgScore || 0,
        });

        setResume(resumeRes?.data || null);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h4>Loading Dashboard...</h4>
      </div>
    );
  }

  return (
    <div className="premium-bg">
      <div className="container py-5">
        {/* HEADER */}
        <div className="mb-5">
          <h2 className="fw-bold">👋 Welcome Back</h2>
          <p className="text-muted">
            Track your progress and boost your career with AI insights.
          </p>
        </div>

        {/* STATS */}
        <div className="row g-4 mb-4">
          <StatCard
            title="Interviews Taken"
            value={stats.total}
            color="primary"
          />
          <StatCard
            title="Average Score"
            value={`${stats.avg}%`}
            color="success"
          />
          <StatCard title="Skill Level" value={stats.level} color="warning" />
          <StatCard title="Job Matches" value={stats.jobMatches} color="dark" />
        </div>

        {/* MAIN SECTION */}
        <div className="row g-4">
          {/* Resume Center */}
          <div className="col-lg-4">
            <div className="card premium-card h-100">
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
                  <p className="text-muted">No resume uploaded yet.</p>
                )}

                <button
                  className="btn btn-primary mt-3 w-100"
                  onClick={() => navigate("/upload-resume")}
                >
                  Upload Resume
                </button>

                <button
                  className="btn btn-outline-dark mt-2 w-100"
                  onClick={() => navigate("/my-resumes")}
                >
                  My Resumes
                </button>

                <Link to="/job-match" className="btn btn-dark mt-2 w-100">
                  🎯 Job Match AI
                </Link>

                <button
                  className="btn btn-outline-dark mt-2 w-100"
                  onClick={() => navigate("/job-match-history")}
                >
                  Job Match History
                </button>

                <button
                  className="btn btn-dark mt-2 w-100"
                  onClick={() => navigate("/job-match-analytics")}
                >
                  Job Match Analytics
                </button>
              </div>
            </div>
          </div>

          {/* Interview Section */}
          <div className="col-lg-4">
            <div className="card premium-card h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">🎤 Interview Practice</h5>

                <p className="text-muted">
                  Improve with AI mock interviews and feedback.
                </p>

                <div className="progress mb-3" style={{ height: 8 }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: `${stats.avg}%` }}
                  />
                </div>

                <button
                  className="btn btn-success w-100"
                  onClick={() => navigate("/interview-selection")}
                >
                  Start Interview
                </button>

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

          {/* Career Guidance */}
          <div className="col-lg-4">
            <div className="card premium-card h-100">
              <div className="card-body">
                <h5 className="fw-bold mb-3">🚀 Career Guidance</h5>

                <p className="text-muted">
                  Personalized recommendations based on your skills.
                </p>

                <button
                  className="btn btn-warning text-white w-100"
                  onClick={() => navigate("/career-guidance")}
                >
                  View Guidance
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* JOB MATCH ANALYTICS */}
        <div className="card premium-card mt-5">
          <div className="card-body">
            <h5 className="fw-bold mb-3">📊 Job Match Analytics</h5>

            <div className="row text-center">
              <div className="col-md-6">
                <h6 className="text-muted">Total Matches</h6>
                <h3 className="fw-bold">{stats.jobMatches}</h3>
              </div>

              <div className="col-md-6">
                <h6 className="text-muted">Average Match Score</h6>
                <h3 className="fw-bold">{stats.jobAvg}%</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="col-md-3">
      <div className="card premium-card text-center p-4">
        <h6 className="text-muted">{title}</h6>
        <h2 className={`fw-bold text-${color}`}>{value}</h2>
      </div>
    </div>
  );
}

export default Dashboard;
