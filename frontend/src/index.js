import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import ErrorBoundary from "./components/ErrorBoundary";

/* Public */
import LandingPage from "./landingPage/LandingPage";
import Login from "./authPage/Login";
import Register from "./authPage/Register";

/* Protected Pages */
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import ResultFeedback from "./resultFeedback/ResultFeedback";
import CareerGuidance from "./pages/CareerGuidance";
import PerformanceAnalytics from "./analytics/PerformanceAnalytics";
import ResumeAnalysis from "./resume/ResumeAnalysis";

/*JOB Matcher*/
import JobMatch from "./pages/JobMatch";
import JobMatchHistory from "./pages/JobMatchHistory";
import JobMatchAnalytics from "./pages/JobMatchAnalytics";
import JobMatchReport from "./pages/JobMatchReport";
import JobMatchResult from "./pages/JobMatchResult";

/* Components */
import ProtectedRoute from "./components/ProtectedRoute";
import MyResumes from "./pages/MyResumes";

/*Interviews Pages*/
import InterviewHome from "./pages/InterviewHome";
import MockInterview from "./pages/MockInterview";
import InterviewHistory from "./pages/InterviewHistory";
import InterviewResult from "./pages/InterviewResult";
import InterviewReport from "./pages/InterviewReport";

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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
