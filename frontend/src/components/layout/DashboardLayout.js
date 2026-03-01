import React from "react";
import Sidebar from "./Sidebar";
import AuthNavbar from "./AuthNavbar";
import "../../styles/dashboard.css";

function DashboardLayout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="main-content">
        <AuthNavbar />

        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}

export default DashboardLayout;
