import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../landing/components/Footer";
import { API_BASE_URL } from "../../../constants";
import PageTransition from "../../../components/ui/PageTransition";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      console.log("Attempting login...");
      
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      console.log("Login response:", response.data);
      
      // Store token and user info
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("userName", response.data.user.name);
      localStorage.setItem("userEmail", response.data.user.email);

      // Update app state
      setIsLoggedIn(true);

      // Show success message
      alert("Login successful! Welcome back!");
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      
      // Handle different error types
      if (err.response) {
        const { data, status } = err.response;
        
        if (status === 429) {
          setErrors({ general: "Too many login attempts. Please try again later." });
        } else if (status === 401) {
          setErrors({ general: data.error || "Invalid email or password" });
        } else if (status === 400) {
          if (data.field) {
            setErrors({ [data.field]: data.error });
          } else {
            setErrors({ general: data.error || "Login failed" });
          }
        } else if (status === 500) {
          setErrors({ general: "Server error. Please try again later." });
        } else {
          setErrors({ general: data.error || "Login failed" });
        }
      } else if (err.request) {
        setErrors({ general: "Network error. Please check your connection." });
      } else {
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
    
    if (field === "email") {
      setEmail(value);
    } else if (field === "password") {
      setPassword(value);
    }
  };

  return (
    <PageTransition className="edu-platform-fast">
      <>
        {/* Login Section */}
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
              <h3 className="fw-bold text-center mb-2">Welcome Back</h3>

              <p className="text-muted text-center mb-4">
                Continue your interview preparation journey 🚀
              </p>

              <form onSubmit={handleLogin}>
                {/* Email */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className={`form-control py-2 input-fast ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={isLoading}
                    required={true}
                  />
                  {errors.email && (
                    <div className="invalid-feedback d-block">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    className={`form-control py-2 input-fast ${errors.password ? "is-invalid" : ""}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    disabled={isLoading}
                    required={true}
                  />
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
                  className="btn w-100 py-2 btn-fast"
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

              {/* Register Link */}
              <p className="text-center text-muted mt-4 mb-0">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="nav-fast"
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

        {/* Footer */}
        <Footer />
      </>
    </PageTransition>
  );
}

export default Login;
