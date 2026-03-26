import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../constants";

function JobMatchAnalytics() {
  const [data, setData] = useState(null);

  const userId = localStorage.getItem("userId");

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/job/analytics/${userId}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [userId]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (!data)
    return (
      <div className="container py-5">
        <p className="text-center mt-5">Loading...</p>
      </div>
    );

  return (
    <div className="container py-5">
      <h2 className="mb-4">📈 Job Match Analytics</h2>
      <div className="card p-4 shadow-sm">
        <h4>Total Matches: {data.totalMatches}</h4>
        <h4>Average Score: {data.avgScore}%</h4>
      </div>
    </div>
  );
}

export default JobMatchAnalytics;
