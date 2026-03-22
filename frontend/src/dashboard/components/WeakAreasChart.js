import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import API from "../../utils/api";

function WeakAreasChart() {
  const [data, setData] = useState([]);
  const userId = localStorage.getItem("userId");

  const fetchWeakAreas = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/api/interview/weak-areas/${userId}`);

      setData(res.data.weakAreas || []);
    } catch (err) {
      console.error("Weak area fetch error", err);
    }
  }, [userId]);

  useEffect(() => {
    fetchWeakAreas();
  }, [fetchWeakAreas]);

  return (
    <div className="card shadow-sm border-0 p-4 h-100">
      <h5 className="mb-3">Weak Areas Analysis</h5>

      {data.length === 0 ? (
        <div className="text-center text-muted py-5">
          🎯 No weak areas detected yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="concept" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default WeakAreasChart;
