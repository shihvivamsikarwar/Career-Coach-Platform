import React from "react";

function Topbar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        height: "60px",
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <span style={{ marginRight: "15px", color: "#64748b" }}>👤 User</span>

      <button
        onClick={handleLogout}
        style={{
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          border: "none",
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Topbar;
