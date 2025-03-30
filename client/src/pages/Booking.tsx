import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { format, differenceInDays, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { loadStripe } from "@stripe/stripe-js";
import { ChevronLeft, CalendarIcon, CheckCircle, User, Mail, Phone } from "lucide-react";

// Initialize Stripe - replace with your publishable key
const stripePromise = loadStripe("pk_test_REPLACE_WITH_YOUR_STRIPE_KEY");

// Pricing constants 
const BASE_PRICE_PER_NIGHT = 150; // Base price in EUR
const CLEANING_FEE = 50;
const ADDITIONAL_GUEST_FEE = 20;
const MAX_GUESTS = 6;
const MIN_NIGHTS = 3; // Minimum stay requirement

const BookingPage: React.FC = () => {
  const [location] = useLocation();
  
  // Parse URL params manually since wouter doesn't have a built-in hook for this
  const getParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      checkIn: params.get("checkIn"),
      checkOut: params.get("checkOut")
    };
  };
  
  const { checkIn: checkInParam, checkOut: checkOutParam } = getParams();
  
  // Booking state
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    checkInParam ? new Date(checkInParam) : undefined
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    checkOutParam ? new Date(checkOutParam) : undefined
  );
  
  // ... rest of the component remains the same
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  
  // Derived values
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const subtotal = nights * BASE_PRICE_PER_NIGHT;
  const additionalGuestFee = Math.max(0, guests - 2) * ADDITIONAL_GUEST_FEE * nights;
  const total = subtotal + CLEANING_FEE + additionalGuestFee;
  
  // Form validation
  const isFormValid = checkIn && checkOut && nights >= MIN_NIGHTS && name && email && phone;
  
  // Check if dates are valid
  useEffect(() => {
    if (checkIn && checkOut) {
      if (differenceInDays(checkOut, checkIn) < MIN_NIGHTS) {
        setBookingError(`Minimum stay is ${MIN_NIGHTS} nights`);
      } else {
        setBookingError(null);
      }
    }
  }, [checkIn, checkOut]);
  
  // Handle date selection
  const handleDateSelect = (range: { from?: Date; to?: Date }) => {
    setCheckIn(range.from);
    setCheckOut(range.to);
  };
  
  // Handle booking submission
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setBookingError("Please fill in all required fields");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Example implementation using Stripe Checkout
      const stripe = await stripePromise;
      
      // Normally, you'd call your serverless function or API to create a checkout session
      // Since this is a static site, we'll simulate the process
      
      // In a real implementation, you would:
      // 1. Call a serverless function (e.g., Netlify, Vercel, AWS Lambda)
      // 2. Create a Stripe checkout session there
      // 3. Redirect to the session URL
      
      const checkoutSessionUrl = `https://checkout.stripe.com/c/pay/cs_test_SIMULATE_STRIPE_SESSION
?amount=${Math.round(total * 100)}
&currency=eur
&name=Villa+Kefalonia+Booking
&description=${encodeURIComponent(`${nights} nights, ${guests} guests, Check-in: ${format(checkIn as Date, 'MMM d, yyyy')}`)}`;
      
      // For demo purposes, we'll just simulate success after 2 seconds
      setTimeout(() => {
        setIsProcessing(false);
        setBookingComplete(true);
        
        // In a real implementation, you would send booking details to your email or a database
        // This could be done via a serverless function or a service like EmailJS
        console.log("Booking completed:", {
          checkIn,
          checkOut,
          guests,
          name,
          email,
          phone,
          specialRequests,
          total
        });
      }, 2000);
      
      // In production, you'd redirect to Stripe:
      // if (stripe) window.location.href = checkoutSessionUrl;
      
    } catch (error) {
      console.error("Booking error:", error);
      setBookingError("There was an error processing your booking. Please try again.");
      setIsProcessing(false);
    }
  };
  
  // Create date range string
  const dateRangeText = checkIn && checkOut 
    ? `${format(checkIn, 'MMM d, yyyy')} to ${format(checkOut, 'MMM d, yyyy')}` 
    : "Select your dates";
    
  // Render confirmation screen
  if (bookingComplete) {
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <div className="text-center mb-10 p-8 bg-green-50 rounded-xl">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Booking Confirmed!</h1>
          <p className="mt-4 text-gray-600">
            Thank you {name}! Your reservation is being processed. You should receive a confirmation email shortly.
          </p>
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="font-bold text-lg text-gray-800 mb-4">Booking Details:</h2>
            <div className="space-y-2 text-left">
              <p><strong>Check-in:</strong> {format(checkIn as Date, 'MMMM d, yyyy')}</p>
              <p><strong>Check-out:</strong> {format(checkOut as Date, 'MMMM d, yyyy')}</p>
              <p><strong>Nights:</strong> {nights}</p>
              <p><strong>Guests:</strong> {guests}</p>
              <p><strong>Total Amount:</strong> €{total}</p>
            </div>
          </div>
          <Button 
            className="mt-8 bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
            onClick={() => window.location.href = "/"}
          >
            Back to Homepage
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      <a 
        href="/"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to home
      </a>
      
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Complete Your Reservation</h1>
      
      {bookingError && (
        <div className="p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {bookingError}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Booking Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleBooking} className="space-y-6">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Your Stay</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dates">Dates</Label>
                  <div className="mt-2 border rounded-md p-4">
                    <div className="flex items-center mb-2">
                      <CalendarIcon className="mr-2 h-4 w-4 text-[var(--terracotta)]" />
                      <span className="font-medium">{dateRangeText}</span>
                    </div>
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={checkIn}
                      selected={{ 
                        from: checkIn, 
                        to: checkOut 
                      }}
                      onSelect={handleDateSelect}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                      className="border-0"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="guests">Number of Guests</Label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--sea-blue)]"
                  >
                    {Array.from({ length: MAX_GUESTS }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Your Information</h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="mt-1 relative">
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="pl-10"
                    />
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="special-requests">Special Requests (Optional)</Label>
                  <Textarea
                    id="special-requests"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        
        {/* Right Section - Summary */}
        <div className="lg:col-span-1">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Reservation Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-in</span>
                <span className="font-medium">
                  {checkIn ? format(checkIn, 'MMM d, yyyy') : '-'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Check-out</span>
                <span className="font-medium">
                  {checkOut ? format(checkOut, 'MMM d, yyyy') : '-'}
                </span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Guests</span>
                <span className="font-medium">{guests}</span>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    €{BASE_PRICE_PER_NIGHT} x {nights} nights
                  </span>
                  <span>€{subtotal}</span>
                </div>
                
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-600">Cleaning fee</span>
                  <span>€{CLEANING_FEE}</span>
                </div>
                
                {additionalGuestFee > 0 && (
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-600">Additional guest fee</span>
                    <span>€{additionalGuestFee}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                  <span>Total</span>
                  <span>€{total}</span>
                </div>
              </div>
              
              <Button
                type="submit"
                onClick={handleBooking}
                disabled={!isFormValid || isProcessing}
                className="w-full bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 py-6 mt-4"
              >
                {isProcessing ? 'Processing...' : 'Complete Booking'}
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-2">
                You'll be redirected to our secure payment processor
              </p>
              
              <div className="flex justify-center mt-4">
                <img src="/images/payment-methods.png" alt="Payment methods" className="h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;