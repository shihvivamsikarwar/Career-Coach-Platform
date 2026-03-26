import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar-dark ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo - Text Only */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎯</span>
          <span className="logo-text">Career Coach AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu">
          <a href="#features" className="nav-link">Features</a>
          <a href="#how" className="nav-link">How It Works</a>
          <a href="#reviews" className="nav-link">Reviews</a>
          <a href="#stats" className="nav-link">Stats</a>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="btn-primary-nav">Get Started</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle">
          ☰
        </button>
      </div>
    </nav>
  );
}

export default PublicNavbar;
