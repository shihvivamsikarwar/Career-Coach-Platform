import React from 'react';
import PageTransition from '../../../components/ui/PageTransition';

function Stats() {
  const stats = [
    { 
      number: "50K+", 
      label: "Students Placed",
      icon: "🎓",
      color: "#ec4899",
      description: "Successfully launched their careers"
    },
    { 
      number: "98%", 
      label: "Success Rate",
      icon: "📈",
      color: "#8b5cf6",
      description: "Of students land their dream jobs"
    },
    { 
      number: "4.9★", 
      label: "User Rating",
      icon: "⭐",
      color: "#3b82f6",
      description: "Based on 10,000+ reviews"
    },
    { 
      number: "500+", 
      label: "Interview Questions",
      icon: "🎤",
      color: "#10b981",
      description: "Across different domains"
    },
    { 
      number: "24/7", 
      label: "AI Support",
      icon: "🤖",
      color: "#f59e0b",
      description: "Always available to help you"
    },
    { 
      number: "100+", 
      label: "Career Paths",
      icon: "🚀",
      color: "#ef4444",
      description: "Personalized guidance available"
    }
  ];

  return (
    <PageTransition className="edu-platform-fast">
      <section className="stats-section-dark">
        {/* Dynamic Background */}
        <div className="stats-bg">
          <div className="stats-gradient-1"></div>
          <div className="stats-gradient-2"></div>
          <div className="stats-pattern"></div>
        </div>

        <div className="stats-container">
          <div className="stats-header">
            <div className="stats-badge">
              <span className="badge-icon">📊</span>
              <span className="badge-text">Platform Impact</span>
            </div>
            
            <h2 className="stats-title">
              <span className="title-line">Numbers That</span>
              <span className="title-line accent">Speak Volumes</span>
            </h2>
            
            <p className="stats-subtitle">
              Our platform has helped thousands of students and professionals
              transform their careers with AI-powered guidance.
            </p>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card" style={{ '--accent-color': stat.color }}>
                <div className="stat-icon-wrapper">
                  <div className="stat-icon-bg" style={{ background: stat.color }}></div>
                  <span className="stat-icon">{stat.icon}</span>
                </div>
                
                <div className="stat-content">
                  <h3 className="stat-number" style={{ color: stat.color }}>
                    {stat.number}
                  </h3>
                  <h4 className="stat-label">{stat.label}</h4>
                  <p className="stat-description">{stat.description}</p>
                </div>
                
                <div className="stat-progress">
                  <div className="progress-bar" style={{ background: stat.color }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="stats-footer">
            <div className="footer-highlight">
              <span className="highlight-icon">🎯</span>
              <span className="highlight-text">Join the Success Story</span>
            </div>
            <p className="footer-text">
              Be part of the growing community of professionals who transformed their careers with our AI platform.
            </p>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Stats;
