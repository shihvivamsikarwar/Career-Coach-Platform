import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function CareerGuidance() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Career Guidance</h2>
          <Card className="p-4">
            <h4>AI-Powered Career Recommendations</h4>
            <p className="text-muted">
              Get personalized career guidance based on your skills, experience, and goals.
            </p>
            <div className="mt-4">
              <h5>Features:</h5>
              <ul>
                <li>Skill gap analysis</li>
                <li>Career path recommendations</li>
                <li>Learning resources</li>
                <li>Market insights</li>
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CareerGuidance;
