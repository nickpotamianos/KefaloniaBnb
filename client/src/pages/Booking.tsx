import React, { useState, useEffect } from "react";
import { useLocation, useRoute } from "wouter";
import { format, differenceInDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle, Loader2 } from "lucide-react";
import { useBookings } from "@/hooks/use-bookings";
import { motion } from "framer-motion";
import BookingForm, { 
  BASE_PRICE_PER_NIGHT, 
  CLEANING_FEE, 
  ADDITIONAL_GUEST_FEE, 
  MIN_NIGHTS 
} from "@/components/BookingForm";
import { Helmet } from "react-helmet";
import axios from "axios";
import { API_ENDPOINTS, STRIPE_CONFIG } from "@/lib/api-config";

// Get Stripe publishable key from configuration
const STRIPE_PUBLIC_KEY = STRIPE_CONFIG.PUBLISHABLE_KEY;

const BookingPage: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [, params] = useRoute("/booking/success");
  const { isLoading } = useBookings();
  
  // Parse URL params manually for initial dates
  const getParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
      checkIn: params.get("checkIn"),
      checkOut: params.get("checkOut"),
      sessionId: params.get("session_id"),
      cancelled: params.get("cancelled") === "true"
    };
  };
  
  const { 
    checkIn: checkInParam, 
    checkOut: checkOutParam, 
    sessionId, 
    cancelled 
  } = getParams();
  
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
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | null>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(false);
  
  // For success page
  useEffect(() => {
    // If we're on the success page with a session ID, fetch booking details
    if (sessionId) {
      setIsCheckingSession(true);
      axios.get(`${API_ENDPOINTS.CHECKOUT_SESSION}/${sessionId}`)
        .then(response => {
          if (response.data.success && response.data.booking) {
            setBookingDetails(response.data.booking);
            setBookingComplete(true);
          } else {
            setBookingError("We couldn't find your booking. Please contact support.");
            setTimeout(() => setLocation("/booking"), 5000);
          }
        })
        .catch(error => {
          console.error("Error fetching booking:", error);
          setBookingError("There was an error loading your booking details.");
        })
        .finally(() => {
          setIsCheckingSession(false);
        });
    }

    // If booking was cancelled, show an error
    if (cancelled) {
      setBookingError("Your booking was cancelled. Please try again when you're ready.");
    }
  }, [sessionId, cancelled, setLocation]);
  
  // Derived values
  const guests = adults + children;
  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0;
  const subtotal = nights * BASE_PRICE_PER_NIGHT;
  const total = subtotal + CLEANING_FEE;
  
  // Form validation
  const isFormValid = checkIn && checkOut && nights >= MIN_NIGHTS && name && email && phone && adults > 0 && guests <= 8 && paymentMethod !== null;
  
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
  
  // Check if dates are available
  useEffect(() => {
    if (checkIn && checkOut && nights >= MIN_NIGHTS) {
      axios.post(API_ENDPOINTS.CHECK_AVAILABILITY, {
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString()
      })
      .then(response => {
        if (response.data.success && !response.data.available) {
          setBookingError("Selected dates are not available. Please choose different dates.");
        }
      })
      .catch(error => {
        console.error("Availability check error:", error);
      });
    }
  }, [checkIn, checkOut, nights]);
  
  // Handle booking submission
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) {
      setBookingError("Please fill in all required fields");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Create booking data
      const bookingData = {
        checkIn: checkIn?.toISOString(),
        checkOut: checkOut?.toISOString(),
        name,
        email,
        phone,
        adults,
        children,
        guests: adults + children,
        specialRequests
      };
      
      // Create checkout session
      const response = await axios.post(API_ENDPOINTS.CREATE_CHECKOUT, bookingData);
      
      if (response.data.success && response.data.sessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = response.data.sessionUrl;
      } else {
        setBookingError("Failed to create booking. Please try again.");
        setIsProcessing(false);
      }
    } catch (error: any) {
      console.error("Booking error:", error);
      setBookingError(error.response?.data?.message || "There was an error processing your booking. Please try again.");
      setIsProcessing(false);
    }
  };
  
  // Render loading state
  if (isCheckingSession) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-blue)] mx-auto" />
          <h2 className="text-xl font-bold mt-4">Verifying your booking...</h2>
          <p className="text-gray-600 mt-2">Please wait while we check your reservation status.</p>
        </div>
      </div>
    );
  }
  
  // Render confirmation screen
  if (bookingComplete && bookingDetails) {
    const bDetails = bookingDetails;
    const checkInDate = new Date(bDetails.checkIn);
    const checkOutDate = new Date(bDetails.checkOut);
    const stayNights = differenceInDays(checkOutDate, checkInDate);
    const totalAmount = (bDetails.totalAmount / 100).toFixed(2); // Convert cents to euros
    
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <Helmet>
          <title>Booking Confirmed | Kefalonia Vintage Home</title>
        </Helmet>
        
        <div className="text-center mb-10 p-8 bg-green-50 rounded-xl">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Booking Confirmed!</h1>
          <p className="mt-4 text-gray-600">
            Thank you {bDetails.name}! Your reservation has been confirmed. A confirmation email has been sent to {bDetails.email}.
          </p>
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="font-bold text-lg text-gray-800 mb-4">Booking Details:</h2>
            <div className="space-y-2 text-left">
              <p><strong>Check-in:</strong> {format(checkInDate, 'MMMM d, yyyy')}</p>
              <p><strong>Check-out:</strong> {format(checkOutDate, 'MMMM d, yyyy')}</p>
              <p><strong>Nights:</strong> {stayNights}</p>
              <p><strong>Adults:</strong> {bDetails.adults}</p>
              <p><strong>Children:</strong> {bDetails.children}</p>
              <p><strong>Total Guests:</strong> {bDetails.guests}</p>
              <p><strong>Total Amount:</strong> €{totalAmount}</p>
              {bDetails.specialRequests && (
                <p><strong>Special Requests:</strong> {bDetails.specialRequests}</p>
              )}
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
                  
                  <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                    <span>Total</span>
                    <span>€{total}</span>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Select Payment Method <span className="text-red-500">*</span></h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {/* Stripe payment option */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('stripe')}
                      className={`p-3 rounded-lg border transition-all ${
                        paymentMethod === 'stripe'
                          ? 'border-[var(--terracotta)] shadow-sm bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="h-[30px] flex items-center justify-center">
                          <svg 
                            viewBox="54 36 360.02 149.84" 
                            className="h-full w-full"
                            style={{ enableBackground: 'new 0 0 468 222.5' }}
                          >
                            <path 
                              className="fill-[#635BFF]" 
                              fillRule="evenodd" 
                              clipRule="evenodd"
                              d="M414,113.4c0-25.6-12.4-45.8-36.1-45.8c-23.8,0-38.2,20.2-38.2,45.6c0,30.1,17,45.3,41.4,45.3c11.9,0,20.9-2.7,27.7-6.5v-20c-6.8,3.4-14.6,5.5-24.5,5.5c-9.7,0-18.3-3.4-19.4-15.2h48.9C413.8,121,414,115.8,414,113.4z M364.6,103.9c0-11.3,6.9-16,13.2-16c6.1,0,12.6,4.7,12.6,16H364.6z M301.1,67.6c-9.8,0-16.1,4.6-19.6,7.8l-1.3-6.2h-22v116.6l25-5.3l0.1-28.3c3.6,2.6,8.9,6.3,17.7,6.3c17.9,0,34.2-14.4,34.2-46.1C335.1,83.4,318.6,67.6,301.1,67.6z M295.1,136.5c-5.9,0-9.4-2.1-11.8-4.7l-0.1-37.1c2.6-2.9,6.2-4.9,11.9-4.9c9.1,0,15.4,10.2,15.4,23.3C310.5,126.5,304.3,136.5,295.1,136.5z M223.8,61.7l25.1-5.4V36l-25.1,5.3V61.7z M223.8,69.3h25.1v87.5h-25.1V69.3z M196.9,76.7l-1.6-7.4h-21.6v87.5h25V97.5c5.9-7.7,15.9-6.3,19-5.2v-23C214.5,68.1,202.8,65.9,196.9,76.7z M146.9,47.6l-24.4,5.2l-0.1,80.1c0,14.8,11.1,25.7,25.9,25.7c8.2,0,14.2-1.5,17.5-3.3V135c-3.2,1.3-19,5.9-19-8.9V90.6h19V69.3h-19L146.9,47.6z M79.3,94.7c0-3.9,3.2-5.4,8.5-5.4c7.6,0,17.2,2.3,24.8,6.4V72.2c-8.3-3.3-16.5-4.6-24.8-4.6C67.5,67.6,54,78.2,54,95.9c0,27.6,38,23.2,38,35.1c0,4.6-4,6.1-9.6,6.1c-8.3,0-18.9-3.4-27.3-8v23.8c9.3,4,18.7,5.7,27.3,5.7c20.8,0,35.1-10.3,35.1-28.2C117.4,100.6,79.3,105.9,79.3,94.7z"
                            />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-600 mt-1">Credit/Debit Card</span>
                      </div>
                    </button>

                    {/* PayPal payment option */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 rounded-lg border transition-all ${
                        paymentMethod === 'paypal'
                          ? 'border-[var(--terracotta)] shadow-sm bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex flex-col items-center">
                        <div className="h-[30px] flex items-center justify-center">
                          <svg 
                            viewBox="0 -140 780 780" 
                            className="h-[135] w-full"
                            version="1.1" 
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="m168.38 169.85c-8.399-5.774-19.359-8.668-32.88-8.668h-52.346c-4.145 0-6.435 2.073-6.87 6.214l-21.265 133.48c-0.221 1.311 0.107 2.51 0.981 3.6 0.869 1.093 1.962 1.636 3.271 1.636h24.864c4.361 0 6.758-2.068 7.198-6.216l5.888-35.985c0.215-1.744 0.982-3.162 2.291-4.254 1.308-1.09 2.944-1.804 4.907-2.13 1.963-0.324 3.814-0.487 5.562-0.487 1.743 0 3.814 0.11 6.217 0.327 2.397 0.218 3.925 0.324 4.58 0.324 18.756 0 33.478-5.285 44.167-15.866 10.684-10.577 16.032-25.244 16.032-44.004 0-12.868-4.202-22.192-12.597-27.975zm-26.99 40.08c-1.094 7.635-3.926 12.649-8.506 15.049-4.581 2.403-11.124 3.597-19.629 3.597l-10.797 0.328 5.563-35.007c0.434-2.397 1.851-3.597 4.252-3.597h6.218c8.72 0 15.049 1.257 18.975 3.761 3.924 2.51 5.233 7.802 3.924 15.869z" fill="#003087"/>
                            <path d="m720.79 161.18h-24.208c-2.405 0-3.821 1.2-4.253 3.599l-21.267 136.1-0.328 0.654c0 1.096 0.437 2.127 1.311 3.109 0.868 0.979 1.963 1.471 3.271 1.471h21.595c4.138 0 6.429-2.068 6.871-6.215l21.265-133.81v-0.325c-2e-3 -3.053-1.424-4.58-4.257-4.58z" fill="#009CDE"/>
                            <path d="m428.31 213.86c0-1.088-0.438-2.126-1.306-3.106-0.875-0.981-1.857-1.474-2.945-1.474h-25.191c-2.404 0-4.366 1.096-5.89 3.271l-34.679 51.04-14.394-49.075c-1.096-3.488-3.493-5.236-7.198-5.236h-24.54c-1.093 0-2.075 0.492-2.942 1.474-0.875 0.98-1.309 2.019-1.309 3.106 0 0.44 2.127 6.871 6.379 19.303 4.252 12.434 8.833 25.848 13.741 40.244 4.908 14.394 7.468 22.031 7.688 22.898-17.886 24.43-26.826 37.518-26.826 39.26 0 2.838 1.417 4.254 4.253 4.254h25.191c2.399 0 4.361-1.088 5.89-3.271l83.427-120.4c0.433-0.433 0.651-1.193 0.651-2.289z" fill="#003087"/>
                            <path d="m662.89 209.28h-24.865c-3.056 0-4.904 3.599-5.559 10.797-5.677-8.72-16.031-13.088-31.083-13.088-15.704 0-29.065 5.89-40.077 17.668-11.016 11.779-16.521 25.631-16.521 41.551 0 12.871 3.761 23.121 11.285 30.752 7.524 7.639 17.611 11.451 30.266 11.451 6.323 0 12.757-1.311 19.3-3.926 6.544-2.617 11.665-6.105 15.379-10.469 0 0.219-0.222 1.198-0.654 2.942-0.44 1.748-0.655 3.06-0.655 3.926 0 3.494 1.414 5.234 4.254 5.234h22.576c4.138 0 6.541-2.068 7.193-6.216l13.415-85.389c0.215-1.309-0.111-2.507-0.981-3.599-0.876-1.087-1.964-1.634-3.273-1.634zm-42.694 64.452c-5.562 5.453-12.269 8.179-20.12 8.179-6.328 0-11.449-1.742-15.377-5.234-3.928-3.483-5.891-8.282-5.891-14.396 0-8.064 2.727-14.884 8.181-20.446 5.446-5.562 12.214-8.343 20.284-8.343 6.102 0 11.174 1.8 15.212 5.397 4.032 3.599 6.055 8.563 6.055 14.888-1e-3 7.851-2.783 14.505-8.344 19.955z" fill="#009CDE"/>
                            <path d="m291.23 209.28h-24.864c-3.058 0-4.908 3.599-5.563 10.797-5.889-8.72-16.25-13.088-31.081-13.088-15.704 0-29.065 5.89-40.078 17.668-11.016 11.779-16.521 25.631-16.521 41.551 0 12.871 3.763 23.121 11.288 30.752 7.525 7.639 17.61 11.451 30.262 11.451 6.104 0 12.433-1.311 18.975-3.926 6.543-2.617 11.778-6.105 15.704-10.469-0.875 2.616-1.309 4.907-1.309 6.868 0 3.494 1.417 5.234 4.253 5.234h22.574c4.141 0 6.543-2.068 7.198-6.216l13.413-85.389c0.215-1.309-0.112-2.507-0.981-3.599-0.873-1.087-1.962-1.634-3.27-1.634zm-42.695 64.614c-5.563 5.351-12.382 8.017-20.447 8.017-6.329 0-11.4-1.742-15.214-5.234-3.819-3.483-5.726-8.282-5.726-14.396 0-8.064 2.725-14.884 8.18-20.446 5.449-5.562 12.211-8.343 20.284-8.343 6.104 0 11.175 1.8 15.214 5.398 4.032 3.599 6.052 8.563 6.052 14.888 0 8.069-2.781 14.778-8.343 20.116z" fill="#003087"/>
                            <path d="m540.04 169.85c-8.398-5.774-19.356-8.668-32.879-8.668h-52.02c-4.364 0-6.765 2.073-7.197 6.214l-21.266 133.48c-0.221 1.312 0.106 2.511 0.981 3.601 0.865 1.092 1.962 1.635 3.271 1.635h26.826c2.617 0 4.361-1.416 5.235-4.252l5.89-37.949c0.216-1.744 0.98-3.162 2.29-4.254 1.309-1.09 2.943-1.803 4.908-2.13 1.962-0.324 3.812-0.487 5.562-0.487 1.743 0 3.814 0.11 6.214 0.327 2.399 0.218 3.931 0.324 4.58 0.324 18.76 0 33.479-5.285 44.168-15.866 10.688-10.577 16.031-25.244 16.031-44.004 2e-3 -12.867-4.199-22.191-12.594-27.974zm-33.534 53.82c-4.799 3.271-11.997 4.906-21.592 4.906l-10.47 0.328 5.562-35.007c0.432-2.397 1.849-3.597 4.252-3.597h5.887c4.798 0 8.614 0.218 11.454 0.653 2.831 0.44 5.562 1.799 8.179 4.089 2.618 2.291 3.926 5.618 3.926 9.98 0 9.16-2.402 15.375-7.198 18.648z" fill="#009CDE"/>
                          </svg>
                        </div>
                        <span className="text-xs text-gray-600 mt-1">PayPal</span>
                      </div>
                    </button>
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

                {/* Security Badges */}
                <div className="mt-6 pt-5 border-t border-gray-200">
                  <div className="flex flex-col items-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      <div className="bg-gray-100 rounded-md py-1 px-2 flex items-center">
                        <svg className="h-4 w-4 text-green-600 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-xs font-medium text-gray-700">SSL Secured</span>
                      </div>
                      
                      <div className="bg-gray-100 rounded-md py-1 px-2 flex items-center">
                        <svg className="h-4 w-4 text-amber-500 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21ZM16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11H16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                        <span className="text-xs font-medium text-gray-700">Privacy Protected</span>
                      </div>
                    </div>
                  </div>
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