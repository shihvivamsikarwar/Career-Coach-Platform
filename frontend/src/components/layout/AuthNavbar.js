import React from "react";

function AuthNavbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="topbar">
      <div className="topbar-right">
        <span className="user">👤 User</span>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default AuthNavbar;
