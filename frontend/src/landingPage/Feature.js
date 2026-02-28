import React from "react";

function Features() {
  const features = [
    {
      icon: "📄",
      title: "AI Resume Analysis",
      desc: "Upload your resume and receive intelligent insights, skill gap detection, and personalized improvement suggestions.",
    },
    {
      icon: "🎤",
      title: "AI Mock Interviews",
      desc: "Practice real interview questions with automated evaluation, scoring, and detailed feedback powered by AI.",
    },
    {
      icon: "📊",
      title: "Performance Analytics",
      desc: "Track your interview progress, strengths, and weak areas with advanced analytics and improvement reports.",
    },
    {
      icon: "🧭",
      title: "Career Guidance",
      desc: "Get personalized career recommendations, learning paths, and domain suggestions based on your skills.",
    },
    {
      icon: "⚡",
      title: "Adaptive Difficulty",
      desc: "Smart interview system that adjusts question difficulty based on your performance and learning pace.",
    },
    {
      icon: "🔒",
      title: "Real Interview Environment",
      desc: "Full-screen mode, timer-based questions, and anti-cheating detection to simulate real interview conditions.",
    },
  ];

  return (
    <section
      className="py-5"
      style={{
        background: "#f8fafc",
      }}
    >
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">Powerful Features for Your Success</h2>
          <p className="text-muted fs-5">
            Everything you need to prepare, improve, and succeed in interviews.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {features.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div
                className="card h-100 border-0 shadow-sm"
                style={{
                  borderRadius: "18px",
                  transition: "0.3s",
                }}
              >
                <div className="card-body p-4 text-center">
                  <div
                    className="mb-3"
                    style={{
                      fontSize: "40px",
                    }}
                  >
                    {item.icon}
                  </div>

                  <h5 className="fw-bold mb-2">{item.title}</h5>

                  <p className="text-muted">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
