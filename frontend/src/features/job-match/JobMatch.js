import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function JobMatch() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleJobMatch = () => {
    setLoading(true);
    // Mock job matching logic
    setTimeout(() => {
      setLoading(false);
      navigate('/job/result/123');
    }, 2000);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Job Matching</h2>
          <p className="text-muted mb-4">
            Find jobs that match your skills and experience using our AI-powered matching algorithm.
          </p>
          
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <div className="job-match-icon mb-3">
                🎯
              </div>
              <h4 className="mb-3">AI-Powered Job Matching</h4>
              <p className="text-muted mb-4">
                Our system analyzes your resume and matches you with the best job opportunities based on your skills, experience, and preferences.
              </p>
              
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleJobMatch}
                disabled={loading}
                className="px-5"
              >
                {loading ? 'Finding Matches...' : 'Find Job Matches'}
              </Button>
              
              <div className="mt-3">
                <small className="text-muted">
                  We'll analyze your profile against thousands of job postings to find the perfect match.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default JobMatch;
