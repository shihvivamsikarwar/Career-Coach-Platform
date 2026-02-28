import React from "react";
import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <nav
      className="navbar navbar-expand-lg py-3 fixed-top"
      style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.7)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        zIndex: 1000,
      }}
    >
      <div className="container">
        {/* Logo */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          to="/"
          style={{ fontSize: "18px" }}
        >
          <span style={{ fontSize: "24px" }}>🧠</span>
          <span className="text-dark">AI Career Coach</span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Right Side */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarContent"
        >
          <div className="d-flex gap-3 align-items-center">
            <Link
              to="/login"
              className="btn px-4 py-2"
              style={{
                borderRadius: "30px",
                background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                color: "white",
                fontWeight: "600",
                boxShadow: "0px 4px 15px rgba(99,102,241,0.3)",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
