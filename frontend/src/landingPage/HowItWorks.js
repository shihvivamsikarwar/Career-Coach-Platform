import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const steps = [
  {
    number: "01",
    title: "Create Account",
    desc: "Sign up and log in to access your personalized dashboard and interview preparation tools.",
  },
  {
    number: "02",
    title: "Upload Resume",
    desc: "Upload your resume to analyze your skills, strengths, and improvement areas using AI.",
  },
  {
    number: "03",
    title: "Practice Interviews",
    desc: "Attend AI-powered mock interviews with real-time evaluation and adaptive difficulty.",
  },
  {
    number: "04",
    title: "Get Insights & Guidance",
    desc: "Receive detailed feedback, analytics, and personalized career recommendations.",
  },
];

function HowItWorks() {
  return (
    <section className="py-5" style={{ background: "#ffffff" }}>
      <Container>
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">How It Works</h2>
          <p className="text-muted">
            Start your interview preparation journey in just a few steps
          </p>
        </div>

        {/* Steps */}
        <Row className="g-4">
          {steps.map((step, i) => (
            <Col md={6} lg={3} key={i}>
              <Card
                className="h-100 border-0 shadow-sm text-center"
                style={{
                  borderRadius: "20px",
                  transition: "0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0px)")
                }
              >
                <Card.Body className="p-4">
                  {/* Number Circle */}
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {step.number}
                  </div>

                  <h5 className="fw-bold">{step.title}</h5>

                  <p className="text-muted small">{step.desc}</p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default HowItWorks;
