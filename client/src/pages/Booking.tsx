import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { format, differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { ChevronLeft, CheckCircle } from "lucide-react";
import { useBookings } from "@/hooks/use-bookings";
import { motion } from "framer-motion";
import BookingForm, { 
  BASE_PRICE_PER_NIGHT, 
  CLEANING_FEE, 
  ADDITIONAL_GUEST_FEE, 
  MIN_NIGHTS 
} from "@/components/BookingForm";
import { Helmet } from "react-helmet";

// Initialize Stripe - replace with your publishable key
const stripePromise = loadStripe("pk_test_REPLACE_WITH_YOUR_STRIPE_KEY");

const BookingPage: React.FC = () => {
  const [location] = useLocation();
  const { isLoading } = useBookings();
  
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
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  
  // Derived values
  const guests = adults + children;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const subtotal = nights * BASE_PRICE_PER_NIGHT;
  const additionalGuestFee = Math.max(0, guests - 2) * ADDITIONAL_GUEST_FEE * nights;
  const total = subtotal + CLEANING_FEE + additionalGuestFee;
  
  // Form validation
  const isFormValid = checkIn && checkOut && nights >= MIN_NIGHTS && name && email && phone && adults > 0 && guests <= 8;
  
  // Check if dates and guest counts are valid
  useEffect(() => {
    if (checkIn && checkOut) {
      if (differenceInDays(checkOut, checkIn) < MIN_NIGHTS) {
        setBookingError(`Minimum stay is ${MIN_NIGHTS} nights`);
      } else if (adults > 5) {
        setBookingError("Maximum 5 adults allowed");
      } else if (guests > 8) {
        setBookingError("Maximum 8 guests (adults + children) allowed");
      } else {
        setBookingError(null);
      }
    }
  }, [checkIn, checkOut, adults, children, guests]);
  
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
&description=${encodeURIComponent(`${nights} nights, ${adults} adults, ${children} children, Check-in: ${format(checkIn as Date, 'MMM d, yyyy')}`)}`;
      
      // For demo purposes, we'll just simulate success after 2 seconds
      setTimeout(() => {
        setIsProcessing(false);
        setBookingComplete(true);
        
        // In a real implementation, you would send booking details to your email or a database
        // This could be done via a serverless function or a service like EmailJS
        console.log("Booking completed:", {
          checkIn,
          checkOut,
          adults,
          children,
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
              <p><strong>Adults:</strong> {adults}</p>
              <p><strong>Children:</strong> {children}</p>
              <p><strong>Total Guests:</strong> {guests}</p>
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
    <div className="relative min-h-screen">
      <Helmet>
        <title>Book Your Stay | Kefalonia Vintage Home</title>
        <meta name="description" content="Book your dream vacation at our authentic Kefalonian seaside villa with panoramic views and traditional charm." />
      </Helmet>

      {/* Video Background */}
      <video 
        className="fixed inset-0 w-full h-full object-cover" 
        src="/images/booking.mp4" 
        autoPlay 
        loop 
        muted 
        playsInline
        aria-hidden="true"
      ></video>
      
      {/* Enhanced gradient overlay for better content visibility */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:px-8 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <a 
            href="/"
            className="inline-flex items-center text-sm text-white/90 hover:text-white mb-6 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to home
          </a>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 playfair leading-tight">Complete Your Reservation</h1>
          <p className="text-white/80 text-lg md:text-xl">Just a few steps away from your perfect Greek island getaway</p>
        </motion.div>
        
        {bookingError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 mb-6 bg-red-400/20 backdrop-blur-sm border border-red-300/30 rounded-lg text-white"
          >
            {bookingError}
          </motion.div>
        )}

        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="p-4 mb-6 bg-blue-400/20 backdrop-blur-sm border border-blue-300/30 rounded-lg text-white flex items-center"
          >
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            <span>Loading availability data...</span>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <form id="bookingForm">
              <BookingForm 
                checkIn={checkIn}
                checkOut={checkOut}
                setCheckIn={setCheckIn}
                setCheckOut={setCheckOut}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                specialRequests={specialRequests}
                setSpecialRequests={setSpecialRequests}
                bookingError={bookingError}
              />
            </form>
          </motion.div>
          
          {/* Right Section - Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 sticky top-8">
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
                  <span className="text-gray-600">Adults</span>
                  <span className="font-medium">{adults}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Children</span>
                  <span className="font-medium">{children}</span>
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
                  form="bookingForm"
                  onClick={handleBooking}
                  disabled={!isFormValid || isProcessing}
                  className="w-full bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 py-6 mt-4"
                >
                  {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                </Button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  By proceeding with this booking, you agree to our{' '}
                  <a href="#" className="text-[var(--terracotta)] hover:underline">Terms of Service</a> and{' '}
                  <a href="#" className="text-[var(--terracotta)] hover:underline">Privacy Policy</a>.
                </p>
                
                <div className="flex justify-center mt-4">
                  <img src="/images/payment-methods.png" alt="Payment methods" className="h-6" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;