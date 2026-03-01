import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
        color: "white",
      }}
    >
      <Container className="text-center py-4">
        {/* Heading */}
        <h2 className="fw-bold mb-3">Ready to Crack Your Dream Job?</h2>

        <p
          className="mb-4"
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            opacity: 0.9,
          }}
        >
          Join thousands of students improving their careers with AI powered
          resume analysis and mock interviews.
        </p>

        {/* Button */}
        <Link to="/register">
          <Button
            size="lg"
            className="px-5 py-3 fw-semibold"
            style={{
              borderRadius: "40px",
              background: "white",
              color: "#6366F1",
              border: "none",
              boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            Get Started Free
          </Button>
        </Link>
      </Container>
    </section>
  );
}

export default CTA;
