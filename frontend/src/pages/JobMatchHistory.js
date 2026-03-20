import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

function JobMatchHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/api/job/history/${userId}`);

      console.log("History Data:", res.data);

      setHistory(res.data || []);
    } catch (err) {
      console.error("History error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container py-5">
        <h2 className="mb-4">📊 Job Match History</h2>

        {/* LOADING */}
        {loading && <p>Loading history...</p>}

        {/* EMPTY */}
        {!loading && history.length === 0 && (
          <div className="alert alert-info">No job match history found.</div>
        )}

        {/* CARDS */}
        <div className="row">
          {history.map((item) => (
            <div key={item._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 rounded-4 h-100 p-3">
                <h5 className="fw-bold">
                  Match Score: {item.matchScore || 0}%
                </h5>

                <p className="mb-1">
                  Probability: <b>{item.selectionProbability || "N/A"}</b>
                </p>

                <small className="text-muted">
                  {new Date(item.createdAt).toLocaleDateString()}
                </small>

                <div className="mt-3 d-flex gap-2">
                  {/* VIEW DETAILS */}
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/job/result/${item._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default JobMatchHistory;
