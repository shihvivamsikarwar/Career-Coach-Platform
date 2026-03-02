import React, { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../layout/DashboardLayout";
import StatsCards from "../dashboard/components/StatsCards";
import ResumeCenter from "../dashboard/components/ResumeCenter";
import JobMatchCard from "../dashboard/components/JobMatchCard";
import AnalyticsChart from "../dashboard/components/AnalyticsChart";
import WeakAreasChart from "../dashboard/components/WeakAreasChart";
import SkillRadarChart from "../dashboard/components/SkillRadarChart";
import RecentInterviews from "../dashboard/components/RecentInterviews";
import AIInsights from "../dashboard/components/AlInsights";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [userName, setUserName] = useState("User");
  const [aiData, setAiData] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/dashboard/${userId}`
      );
      setStats(res.data.stats);
      setUserName(res.data.user?.name || "User");

      const aiRes = await axios.get(
        `http://localhost:5000/api/dashboard/ai-recommendations/${userId}`
      );

      setAiData(aiRes.data);
      console.log("Dashboard Data:", res.data);
    } catch (err) {
      console.error("Dashboard fetch error", err);
    }
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">
        {/* Header */}
        <div className="mb-4">
          <h3>Dashboard Overview</h3>
          <p className="text-muted">👋 Welcome back, {userName}</p>
        </div>

        {/* Stats */}
        <StatsCards stats={stats} />

        {/* Resume + Job Match */}
        <div className="row">
          <div className="col-md-6">
            <ResumeCenter />
          </div>

          <div className="col-md-6">
            <JobMatchCard />
          </div>
        </div>

        {/* Analytics*/}
        <div className="row mt-4">
          <div className="col">
            <AnalyticsChart />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <SkillRadarChart />
          </div>
          <div className="col-md-6">
            <WeakAreasChart />
          </div>
        </div>
        <AIInsights data={aiData} />
        <RecentInterviews />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
