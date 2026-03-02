import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";

function MockInterview() {
  const location = useLocation();
  const navigate = useNavigate();

  const { domain, difficulty, questionsCount, mode } = location.state || {};

  // Sample Questions (temporary)
  const sampleQuestions = [
    "Explain OOP principles.",
    "What is REST API?",
    "Difference between SQL and NoSQL?",
    "What is React lifecycle?",
    "Explain asynchronous programming.",
  ];

  const questions = sampleQuestions.slice(0, questionsCount || 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 min

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerChange = (e) => {
    setAnswers({
      ...answers,
      [currentIndex]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    navigate("/interview-result", {
      state: { answers, questions, domain },
    });
  };

  return (
    <DashboardLayout>
      <div className="container py-5">
        <h3 className="mb-3">
          Domain: {domain?.replace(/-/g, " ").toUpperCase()}
        </h3>

        <div className="card p-4 shadow rounded-4">
          {/* Timer */}
          <div className="d-flex justify-content-between mb-3">
            <span>
              Question {currentIndex + 1} / {questions.length}
            </span>
            <span className="text-danger fw-bold">⏳ {timeLeft}s</span>
          </div>

          {/* Question */}
          <h5>{questions[currentIndex]}</h5>

          {/* Answer */}
          <textarea
            className="form-control mt-3"
            rows="4"
            value={answers[currentIndex] || ""}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
          />

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button className="btn btn-success" onClick={handleSubmit}>
                Submit Interview
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default MockInterview;
