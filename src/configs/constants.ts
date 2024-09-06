import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const OPEN_AI_KEY = process.env.OPEN_AI_KEY || 'xxxx';
export const MONGO_URI = process.env.MONGO_URI || `mongodb+srv://28017`;

export const DATABASES = {
  USER: 'User',
  POINTS: 'point',

  EVENT: 'event',
  TRANSACTION: 'transaction',

  SPONSORSHIP_AD: 'sponsorship_ad',
  SPONSORSHIP_APPLICATION: 'sponsorship_application',
};

export const MESSAGES = {
  DATABASE: {
    CONNECTED: 'Database connection established successfully.',
    ERROR: 'Failed to connect to the database.',
  },
  PROFILE: {
    CREATED: 'Profile created successfully.',
    FETCHED: 'Profile retrieved successfully.',
    INVALID_ID: 'User ID does not exist.',
    DUPLICATE_EMAIL: 'Email already exists.',
    UPDATED: 'Profile updated successfully.',
    NOT_FOUND: 'Profile not found.',
  },
  FETCHED: 'Resource retrieved successfully.',
  COMING_SOON: 'This feature will be available in a future update.',
  UNEXPECTED_ERROR: 'An unexpected error occurred.',
  UPDATED: 'Resource updated successfully.',
  ERROR: 'An error occurred while processing the resource.',
  CREATED: 'Resource created successfully.',
  DELETED: 'Resource deleted successfully.',
  SUCCESSFUL: 'Operation completed successfully.',
  ASSIGNED: 'Resource assigned successfully.',
  NOT_FOUND: 'The requested resource was not found.',
  DEFAULT: 'Request received and acknowledged.',
  ALREADY_EXISTS: 'Resource already exists.',
  USER_ALREADY_EXISTS: 'User already exists.',
  AUTH_DEFAULT: 'Authentication is required for this action.',
  LOGOUT: 'Logged out successfully.',
  LOGIN_FIRST: 'Please log in to continue.',
  LOGGED_IN: 'Login successful.',
  LOGIN_FAILURE: 'Login failed. Check your credentials.',
  USER_UNAUTHORIZED: 'You are not authorized for this action.',
  USER_NOT_FOUND: 'User not found.',
  MAIL_SENT: 'Email sent. Check your inbox.',
  INVALID_UNIQUE_ID: 'Invalid unique ID provided.',
  UNKNOWN_ERROR: 'An unknown error occurred.',
  AUTH_FAILURE: 'Authentication failed. Check your credentials.',
  FORBIDDEN: 'Access denied.',
  AUTHENTICATION_FAILURE: 'Authentication failed. Please log in again.',
  NOT_AUTHENTICATED: 'Authentication is required for this action.',
  BAD_PARAMETERS: 'Invalid parameters provided.',
  INTERNAL_ERROR: 'An internal error occurred.',
  SUCCESS_MSG_RESPONSE: 'Operation completed successfully.',
  FAILURE_MSG_RESPONSE: 'Operation failed.',
  ACCESS_TOKEN_ERROR_RESPONSE: 'Invalid access token. Please log in again.',
  TOKEN_REFRESH_RESPONSE: 'Access token refreshed successfully.',
  ROUTE_NOT_FOUND: 'The requested page does not exist.',
  WELCOME_V1: 'Welcome to Version 1.',
};
