// Application constants

// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    VERIFY: '/auth/verify',
  },
  RESUME: {
    UPLOAD: '/resume/upload',
    ANALYZE: '/resume/analyze',
    LIST: '/resume/list',
    DELETE: '/resume/delete',
  },
  INTERVIEW: {
    START: '/interview/start',
    SUBMIT: '/interview/submit',
    HISTORY: '/interview/history',
    RESULT: '/interview/result',
  },
  JOB_MATCH: {
    MATCH: '/job-match',
    HISTORY: '/job-match/history',
    ANALYTICS: '/job-match/analytics',
  },
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ANALYTICS: '/dashboard/analytics',
  },
};

// Routes
export const ROUTES = {
  PUBLIC: {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
  },
  PROTECTED: {
    DASHBOARD: '/dashboard',
    UPLOAD_RESUME: '/upload-resume',
    MY_RESUMES: '/my-resumes',
    INTERVIEW_HOME: '/interview-selection',
    MOCK_INTERVIEW: '/mock-interview',
    INTERVIEW_HISTORY: '/interview-history',
    INTERVIEW_RESULT: '/interview-result',
    INTERVIEW_REPORT: '/interview-report',
    JOB_MATCH: '/job-match',
    CAREER_GUIDANCE: '/career-guidance',
    ANALYTICS: '/analytics',
  },
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  INVALID_CREDENTIALS: 'Invalid email or password.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.',
  FILE_UPLOAD_ERROR: 'Failed to upload file. Please try again.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!',
  RESUME_UPLOADED: 'Resume uploaded successfully!',
  INTERVIEW_COMPLETED: 'Interview completed successfully!',
};

// Local storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  IS_LOGGED_IN: 'isLoggedIn',
};

// Interview settings
export const INTERVIEW_SETTINGS = {
  DIFFICULTY_LEVELS: {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
  },
  QUESTION_TYPES: {
    TECHNICAL: 'technical',
    BEHAVIORAL: 'behavioral',
    SITUATIONAL: 'situational',
  },
  TIME_LIMITS: {
    DEFAULT: 300, // 5 minutes in seconds
    EXTENDED: 600, // 10 minutes in seconds
  },
};

// File upload limits
export const FILE_LIMITS = {
  RESUME_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_RESUME_TYPES: ['.pdf', '.doc', '.docx'],
};

// Theme colors
export const COLORS = {
  PRIMARY: '#6366F1',
  SECONDARY: '#8B5CF6',
  SUCCESS: '#10B981',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  GRADIENT: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
};
