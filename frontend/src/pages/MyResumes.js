import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const fetchResumes = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/resume/user/${userId}`);

      setResumes(res.data || []);
    } catch (error) {
      console.error("Fetch resume error:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await axios.delete(`${API}/api/resume/${id}`);
      fetchResumes();
    } catch (error) {
      alert("Delete failed");
    }
  };

  // ✅ DOWNLOAD FUNCTION
  const handleDownload = (fileUrl) => {
    if (!fileUrl) return;

    const cleanPath = fileUrl.replace(/\\/g, "/");
    const fullUrl = `${API}/${cleanPath}`;

    window.open(fullUrl, "_blank");
  };

  return (
    <DashboardLayout>
      <div className="container mt-4">
        <h3 className="mb-4">📄 My Resumes</h3>

        <div className="row">
          {resumes.map((resume) => (
            <div key={resume._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="fw-bold mb-2">
                    📄 {resume.fileName || "Resume"}
                  </h5>

                  <p className="text-muted small">
                    Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
                  </p>

                  <div className="my-3">
                    <span className="badge bg-success fs-6">
                      Score: {resume?.score ?? 0}%
                    </span>
                  </div>

                  <div className="mb-3">
                    <strong>Skills:</strong>
                    <div>
                      {resume?.skills?.length > 0 ? (
                        resume.skills.map((skill, i) => (
                          <span key={i} className="badge bg-primary me-1 mb-1">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted ms-2">
                          No skills detected
                        </span>
                      )}
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => navigate(`/resume-analysis/${resume._id}`)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleDownload(resume.fileUrl)}
                    >
                      Download
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
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

        {resumes.length === 0 && (
          <div className="text-center mt-5">
            <p className="text-muted">No resumes uploaded yet.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyResumes;
