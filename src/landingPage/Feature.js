import React from "react";

function Features() {
  return (
    <div className="container py-5">
      {/* Section Heading */}
      <div className="text-center mb-5">
        <h2 className="fw-bold">Platform Features</h2>
        <p className="text-muted fs-5">
          Everything you need to prepare for interviews and plan your career
        </p>
      </div>

      {/* Feature Cards */}
      <div className="row g-4">
        {/* Feature 1 */}
        <div className="col-md-4">
          <div className="card h-100 text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Resume Analysis</h5>
              <p className="card-text text-muted">
                Upload your resume and get skill insights, strengths, and areas
                of improvement using AI-based analysis.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="col-md-4">
          <div className="card h-100 text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold">AI Mock Interviews</h5>
              <p className="card-text text-muted">
                Practice role-based interview questions and receive instant
                evaluation and feedback.
              </p>
            </div>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="col-md-4">
          <div className="card h-100 text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold">Career Guidance</h5>
              <p className="card-text text-muted">
                Get personalized career recommendations and learning roadmaps
                based on your performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;
