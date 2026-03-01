import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    text: "This platform helped me crack my first job interview. The AI feedback was extremely useful!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Priya Verma",
    role: "Software Engineer",
    text: "Mock interviews felt very realistic. I improved my confidence and communication skills a lot.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Aman Singh",
    role: "Full Stack Developer",
    text: "Resume analysis and job match features are amazing. Highly recommended for students!",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

function Testimonials() {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(180deg,#f8fafc 0%, #ffffff 100%)",
      }}
    >
      <Container>
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">What Our Users Say</h2>
          <p className="text-muted">
            Real experiences from students using our platform
          </p>
        </div>

        {/* Cards */}
        <Row className="g-4">
          {testimonials.map((item, i) => (
            <Col md={6} lg={4} key={i}>
              <Card
                className="border-0 shadow-sm h-100"
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
                  {/* Text */}
                  <p className="text-muted mb-4">“{item.text}”</p>

                  {/* User */}
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={item.avatar}
                      alt="user"
                      width="50"
                      height="50"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />

                    <div>
                      <h6 className="mb-0 fw-bold">{item.name}</h6>
                      <small className="text-muted">{item.role}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Testimonials;
