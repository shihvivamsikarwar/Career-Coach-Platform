import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/resumeAnalyzer.css";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

function ResumeAnalysis() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/resume/${id}`)
      .then((res) => setResume(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!resume) return <p className="text-center mt-5">Loading...</p>;

  // ✅ Correct field from backend
  const analysis = resume.aiAnalysis || resume.analysis || {};

  const score = Number(analysis.score || 0);
  const atsScore = Number(analysis.atsScore || 0);

  const skills = analysis.skills || [];
  const missingSkills = analysis.missingSkills || [];
  const suggestions = analysis.suggestions || [];
  const roles = analysis.recommendedRoles || [];
  const roadmap = analysis.roadmap || {};

  const skillsData =
    skills.map((skill) => ({
      skill,
      value: 80,
    })) || [];

  return (
    <div className="resume-bg py-5">
      <div className="container">
        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="fw-bold">📄 Resume Intelligence Report</h2>
          <p className="text-muted">
            AI-powered evaluation based on ATS and recruiter expectations
          </p>
        </div>

        {/* SCORE */}
        <div className="glass-card p-4 text-center mb-4">
          <h5 className="text-muted">Resume Score</h5>

          <h1 className="display-3 fw-bold text-primary">{score}%</h1>

          <h5 className="text-muted mt-3">ATS Compatibility</h5>

          <div className="progress mb-3" style={{ height: "12px" }}>
            <div
              className="progress-bar bg-info"
              style={{ width: `${atsScore}%` }}
            ></div>
          </div>

          <p className="fw-semibold text-info">ATS Score: {atsScore}%</p>
        </div>

        <div className="row g-4 mt-2">
          {/* IMPACT */}
          <div className="col-md-4">
            <div className="glass-card p-4 text-center h-100">
              <h6 className="text-muted">Impact</h6>
              <h3 className="fw-bold text-primary">
                {analysis.recruiterScore?.impact || 0}%
              </h3>

              <div className="progress mt-2">
                <div
                  className="progress-bar bg-primary"
                  style={{
                    width: `${analysis.recruiterScore?.impact || 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* CLARITY */}
          <div className="col-md-4">
            <div className="glass-card p-4 text-center h-100">
              <h6 className="text-muted">Clarity</h6>
              <h3 className="fw-bold text-success">
                {analysis.recruiterScore?.clarity || 0}%
              </h3>

              <div className="progress mt-2">
                <div
                  className="progress-bar bg-success"
                  style={{
                    width: `${analysis.recruiterScore?.clarity || 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="col-md-4">
            <div className="glass-card p-4 text-center h-100">
              <h6 className="text-muted">Experience Strength</h6>
              <h3 className="fw-bold text-warning">
                {analysis.recruiterScore?.experience || 0}%
              </h3>

              <div className="progress mt-2">
                <div
                  className="progress-bar bg-warning"
                  style={{
                    width: `${analysis.recruiterScore?.experience || 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-4 mt-4 mb-4">
          <h5 className="fw-bold mb-3">Resume Strength Meter</h5>

          <div className="mb-3">
            <small>Content Quality</small>
            <div className="progress">
              <div
                className="progress-bar bg-info"
                style={{ width: `${analysis.score || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-3">
            <small>ATS Compatibility</small>
            <div className="progress">
              <div
                className="progress-bar bg-success"
                style={{ width: `${analysis.atsScore || 0}%` }}
              ></div>
            </div>
          </div>

          <div className="mb-3">
            <small>Recruiter Impact</small>
            <div className="progress">
              <div
                className="progress-bar bg-primary"
                style={{ width: `${analysis.recruiterScore?.impact || 0}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="row g-4">
          {/* SKILLS */}
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <h5 className="section-title">✅ Detected Skills</h5>

              {skills.length === 0 ? (
                <p className="text-muted">No skills detected</p>
              ) : (
                skills.map((skill, i) => (
                  <span key={i} className="skill-badge">
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* MISSING */}
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <h5 className="section-title">⚠ Missing Skills</h5>

              {missingSkills.length === 0 ? (
                <p className="text-muted">No missing skills 🎉</p>
              ) : (
                missingSkills.map((skill, i) => (
                  <span key={i} className="missing-badge">
                    {skill}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* SUGGESTIONS */}
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <h5 className="section-title">💡 AI Suggestions</h5>

              <ul>
                {suggestions.map((s, i) => (
                  <li key={i} className="mb-2">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ROLES */}
          <div className="col-md-6">
            <div className="glass-card p-4 h-100">
              <h5 className="section-title">🚀 Recommended Roles</h5>

              {roles.map((role, i) => (
                <span key={i} className="role-badge">
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ROADMAP */}
        <div className="card shadow-sm border-0 rounded-4 p-4 mt-4">
          <h5 className="fw-bold mb-3">📈 Career Improvement Roadmap</h5>

          <h6>Beginner</h6>
          <ul>
            {roadmap.beginner?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h6>Intermediate</h6>
          <ul>
            {roadmap.intermediate?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <h6>Advanced</h6>
          <ul>
            {roadmap.advanced?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        {/* RADAR CHART */}
        <div className="card shadow-lg border-0 rounded-4 p-4 mb-4 mt-5">
          <h5 className="fw-bold mb-3">Skill Intelligence</h5>

          {skillsData.length === 0 ? (
            <p className="text-muted">No skills available</p>
          ) : (
            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <RadarChart data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis />
                  <Radar
                    name="Skills"
                    dataKey="value"
                    stroke="#4f46e5"
                    fill="#6366f1"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalysis;
