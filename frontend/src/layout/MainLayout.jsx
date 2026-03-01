import React from "react";
import { Link, useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-5 border-b">
          <h2 className="text-xl font-bold text-blue-600">🚀 Career Coach</h2>
        </div>

        <nav className="p-4 space-y-3">
          <Link className="block p-2 rounded hover:bg-blue-50" to="/dashboard">
            Dashboard
          </Link>

          <Link
            className="block p-2 rounded hover:bg-blue-50"
            to="/upload-resume"
          >
            Upload Resume
          </Link>

          <Link className="block p-2 rounded hover:bg-blue-50" to="/my-resumes">
            My Resumes
          </Link>

          <Link className="block p-2 rounded hover:bg-blue-50" to="/job-match">
            Job Match AI
          </Link>

          <Link
            className="block p-2 rounded hover:bg-blue-50"
            to="/job-match-history"
          >
            Job Match History
          </Link>

          <Link
            className="block p-2 rounded hover:bg-blue-50"
            to="/interview-selection"
          >
            Mock Interview
          </Link>

          <Link className="block p-2 rounded hover:bg-blue-50" to="/analytics">
            Analytics
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="bg-white shadow px-6 py-4 flex justify-between">
          <h1 className="font-semibold text-lg">AI Career Platform</h1>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Logout
          </button>
        </header>

        {/* CONTENT */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;
