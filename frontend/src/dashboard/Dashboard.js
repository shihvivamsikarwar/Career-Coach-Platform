import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f6f4ff, #e9e4ff)",
      }}
    >
      <div className="container py-5">
        {/* Welcome Section */}
        <div className="mb-4">
          <h2 className="fw-bold">Welcome, User 👋</h2>
          <p className="text-muted">
            Here is your interview preparation and career progress overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="fw-semibold">Interviews Taken</h5>
                <h2 className="fw-bold text-primary mt-2">5</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="fw-semibold">Average Score</h5>
                <h2 className="fw-bold text-success mt-2">72%</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="fw-semibold">Skill Level</h5>
                <h2 className="fw-bold text-warning mt-2">Intermediate</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold">Upload Resume</h5>
                <p className="text-muted">
                  Upload your resume to analyze skills and get recommendations.
                </p>
                <Link to="/upload-resume" className="btn btn-primary">
                  Upload Resume
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold">Start Interview</h5>
                <p className="text-muted">
                  Practice AI-based mock interviews and improve your skills.
                </p>
                <Link to="/interview-selection" className="btn btn-success">
                  Start Interview
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold">Career Guidance</h5>
                <p className="text-muted">
                  View personalized career suggestions based on performance.
                </p>
                <Link
                  to="/career-guidance"
                  className="btn btn-warning text-white"
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
