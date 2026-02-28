import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="py-5 text-center position-relative"
      style={{
        background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
        overflow: "hidden",
      }}
    >
      {/* Background Glow Effect */}
      <div
        style={{
          position: "absolute",
          top: "-120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "400px",
          height: "400px",
          background: "rgba(99,102,241,0.25)",
          filter: "blur(140px)",
          borderRadius: "50%",
        }}
      ></div>

      <div className="container py-5 position-relative">
        {/* Badge */}
        <span className="badge bg-primary-subtle text-primary px-3 py-2 mb-3">
          🚀 AI Powered Interview Platform
        </span>

        {/* Heading */}
        <h1
          className="fw-bold mb-4"
          style={{
            fontSize: "3rem",
            lineHeight: "1.2",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          Crack Interviews Faster with{" "}
          <span style={{ color: "#6366F1" }}>AI Career Coach</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-muted fs-5 mb-4"
          style={{ maxWidth: "650px", margin: "0 auto" }}
        >
          Practice real interview questions, analyze your resume, and receive
          personalized career guidance powered by AI.
        </p>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          <Link
            to="/register"
            className="btn btn-lg px-4 py-2"
            style={{
              borderRadius: "30px",
              background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
              color: "white",
              fontWeight: "600",
              boxShadow: "0px 6px 20px rgba(99,102,241,0.3)",
            }}
          >
            Get Started Free
          </Link>

          <Link
            to="/login"
            className="btn btn-outline-dark btn-lg rounded-pill px-4"
          >
            Login
          </Link>
        </div>

        {/* Trust Stats */}
        <div className="d-flex justify-content-center gap-5 mt-4 flex-wrap">
          <div>
            <h4 className="fw-bold mb-0">10K+</h4>
            <small className="text-muted">Students</small>
          </div>

          <div>
            <h4 className="fw-bold mb-0">95%</h4>
            <small className="text-muted">Success Rate</small>
          </div>

          <div>
            <h4 className="fw-bold mb-0">500+</h4>
            <small className="text-muted">Interview Questions</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
