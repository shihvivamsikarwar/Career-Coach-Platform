// Type definitions for the application

export const UserTypes = {
  STUDENT: 'student',
  PROFESSIONAL: 'professional',
  ADMIN: 'admin',
};

export const ResumeStatus = {
  UPLOADED: 'uploaded',
  ANALYZING: 'analyzing',
  ANALYZED: 'analyzed',
  FAILED: 'failed',
};

export const InterviewStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
};

export const JobMatchStatus = {
  MATCHING: 'matching',
  MATCHED: 'matched',
  NO_MATCH: 'no_match',
};

export const QuestionTypes = {
  TECHNICAL: 'technical',
  BEHAVIORAL: 'behavioral',
  SITUATIONAL: 'situational',
};

export const DifficultyLevels = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
};

// API Response types
export const ApiResponseTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};
