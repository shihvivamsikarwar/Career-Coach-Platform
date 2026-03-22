import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../utils/api";

function ProtectedRoute({ children }) {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const validateAuth = async () => {
      try {
        // Check basic authentication state
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId");

        if (!isLoggedIn || !token || !userId) {
          setIsAuthenticated(false);
          setIsValidating(false);
          return;
        }

        // Validate token with backend
        const response = await api.get('/api/auth/validate');
        
        if (response.data.valid) {
          setIsAuthenticated(true);
        } else {
          // Token invalid, clear auth data
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth validation error:', error);
        
        // If validation fails, assume not authenticated
        if (error.response?.status === 401) {
          localStorage.removeItem("isLoggedIn");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
        }
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateAuth();
  }, []);

  // Show loading spinner while validating
  if (isValidating) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  return children;
}

export default ProtectedRoute;
