import React from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

function InterviewResult() {
  const location = useLocation();
  const { answers, questions, domain } = location.state || {};

  return (
    <DashboardLayout>
      <div className="container py-5">
        <h2>Interview Result</h2>
        <p>Domain: {domain}</p>

        <div className="card p-4 shadow rounded-4">
          {questions?.map((q, index) => (
            <div key={index} className="mb-4">
              <h6>{q}</h6>
              <p className="text-muted">
                Your Answer: {answers[index] || "Not Answered"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default InterviewResult;
