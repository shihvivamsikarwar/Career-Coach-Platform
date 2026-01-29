import React, { useState } from "react";
import axios from "axios";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", localStorage.getItem("userId"));

    try {
      await axios.post("http://localhost:5000/api/resume/upload", formData);

      setMessage("Resume uploaded successfully!");
    } catch (error) {
      setMessage("Upload failed");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Upload Resume</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button className="btn btn-primary">Upload</button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default UploadResume;
