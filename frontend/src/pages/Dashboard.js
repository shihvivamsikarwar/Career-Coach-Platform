import React, { useEffect, useState } from "react";

import DashboardLayout from "../layout/DashboardLayout";
import StatsCards from "../dashboard/components/StatsCards";
import ResumeCenter from "../dashboard/components/ResumeCenter";
import JobMatchCard from "../dashboard/components/JobMatchCard";
import AnalyticsChart from "../dashboard/components/AnalyticsChart";
import WeakAreasChart from "../dashboard/components/WeakAreasChart";
import SkillRadarChart from "../dashboard/components/SkillRadarChart";
import RecentInterviews from "../dashboard/components/RecentInterviews";
import AIInsights from "../dashboard/components/AlInsights";
import { api, retryRequest } from "../utils/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [userName, setUserName] = useState("User");
  const [aiData, setAiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchDashboardData();
    } else {
      setError("User ID not found. Please login again.");
      setIsLoading(false);
    }
  }, [userId]);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch dashboard stats with retry logic
      const statsResponse = await retryRequest(
        () => api.get(`/api/dashboard/${userId}`),
        3,
        1000
      );
      
      setStats(statsResponse.data.stats);
      setUserName(statsResponse.data.user?.name || "User");

      // Fetch AI recommendations with retry logic
      const aiResponse = await retryRequest(
        () => api.get(`/api/dashboard/ai-recommendations/${userId}`),
        2,
        1000
      );

      setAiData(aiResponse.data);
      console.log("Dashboard Data:", statsResponse.data);
      
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      
      // Handle different error types
      if (err.response) {
        const { status, data } = err.response;
        
        if (status === 401) {
          setError("Session expired. Please login again.");
          // Clear auth data and redirect to login
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          window.location.href = "/login";
        } else if (status === 404) {
          setError("Dashboard data not found. Please complete your profile.");
        } else if (status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(data.error || "Failed to load dashboard data.");
        }
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Failed to load dashboard. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchDashboardData();
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">
        {/* Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3>Dashboard Overview</h3>
              <p className="text-muted">👋 Welcome back, {userName}</p>
            </div>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted">Loading dashboard data...</p>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="alert alert-danger" role="alert">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="alert-heading">⚠️ Error Loading Dashboard</h5>
                <p className="mb-0">{error}</p>
              </div>
              <button 
                className="btn btn-outline-danger btn-sm"
                onClick={handleRetry}
                disabled={retryCount >= 3}
              >
                {retryCount >= 3 ? 'Max Retries Reached' : 'Retry'}
              </button>
            </div>
            {retryCount > 0 && (
              <small className="text-muted d-block mt-2">
                Retry attempts: {retryCount}/3
              </small>
            )}
          </div>
        )}

        {/* Dashboard Content */}
        {!isLoading && !error && (
          <>
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
          </>
        )}

        {/* Empty State */}
        {!isLoading && !error && (!stats || stats.total === 0) && (
          <div className="text-center py-5">
            <div className="mb-4">
              <h4>📊 Welcome to Your Dashboard</h4>
              <p className="text-muted">
                Start by uploading your resume or taking a mock interview to see your analytics here.
              </p>
            </div>
            <div className="d-flex gap-3 justify-content-center">
              <button 
                className="btn btn-primary"
                onClick={() => window.location.href = '/upload-resume'}
              >
                Upload Resume
              </button>
              <button 
                className="btn btn-outline-primary"
                onClick={() => window.location.href = '/interview-selection'}
              >
                Start Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
