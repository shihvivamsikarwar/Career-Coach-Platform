import React from "react";

function CareerGuidance() {
  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f6f4ff, #e9e4ff)",
      }}
    >
      <div className="container py-5">
        {/* Page Header */}
        <div className="mb-4 text-center">
          <h2 className="fw-bold">Career Guidance</h2>
          <p className="text-muted">
            Personalized career recommendations based on your interview
            performance.
          </p>
        </div>

        {/* Recommended Role */}
        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 rounded-4 text-center">
              <div className="card-body p-4">
                <h5 className="fw-semibold text-muted">
                  Recommended Career Path
                </h5>
                <h3 className="fw-bold text-primary mt-2">
                  Java / Full Stack Developer
                </h3>
                <p className="text-muted mt-2">
                  Based on your technical knowledge and interview performance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Improvement Section */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold">Strengths</h5>
                <ul className="text-muted mt-2">
                  <li>OOPS Concepts</li>
                  <li>Core Java</li>
                  <li>Problem Understanding</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold">Needs Improvement</h5>
                <ul className="text-muted mt-2">
                  <li>Data Structures</li>
                  <li>System Design Basics</li>
                  <li>Communication Skills</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h5 className="fw-bold">Suggested Actions</h5>
                <ul className="text-muted mt-2">
                  <li>Practice DSA daily</li>
                  <li>Revise Java OOPS</li>
                  <li>Attend mock interviews</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="text-center mt-4">
          <a href="/dashboard" className="btn btn-outline-secondary me-3">
            Back to Dashboard
          </a>
          <a href="/interview" className="btn btn-success">
            Take Another Interview
          </a>
        </div>
      </div>
    </div>
  );
}

export default CareerGuidance;
