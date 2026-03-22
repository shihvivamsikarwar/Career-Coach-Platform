import axios from 'axios';

// Environment Validation
const validateApiUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// API URL Configuration with fallbacks
const API_URLS = [
  process.env.REACT_APP_API_URL,
  'http://localhost:5000',
  'https://career-coach-platform.onrender.com'
];

const getValidApiUrl = () => {
  for (const url of API_URLS) {
    if (url && validateApiUrl(url)) {
      return url;
    }
  }
  throw new Error('No valid API URL found');
};

const API_BASE_URL = getValidApiUrl();

// Axios Instance Configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor
api.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    // Centralized error handling
    const { response, request, config } = error;
    
    if (response) {
      // Server responded with error status
      switch (response.status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userName');
          localStorage.removeItem('isLoggedIn');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden:', response.data?.message);
          break;
        case 404:
          console.error('Resource not found:', response.data?.message);
          break;
        case 500:
          console.error('Server error:', response.data?.message);
          break;
        default:
          console.error(`HTTP Error ${response.status}:`, response.data?.message);
      }
    } else if (request) {
      // Request was made but no response received
      console.error('Network error - no response received');
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Retry Utility
const retryRequest = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries > 0 && shouldRetry(error)) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

const shouldRetry = (error) => {
  // Retry on network errors and 5xx server errors
  return !error.response || (error.response.status >= 500 && error.response.status < 600);
};

// Export utilities and API instance
export { api, retryRequest };
export default API_BASE_URL;
