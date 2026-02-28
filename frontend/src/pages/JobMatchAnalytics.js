import React, { useEffect, useState } from "react";
import axios from "axios";

function JobMatchAnalytics() {
  const [data, setData] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/job/analytics/${userId}`
      );

      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container py-5">
      <h2>Job Match Analytics</h2>

      <div className="card p-4">
        <h4>Total Matches: {data.totalMatches}</h4>
        <h4>Average Score: {data.avgScore}%</h4>
      </div>
    </div>
  );
}

export default JobMatchAnalytics;
