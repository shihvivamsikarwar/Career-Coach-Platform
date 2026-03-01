import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResumeCenter() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/resume/latest/${userId}`)
      .then((res) => {
        setResume(res.data);
        setLoading(false);
      })
      .catch(() => {
        setResume(null);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card shadow-sm border-0 rounded-4 h-100">
      <div className="card-body">
        <h5 className="fw-bold mb-3">📄 Resume Center</h5>

        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : resume ? (
          <>
            <p className="mb-2">
              <strong>Status:</strong>{" "}
              <span className="badge bg-success">Uploaded</span>
            </p>

            <p className="mb-3">
              <strong>Score:</strong> {resume.analysis?.score || 0}%
            </p>

            <button
              className="btn btn-success w-100 mb-2"
              onClick={() => navigate(`/resume-analysis/${resume._id}`)}
            >
              View Analysis
            </button>
          </>
        ) : (
          <>
            <p className="text-muted">No resume uploaded yet</p>

            <button
              className="btn btn-primary w-100 mb-2"
              onClick={() => navigate("/upload-resume")}
            >
              Upload Resume
            </button>
          </>
        )}

        <button
          className="btn btn-outline-dark w-100"
          onClick={() => navigate("/my-resumes")}
        >
          My Resumes
        </button>
      </div>
    </div>
  );
}

export default ResumeCenter;
