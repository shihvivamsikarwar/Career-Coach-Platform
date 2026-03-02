import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 18px",
    borderRadius: "10px",
    marginBottom: "8px",
    textDecoration: "none",
    color: isActive ? "white" : "#cbd5e1",
    background: isActive
      ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
      : "transparent",
    fontWeight: "500",
  });

  return (
    <div
      style={{
        width: "240px",
        background: "#0f172a",
        color: "white",
        position: "fixed",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h4 className="mb-4">🧠 CareerAI</h4>

      <NavLink to="/dashboard" style={linkStyle}>
        📊 Dashboard
      </NavLink>

      <NavLink to="/my-resumes" style={linkStyle}>
        📄 My Resumes
      </NavLink>

      <NavLink to="/job-match" style={linkStyle}>
        🎯 Job Match
      </NavLink>

      <NavLink to="/interview-selection" style={linkStyle}>
        🎤 Interviews
      </NavLink>

      <NavLink to="/analytics" style={linkStyle}>
        📈 Analytics
      </NavLink>

      <NavLink to="/career-guidance" style={linkStyle}>
        🚀 Career Guidance
      </NavLink>
    </div>
  );
}

export default Sidebar;
