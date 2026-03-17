// API configuration for production environment

// Production API URL
const PRODUCTION_API = 'https://villafiscardo.com';

// Always use the production API regardless of environment
export const API_BASE = PRODUCTION_API;

// Base URL for API calls
export const API_BASE_URL = API_BASE;

// Production domain for redirects
export const PRODUCTION_DOMAIN = PRODUCTION_API;

// API endpoints
export const API_ENDPOINTS = {
  CHECK_AVAILABILITY: `${API_BASE_URL}/api/check-availability`,
  CREATE_CHECKOUT: `${API_BASE_URL}/api/create-checkout`,
  CHECKOUT_SESSION: `${API_BASE_URL}/api/checkout-session`,
  CALENDAR: `${API_BASE_URL}/api/calendar`,
  PRICING: `${API_BASE_URL}/api/pricing`, // New public pricing endpoint
  // PayPal endpoints
  CREATE_PAYPAL_ORDER: `${API_BASE_URL}/api/create-paypal-order`,
  CAPTURE_PAYPAL_PAYMENT: `${API_BASE_URL}/api/capture-paypal-payment`,
  PAYPAL_ORDER_DETAILS: `${API_BASE_URL}/api/paypal-order`,
  // Admin endpoints
  ADMIN_BOOKINGS: `${API_BASE_URL}/api/admin/bookings`,
  ADMIN_CANCEL_BOOKING: `${API_BASE_URL}/api/admin/bookings`,  // Keep this as is since we append the booking ID and /cancel in the admin page
  ADMIN_PRICING: `${API_BASE_URL}/api/admin/pricing`,  // New endpoint for pricing management
  API_BASE_URL, // Export API_BASE_URL for direct access if needed
};

// Stripe configuration
export const STRIPE_CONFIG = {
  PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLIC_KEY || ''
};