import React, { useState } from "react";
import { Link } from "react-router-dom";

function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed-top"
        style={{
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.85)",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
          zIndex: 1000,
        }}
      >
        <div className="container d-flex align-items-center justify-content-between py-3">
          {/* Logo */}
          <Link
            to="/"
            className="d-flex align-items-center gap-2 text-decoration-none"
          >
            <span style={{ fontSize: "26px" }}>🧠</span>
            <span
              className="fw-bold"
              style={{
                fontSize: "18px",
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI Career Coach
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="d-none d-md-flex align-items-center gap-4">
            <a href="#features" className="nav-link-custom">
              Features
            </a>
            <a href="#how" className="nav-link-custom">
              How It Works
            </a>
            <a href="#reviews" className="nav-link-custom">
              Reviews
            </a>

            <Link to="/login" className="nav-link-custom">
              Login
            </Link>

            <Link
              to="/register"
              className="btn px-4 py-2"
              style={{
                borderRadius: "30px",
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                color: "white",
                fontWeight: "600",
              }}
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="btn d-md-none"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              borderRadius: "10px",
              background: "#f3f4f6",
              width: "40px",
              height: "40px",
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="d-md-none"
          style={{
            position: "fixed",
            top: "70px",
            left: 0,
            width: "100%",
            background: "white",
            padding: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            zIndex: 999,
          }}
        >
          <div className="d-flex flex-column gap-3">
            <a href="#features" className="nav-link-custom">
              Features
            </a>
            <a href="#how" className="nav-link-custom">
              How It Works
            </a>
            <a href="#reviews" className="nav-link-custom">
              Reviews
            </a>

            <Link to="/login" className="nav-link-custom">
              Login
            </Link>

            <Link
              to="/register"
              className="btn mt-2"
              style={{
                borderRadius: "30px",
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                color: "white",
                fontWeight: "600",
              }}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default PublicNavbar;
