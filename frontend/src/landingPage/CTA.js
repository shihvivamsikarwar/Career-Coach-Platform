import React from "react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <div
      className="py-5 text-center"
      style={{
        background: "linear-gradient(135deg, #4f46e5, #6366f1)",
        color: "white",
      }}
    >
      <div className="container">
        <h2 className="fw-bold mb-3">
          Start Your Interview Preparation Journey Today
        </h2>

        <p className="mb-4">
          Practice interviews, analyze your resume, and receive career guidance
          powered by AI.
        </p>

        <Link
          to="/register"
          className="btn btn-light btn-lg rounded-pill px-4 fw-semibold"
        >
          Get Started Free
        </Link>
      </div>
    </div>
  );
}

export default CTA;
