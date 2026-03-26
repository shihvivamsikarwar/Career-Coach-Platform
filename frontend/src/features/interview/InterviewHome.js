import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function InterviewHome() {
  const navigate = useNavigate();

  const interviewTypes = [
    {
      title: 'Technical Interview',
      description: 'Test your technical skills with coding and system design questions',
      icon: '💻',
      difficulty: 'Medium to Hard',
      duration: '45-60 minutes',
      path: '/mock-interview?type=technical'
    },
    {
      title: 'Behavioral Interview',
      description: 'Practice answering behavioral questions with AI feedback',
      icon: '🗣️',
      difficulty: 'Easy to Medium',
      duration: '30-45 minutes',
      path: '/mock-interview?type=behavioral'
    },
    {
      title: 'Situational Interview',
      description: 'Handle workplace scenarios and problem-solving situations',
      icon: '🤔',
      difficulty: 'Medium',
      duration: '30-40 minutes',
      path: '/mock-interview?type=situational'
    },
    {
      title: 'Mixed Interview',
      description: 'Comprehensive interview with all question types',
      icon: '🎯',
      difficulty: 'Medium to Hard',
      duration: '60-90 minutes',
      path: '/mock-interview?type=mixed'
    }
  ];

  const handleStartInterview = (interviewType) => {
    navigate(interviewType.path);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Interview Practice</h1>
          <p className="text-muted mb-4">
            Choose the type of interview you'd like to practice. Our AI will provide real-time feedback and personalized questions based on your performance.
          </p>
        </Col>
      </Row>

      <Row>
        {interviewTypes.map((interview, index) => (
          <Col key={index} md={6} lg={4} className="mb-4">
            <Card className="h-100 border-0 shadow-sm interview-card">
              <Card.Body className="text-center">
                <div className="interview-icon mb-3">
                  {interview.icon}
                </div>
                <h4 className="card-title mb-3">{interview.title}</h4>
                <p className="card-text text-muted mb-3">
                  {interview.description}
                </p>
                
                <div className="interview-details mb-3">
                  <div className="detail-item">
                    <span className="badge bg-primary">Difficulty: {interview.difficulty}</span>
                  </div>
                  <div className="detail-item">
                    <span className="badge bg-secondary">Duration: {interview.duration}</span>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  className="w-100"
                  onClick={() => handleStartInterview(interview)}
                >
                  Start Interview
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <Card className="border-0 shadow-sm bg-light">
            <Card.Body>
              <h4 className="mb-3">📊 Your Interview History</h4>
              <p className="text-muted mb-3">
                Track your progress and see how you've improved over time.
              </p>
              <Button 
                variant="outline-primary"
                onClick={() => navigate('/interview-history')}
              >
                View Interview History
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <style jsx>{`
        .interview-card {
          transition: transform 0.2s ease-in-out;
        }
        
        .interview-card:hover {
          transform: translateY(-5px);
        }
        
        .interview-icon {
          font-size: 3rem;
          line-height: 1;
        }
        
        .detail-item {
          margin: 0.25rem;
        }
        
        .badge {
          font-size: 0.75rem;
        }
      `}</style>
    </Container>
  );
}

export default InterviewHome;
