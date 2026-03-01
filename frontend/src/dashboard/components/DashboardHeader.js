import React from "react";

function DashboardHeader() {
  const name = localStorage.getItem("userName") || "User";

  return (
    <div className="mb-4">
      <h4 className="fw-bold">👋 Welcome back, {name}</h4>

      <p className="text-muted mb-0">
        Here’s your interview preparation progress.
      </p>
    </div>
  );
}

export default DashboardHeader;
