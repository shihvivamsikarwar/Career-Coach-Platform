import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function Stats() {
  const stats = [
    { number: "5K+", label: "Students Practicing" },
    { number: "12K+", label: "Mock Interviews Taken" },
    { number: "92%", label: "Success Improvement" },
    { number: "50+", label: "Career Domains" },
  ];

  return (
    <section style={{ marginTop: "-60px", position: "relative", zIndex: 10 }}>
      <Container>
        <Row className="g-4 justify-content-center">
          {stats.map((stat, index) => (
            <Col key={index} xs={6} md={3}>
              <Card
                className="text-center border-0 shadow-sm h-100"
                style={{
                  borderRadius: "16px",
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.8)",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0px)")
                }
              >
                <Card.Body className="py-4">
                  <h3
                    style={{
                      fontWeight: "700",
                      background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.number}
                  </h3>

                  <p className="text-muted mb-0">{stat.label}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Stats;
