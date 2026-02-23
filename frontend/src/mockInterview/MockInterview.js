import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaArrowLeft,
  FaArrowRight,
  FaPaperPlane,
  FaExpand,
} from "react-icons/fa";

function MockInterview() {
  const navigate = useNavigate();
  const location = useLocation();

  const domain = location.state?.domain;
  const difficulty = location.state?.difficulty || "easy";

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(80);
  const [lockedQuestions, setLockedQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fullscreenWarningCount, setFullscreenWarningCount] = useState(0);
  const [tabWarningCount, setTabWarningCount] = useState(0);

  const [showResume, setShowResume] = useState(false);

  // ================= FETCH QUESTIONS =================
  useEffect(() => {
    if (!domain || !difficulty) {
      navigate("/interview-selection");
      return;
    }

    axios
      .get(
        `http://localhost:5000/api/interview/questions/${domain}/${difficulty}`
      )
      .then((res) => {
        setQuestions(res.data.questions);
        setAnswers(new Array(res.data.questions.length).fill(""));
      })
      .catch((err) => console.error(err));
  }, [domain, difficulty, navigate]);

  // ================= FULLSCREEN =================
  const enterFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setShowResume(false);
      }
    } catch (err) {
      console.log("Fullscreen denied");
    }
  };

  useEffect(() => {
    enterFullScreen();
  }, []);

  // ================= SUBMIT =================
  const handleSubmit = useCallback(async () => {
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/interview/submit",
        {
          answers,
          domain,
          difficulty,
          userId: localStorage.getItem("userId"),
        }
      );

      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      navigate("/interview-result", {
        state: res.data,
      });
    } catch (error) {
      alert("Submission failed");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [answers, domain, difficulty, navigate]);

  // ================= FULLSCREEN EXIT DETECT =================
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenWarningCount((prev) => {
          const newCount = prev + 1;

          if (newCount >= 3) {
            alert("Too many fullscreen exits. Auto submitting.");
            handleSubmit();
          } else {
            alert(`⚠ Fullscreen exited (${newCount}/3)`);
            setShowResume(true);
          }

          return newCount;
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [handleSubmit]);

  // ================= TAB SWITCH DETECT =================
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabWarningCount((prev) => {
          const newCount = prev + 1;

          alert(`⚠ Tab switch detected (${newCount}/3)`);

          if (newCount >= 3) {
            handleSubmit();
          }

          return newCount;
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [handleSubmit]);

  // ================= TIMER =================
  const handleNextAuto = useCallback(() => {
    setLockedQuestions((prev) =>
      prev.includes(currentIndex) ? prev : [...prev, currentIndex]
    );

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(80);
    }
  }, [currentIndex, questions.length]);

  useEffect(() => {
    if (!questions.length) return;

    if (timeLeft <= 0) {
      handleNextAuto();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleNextAuto, questions.length]);

  // ================= AUTO SUBMIT =================
  useEffect(() => {
    if (questions.length > 0 && lockedQuestions.length === questions.length) {
      handleSubmit();
    }
  }, [lockedQuestions, questions.length, handleSubmit]);

  // ================= ANSWER =================
  const handleChange = (value) => {
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);
  };

  if (!questions.length)
    return <p className="text-center mt-5">Loading Questions...</p>;

  const attempted = answers.filter((a) => a.trim() !== "").length;
  const skipped = questions.length - attempted;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="container-fluid">
      {/* HEADER */}
      <div className="bg-white shadow-sm p-3 sticky-top">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex gap-4">
            <span>
              <FaClock /> {timeLeft}s
            </span>

            <span className="text-success">
              <FaCheckCircle /> {attempted}
            </span>

            <span className="text-danger">
              <FaTimesCircle /> {skipped}
            </span>

            <span className="text-warning">
              <FaExclamationTriangle />{" "}
              {fullscreenWarningCount + tabWarningCount}
            </span>
          </div>

          {showResume && (
            <button
              className="btn btn-warning btn-sm"
              onClick={enterFullScreen}
            >
              <FaExpand /> Resume Fullscreen
            </button>
          )}
        </div>

        <div className="progress mt-2" style={{ height: "6px" }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="row mt-3">
        {/* SIDEBAR */}
        <div className="col-md-2 border-end">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`btn btn-sm m-1 ${
                index === currentIndex
                  ? "btn-primary"
                  : lockedQuestions.includes(index)
                  ? "btn-secondary"
                  : answers[index]
                  ? "btn-success"
                  : "btn-danger"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* MAIN */}
        <div className="col-md-10">
          <div className="card shadow-sm p-4">
            <h5 className="mb-3">Question {currentIndex + 1}</h5>

            <p className="fw-bold">{questions[currentIndex].questionText}</p>

            <textarea
              className="form-control"
              rows="5"
              disabled={lockedQuestions.includes(currentIndex)}
              value={answers[currentIndex] || ""}
              onChange={(e) => handleChange(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              className="btn btn-secondary"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((p) => p - 1)}
            >
              <FaArrowLeft /> Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={loading}
              >
                <FaPaperPlane /> Submit
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => setCurrentIndex((p) => p + 1)}
              >
                Next <FaArrowRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockInterview;
