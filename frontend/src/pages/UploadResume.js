import React, { useState } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const handleUpload = async () => {
    if (!file) return alert("Select a file");

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", userId);

    try {
      setLoading(true);

      const res = await axios.post(`${API}/api/resume/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Resume uploaded successfully");

      console.log("Upload Response:", res.data);

      // ✅ Correct navigation
      navigate(`/resume-analysis/${res.data.resumeId || res.data.resume._id}`);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mt-4">
        <h3>Upload Resume</h3>

        <div className="card p-4 shadow-sm mt-3">
          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UploadResume;
