import Stripe from 'stripe';
import { differenceInDays } from 'date-fns';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Get the Stripe API key
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  console.error('ERROR: STRIPE_SECRET_KEY is not defined in environment variables');
}

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16', // Specify a fixed API version
});

console.log(`Stripe initialized with key ${STRIPE_SECRET_KEY ? 'starting with: ' + STRIPE_SECRET_KEY.substring(0, 8) + '...' : 'NOT FOUND (undefined)'}`);

// Updated pricing constants
const BASE_PRICE_PER_NIGHT = 200; // €200 per night
const CLEANING_FEE = 60;         // €60 cleaning fee
const ADDITIONAL_GUEST_FEE = 0;   // No additional guest fee
const MIN_NIGHTS = 2;

// Frontend URL for redirects
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

interface BookingData {
  checkIn?: string;
  checkOut?: string;
  name?: string;
  email?: string;
  phone?: string;
  adults?: number;
  children?: number;
  specialRequests?: string;
}

/**
 * Validates booking data
 * @param bookingData The booking data to validate
 * @returns Object with validation result and message
 */
export async function validateBooking(bookingData: BookingData): Promise<{ valid: boolean; message: string }> {
  const { checkIn, checkOut, name, email, adults } = bookingData;
  
  if (!checkIn || !checkOut) {
    return { valid: false, message: 'Both check-in and check-out dates are required' };
  }
  
  if (!name) {
    return { valid: false, message: 'Name is required' };
  }
  
  if (!email) {
    return { valid: false, message: 'Email is required' };
  }
  
  if (!adults || adults < 1) {
    return { valid: false, message: 'At least one adult is required' };
  }
  
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const nights = differenceInDays(endDate, startDate);
  
  if (nights < MIN_NIGHTS) {
    return { valid: false, message: `Minimum stay is ${MIN_NIGHTS} nights` };
  }
  
  const totalGuests = (adults || 0) + (bookingData.children || 0);
  if (totalGuests > 8) {
    return { valid: false, message: 'Maximum 8 guests allowed' };
  }
  
  // Additional availability checks can be added here
  // by calling the icalService.isDateRangeAvailable
  
  return { valid: true, message: 'Booking is valid' };
}

/**
 * Calculates the total price for a booking
 * @param checkIn Check-in date string
 * @param checkOut Check-out date string
 * @param adults Number of adults
 * @param children Number of children
 * @returns Total price in cents
 */
export function calculateTotalPrice(
  checkIn: string,
  checkOut: string,
  adults: number,
  children: number
): number {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const nights = differenceInDays(endDate, startDate);
  
  const basePrice = nights * BASE_PRICE_PER_NIGHT;
  
  // No additional guest fee calculation as per new pricing model
  
  // Total in EUR, convert to cents
  return Math.round((basePrice + CLEANING_FEE) * 100);
}

/**
 * Creates a Stripe checkout session for a booking
 * @param bookingData The booking data
 * @returns Stripe checkout session
 */
export async function createCheckoutSession(bookingData: BookingData): Promise<Stripe.Checkout.Session> {
  const { checkIn, checkOut, name, email, adults, children, specialRequests } = bookingData;
  
  if (!checkIn || !checkOut || !name || !email || !adults) {
    throw new Error('Missing required booking information');
  }
  
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  const nights = differenceInDays(endDate, startDate);
  const formattedCheckIn = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedCheckOut = endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  
  // Calculate base price (nights * rate per night)
  const basePrice = nights * BASE_PRICE_PER_NIGHT;
  
  // Calculate total price (base price + cleaning fee)
  const totalInEuros = basePrice + CLEANING_FEE;
  
  // Convert to cents for Stripe
  const totalAmount = Math.round(totalInEuros * 100);
  
  // Debug logging
  console.log('=== BOOKING DEBUG INFO ===');
  console.log(`Check-in: ${checkIn} (${formattedCheckIn})`);
  console.log(`Check-out: ${checkOut} (${formattedCheckOut})`);
  console.log(`Nights: ${nights}`);
  console.log(`Base price: €${basePrice} (${nights} nights × €${BASE_PRICE_PER_NIGHT})`);
  console.log(`Cleaning fee: €${CLEANING_FEE}`);
  console.log(`Total in EUR: €${totalInEuros}`);
  console.log(`Total in cents for Stripe: ${totalAmount}`);
  console.log('=========================');
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Kefalonia Vintage Home Booking',
            description: `${nights} nights, ${adults} adults, ${children || 0} children, Check-in: ${formattedCheckIn}, Check-out: ${formattedCheckOut}`,
            images: ['https://kefalonia-bnb.com/images/logokef1.png'],
          },
          unit_amount: totalAmount,
        },
        quantity: 1,
      },
    ],
    metadata: {
      checkIn,
      checkOut,
      name,
      email,
      phone: bookingData.phone || '',
      adults: adults.toString(),
      children: (children || 0).toString(),
      specialRequests: specialRequests || '',
      totalAmount: totalAmount.toString(),
    },
    mode: 'payment',
    success_url: `${FRONTEND_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${FRONTEND_URL}/booking?cancelled=true`,
  });
  
  return session;
}

/**
 * Verifies the signature of a Stripe webhook event
 * @param payload The raw request body
 * @param signature The Stripe signature header
 * @returns The verified Stripe event
 */
export function verifyWebhookSignature(payload: string, signature: string): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  
  try {
    return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    throw new Error('Webhook signature verification failed');
  }
}

/**
 * Retrieves a checkout session by ID
 * @param sessionId The Stripe checkout session ID
 * @returns The checkout session
 */
export async function getCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
  return await stripe.checkout.sessions.retrieve(sessionId);
}