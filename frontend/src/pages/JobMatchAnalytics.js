import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import API from "../utils/api";

function JobMatchAnalytics() {
  const [data, setData] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(`${API}/api/job/analytics/${userId}`);

      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data)
    return (
      <DashboardLayout>
        <p className="text-center mt-5">Loading...</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="container py-5">
        <h2 className="mb-4">📈 Job Match Analytics</h2>

        <div className="card p-4 shadow-sm">
          <h4>Total Matches: {data.totalMatches}</h4>
          <h4>Average Score: {data.avgScore}%</h4>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default JobMatchAnalytics;
