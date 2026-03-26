import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { API_BASE_URL } from "../../../constants";

function AnalyticsChart() {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchHistory = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/interview/history/${userId}`);

      const history = res.data.history || [];

      const formatted = history.map((item, index) => ({
        attempt: index + 1,
        score: item.score,
        date: new Date(item.createdAt).toLocaleDateString(),
      }));

      setData(formatted);
    } catch (error) {
      console.error("Analytics fetch error:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="card shadow-sm border-0 p-4 h-100">
      <h5 className="mb-3">Performance Analytics</h5>

      {data.length === 0 ? (
        <div className="text-center text-muted py-5">
          📊 No analytics data available yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="score" strokeWidth={3} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="attempt" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default AnalyticsChart;
