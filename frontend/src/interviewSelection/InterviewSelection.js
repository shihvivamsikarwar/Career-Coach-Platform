import React from "react";

function InterviewSelection() {
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
          <h2 className="fw-bold">Start Mock Interview</h2>
          <p className="text-muted">
            Select your job role and interview difficulty level.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <form>
                  {/* Job Role */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Select Job Role
                    </label>
                    <select className="form-select">
                      <option>Java Developer</option>
                      <option>Full Stack Developer</option>
                      <option>Web Developer</option>
                      <option>AI / ML Engineer</option>
                    </select>
                  </div>

                  {/* Difficulty Level */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Interview Level
                    </label>
                    <select className="form-select">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>

                  {/* Start Button */}
                  <div className="d-grid">
                    <button className="btn btn-success btn-lg">
                      Start Interview
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewSelection;
