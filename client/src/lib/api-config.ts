// API configuration for development and production environments

// Digital Ocean deployment URL (your new combined frontend+backend)
const DIGITAL_OCEAN_API = 'https://kefalonia-bnb-tiq7j.ondigitalocean.app';

// For production, we'll use Digital Ocean API
const USE_PRODUCTION_API = import.meta.env.PROD;
const isProduction = import.meta.env.PROD;

// Choose which API endpoint to use
const API_ENDPOINT = DIGITAL_OCEAN_API;

// Base URL for API calls
export const API_BASE_URL = API_ENDPOINT;

// Production domain for redirects
export const PRODUCTION_DOMAIN = 'https://kefalonia-bnb-tiq7j.ondigitalocean.app';

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
  // Admin endpoints
  ADMIN_BOOKINGS: `${API_BASE_URL}/api/admin/bookings`,
  ADMIN_CANCEL_BOOKING: `${API_BASE_URL}/api/admin/bookings`,
};

// Stripe configuration
export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || ''
};