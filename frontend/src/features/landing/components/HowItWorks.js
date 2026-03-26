import React from 'react';
import PageTransition from '../../../components/ui/PageTransition';

const steps = [
  {
    number: "01",
    icon: "👤",
    title: "Create Account",
    desc: "Sign up and get instant access to your personalized AI career dashboard and interview tools.",
    color: "#ec4899"
  },
  {
    number: "02",
    icon: "📄",
    title: "Upload Resume",
    desc: "Upload your resume and let our AI analyze your skills, strengths, and areas for improvement.",
    color: "#8b5cf6"
  },
  {
    number: "03",
    icon: "🎤",
    title: "Practice Interviews",
    desc: "Experience AI-powered mock interviews with real-time evaluation and adaptive difficulty.",
    color: "#3b82f6"
  },
  {
    number: "04",
    icon: "📊",
    title: "Get Insights",
    desc: "Receive detailed feedback, career analytics, and personalized recommendations.",
    color: "#10b981"
  }
];

function HowItWorks() {
  return (
    <PageTransition className="edu-platform-fast">
      <section id="how" className="how-section-dark">
        {/* Dynamic Background */}
        <div className="how-bg">
          <div className="how-gradient-1"></div>
          <div className="how-gradient-2"></div>
          <div className="how-pattern"></div>
        </div>

        <div className="how-container">
          <div className="how-header">
            <div className="how-badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">Simple Process</span>
            </div>
            
            <h2 className="how-title">
              <span className="title-line">How It Works</span>
              <span className="title-line accent">4 Simple Steps</span>
            </h2>
            
            <p className="how-subtitle">
              Start your career transformation journey in just four simple steps
              and land your dream job with AI-powered guidance.
            </p>
          </div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <div key={i} className="step-card" style={{ '--accent-color': step.color }}>
                <div className="step-number" style={{ background: step.color }}>
                  {step.number}
                </div>
                <div className="step-icon">{step.icon}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                <div className="step-connector"></div>
              </div>
            ))}
          </div>

          <div className="how-cta">
            <p className="cta-text">Ready to start your journey?</p>
            <a href="#cta" className="btn btn-primary-how">
              <span className="btn-text">Get Started Now</span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default HowItWorks;
