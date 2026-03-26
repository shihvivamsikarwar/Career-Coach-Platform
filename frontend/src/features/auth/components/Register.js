import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../landing/components/Footer";
import { API_BASE_URL } from "../../../constants";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      console.log("Attempting registration...");
      
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      console.log("Registration response:", res.data);
      
      // Show success message and redirect
      alert("Registration successful! Please login to continue.");
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      
      // Handle different error types
      if (err.response) {
        const { data, status } = err.response;
        
        if (status === 429) {
          setErrors({ general: "Too many registration attempts. Please try again later." });
        } else if (status === 409) {
          setErrors({ email: data.error });
        } else if (status === 400) {
          if (data.field) {
            setErrors({ [data.field]: data.error });
          } else if (data.fields) {
            setErrors(data.fields);
          } else {
            setErrors({ general: data.error });
          }
        } else if (status === 500) {
          setErrors({ general: "Server error. Please try again later." });
        } else {
          setErrors({ general: data.error || "Registration failed" });
        }
      } else if (err.request) {
        setErrors({ general: "Network error. Please check your connection." });
      } else {
        setErrors({ general: "Registration failed. Please try again." });
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
    
    if (field === 'name') {
      setName(value);
    } else if (field === 'email') {
      setEmail(value);
    } else if (field === 'password') {
      setPassword(value);
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
                  className={`form-control py-2 ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={isLoading}
                  required={true}
                />
                {errors.name && (
                  <div className="invalid-feedback d-block">
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
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

              {/* Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type="password"
                  className={`form-control py-2 ${errors.password ? 'is-invalid' : ''}`}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
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
