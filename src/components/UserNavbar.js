import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserNavbar({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm py-3">
      <div className="container">
        <span className="navbar-brand fw-bold">🧠 AI Career Coach</span>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="userNavbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse justify-content-end${
            isNavCollapsed ? "" : " show"
          }`}
          id="userNavbarNav"
        >
          <div className="d-flex gap-3">
            <Link to="/dashboard" className="btn btn-outline-primary">
              Dashboard
            </Link>
            <Link to="/upload-resume" className="btn btn-outline-secondary">
              Resume
            </Link>
            <Link to="/career-guidance" className="btn btn-outline-success">
              Career
            </Link>
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default UserNavbar;
