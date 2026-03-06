import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import "../styles/interview.css";

import softwareImg from "../images/Software.png";
import webImg from "../images/web.png";
import datascienceImg from "../images/datascience.png";
import mlImg from "../images/ml.png";
import cyberImg from "../images/cyber.png";
import cloudImg from "../images/cloud.png";

function InterviewHome() {
  const navigate = useNavigate();

  const domains = [
    { title: "Software Development", key: "software", image: softwareImg },
    { title: "Web Development", key: "web", image: webImg },
    { title: "Data Science", key: "data-science", image: datascienceImg },
    { title: "Machine Learning", key: "machine-learning", image: mlImg },
    { title: "Cyber Security", key: "cyber-security", image: cyberImg },
    { title: "Cloud Computing", key: "cloud", image: cloudImg },
  ];

  const startInterview = (domain) => {
    navigate("/mock-interview", {
      state: { domain },
    });
  };

  return (
    <DashboardLayout>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">AI Mock Interview</h2>
          <p className="text-muted">
            Practice interviews with an adaptive AI interviewer
          </p>
        </div>

        <div className="row g-4">
          {domains.map((domain, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div
                className="premium-card"
                style={{ backgroundImage: `url(${domain.image})` }}
                onClick={() => startInterview(domain.key)}
              >
                <div className="premium-overlay">
                  <h3>{domain.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InterviewHome;
