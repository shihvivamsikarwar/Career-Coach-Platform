import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../../utils/api";

function ResumeCenter() {
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) fetchResume();
  }, [userId]);

  const fetchResume = async () => {
    try {
      const res = await axios.get(`${API}/api/resume/latest/${userId}`);

      console.log("Resume API:", res.data); // debug

      setResume(res.data);
    } catch (err) {
      console.error("Resume fetch error:", err);
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-4 p-4">
      <h5 className="fw-bold mb-3">📄 Resume Center</h5>

      {resume ? (
        <>
          <p className="text-success fw-semibold">Resume Uploaded ✅</p>

          <p className="small text-muted">
            Last Upload: {new Date(resume.createdAt).toLocaleDateString()}
          </p>

          <p>
            Score: <strong>{resume.score || 0}%</strong>
          </p>

          <button
            className="btn btn-primary w-100 mb-2"
            onClick={() => navigate(`/resume-analysis/${resume._id}`)}
          >
            View Analysis
          </button>
        </>
      ) : (
        <p className="text-muted">No resume uploaded yet.</p>
      )}

      <button
        className="btn btn-success w-100"
        onClick={() => navigate("/upload-resume")}
      >
        Upload Resume
      </button>
    </div>
  );
}

export default ResumeCenter;
