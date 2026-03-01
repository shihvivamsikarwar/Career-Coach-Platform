import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../landingPage/Footer";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <>
      {/* ===== Register Section ===== */}
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "90vh",
          background:
            "linear-gradient(135deg, #eef2ff 0%, #f8fafc 40%, #ffffff 100%)",
          paddingTop: "120px",
          paddingBottom: "60px",
        }}
      >
        <div
          className="card border-0 shadow-lg"
          style={{
            width: "420px",
            borderRadius: "20px",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="card-body p-4 p-md-5">
            <h3 className="fw-bold text-center mb-2">Create Account</h3>

            <p className="text-muted text-center mb-4">
              Start your interview preparation journey 🚀
            </p>

            <form onSubmit={handleRegister}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control py-2"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className="form-control py-2"
                  placeholder="Create a password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Button */}
              <button
                className="btn w-100 py-2"
                style={{
                  borderRadius: "30px",
                  background: "linear-gradient(135deg,#6366F1,#8B5CF6)",
                  color: "white",
                  fontWeight: "600",
                  boxShadow: "0px 10px 25px rgba(99,102,241,0.3)",
                }}
              >
                Register
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-muted mt-4 mb-0">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#6366F1",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ===== Footer ===== */}
      <Footer />
    </>
  );
}

export default Register;
