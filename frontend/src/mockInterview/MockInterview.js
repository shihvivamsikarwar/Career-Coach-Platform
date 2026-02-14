import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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

  // ===============================
  // FETCH QUESTIONS
  // ===============================
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

  // ===============================
  // FULL SCREEN MODE
  // ===============================
  useEffect(() => {
    const enterFullScreen = async () => {
      try {
        if (document.documentElement.requestFullscreen) {
          await document.documentElement.requestFullscreen();
        }
      } catch (err) {
        console.log("Fullscreen error:", err);
      }
    };

    enterFullScreen();
  }, []);

  // ===============================
  // SUBMIT FUNCTION
  // ===============================
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

  // ===============================
  // FULLSCREEN EXIT DETECTION
  // ===============================
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setFullscreenWarningCount((prev) => {
          const newCount = prev + 1;

          alert(`⚠ Fullscreen exit detected! (${newCount}/3)`);

          if (newCount >= 3) {
            alert("Too many fullscreen exits. Auto-submitting.");
            handleSubmit();
          } else {
            document.documentElement.requestFullscreen();
          }

          return newCount;
        });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [handleSubmit]);

  // ===============================
  // TAB SWITCH DETECTION
  // ===============================
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabWarningCount((prev) => {
          const newCount = prev + 1;

          alert(`⚠ Tab switching detected! (${newCount}/3)`);

          if (newCount >= 3) {
            alert("Too many tab switches. Auto-submitting.");
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

  // ===============================
  // AUTO LOCK + NEXT
  // ===============================
  const handleNextAuto = useCallback(() => {
    setLockedQuestions((prev) =>
      prev.includes(currentIndex) ? prev : [...prev, currentIndex]
    );

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(80);
    }
  }, [currentIndex, questions.length]);

  // ===============================
  // TIMER
  // ===============================
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

  // ===============================
  // AUTO SUBMIT WHEN ALL LOCKED
  // ===============================
  useEffect(() => {
    if (questions.length > 0 && lockedQuestions.length === questions.length) {
      handleSubmit();
    }
  }, [lockedQuestions, questions.length, handleSubmit]);

  // ===============================
  // ANSWER HANDLER
  // ===============================
  const handleChange = (value) => {
    const updated = [...answers];
    updated[currentIndex] = value;
    setAnswers(updated);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(80);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setTimeLeft(80);
    }
  };

  if (!questions.length)
    return <p className="text-center mt-5">Loading Questions...</p>;

  const attempted = answers.filter((a) => a.trim() !== "").length;
  const skipped = questions.length - attempted;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 border-end">
          <h6 className="mb-3">Questions</h6>

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

        {/* Main Area */}
        <div className="col-md-10">
          <h4>Mock Interview</h4>
          <h6>Difficulty: {difficulty}</h6>

          <div className="progress my-3" style={{ height: "10px" }}>
            <div
              className="progress-bar bg-success"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="d-flex justify-content-between">
            <span>Attempted: {attempted}</span>
            <span>Skipped: {skipped}</span>
            <span className="text-danger">Time Left: {timeLeft}s</span>
          </div>

          <div className="text-danger mt-2">
            Fullscreen Violations: {fullscreenWarningCount} / 3 | Tab
            Violations: {tabWarningCount} / 3
          </div>

          <div className="card p-4 shadow-sm mt-3">
            <h5>Question {currentIndex + 1}</h5>
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
              onClick={prevQuestion}
              disabled={currentIndex === 0}
            >
              Previous
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Interview"}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={nextQuestion}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockInterview;
