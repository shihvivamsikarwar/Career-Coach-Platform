import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function PerformanceAnalytics() {
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="mb-4">Performance Analytics</h2>
          <p className="text-muted mb-4">
            Track your interview performance and identify improvement areas.
          </p>
          
          <Card className="border-0 shadow-sm">
            <Card.Body className="text-center p-4">
              <h4 className="mb-3">📊 Performance Overview</h4>
              <p className="text-muted">
                Your performance analytics will appear here once you complete more interviews.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PerformanceAnalytics;
