import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/* Public */
import LandingPage from "./landingPage/LandingPage";
import PublicNavbar from "./landingPage/PublicNavbar";
import Login from "./authPage/Login";
import Register from "./authPage/Register";

/* User */
import Dashboard from "./dashboard/Dashboard";
import UploadResume from "./uploadResume/UploadResume";
import InterviewSelection from "./interviewSelection/InterviewSelection";
import MockInterview from "./mockInterview/MockInterview";
import ResultFeedback from "./resultFeedback/ResultFeedback";
import CareerGuidance from "./careerGuidance/CareerGuidance";
import InterviewResult from "./resultFeedback/InterviewResult";

/* Components */
import UserNavbar from "./components/UserNavbar";
import ProtectedRoute from "./components/ProtectedRoute";

function Layout({ isLoggedIn, setIsLoggedIn }) {
  const location = useLocation();

  // Public routes
  const publicRoutes = ["/", "/login", "/register"];

  const isPublicPage = publicRoutes.includes(location.pathname);

  return (
    <>
      {/* NAVBAR LOGIC */}
      {isLoggedIn && !isPublicPage ? (
        <UserNavbar setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <PublicNavbar />
      )}

      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
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
          path="/interview-selection"
          element={
            <ProtectedRoute>
              <InterviewSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-selection"
          element={
            <ProtectedRoute>
              <InterviewSelection />
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
      </Routes>
    </>
  );
}

function MainApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainApp />);
