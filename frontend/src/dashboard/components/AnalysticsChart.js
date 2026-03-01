import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AnalyticsChart() {
  const [data, setData] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/jobmatch/history/${userId}`)
      .then((res) => {
        const formatted = res.data.map((item) => ({
          score: item.matchScore,
          date: new Date(item.createdAt).toLocaleDateString(),
        }));

        setData(formatted);
      })
      .catch((err) => console.error(err));
  }, [userId]);

  return (
    <div className="card border-0 shadow-sm rounded-4 h-100">
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4">📈 Job Match Analytics</h5>

        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="date" />
              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#4f46e5"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-muted">No analytics data available yet.</p>
        )}
      </div>
    </div>
  );
}

export default AnalyticsChart;
