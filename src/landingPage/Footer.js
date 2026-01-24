import React from "react";

function Footer() {
  return (
    <footer
      className="mt-5"
      style={{
        background: "linear-gradient(135deg, #f6f4ff, #e9e4ff)",
      }}
    >
      <div className="container py-4">
        <div className="row align-items-center">
          {/* Left: Project Info */}
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <h5 className="fw-bold mb-1">
              AI Interview & Career Coach Platform
            </h5>
            <p className="text-muted mb-0">
              An academic full-stack project to help students prepare for
              interviews and plan their careers.
            </p>
          </div>

          {/* Right: Credits */}
          <div className="col-md-6 text-center text-md-end">
            <p className="text-muted mb-0">© 2026 | B.Tech CSE Project</p>
            <p className="text-muted mb-0">Developed for Academic Purpose</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
