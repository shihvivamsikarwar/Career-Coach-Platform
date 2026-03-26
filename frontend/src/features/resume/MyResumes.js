import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../constants";

function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const fetchResumes = useCallback(async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/resume/user/${userId}`);
      setResumes(res.data || []);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleViewAnalysis = (resumeId) => {
    navigate(`/resume-analysis/${resumeId}`);
  };

  const handleDelete = async (resumeId) => {
    if (!window.confirm("Are you sure you want to delete this resume?")) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/resume/${resumeId}`);
      setResumes(resumes.filter(resume => resume._id !== resumeId));
      alert("Resume deleted successfully");
    } catch (error) {
      console.error("Error deleting resume:", error);
      alert("Failed to delete resume");
    }
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h3>My Resumes</h3>
      
      {resumes.length === 0 ? (
        <div className="text-center mt-5">
          <p className="text-muted">No resumes uploaded yet.</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/upload-resume')}
          >
            Upload Your First Resume
          </button>
        </div>
      ) : (
        <div className="row">
          {resumes.map((resume) => (
            <div key={resume._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{resume.fileName || 'Resume'}</h5>
                  <p className="card-text">
                    <small className="text-muted">
                      Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                  {resume.score && (
                    <p className="card-text">
                      <span className="badge bg-success">
                        Score: {resume.score}
                      </span>
                    </p>
                  )}
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleViewAnalysis(resume._id)}
                    >
                      View Analysis
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(resume._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyResumes;
