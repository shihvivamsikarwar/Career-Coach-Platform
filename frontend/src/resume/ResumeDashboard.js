import React, { useEffect, useState } from "react";
import axios from "axios";

function ResumeDashboard() {
  const [resumes, setResumes] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/resume/user/${userId}`
      );

      setResumes(res.data.resumes);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this resume?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/resume/${id}`);
      fetchResumes();
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f6f4ff, #e9e4ff)",
      }}
    >
      <div className="container py-5">
        <h2 className="fw-bold mb-4">My Resumes</h2>

        <div className="row g-4">
          {resumes.map((resume) => (
            <div key={resume._id} className="col-md-4">
              <div className="card shadow-lg border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="fw-bold mb-2">📄 {resume.fileName}</h5>

                  <p className="text-muted small">
                    Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
                  </p>

                  <div className="my-3">
                    <span className="badge bg-success fs-6">
                      Score: {resume.score || 0}%
                    </span>
                  </div>

                  <div className="mb-3">
                    <strong>Skills:</strong>
                    <div>
                      {resume.skills?.map((skill, i) => (
                        <span key={i} className="badge bg-primary me-1 mb-1">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm">
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
    </div>
  );
}

export default ResumeDashboard;
