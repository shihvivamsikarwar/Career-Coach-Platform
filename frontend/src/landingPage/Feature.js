import React from "react";

const features = [
  {
    icon: "📄",
    title: "AI Resume Analysis",
    desc: "Upload your resume and receive intelligent insights and improvement suggestions.",
  },
  {
    icon: "🎤",
    title: "AI Mock Interviews",
    desc: "Practice interviews with automated scoring and feedback powered by AI.",
  },
  {
    icon: "📊",
    title: "Performance Analytics",
    desc: "Track progress, strengths, and weaknesses with advanced analytics.",
  },
  {
    icon: "🧭",
    title: "Career Guidance",
    desc: "Get personalized career recommendations and learning paths.",
  },
  {
    icon: "⚡",
    title: "Adaptive Difficulty",
    desc: "Smart interview system that adjusts based on performance.",
  },
  {
    icon: "🔒",
    title: "Real Interview Mode",
    desc: "Full-screen, timer-based environment to simulate real interviews.",
  },
];

function Feature() {
  return (
    <section id="features" className="section-padding bg-light">
      <div className="container">
        <h2 className="section-title text-center mb-5">
          Powerful Features for Your Success
        </h2>

        <div className="row g-4">
          {features.map((f, i) => (
            <div key={i} className="col-md-4">
              <div className="feature-card text-center h-100">
                <div className="feature-icon">{f.icon}</div>
                <h5 className="fw-bold mt-3">{f.title}</h5>
                <p className="text-muted">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feature;
