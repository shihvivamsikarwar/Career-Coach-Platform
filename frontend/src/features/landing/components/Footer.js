import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className="pt-5 pb-3"
      style={{
        background: "#0f172a",
        color: "#cbd5e1",
      }}
    >
      <Container>
        <Row className="gy-4">
          {/* Logo + About */}
          <Col md={4}>
            <h5 className="fw-bold text-white mb-3">🧠 AI Career Coach</h5>

            <p style={{ fontSize: "14px" }}>
              AI powered platform to help students crack interviews, analyze
              resumes, and get personalized career guidance.
            </p>
          </Col>

          {/* Platform Links */}
          <Col md={2}>
            <h6 className="text-white mb-3">Platform</h6>

            <div className="d-flex flex-column gap-2">
              <Link to="/" className="footer-link">
                Home
              </Link>
              <Link to="/login" className="footer-link">
                Login
              </Link>
              <Link to="/register" className="footer-link">
                Register
              </Link>
            </div>
          </Col>

          {/* Features */}
          <Col md={3}>
            <h6 className="text-white mb-3">Features</h6>

            <div className="d-flex flex-column gap-2">
              <span className="footer-link">Resume Analysis</span>
              <span className="footer-link">Mock Interviews</span>
              <span className="footer-link">Career Guidance</span>
              <span className="footer-link">Job Match AI</span>
            </div>
          </Col>

          {/* Contact */}
          <Col md={3}>
            <h6 className="text-white mb-3">Contact</h6>

            <p className="mb-1">📧 support@aicareercoach.com</p>
            <p className="mb-1">📍 India</p>
          </Col>
        </Row>

        {/* Divider */}
        <hr style={{ borderColor: "#334155", marginTop: "30px" }} />

        {/* Bottom */}
        <div className="text-center" style={{ fontSize: "14px" }}>
          © {new Date().getFullYear()} AI Career Coach Platform. All rights
          reserved.
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
