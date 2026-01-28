import React from "react";

function HowItWorks() {
  return (
    <div className="container-fluid py-5 bg-light">
      <div className="container">
        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">How It Works</h2>
          <p className="text-muted fs-5">
            Simple steps to prepare for interviews and plan your career
          </p>
        </div>

        {/* Steps */}
        <div className="row g-4 text-center">
          {/* Step 1 */}
          <div className="col-md-3">
            <div className="p-4 border rounded h-100 bg-white shadow-sm">
              <h5 className="fw-semibold">Step 1</h5>
              <p className="fw-bold mt-2">Register & Login</p>
              <p className="text-muted">
                Create your account and log in to access the platform.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="col-md-3">
            <div className="p-4 border rounded h-100 bg-white shadow-sm">
              <h5 className="fw-semibold">Step 2</h5>
              <p className="fw-bold mt-2">Upload Resume</p>
              <p className="text-muted">
                Upload your resume to analyze skills and strengths.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="col-md-3">
            <div className="p-4 border rounded h-100 bg-white shadow-sm">
              <h5 className="fw-semibold">Step 3</h5>
              <p className="fw-bold mt-2">Attend Mock Interview</p>
              <p className="text-muted">
                Answer AI-generated interview questions.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="col-md-3">
            <div className="p-4 border rounded h-100 bg-white shadow-sm">
              <h5 className="fw-semibold">Step 4</h5>
              <p className="fw-bold mt-2">Get Feedback</p>
              <p className="text-muted">
                Receive scores, feedback, and career guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
