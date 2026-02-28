import React from "react";

function HowItWorks() {
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

  return (
    <section
      className="py-5"
      style={{
        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
      }}
    >
      <div className="container">
        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold mb-3">How It Works</h2>
          <p className="text-muted fs-5">
            Start your interview preparation journey in just a few steps
          </p>
        </div>

        {/* Steps */}
        <div className="row g-4">
          {steps.map((step, index) => (
            <div className="col-md-3" key={index}>
              <div
                className="card border-0 shadow-sm h-100"
                style={{
                  borderRadius: "18px",
                  transition: "0.3s",
                }}
              >
                <div className="card-body p-4 text-center">
                  {/* Number Circle */}
                  <div
                    className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      background: "#6366f1",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                  >
                    {step.number}
                  </div>

                  <h5 className="fw-bold">{step.title}</h5>

                  <p className="text-muted">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
