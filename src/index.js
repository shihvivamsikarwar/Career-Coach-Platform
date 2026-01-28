import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./landingPage/LandingPage";
import Register from "./authPage/Register";
import Login from "./authPage/Login";
import Dashboard from "./dashboard/Dashboard";
import UploadResume from "./uploadResume/UploadResume";
import InterviewSelection from "./interviewSelection/InterviewSelection";
import MockInterview from "./mockInterview/MockInterview";
import ResultFeedback from "./resultFeedback/ResultFeedback";
import CareerGuidance from "./careerGuidance/CareerGuidance";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* User Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/upload-resume" element={<UploadResume />} />
      <Route path="/interview-selection" element={<InterviewSelection />} />
      <Route path="/interview" element={<MockInterview />} />
      <Route path="/result" element={<ResultFeedback />} />
      <Route path="/career-guidance" element={<CareerGuidance />} />
    </Routes>
  </BrowserRouter>
);
