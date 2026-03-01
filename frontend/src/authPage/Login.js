import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../landingPage/Footer";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("userId", res.data.user._id);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
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
          }}
        >
          <div className="card-body p-4 p-md-5">
            <h3 className="fw-bold text-center mb-2">Welcome Back</h3>

            <p className="text-muted text-center mb-4">
              Login to continue your AI interview journey 🚀
            </p>

            {/* ===== SOCIAL LOGIN ===== */}

            <button className="btn w-100 mb-3 border d-flex align-items-center justify-content-center gap-2">
              <FcGoogle size={22} />
              Continue with Google
            </button>

            <button className="btn w-100 mb-3 border d-flex align-items-center justify-content-center gap-2">
              <FaGithub size={20} />
              Continue with GitHub
            </button>

            <button className="btn w-100 mb-4 border d-flex align-items-center justify-content-center gap-2">
              <FaLinkedin size={20} color="#0A66C2" />
              Continue with LinkedIn
            </button>

            {/* Divider */}
            <div className="text-center mb-3">
              <small className="text-muted">or login with email</small>
            </div>

            {/* ===== EMAIL LOGIN ===== */}

            <form onSubmit={handleLogin}>
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

              <div className="mb-4 position-relative">
                <label className="form-label fw-semibold">Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control py-2"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "38px",
                    cursor: "pointer",
                    color: "#6366F1",
                    fontSize: "14px",
                    fontWeight: "600",
                  }}
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>

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
                Login
              </button>
            </form>

            <p className="text-center text-muted mt-4 mb-0">
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#6366F1",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
