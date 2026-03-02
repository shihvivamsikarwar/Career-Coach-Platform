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
    {
      title: "Software Development",
      image: softwareImg,
      path: "/interview/software",
    },
    {
      title: "Web Development",
      image: webImg,
      path: "/interview/web",
    },
    {
      title: "Data Science",
      image: datascienceImg,
      path: "/interview/data",
    },
    {
      title: "Machine Learning",
      image: mlImg,
      path: "/interview/ml",
    },
    {
      title: "Cyber Security",
      image: cyberImg,
      path: "/interview/cyber",
    },
    {
      title: "Cloud Computing",
      image: cloudImg,
      path: "/interview/cloud",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container py-5">
        <div className="row g-4">
          {domains.map((domain, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6"
              onClick={() => navigate(domain.path)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="premium-card"
                style={{
                  backgroundImage: `url(${domain.image})`,
                }}
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
