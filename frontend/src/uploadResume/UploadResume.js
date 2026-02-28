import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("userId", userId);

      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resume Uploaded Successfully ✅");

      const resumeId = res.data.resume._id;

      // Navigate to analysis page
      navigate(`/resume-analysis/${resumeId}`);
    } catch (err) {
      console.error(err);
      alert("Upload Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #eef2ff, #f8f9ff)",
      }}
    >
      <div className="card shadow-lg p-5 rounded-4" style={{ width: "450px" }}>
        <h3 className="fw-bold mb-4 text-center">📄 Upload Resume</h3>

        <input
          type="file"
          className="form-control mb-3"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? "Analyzing Resume..." : "Upload & Analyze"}
        </button>
      </div>
    </div>
  );
}

export default UploadResume;
