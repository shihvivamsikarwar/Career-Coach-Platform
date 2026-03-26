import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/mockInterview.css";
import { API_BASE_URL } from "../../constants";

function MockInterview() {
  const navigate = useNavigate();
  const location = useLocation();

  const domain = location.state?.domain;

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [current, setCurrent] = useState(0);

  const [timeLeft, setTimeLeft] = useState(90);
  const [warnings, setWarnings] = useState(0);

  const [loading, setLoading] = useState(true);
  const [loadingNext, setLoadingNext] = useState(false);

  const [warningMessage, setWarningMessage] = useState("");
  const [warningLock, setWarningLock] = useState(false);

  const timerRef = useRef(null);

  const MAX_QUESTIONS = 10;

  // ================= SUBMIT =================

  const handleSubmit = useCallback(async (auto = false) => {
    clearInterval(timerRef.current);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/interview/submit`, {
        userId: localStorage.getItem("userId"),
        domain,
        difficulty: "easy",
        questions,
        answers,
        warnings,
        autoSubmitted: auto,
      });

      navigate("/interview-result", { state: res.data });
    } catch {
      alert("Submission failed");
    }
  }, [domain, questions, answers, warnings, navigate]);

  // ================= ANSWER =================

  const handleNext = useCallback(async (auto = false) => {
    if (loadingNext) return;

    if (questions.length >= MAX_QUESTIONS) {
      handleSubmit();
      return;
    }

    setLoadingNext(true);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/interview/next-question`, {
        domain,
        previousQuestion: questions[current],
        previousAnswer: answers[current]?.trim() || "No answer provided",
      });

      const nextQuestion =
        res?.data?.questionText || "Explain this concept in detail.";

      setQuestions((prev) => [...prev, nextQuestion]);
      setAnswers((prev) => [...prev, ""]);

      setCurrent((prev) => prev + 1);
      setTimeLeft(90);
    } catch {
      alert("Failed to generate next question");
    }

    setLoadingNext(false);
  }, [loadingNext, MAX_QUESTIONS, handleSubmit, domain, questions, current, answers]);

  // ================= START INTERVIEW =================

  useEffect(() => {
    if (!domain) {
      navigate("/interview");
      return;
    }

    async function startInterview() {
      try {
        const res = await axios.post(`${API_BASE_URL}/api/interview/start`, {
          userId: localStorage.getItem("userId"),
          domain,
        });

        const firstQuestion =
          res.data.questionText || res.data.questions?.[0]?.questionText;

        setQuestions([firstQuestion]);
        setAnswers([""]);
      } catch {
        alert("Failed to start interview");
      } finally {
        setLoading(false);
      }
    }

    startInterview();
  }, [domain, navigate]);

  // ================= TIMER =================

  useEffect(() => {
    if (!questions.length) return;

    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);

          handleNext(true);

          return 90;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [current, questions, handleNext]);

  // ================= WARNING SYSTEM =================

  const triggerWarning = useCallback((message) => {
    if (warningLock) return;

    setWarningLock(true);

    setWarnings((prev) => {
      const newCount = Math.min(prev + 1, 3);
      setWarningMessage(`${message} | Warning ${newCount}/3`);

      setTimeout(() => {
        setWarningMessage("");
        setWarningLock(false);
      }, 3000);

      if (newCount >= 3) {
        handleSubmit(true);
      }

      return newCount;
    });
  }, [warningLock, handleSubmit]);

  // ================= TAB SWITCH =================

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        triggerWarning("Tab switching detected");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [triggerWarning]);

  // ================= WINDOW BLUR =================

  useEffect(() => {
    const handleBlur = () => {
      if (!document.hidden) {
        triggerWarning("Window focus lost");
      }
    };

    window.addEventListener("blur", handleBlur);

    return () => window.removeEventListener("blur", handleBlur);
  }, [triggerWarning]);

  // ================= BLOCK DEVTOOLS =================

  useEffect(() => {
    const handleKey = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.shiftKey && e.key === "J") ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        triggerWarning("Developer tools blocked");
      }
    };

    document.addEventListener("keydown", handleKey);

    return () => document.removeEventListener("keydown", handleKey);
  }, [triggerWarning]);

  // ================= BLOCK COPY / PASTE =================

  useEffect(() => {
    const blockCopy = (e) => {
      e.preventDefault();
      triggerWarning("Copy not allowed");
    };

    const blockPaste = (e) => {
      e.preventDefault();
      triggerWarning("Paste not allowed");
    };

    const blockRightClick = (e) => e.preventDefault();

    document.addEventListener("copy", blockCopy);
    document.addEventListener("paste", blockPaste);
    document.addEventListener("contextmenu", blockRightClick);

    return () => {
      document.removeEventListener("copy", blockCopy);
      document.removeEventListener("paste", blockPaste);
      document.removeEventListener("contextmenu", blockRightClick);
    };
  }, [triggerWarning]);

  // ================= ANSWER =================

  const handleChange = (value) => {
    const updated = [...answers];
    updated[current] = value;
    setAnswers(updated);
  };

  if (loading) {
    return <div className="loading-screen">Preparing AI Interview...</div>;
  }

  const q = questions[current];

  return (
    <div className="interview-container">
      <div className="interview-header">
        <h2>{domain.toUpperCase()} INTERVIEW</h2>

        <div className="interview-stats">
          <span>⏱ {timeLeft}s</span>
          <span>⚠ {warnings}/3</span>
          <span>Q {current + 1}</span>
          <span>
            Progess:{current + 1}/{MAX_QUESTIONS}
          </span>
        </div>
      </div>

      <div className="interview-body">
        <div className="question-main">
          <div className="question-card">
            <h3>Question {current + 1}</h3>

            <p className="question-text">{q}</p>

            <textarea
              className="answer-box"
              value={answers[current] || ""}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Type your answer here..."
            />
            <div className="char-count">
              {answers[current]?.length || 0} characters
            </div>
          </div>

          <div className="nav-buttons">
            <button
              onClick={() =>
                questions.length >= MAX_QUESTIONS
                  ? handleSubmit()
                  : handleNext()
              }
              className="next-btn"
              disabled={loadingNext}
            >
              {loadingNext
                ? "Loading..."
                : questions.length >= MAX_QUESTIONS
                ? "Submit Interview"
                : "Next Question"}
            </button>
          </div>
        </div>
      </div>

      {warningMessage && (
        <div className="warning-popup">⚠ {warningMessage}</div>
      )}
    </div>
  );
}

export default MockInterview;
