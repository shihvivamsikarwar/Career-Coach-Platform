import React from "react";

function UploadResume() {
  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f6f4ff, #e9e4ff)",
      }}
    >
      <div className="container py-5">
        {/* Page Heading */}
        <div className="mb-4">
          <h2 className="fw-bold">Upload Your Resume</h2>
          <p className="text-muted">
            Upload your resume to analyze skills and receive interview
            recommendations.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <form>
                  {/* File Upload */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Select Resume (PDF only)
                    </label>
                    <input type="file" className="form-control" accept=".pdf" />
                  </div>

                  {/* Upload Button */}
                  <div className="d-grid">
                    <button className="btn btn-primary btn-lg">
                      Upload & Analyze
                    </button>
                  </div>
                </form>

                {/* Info Box */}
                <div className="alert alert-info mt-4 mb-0">
                  <strong>Note:</strong> Your resume will be analyzed to extract
                  skills, strengths, and improvement areas.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadResume;
