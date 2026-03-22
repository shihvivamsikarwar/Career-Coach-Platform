import React, { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function InterviewHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setError("User ID not found. Please login again.");
      setLoading(false);
      return;
    }

    async function loadHistory() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${API}/api/interview/history/${userId}`);
        setHistory(res.data.history || []);
      } catch (err) {
        console.error("Failed to load history:", err);
        setError("Failed to load interview history. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadHistory();
  }, [userId]);

  const getScoreColor = (score) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-danger";
  };

  const getGradeColor = (grade) => {
    if (grade === "A" || grade === "A+") return "bg-success";
    if (grade === "B" || grade === "B+") return "bg-primary";
    if (grade === "C" || grade === "C+") return "bg-warning";
    return "bg-danger";
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy": return "bg-success";
      case "medium": return "bg-warning";
      case "hard": return "bg-danger";
      default: return "bg-secondary";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">
        {/* Page Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-2 fw-bold text-primary">Interview History</h1>
              <p className="text-muted">Review your past interview performances and track progress</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => navigate("/interview-selection")}
            >
              🎤 Take New Interview
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mb-0">Loading interview history...</p>
            <small className="text-muted">Preparing your performance data</small>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="alert alert-danger" role="alert">
            <h5 className="alert-heading">⚠️ Error Loading History</h5>
            <p className="mb-0">{error}</p>
            <button 
              className="btn btn-outline-danger btn-sm mt-2"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && history.length === 0 && (
          <div className="text-center py-5">
            <div className="card shadow-sm border-0">
              <div className="card-body py-5">
                <div className="display-1 mb-3">📝</div>
                <h3 className="text-muted mb-3">No Interview History Yet</h3>
                <p className="text-muted mb-4">Complete your first mock interview to see your performance history here.</p>
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={() => navigate("/interview-selection")}
                >
                  🎤 Start Your First Interview
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Interview History Grid */}
        {!loading && !error && history.length > 0 && (
          <>
            {/* Summary Stats */}
            <div className="row mb-4">
              <div className="col-md-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <h3 className="text-primary fw-bold">{history.length}</h3>
                    <p className="text-muted mb-0">Total Interviews</p>
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
                    <h3 className="text-info fw-bold">
                      {history.length > 0 ? Math.max(...history.map(h => h.score)) : 0}%
                    </h3>
                    <p className="text-muted mb-0">Best Score</p>
                  </div>
                </div>
              </div>
            </div>

            {/* History Cards */}
            <div className="row">
              {history.map((item, index) => (
                <div className="col-lg-6 mb-3" key={index}>
                  <div 
                    className="card shadow-sm border-0 h-100 cursor-pointer hover-lift"
                    onClick={() => navigate("/interview-report", { state: item })}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                          <h5 className="card-title text-primary mb-1">
                            {item.domain.replace("-", " ").toUpperCase()}
                          </h5>
                          <small className="text-muted">
                            {formatDate(item.createdAt)}
                          </small>
                        </div>
                        <div>
                          <span className={`badge ${getDifficultyColor(item.difficulty)}`}>
                            {item.difficulty || "Medium"}
                          </span>
                        </div>
                      </div>

                      <div className="row text-center">
                        <div className="col-6">
                          <div className="border rounded p-3">
                            <small className="text-muted d-block">Score</small>
                            <h3 className={`mb-0 fw-bold ${getScoreColor(item.score)}`}>
                              {item.score}%
                            </h3>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="border rounded p-3">
                            <small className="text-muted d-block">Grade</small>
                            <h4 className={`mb-0 ${getGradeColor(item.grade)} text-white rounded px-2 py-1 d-inline-block`}>
                              {item.grade || "N/A"}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="text-center mt-3">
                        <small className="text-primary">
                          <strong>Click to view detailed report →</strong>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default InterviewHistory;
