import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import { useParams } from "react-router-dom";
import API from "../utils/api";

function JobMatchReport() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await axios.get(`${API}/api/job/report/${id}`);

      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <div className="container py-5">
        <h2>🎯 Job Match Report</h2>

        {/* SCORE */}
        <div className="card p-4 mb-4 text-center">
          <h3>Match Score</h3>
          <h1 className="display-3">{data.matchScore}%</h1>
          <p>Hiring Probability: {data.selectionProbability}</p>
        </div>

        <div className="row g-4">
          {/* STRENGTHS */}
          <div className="col-md-6">
            <div className="card p-4 h-100">
              <h5>✅ Strengths</h5>
              <ul>
                {data.strengths?.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* MISSING */}
          <div className="col-md-6">
            <div className="card p-4 h-100">
              <h5>⚠ Missing Keywords</h5>
              {data.missingKeywords?.map((k, i) => (
                <span key={i} className="badge bg-danger me-2 mb-2">
                  {k}
                </span>
              ))}
            </div>
          </div>

          {/* IMPROVEMENTS */}
          <div className="col-md-12">
            <div className="card p-4">
              <h5>🚀 Improvement Tips</h5>
              <ul>
                {data.improvementTips?.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* SKILL GAP */}
        {data.skillGap?.length > 0 && (
          <div className="card p-4 mt-4">
            <h5>📊 Skill Gap</h5>
            <ul>
              {data.skillGap.map((s, i) => (
                <li key={i}>
                  {s.skill} — Required: {s.required}% | Your Level:{" "}
                  {s.yourLevel}%
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default JobMatchReport;
