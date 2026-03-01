import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="section-padding section-soft section-glow hero-section position-relative overflow-hidden">
      {/* Glow Background */}
      <div className="hero-glow"></div>

      <div
        className="container text-center position-relative"
        style={{ zIndex: 2 }}
      >
        {/* Badge */}
        <div className="badge-pill mb-4">🚀 AI Powered Interview Platform</div>

        {/* Heading */}
        <h1 className="hero-title fw-bold mb-4">
          Crack Interviews Faster with{" "}
          <span className="gradient-text">AI Career Coach</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mx-auto mb-5">
          Practice real interview questions, analyze your resume, and receive
          personalized career guidance powered by AI.
        </p>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
          <Link to="/register" className="btn hero-btn-primary">
            Get Started Free
          </Link>

          <Link to="/login" className="btn hero-btn-outline">
            Login
          </Link>
        </div>

        {/* Stats */}
        <div className="row justify-content-center g-4 mt-4">
          <Stat number="10K+" label="Students" />
          <Stat number="95%" label="Success Rate" />
          <Stat number="500+" label="Interview Questions" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div className="col-4 col-md-2 text-center">
      <h4 className="fw-bold mb-1">{number}</h4>
      <p className="text-muted small">{label}</p>
    </div>
  );
}

export default Hero;
