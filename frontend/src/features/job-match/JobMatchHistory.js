import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function JobMatchHistory() {
  const navigate = useNavigate();
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    // Mock data - in real app, this would come from API
    const mockMatches = [
      {
        id: 1,
        title: 'Frontend Developer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        matchScore: 92,
        postedDate: '2024-03-15',
        status: 'applied'
      },
      {
        id: 2,
        title: 'React Developer',
        company: 'StartupXYZ',
        location: 'Remote',
        matchScore: 88,
        postedDate: '2024-03-14',
        status: 'viewed'
      },
      {
        id: 3,
        title: 'Full Stack Developer',
        company: 'Innovation Labs',
        location: 'New York, NY',
        matchScore: 85,
        postedDate: '2024-03-13',
        status: 'new'
      }
    ];
    setMatches(mockMatches);
  }, []);

  const handleViewMatch = (matchId) => {
    navigate(`/job/result/${matchId}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      new: { color: 'success', text: 'New' },
      viewed: { color: 'info', text: 'Viewed' },
      applied: { color: 'warning', text: 'Applied' }
    };
    return statusConfig[status] || { color: 'secondary', text: status };
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Job Match History</h2>
          <p className="text-muted mb-4">
            Track your job matches and application status.
          </p>
          
          {matches.length === 0 ? (
            <Card className="text-center p-4">
              <p className="text-muted">No job matches found yet.</p>
              <Button 
                variant="primary"
                onClick={() => navigate('/job-match')}
              >
                Find Job Matches
              </Button>
            </Card>
          ) : (
            <div className="job-matches-list">
              {matches.map((match) => (
                <Card key={match.id} className="mb-3 border-0 shadow-sm">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={8}>
                        <h5 className="card-title">{match.title}</h5>
                        <p className="text-muted mb-2">
                          <strong>{match.company}</strong> • {match.location}
                        </p>
                        <small className="text-muted">
                          Posted: {match.postedDate}
                        </small>
                      </Col>
                      <Col md={4} className="text-end">
                        <div className="match-score">
                          <div className="display-6 text-primary mb-2">
                            {match.matchScore}%
                          </div>
                          <small className="text-muted">Match Score</small>
                        </div>
                        <div className="mt-2">
                          <span className={`badge bg-${getStatusBadge(match.status).color}`}>
                            {getStatusBadge(match.status).text}
                          </span>
                        </div>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => handleViewMatch(match.id)}
                          className="mt-2"
                        >
                          View Details
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default JobMatchHistory;
