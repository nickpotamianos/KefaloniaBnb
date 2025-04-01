// API configuration for development and production environments

// For testing purposes, we'll use the Render backend even in development
const USE_RENDER_API = true;
const isProduction = import.meta.env.PROD;

// Base URL for API calls
export const API_BASE_URL = USE_RENDER_API 
  ? 'https://kefalonia-api.onrender.com' // Your Render deployment URL
  : 'http://localhost:3000';

// API endpoints
export const API_ENDPOINTS = {
  CHECK_AVAILABILITY: `${API_BASE_URL}/api/check-availability`,
  CREATE_CHECKOUT: `${API_BASE_URL}/api/create-checkout`,
  CHECKOUT_SESSION: `${API_BASE_URL}/api/checkout-session`,
  CALENDAR: `${API_BASE_URL}/api/calendar`,
};

// Stripe configuration
export const STRIPE_CONFIG = {
  // Stripe public key will be injected from environment variables
  PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',
};