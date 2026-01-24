import React from "react";

function ResultFeedback() {
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
          <h2 className="fw-bold">Interview Result & Feedback</h2>
          <p className="text-muted">
            Here is your performance summary and improvement feedback.
          </p>
        </div>

        {/* Score Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="card text-center shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h6 className="text-muted">Technical Score</h6>
                <h2 className="fw-bold text-primary">75%</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h6 className="text-muted">Communication</h6>
                <h2 className="fw-bold text-success">70%</h2>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center shadow-sm border-0 rounded-4">
              <div className="card-body">
                <h6 className="text-muted">Overall Score</h6>
                <h2 className="fw-bold text-warning">72%</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">AI Feedback</h5>

                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    ✔ Strong understanding of OOPS concepts.
                  </li>
                  <li className="list-group-item">
                    ✔ Good explanation of inheritance and polymorphism.
                  </li>
                  <li className="list-group-item">
                    ⚠ Improve explanation clarity and examples.
                  </li>
                  <li className="list-group-item">
                    ⚠ Revise encapsulation and abstraction concepts.
                  </li>
                </ul>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <a href="/dashboard" className="btn btn-outline-secondary">
                    Back to Dashboard
                  </a>
                  <a href="/career-guidance" className="btn btn-primary">
                    View Career Guidance
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultFeedback;
