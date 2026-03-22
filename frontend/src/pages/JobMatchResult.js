import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import API from "../utils/api";

function JobMatchResult() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchReport = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/job/report/${id}`);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const getColor = (score) => {
    if (score >= 75) return "success";
    if (score >= 50) return "warning";
    return "danger";
  };

  if (!data) return <p>Loading...</p>;

  return (
    <DashboardLayout>
      <div className="container py-5">
        <h2 className="mb-4">📊 Job Match Report</h2>

        {/* SCORE */}
        <div className="card p-4 text-center mb-4">
          <h5>Match Score</h5>

          <h1 className={`display-3 text-${getColor(data.matchScore)}`}>
            {data.matchScore}%
          </h1>

          <p>
            Probability: <b>{data.selectionProbability}</b>
          </p>

          <div className="progress mt-3">
            <div
              className={`progress-bar bg-${getColor(data.matchScore)}`}
              style={{ width: `${data.matchScore}%` }}
            ></div>
          </div>
        </div>

        {/* GRID */}
        <div className="row g-4">
          {/* STRENGTHS */}
          <div className="col-md-6">
            <div className="card p-4 h-100">
              <h5>✅ Strengths</h5>

              {data.strengths?.length > 0 ? (
                <ul>
                  {data.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              ) : (
                <p>No strengths</p>
              )}
            </div>
          </div>

          {/* MISSING */}
          <div className="col-md-6">
            <div className="card p-4 h-100">
              <h5>⚠ Missing Keywords</h5>

              {data.missingKeywords?.length > 0 ? (
                data.missingKeywords.map((k, i) => (
                  <span key={i} className="badge bg-danger me-2 mb-2">
                    {k}
                  </span>
                ))
              ) : (
                <p>No missing keywords 🎉</p>
              )}
            </div>
          </div>

          {/* IMPROVEMENTS */}
          <div className="col-md-12">
            <div className="card p-4">
              <h5>🚀 Improvement Tips</h5>

              {data.improvementTips?.length > 0 ? (
                <ul>
                  {data.improvementTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              ) : (
                <p>No tips</p>
              )}
            </div>
          </div>
        </div>

        {/* SKILL GAP */}
        {data.skillGap?.length > 0 && (
          <div className="card p-4 mt-4">
            <h5>📈 Skill Gap Analysis</h5>

            <div style={{ width: "100%", height: 350 }}>
              <ResponsiveContainer>
                <BarChart data={data.skillGap}>
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="required" fill="#6366f1" name="Required" />
                  <Bar dataKey="yourLevel" fill="#10b981" name="Your Level" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default JobMatchResult;
