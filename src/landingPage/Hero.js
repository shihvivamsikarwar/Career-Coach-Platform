import React from "react";

function Hero() {
  return (
    <div
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #e9e4ff, #f6f4ff)",
      }}
    >
      <div className="container py-4">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-md-6">
            <h1 className="fw-bold display-5 mb-4">
              AI Interview & Career Coach Platform
            </h1>

            <p className="text-muted fs-5 mb-4">
              Prepare for interviews and get personalized career guidance with
              intelligent AI assistance.
            </p>

            <div className="d-flex gap-3 mb-3">
              <a
                href="/login"
                className="btn btn-primary btn-lg rounded-pill px-4"
              >
                Log In
              </a>
              <a
                href="/register"
                className="btn btn-outline-secondary btn-lg rounded-pill px-4"
              >
                Register
              </a>
            </div>

            <p className="text-muted">
              Start practicing for job interviews and receive personalized
              career guidance to excel in your career.
            </p>
          </div>

          {/* Right Illustration */}
          <div className="col-md-6 text-center">
            <img
              src="media/images/hero.png"
              alt="AI Interview Illustration"
              className="img-fluid"
              style={{ maxHeight: "380px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
