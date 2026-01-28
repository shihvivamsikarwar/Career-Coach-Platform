import React from "react";

function MockInterview() {
  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f6f4ff, #e9e4ff)",
      }}
    >
      <div className="container py-5">
        {/* Header */}
        <div className="mb-4">
          <h2 className="fw-bold">Mock Interview</h2>
          <p className="text-muted">
            Answer the questions honestly as in a real interview.
          </p>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-sm border-0 rounded-4">
              <div className="card-body p-4">
                {/* Question Info */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-primary">Question 1 of 10</span>
                  <span className="text-muted">Role: Java Developer</span>
                </div>

                {/* Question */}
                <h5 className="fw-semibold mb-3">
                  Q1. Explain the concept of Object-Oriented Programming.
                </h5>

                {/* Answer Box */}
                <div className="mb-4">
                  <textarea
                    className="form-control"
                    rows="6"
                    placeholder="Type your answer here..."
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <button className="btn btn-outline-secondary">
                    Previous
                  </button>

                  <button className="btn btn-success">Submit & Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockInterview;
