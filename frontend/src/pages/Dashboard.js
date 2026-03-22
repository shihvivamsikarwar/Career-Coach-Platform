import React, { useEffect, useState } from "react";

import DashboardLayout from "../layout/DashboardLayout";
import StatsCards from "../dashboard/components/StatsCards";
import ResumeCenter from "../dashboard/components/ResumeCenter";
import JobMatchCard from "../dashboard/components/JobMatchCard";
import AnalyticsChart from "../dashboard/components/AnalyticsChart";
import WeakAreasChart from "../dashboard/components/WeakAreasChart";
import SkillRadarChart from "../dashboard/components/SkillRadarChart";
import RecentInterviews from "../dashboard/components/RecentInterviews";
import AlInsights from "../dashboard/components/AlInsights";
import { api } from "../utils/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [userName, setUserName] = useState("User");
  const [aiData, setAiData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const loadDashboard = async () => {
      if (!userId) {
        setError("User ID not found. Please login again.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Fetch real dashboard stats from backend
        const statsResponse = await api.get(`/api/dashboard/${userId}`);
        
        console.log("Raw Backend Response:", statsResponse.data);
        console.log("Backend Stats Object:", statsResponse.data.stats);
        
        // Map the backend data to match what components expect
        const backendStats = statsResponse.data.stats || {};
        const mappedStats = {
          total: backendStats.total || 0,
          interviews: backendStats.interviews || backendStats.totalInterviews || 0,
          resumes: backendStats.resumes || 0,
          jobMatches: backendStats.jobMatches || 0,
          // Additional fields for StatsCards component
          totalInterviews: backendStats.interviews || backendStats.totalInterviews || 0,
          averageScore: backendStats.averageScore || backendStats.avgScore || 0,
          skillLevel: backendStats.skillLevel || "Beginner"
        };
        
        setStats(mappedStats);
        setUserName(statsResponse.data.user?.name || "User");

        // Fetch real AI recommendations from backend
        try {
          const aiResponse = await api.get(`/api/dashboard/ai-recommendations/${userId}`);
          setAiData(aiResponse.data);
          console.log("AI Response:", aiResponse.data);
        } catch (aiErr) {
          console.log("AI recommendations not available:", aiErr);
          setAiData(null);
        }
        
        console.log("Mapped Stats:", mappedStats);
        
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
            // User has no data yet, show empty state
            const emptyStats = {
              total: 0, interviews: 0, resumes: 0, jobMatches: 0,
              totalInterviews: 0, averageScore: 0, skillLevel: "Beginner"
            };
            setStats(emptyStats);
            setUserName(localStorage.getItem("userName") || "User");
            setAiData(null);
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

    loadDashboard();
  }, [userId]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    window.location.reload(); // Simple reload to retry
  };

  return (
    <DashboardLayout>
      <div className="container-fluid">
        {/* Enhanced Header */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2 mb-2 fw-bold text-primary">Career Dashboard</h1>
              <div className="d-flex align-items-center gap-3">
                <p className="text-muted mb-0">👋 Welcome back, <span className="fw-semibold">{userName}</span></p>
                {stats?.skillLevel && (
                  <span className="badge bg-success fs-6">{stats.skillLevel}</span>
                )}
              </div>
            </div>
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-primary btn-sm"
                onClick={() => window.location.href = '/analytics'}
              >
                📊 Analytics
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Loading State */}
        {isLoading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" style={{width: '3rem', height: '3rem'}}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mb-0">Loading your career insights...</p>
            <small className="text-muted">Preparing personalized dashboard</small>
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
            
            <div className="row mt-4">
              <div className="col-12">
                <AlInsights data={aiData} />
              </div>
            </div>
            
            <div className="row mt-4">
              <div className="col-12">
                <RecentInterviews />
              </div>
            </div>
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
