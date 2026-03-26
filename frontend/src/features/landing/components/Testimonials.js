import React from 'react';
import PageTransition from '../../../components/ui/PageTransition';

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer at Google",
    text: "This platform helped me crack my first job interview. The AI feedback was extremely useful and the mock interviews felt exactly like real ones!",
    avatar: "RS",
    rating: 5,
    company: "Google",
    color: "#ec4899"
  },
  {
    name: "Priya Verma",
    role: "Software Engineer at Microsoft",
    text: "Mock interviews felt very realistic. I improved my confidence and communication skills a lot. The resume analysis feature was a game-changer!",
    avatar: "PV",
    rating: 5,
    company: "Microsoft",
    color: "#8b5cf6"
  },
  {
    name: "Aman Singh",
    role: "Full Stack Developer at Amazon",
    text: "Resume analysis and job match features are amazing. The AI coach helped me identify my weak areas and improve them. Highly recommended!",
    avatar: "AS",
    rating: 5,
    company: "Amazon",
    color: "#3b82f6"
  },
  {
    name: "Neha Patel",
    role: "Data Scientist at Meta",
    text: "The career analytics and personalized guidance helped me land my dream job. The platform is worth every penny!",
    avatar: "NP",
    rating: 5,
    company: "Meta",
    color: "#10b981"
  },
  {
    name: "Karan Kumar",
    role: "DevOps Engineer at Netflix",
    text: "From struggling with interviews to landing multiple offers. This platform transformed my career journey completely!",
    avatar: "KK",
    rating: 5,
    company: "Netflix",
    color: "#f59e0b"
  },
  {
    name: "Ananya Reddy",
    role: "Product Manager at Apple",
    text: "The AI-powered interview preparation is unmatched. I gained so much confidence and landed my dream role!",
    avatar: "AR",
    rating: 5,
    company: "Apple",
    color: "#ef4444"
  }
];

function Testimonials() {
  return (
    <PageTransition className="edu-platform-fast">
      <section id="reviews" className="testimonials-section-dark">
        {/* Dynamic Background */}
        <div className="testimonials-bg">
          <div className="testimonials-gradient-1"></div>
          <div className="testimonials-gradient-2"></div>
          <div className="testimonials-pattern"></div>
        </div>

        <div className="testimonials-container">
          <div className="testimonials-header">
            <div className="testimonials-badge">
              <span className="badge-icon">⭐</span>
              <span className="badge-text">Success Stories</span>
            </div>
            
            <h2 className="testimonials-title">
              <span className="title-line">What Our Users</span>
              <span className="title-line accent">Are Saying</span>
            </h2>
            
            <p className="testimonials-subtitle">
              Real experiences from students and professionals who transformed their careers
              with our AI-powered platform.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="testimonial-card" style={{ '--accent-color': testimonial.color }}>
                <div className="testimonial-header">
                  <div className="testimonial-avatar" style={{ background: testimonial.color }}>
                    {testimonial.avatar}
                  </div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <div className="testimonial-company">{testimonial.company}</div>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="rating-star">⭐</span>
                    ))}
                  </div>
                </div>
                
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                </div>
                
                <div className="testimonial-footer">
                  <div className="testimonial-highlight">
                    <span className="highlight-icon">🚀</span>
                    <span className="highlight-text">Career Success</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="testimonials-stats">
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Success Stories</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.9/5</span>
              <span className="stat-label">Average Rating</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">98%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Testimonials;
