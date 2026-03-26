import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/landingPage.css";
import "./styles/responsive.css";
import "./styles/performance.css";
import "./styles/hero-stunning.css";

import ErrorBoundary from "./components/common/ErrorBoundary";

/* Public */
import LandingPage from "./features/landing/LandingPage";
import Login from "./features/auth/components/Login";
import Register from "./features/auth/components/Register";

/* Protected Pages */
import Dashboard from "./features/dashboard/Dashboard";
import UploadResume from "./features/resume/UploadResume";
import ResultFeedback from "./features/interview/ResultFeedback";
import CareerGuidance from "./features/dashboard/CareerGuidance";
import PerformanceAnalytics from "./features/dashboard/PerformanceAnalytics";
import ResumeAnalysis from "./features/resume/ResumeAnalysis";

/*JOB Matcher*/
import JobMatch from "./features/job-match/JobMatch";
import JobMatchHistory from "./features/job-match/JobMatchHistory";
import JobMatchAnalytics from "./features/job-match/JobMatchAnalytics";
import JobMatchReport from "./features/job-match/JobMatchReport";
import JobMatchResult from "./features/job-match/JobMatchResult";

/* Components */
import ProtectedRoute from "./components/common/ProtectedRoute";
import MyResumes from "./features/resume/MyResumes";

/*Interviews Pages*/
import InterviewHome from "./features/interview/InterviewHome";
import MockInterview from "./features/interview/MockInterview";
import InterviewHistory from "./features/interview/InterviewHistory";
import InterviewResult from "./features/interview/InterviewResult";
import InterviewReport from "./features/interview/InterviewReport";

function AppRoutes({ setIsLoggedIn }) {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/register" element={<Register />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-resume"
        element={
          <ProtectedRoute>
            <UploadResume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <ResultFeedback />
          </ProtectedRoute>
        }
      />

      <Route
        path="/career-guidance"
        element={
          <ProtectedRoute>
            <CareerGuidance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <PerformanceAnalytics />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-analysis/:id"
        element={
          <ProtectedRoute>
            <ResumeAnalysis />
          </ProtectedRoute>
        }
      />

      <Route
        path="/job-match"
        element={
          <ProtectedRoute>
            <JobMatch />
          </ProtectedRoute>
        }
      />

      <Route path="/job/history/:userId" element={<JobMatchHistory />} />
      <Route path="/job/analytics/:userId" element={<JobMatchAnalytics />} />
      <Route
        path="/job/report/:id"
        element={
          <ProtectedRoute>
            <JobMatchReport />
          </ProtectedRoute>
        }
      />
      <Route path="/job/result/:id" element={<JobMatchResult />} />

      <Route
        path="/my-resumes"
        element={
          <ProtectedRoute>
            <MyResumes />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview-selection"
        element={
          <ProtectedRoute>
            <InterviewHome />
          </ProtectedRoute>
        }
      />

      <Route
        path="/mock-interview"
        element={
          <ProtectedRoute>
            <MockInterview />
          </ProtectedRoute>
        }
      />

      <Route
        path="/interview-result"
        element={
          <ProtectedRoute>
            <InterviewResult />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview-history"
        element={
          <ProtectedRoute>
            <InterviewHistory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview-report"
        element={
          <ProtectedRoute>
            <InterviewReport />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function MainApp() {
  const [, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <AppRoutes setIsLoggedIn={setIsLoggedIn} />
      </Router>
    </ErrorBoundary>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainApp />);
