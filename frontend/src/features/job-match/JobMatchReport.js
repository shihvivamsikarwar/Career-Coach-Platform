import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function JobMatchReport() {
  const navigate = useNavigate();

  // Mock report data
  const reportData = {
    jobTitle: 'Frontend Developer',
    company: 'Tech Corp',
    location: 'San Francisco, CA',
    matchScore: 92,
    salary: '$120,000 - $150,000',
    requirements: [
      '5+ years of React experience',
      'Strong JavaScript skills',
      'Experience with modern CSS frameworks',
      'Knowledge of testing frameworks'
    ],
    skillMatch: [
      { skill: 'React', level: 95, required: true },
      { skill: 'JavaScript', level: 90, required: true },
      { skill: 'TypeScript', level: 75, required: false },
      { skill: 'CSS/Sass', level: 88, required: true },
      { skill: 'Node.js', level: 70, required: false }
    ],
    benefits: ['Health insurance', '401k', 'Remote work options', 'Professional development'],
    applicationStatus: 'Ready to apply'
  };

  const downloadReport = () => {
    alert('Report download functionality would be implemented here');
  };

  const applyNow = () => {
    alert('Application functionality would be implemented here');
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Job Match Report</h1>
          
          {/* Job Header */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <Row className="align-items-center">
                <Col md={8}>
                  <h3>{reportData.jobTitle}</h3>
                  <p className="text-muted h5">
                    {reportData.company} • {reportData.location}
                  </p>
                  <p className="lead text-primary">{reportData.salary}</p>
                </Col>
                <Col md={4} className="text-end">
                  <div className="match-score-display">
                    <h2 className="text-primary">{reportData.matchScore}%</h2>
                    <p className="text-muted">Match Score</p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <Row>
            {/* Requirements */}
            <Col md={6}>
              <Card className="mb-4 border-0 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">📋 Requirements</h4>
                  <ul>
                    {reportData.requirements.map((req, index) => (
                      <li key={index} className="mb-2">{req}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            
            {/* Skill Match */}
            <Col md={6}>
              <Card className="mb-4 border-0 shadow-sm">
                <Card.Body>
                  <h4 className="mb-3">🎯 Skill Match Analysis</h4>
                  <div className="skill-match-list">
                    {reportData.skillMatch.map((skill, index) => (
                      <div key={index} className="skill-match-item mb-2">
                        <div className="d-flex justify-content-between align-items-center">
                          <span>{skill.skill}</span>
                          <span className={`badge ${skill.required ? 'bg-success' : 'bg-secondary'}`}>
                            {skill.level}%
                          </span>
                        </div>
                        <div className="progress" style={{ height: '6px' }}>
                          <div 
                            className={`progress-bar ${skill.level >= 80 ? 'bg-success' : skill.level >= 60 ? 'bg-warning' : 'bg-danger'}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Benefits */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <h4 className="mb-3">🎁 Benefits</h4>
              <Row>
                {reportData.benefits.map((benefit, index) => (
                  <Col key={index} md={3} className="mb-2">
                    <div className="benefit-item text-center">
                      <span className="benefit-icon">✓</span>
                      <span>{benefit}</span>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>

          {/* Action Buttons */}
          <div className="text-center">
            <Button 
              variant="primary" 
              className="me-3"
              onClick={downloadReport}
            >
              📥 Download Report
            </Button>
            <Button 
              variant="success"
              onClick={applyNow}
            >
              🚀 Apply Now
            </Button>
            <Button 
              variant="outline-primary"
              onClick={() => navigate('/job-match')}
            >
              ← Back to Matching
            </Button>
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .match-score-display {
          padding: 1.5rem;
          border-radius: 12px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          text-align: center;
        }
        
        .skill-match-item {
          padding: 0.75rem;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          background: #f8f9fa;
        }
        
        .progress {
          background-color: #e9ecef;
          border-radius: 3px;
          margin-top: 0.5rem;
        }
        
        .progress-bar {
          border-radius: 3px;
          transition: width 0.3s ease;
        }
        
        .benefit-item {
          padding: 0.5rem;
          background: #f8f9fa;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }
        
        .benefit-icon {
          color: #28a745;
          margin-right: 0.5rem;
          font-weight: bold;
        }
      `}</style>
    </Container>
  );
}

export default JobMatchReport;
