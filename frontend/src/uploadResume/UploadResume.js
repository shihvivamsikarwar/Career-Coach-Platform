import React, { useState } from "react";
import axios from "axios";

function UploadResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("userId", localStorage.getItem("userId"));

    try {
      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Upload successful");
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Upload Resume</h2>

      <input
        type="file"
        className="form-control mt-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="btn btn-primary mt-3" onClick={handleUpload}>
        Upload
      </button>

      {result && (
        <div className="mt-4">
          <h4>Resume Score: {result.score}</h4>
          <h5>Skills Detected:</h5>
          <ul>
            {result.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadResume;
