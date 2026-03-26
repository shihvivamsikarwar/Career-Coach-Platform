import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Resumes Uploaded', value: '5', icon: '📄', color: 'primary' },
    { title: 'Interviews Completed', value: '12', icon: '🎤', color: 'success' },
    { title: 'Average Score', value: '85%', icon: '📊', color: 'info' },
    { title: 'Job Matches', value: '8', icon: '💼', color: 'warning' },
  ];

  const quickActions = [
    { title: 'Upload Resume', description: 'Analyze your resume with AI', path: '/upload-resume', icon: '📄' },
    { title: 'Practice Interview', description: 'Mock interviews with AI feedback', path: '/interview-selection', icon: '🎤' },
    { title: 'Job Matching', description: 'Find jobs matching your profile', path: '/job-match', icon: '💼' },
    { title: 'Career Guidance', description: 'Get personalized career advice', path: '/career-guidance', icon: '🧭' },
  ];

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Dashboard</h1>
          <p className="text-muted mb-4">
            Welcome back! Here's an overview of your career progress.
          </p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        {stats.map((stat, index) => (
          <Col key={index} md={6} lg={3} className="mb-3">
            <Card className={`text-center border-0 shadow-sm bg-${stat.color} bg-opacity-10`}>
              <Card.Body>
                <div className="display-4 mb-2">{stat.icon}</div>
                <h5 className={`text-${stat.color}`}>{stat.title}</h5>
                <h3 className={`fw-bold text-${stat.color}`}>{stat.value}</h3>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Quick Actions */}
      <Row>
        <Col>
          <h3 className="mb-4">Quick Actions</h3>
          <Row>
            {quickActions.map((action, index) => (
              <Col key={index} md={6} lg={3} className="mb-3">
                <Card 
                  className="h-100 border-0 shadow-sm cursor-pointer"
                  onClick={() => navigate(action.path)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="text-center">
                    <div className="display-4 mb-3">{action.icon}</div>
                    <h5 className="card-title">{action.title}</h5>
                    <p className="card-text text-muted small">{action.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row className="mt-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h4 className="card-title">Recent Activity</h4>
              <div className="mt-3">
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">📄</div>
                  <div>
                    <strong>Resume uploaded</strong>
                    <div className="text-muted small">2 hours ago</div>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">🎤</div>
                  <div>
                    <strong>Interview completed</strong>
                    <div className="text-muted small">1 day ago</div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-3">📊</div>
                  <div>
                    <strong>Job match found</strong>
                    <div className="text-muted small">2 days ago</div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
