import React from "react";

function Login() {
  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        background: "linear-gradient(135deg, #e9e4ff, #f6f4ff)",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">
                <h3 className="text-center fw-bold mb-4">Login</h3>

                <form>
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-4">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                    />
                  </div>

                  {/* Button */}
                  <div className="d-grid mb-3">
                    <button className="btn btn-primary btn-lg">Login</button>
                  </div>

                  <p className="text-center text-muted">
                    Don’t have an account? <a href="/register">Register</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
