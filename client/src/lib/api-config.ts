// API configuration for development and production environments

// To test with Render during development, change this to true
const USE_RENDER_FOR_TESTING = true;

// For production, we'll use the Render API
const USE_PRODUCTION_API = import.meta.env.PROD || USE_RENDER_FOR_TESTING;
const isProduction = import.meta.env.PROD;

// Base URL for API calls
export const API_BASE_URL = USE_PRODUCTION_API 
  ? 'https://kefalonia-api.onrender.com' // Your Render deployment URL
  : 'http://localhost:3000';             // Local development URL

// Production domain for redirects
export const PRODUCTION_DOMAIN = 'https://villakefalonia.potamianosgroup.com';

// API endpoints
export const API_ENDPOINTS = {
  CHECK_AVAILABILITY: `${API_BASE_URL}/api/check-availability`,
  CREATE_CHECKOUT: `${API_BASE_URL}/api/create-checkout`,
  CHECKOUT_SESSION: `${API_BASE_URL}/api/checkout-session`,
  CALENDAR: `${API_BASE_URL}/api/calendar`,
  // PayPal endpoints
  CREATE_PAYPAL_ORDER: `${API_BASE_URL}/api/create-paypal-order`,
  CAPTURE_PAYPAL_PAYMENT: `${API_BASE_URL}/api/capture-paypal-payment`,
  PAYPAL_ORDER_DETAILS: `${API_BASE_URL}/api/paypal-order`,
};