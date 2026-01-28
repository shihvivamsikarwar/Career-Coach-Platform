import React from "react";
import { Link } from "react-router-dom";

function PublicNavbar() {
  return (
    <nav
      className="navbar navbar-expand-lg py-3"
      style={{
        background: "transparent",
      }}
    >
      <div className="container">
        <a
          className="navbar-brand fw-bold d-flex align-items-center gap-2"
          href="/"
        >
          <span style={{ fontSize: "22px" }}>🧠</span>
          <span>AI Interview & Career Coach Platform</span>
        </a>

        <div>
          <Link to="/login" className="btn btn-primary rounded-pill px-4">
            Log In
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default PublicNavbar;
