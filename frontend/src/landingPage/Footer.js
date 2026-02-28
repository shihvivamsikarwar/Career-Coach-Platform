import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e293b)",
        color: "#e2e8f0",
      }}
    >
      <div className="container py-5">
        <div className="row g-4">
          {/* Brand */}
          <div className="col-md-4">
            <h4 className="fw-bold mb-3">🧠 AI Career Coach</h4>
            <p style={{ color: "#cbd5f5" }}>
              An intelligent platform to help students prepare for interviews,
              analyze resumes, and receive personalized career guidance using
              AI.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6 className="fw-bold mb-3">Platform</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/login" className="footer-link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="footer-link">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Features</h6>
            <ul className="list-unstyled">
              <li className="footer-link">AI Mock Interviews</li>
              <li className="footer-link">Resume Analysis</li>
              <li className="footer-link">Performance Analytics</li>
              <li className="footer-link">Career Guidance</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Contact</h6>
            <p className="mb-1">📧 support@aicareercoach.com</p>
            <p className="mb-1">📍 India</p>

            <div className="d-flex gap-3 mt-2">
              <span>🔗</span>
              <span>🐦</span>
              <span>💼</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <hr style={{ borderColor: "#334155" }} />

        <div className="d-flex justify-content-between flex-column flex-md-row">
          <p className="mb-0" style={{ color: "#94a3b8" }}>
            © 2026 AI Interview & Career Coach Platform
          </p>

          <p className="mb-0" style={{ color: "#94a3b8" }}>
            Developed for Academic Purpose | B.Tech CSE Project
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
