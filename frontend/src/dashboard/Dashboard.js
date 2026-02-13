import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [totalInterviews, setTotalInterviews] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [skillLevel, setSkillLevel] = useState("Beginner");

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/interview/history/${userId}`)
      .then((res) => {
        const history = res.data.history;

        setTotalInterviews(history.length);
        if (history.length > 0) {
          const total = history.reduce((sum, item) => sum + item.score, 0);
          const avg = Math.round(total / history.length);
          setAverageScore(avg);

          // Determine skill level
          if (avg >= 85) setSkillLevel("Expert");
          else if (avg >= 70) setSkillLevel("Advanced");
          else if (avg >= 55) setSkillLevel("Intermediate");
          else setSkillLevel("Beginner");
        }
      })
      .catch((err) => console.error(err));
  }, []);
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
          <h2 className="fw-bold">Welcome 👋</h2>
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
                <h2 className="fw-bold text-primary mt-2">{totalInterviews}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="fw-semibold">Average Score</h5>
                <h2 className="fw-bold text-success mt-2">{averageScore}%</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body text-center">
                <h5 className="fw-semibold">Skill Level</h5>
                <h2 className="fw-bold text-warning mt-2">{skillLevel}</h2>
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

                <button
                  className="btn btn-outline-primary mt-3 w-100"
                  onClick={() => navigate("/interview-history")}
                >
                  View Interview History
                </button>
                <button
                  className="btn btn-dark mt-2 w-100"
                  onClick={() => navigate("/analytics")}
                >
                  View Detailed Analytics
                </button>
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
