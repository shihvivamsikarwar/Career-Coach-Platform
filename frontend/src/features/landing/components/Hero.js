import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../../../components/ui/PageTransition';

function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations when component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <PageTransition className="edu-platform-fast">
      <section id="home" className={`hero-section-hero ${isLoaded ? 'loaded' : ''}`}>
        {/* Dynamic Background */}
        <div className="hero-bg">
          <div className="bg-gradient-1"></div>
          <div className="bg-gradient-2"></div>
          <div className="bg-pattern"></div>
        </div>

        <div className="hero-container">
          {/* Left Content */}
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">⚡</span>
              <span className="badge-text">AI-Powered Career Revolution</span>
            </div>

            <h1 className="hero-title">
              <span className="title-line">Land Your Dream Job</span>
              <span className="title-line accent">With AI Superpowers</span>
            </h1>

            <p className="hero-description">
              Stop guessing. Start winning. Our AI coach analyzes your skills, 
              simulates real interviews, and builds perfect resumes that get you hired.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">50K+</span>
                <span className="stat-label">Students Placed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">98%</span>
                <span className="stat-label">Success Rate</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">4.9★</span>
                <span className="stat-label">User Rating</span>
              </div>
            </div>

            <div className="hero-actions">
              <Link to="/register" className="btn btn-primary-hero">
                <span className="btn-text">Start Free Trial</span>
                <span className="btn-arrow">→</span>
              </Link>
              <a href="#how" className="btn btn-secondary-hero">
                <span className="btn-text">Watch Demo</span>
                <span className="btn-play">▶</span>
              </a>
            </div>
          </div>

          {/* Right Visual */}
          <div className="hero-visual">
            <div className="visual-card">
              <img 
                src="/media/images/hero.png" 
                alt="Career Coach AI"
                className="hero-image"
                loading="eager"
              />
              <div className="visual-effects">
                <div className="effect-circle effect-1"></div>
                <div className="effect-circle effect-2"></div>
                <div className="effect-circle effect-3"></div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="float-element float-1">
              <span className="float-icon">🎯</span>
              <span className="float-text">Smart Matching</span>
            </div>
            <div className="float-element float-2">
              <span className="float-icon">🤖</span>
              <span className="float-text">AI Coach</span>
            </div>
            <div className="float-element float-3">
              <span className="float-icon">📈</span>
              <span className="float-text">Growth Track</span>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Hero;
