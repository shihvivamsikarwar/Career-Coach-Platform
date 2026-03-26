import React from 'react';
import PageTransition from '../../../components/ui/PageTransition';

const features = [
  {
    icon: "🤖",
    title: "AI Resume Builder",
    desc: "Create perfect resumes with AI assistance that get you noticed by recruiters.",
    color: "#ec4899"
  },
  {
    icon: "🎯",
    title: "Smart Job Matching",
    desc: "Get matched with your dream job based on your skills and career goals.",
    color: "#8b5cf6"
  },
  {
    icon: "🎤",
    title: "Interview Simulator",
    desc: "Practice with AI that gives real-time feedback on your performance.",
    color: "#3b82f6"
  },
  {
    icon: "📊",
    title: "Career Analytics",
    desc: "Track your progress with detailed insights and personalized recommendations.",
    color: "#10b981"
  },
  {
    icon: "🚀",
    title: "Skill Assessment",
    desc: "Discover your strengths and get personalized learning paths to improve.",
    color: "#f59e0b"
  },
  {
    icon: "💬",
    title: "24/7 AI Coach",
    desc: "Get instant help with career advice, interview tips, and resume reviews.",
    color: "#ef4444"
  }
];

function Feature() {
  return (
    <PageTransition className="edu-platform-fast">
      <section id="features" className="features-section-dark">
        <div className="container-features">
          <div className="features-header">
            <div className="features-badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">Powerful Features</span>
            </div>
            <h2 className="features-title">
              <span className="title-line">Everything You Need</span>
              <span className="title-line accent">To Succeed</span>
            </h2>
            <p className="features-description">
              Our AI-powered platform provides all the tools you need to land your dream job
              and accelerate your career growth.
            </p>
          </div>
          
          <div className="features-grid-dark">
            {features.map((f, i) => (
              <div key={i} className="feature-card-dark" style={{ '--accent-color': f.color }}>
                <div className="feature-icon-wrapper">
                  <div className="feature-icon-bg" style={{ background: f.color }}></div>
                  <span className="feature-icon">{f.icon}</span>
                </div>
                <h3 className="feature-title-dark">{f.title}</h3>
                <p className="feature-desc-dark">{f.desc}</p>
                <div className="feature-cta">
                  <span className="cta-text">Learn More</span>
                  <span className="cta-arrow">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Feature;
