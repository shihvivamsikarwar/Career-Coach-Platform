import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/layout/DashboardLayout";
import StatsCards from "../components/dashboard/StatsCards";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    avg: 0,
    level: "Beginner",
  });

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/interview/history/${userId}`)
      .then((res) => {
        const history = res.data.history || [];

        const total = history.length;
        const avg =
          total > 0
            ? Math.round(history.reduce((s, i) => s + i.score, 0) / total)
            : 0;

        let level = "Beginner";
        if (avg >= 85) level = "Expert";
        else if (avg >= 70) level = "Advanced";
        else if (avg >= 55) level = "Intermediate";

        setStats({ total, avg, level });
      });
  }, [userId]);

  return (
    <DashboardLayout>
      <h4 className="mb-4 fw-bold">Dashboard Overview</h4>

      <StatsCards stats={stats} />
    </DashboardLayout>
  );
}

export default Dashboard;
