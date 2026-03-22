import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../landingPage/Footer";
import { api } from "../utils/api";

import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      console.log("Attempting login...");
      
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      console.log("Login response:", response.data);

      // Store authentication data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user._id);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("isLoggedIn", "true");

      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle different error types
      if (err.response) {
        // Server responded with error status
        const { data, status } = err.response;
        
        if (status === 429) {
          setErrors({ general: "Too many login attempts. Please try again later." });
        } else if (status === 400) {
          setErrors(data.field ? { [data.field]: data.error } : { general: data.error });
        } else if (status === 500) {
          setErrors({ general: "Server error. Please try again later." });
        } else {
          setErrors({ general: data.error || "Login failed" });
        }
      } else if (err.request) {
        // Network error
        setErrors({ general: "Network error. Please check your connection." });
      } else {
        // Other error
        setErrors({ general: "Login failed. Please try again." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: null }));
    }
    
    if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
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
                  className={`form-control py-2 ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={isLoading}
                  required={true}
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="mb-4 position-relative">
                <label className="form-label fw-semibold">Password</label>

                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control py-2 ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  disabled={isLoading}
                  required={true}
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
                
                {errors.password && (
                  <div className="invalid-feedback d-block">
                    {errors.password}
                  </div>
                )}
              </div>

              {errors.general && (
                <div className="alert alert-danger mb-3" role="alert">
                  {errors.general}
                </div>
              )}

              <button
                type="submit"
                className="btn w-100 py-2"
                style={{
                  borderRadius: "30px",
                  background: isLoading 
                    ? "linear-gradient(135deg,#9CA3AF,#9CA3AF)" 
                    : "linear-gradient(135deg,#6366F1,#8B5CF6)",
                  color: "white",
                  fontWeight: "600",
                  boxShadow: "0px 10px 25px rgba(99,102,241,0.3)",
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
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
