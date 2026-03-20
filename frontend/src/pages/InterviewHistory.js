import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/interviewHistory.css";
import API from "../utils/api";

function InterviewHistory() {
  const [history, setHistory] = useState([]);

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) return;

    async function loadHistory() {
      try {
        const res = await axios.get(`${API}/api/interview/history/${userId}`);

        setHistory(res.data.history || []);
      } catch {
        console.log("Failed to load history");
      }
    }

    loadHistory();
  }, [userId]);

  return (
    <div className="history-container">
      <button
        className="back-btn"
        onClick={() => navigate("/interview-selection")}
      >
        ←Back to Interviews
      </button>
      <h2 className="history-title">Interview History</h2>

      {history.length === 0 ? (
        <p className="no-history">No interviews taken yet</p>
      ) : (
        <div className="history-grid">
          {history.map((item, index) => (
            <div
              className="history-card"
              key={index}
              onClick={() => navigate("/interview-report", { state: item })}
            >
              <div className="history-header">
                <h3>{item.domain.replace("-", " ").toUpperCase()}</h3>
                <span className="difficulty">{item.difficulty}</span>
              </div>

              <div className="history-body">
                <div className="score-box">
                  <span>Score</span>
                  <h2>{item.score}</h2>
                </div>

                <div className="grade-box">
                  <span>Grade</span>
                  <h4>{item.grade || "N/A"}</h4>
                </div>
              </div>

              <div className="history-footer">
                {new Date(item.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InterviewHistory;
