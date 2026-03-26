import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../../../components/ui/PageTransition';

function CTA() {
  return (
    <PageTransition className="edu-platform-fast">
      <section className="cta-section-dark">
        {/* Dynamic Background */}
        <div className="cta-bg">
          <div className="cta-gradient-1"></div>
          <div className="cta-gradient-2"></div>
          <div className="cta-pattern"></div>
        </div>

        <div className="cta-container">
          <div className="cta-header">
            <div className="cta-badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">Ready to Transform?</span>
            </div>
            
            <h2 className="cta-title">
              <span className="title-line">Start Your Journey</span>
              <span className="title-line accent">Today</span>
            </h2>
            
            <p className="cta-subtitle">
              Join thousands of students and job seekers who are already using AI-powered career coaching
              to land their dream jobs and ace their interviews.
            </p>
          </div>

          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary-cta">
              <span className="btn-text">Start Free Trial</span>
              <span className="btn-arrow">→</span>
            </Link>
            <Link to="/login" className="btn btn-secondary-cta">
              <span className="btn-text">Sign In</span>
              <span className="btn-icon">👤</span>
            </Link>
          </div>

          <div className="trust-indicators">
            <div className="trust-item">
              <span className="trust-icon">🔒</span>
              <span className="trust-text">Secure & Private</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">⚡</span>
              <span className="trust-text">Instant Results</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🎯</span>
              <span className="trust-text">AI-Powered</span>
            </div>
            <div className="trust-item">
              <span className="trust-icon">🌟</span>
              <span className="trust-text">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default CTA;
