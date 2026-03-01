import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: "📊" },
    { name: "My Resumes", path: "/my-resumes", icon: "📄" },
    { name: "Job Match", path: "/job-match", icon: "🎯" },
    { name: "Interviews", path: "/interview-selection", icon: "🎤" },
    { name: "Analytics", path: "/analytics", icon: "📈" },
    { name: "Career Guidance", path: "/career-guidance", icon: "🚀" },
  ];

  return (
    <div className="sidebar">
      <div className="logo">🧠 CareerAI</div>

      <div className="menu">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`menu-item ${
              location.pathname === item.path ? "active" : ""
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
