import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function JobMatchResult() {
  const navigate = useNavigate();

  // Mock result data
  const resultData = {
    success: true,
    totalMatches: 15,
    highMatches: 3,
    mediumMatches: 8,
    lowMatches: 4,
    matches: [
      {
        id: 1,
        title: 'Senior Frontend Developer',
        company: 'Tech Innovations Inc',
        location: 'San Francisco, CA',
        salary: '$130,000 - $160,000',
        matchScore: 94,
        description: 'Lead a team of frontend developers building cutting-edge web applications.',
        requirements: ['React', 'TypeScript', 'Node.js', 'AWS'],
        benefits: ['Unlimited PTO', 'Health/Dental/Vision', '401k match', 'Remote options']
      },
      {
        id: 2,
        title: 'React Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        salary: '$100,000 - $130,000',
        matchScore: 88,
        description: 'Join our fast-growing startup and help us build the future of fintech.',
        requirements: ['React', 'JavaScript', 'CSS', 'Git'],
        benefits: ['Equity', 'Flexible hours', 'Home office stipend', 'Learning budget']
      },
      {
        id: 3,
        title: 'Full Stack Developer',
        company: 'Enterprise Solutions',
        location: 'New York, NY',
        salary: '$110,000 - $140,000',
        matchScore: 82,
        description: 'Develop and maintain enterprise-level applications for Fortune 500 clients.',
        requirements: ['React', 'Node.js', 'Python', 'Docker'],
        benefits: ['Comprehensive health plan', 'Retirement 401k', 'Bonuses', 'Career growth']
      }
    ]
  };

  const handleViewDetails = (matchId) => {
    navigate(`/job/report/${matchId}`);
  };

  const getMatchBadge = (score) => {
    if (score >= 90) return { color: 'success', text: 'Excellent Match' };
    if (score >= 80) return { color: 'info', text: 'Good Match' };
    if (score >= 70) return { color: 'warning', text: 'Fair Match' };
    return { color: 'secondary', text: 'Low Match' };
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Job Matching Results</h1>
          
          {/* Summary Stats */}
          <Card className="mb-4 border-0 shadow-sm">
            <Card.Body>
              <Row className="text-center">
                <Col md={3}>
                  <h3 className="text-primary">{resultData.totalMatches}</h3>
                  <p className="text-muted">Total Matches</p>
                </Col>
                <Col md={3}>
                  <h3 className="text-success">{resultData.highMatches}</h3>
                  <p className="text-muted">High Matches</p>
                </Col>
                <Col md={3}>
                  <h3 className="text-info">{resultData.mediumMatches}</h3>
                  <p className="text-muted">Medium Matches</p>
                </Col>
                <Col md={3}>
                  <h3 className="text-warning">{resultData.lowMatches}</h3>
                  <p className="text-muted">Low Matches</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Job Matches */}
          <h3 className="mb-3">🎯 Recommended Jobs</h3>
          <div className="job-results">
            {resultData.matches.map((match) => (
              <Card key={match.id} className="mb-3 border-0 shadow-sm job-card">
                <Card.Body>
                  <Row className="align-items-start">
                    <Col md={8}>
                      <div className="job-header mb-3">
                        <h4 className="card-title">{match.title}</h4>
                        <p className="text-muted h6">
                          {match.company} • {match.location}
                        </p>
                        <p className="lead text-primary">{match.salary}</p>
                      </div>
                      <p className="job-description">{match.description}</p>
                      
                      <div className="requirements mb-3">
                        <strong>Requirements:</strong>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                          {match.requirements.map((req, index) => (
                            <span key={index} className="badge bg-secondary">{req}</span>
                          ))}
                        </div>
                      </div>
                    </Col>
                    
                    <Col md={4}>
                      <div className="match-score-section text-center">
                        <div className="match-score-circle mb-2">
                          <span className={`score-text ${getMatchBadge(match.score).color}`}>
                            {match.matchScore}%
                          </span>
                        </div>
                        <span className={`badge bg-${getMatchBadge(match.score).color}`}>
                          {getMatchBadge(match.score).text}
                        </span>
                      </div>
                      
                      <Button 
                        variant="primary" 
                        className="w-100 mb-2"
                        onClick={() => handleViewDetails(match.id)}
                      >
                        View Details
                      </Button>
                      
                      <div className="benefits-preview">
                        <small className="text-muted">Benefits:</small>
                        <ul className="small">
                          {match.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index}>• {benefit}</li>
                          ))}
                          {match.benefits.length > 3 && <li>• +{match.benefits.length - 3} more</li>}
                        </ul>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-4">
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
        .job-card {
          transition: transform 0.2s ease-in-out;
        }
        
        .job-card:hover {
          transform: translateY(-3px);
        }
        
        .match-score-section {
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        .match-score-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 3px solid #e9ecef;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        
        .score-text {
          font-weight: bold;
          font-size: 0.875rem;
        }
        
        .job-description {
          color: #6c757d;
          line-height: 1.5;
        }
        
        .requirements {
          background: #f8f9fa;
          padding: 0.75rem;
          border-radius: 6px;
        }
        
        .benefits-preview {
          background: white;
          padding: 0.75rem;
          border-radius: 6px;
          border: 1px solid #e9ecef;
        }
      `}</style>
    </Container>
  );
}

export default JobMatchResult;
