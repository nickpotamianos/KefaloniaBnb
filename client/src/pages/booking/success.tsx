import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { format, differenceInDays } from 'date-fns';
import { CheckCircle, Loader2, ChevronLeft, AlertCircle, Calendar, MapPin, Users, Phone, Mail, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from '@/lib/api-config';

const BookingSuccessPage: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal' | null>(null);
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      // Extract query parameters from URL
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id'); // Stripe parameter
      const orderId = params.get('token');       // PayPal parameter
      
      if (!sessionId && !orderId) {
        setError('No booking information found. Please contact support.');
        setLoading(false);
        return;
      }
      
      try {
        // Handle Stripe success
        if (sessionId) {
          setPaymentMethod('stripe');
          const response = await axios.get(`${API_ENDPOINTS.CHECKOUT_SESSION}/${sessionId}`);
          
          if (response.data.success && response.data.booking) {
            setBooking(response.data.booking);
          } else {
            setError('Could not retrieve booking details. Please contact support.');
          }
        }
        // Handle PayPal success
        else if (orderId) {
          setPaymentMethod('paypal');
          
          // Capture the PayPal payment
          const captureResponse = await axios.post(API_ENDPOINTS.CAPTURE_PAYPAL_PAYMENT, {
            orderId
          });
          
          if (captureResponse.data.success) {
            // Get the booking details
            const bookingResponse = await axios.get(`${API_ENDPOINTS.PAYPAL_ORDER_DETAILS}/${orderId}`);
            
            if (bookingResponse.data.success && bookingResponse.data.booking) {
              setBooking(bookingResponse.data.booking);
            } else {
              setError('Could not retrieve booking details. Please contact support.');
            }
          } else {
            setError(captureResponse.data.message || 'Payment could not be completed. Please contact support.');
          }
        }
      } catch (error: any) {
        console.error('Error processing booking:', error);
        setError(error.response?.data?.message || 'An error occurred while processing your booking. Please contact support.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookingDetails();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-blue)] mx-auto" />
          <h2 className="text-xl font-bold mt-4">
            {paymentMethod === 'paypal' ? 'Processing your payment...' : 'Confirming your booking...'}
          </h2>
          <p className="text-gray-600 mt-2">Please wait while we process your reservation.</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-gray-50">
        {/* Background video with overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden opacity-40">
          <video
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
            poster="/images/myrtos.jpg"
          >
            <source src="/images/booking.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gray-900 opacity-40"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-md mx-auto p-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
          <div className="flex justify-center mb-4">
            <AlertCircle size={64} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Booking Error</h2>
          <p className="mt-4 text-gray-600">{error}</p>
          <Button 
            className="mt-8 bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
            onClick={() => setLocation("/booking")}
          >
            Return to Booking
          </Button>
        </div>
      </div>
    );
  }
  
  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Booking Found</h2>
          <p className="text-gray-600 mb-6">Could not find your booking information.</p>
          <Button 
            onClick={() => window.location.href = '/booking'}
            className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/90"
          >
            Return to Booking
          </Button>
        </div>
      </div>
    );
  }
  
  // Format booking details
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const stayNights = differenceInDays(checkOutDate, checkInDate);
  
  return (
    <div className="min-h-screen relative overflow-hidden pb-12">
      <Helmet>
        <title>Booking Confirmed | Kefalonia Vintage Home</title>
      </Helmet>
      
      {/* Background video with overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          poster="/images/myrtos.jpg"
        >
          <source src="/images/booking.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[var(--primary-blue)] opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 max-w-4xl mx-auto px-4 pt-10">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <a 
            href="/"
            className="inline-flex items-center text-sm text-white hover:text-gray-100 mb-6 bg-white/10 backdrop-blur-sm py-2 px-4 rounded-full"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to home
          </a>
        </motion.div>

        {/* Main confirmation card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/20"
        >
          {/* Success header */}
          <div className="p-8 md:p-10 bg-gradient-to-r from-green-50 to-blue-50 flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-6 shadow-md">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--deep-blue)]">Booking Confirmed!</h1>
            <p className="mt-3 text-lg text-gray-700">
              Thank you for booking with Kefalonia Vintage Home.
            </p>
            <div className="mt-6 py-2 px-4 bg-blue-50 rounded-full text-sm text-[var(--primary-blue)] font-medium inline-flex items-center">
              <Mail className="h-4 w-4 mr-2" /> A confirmation email has been sent to {booking.email}
            </div>
          </div>
          
          {/* Booking details */}
          <div className="p-8 md:p-10">
            <div className="mb-10">
              <h2 className="text-2xl font-semibold text-[var(--deep-blue)] mb-6 border-b pb-3">Your Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="h-5 w-5 text-[var(--terracotta)] mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Check-in</h3>
                    <p className="text-lg font-medium text-gray-800">{format(checkInDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm text-gray-600">After 3:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Calendar className="h-5 w-5 text-[var(--terracotta)] mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Check-out</h3>
                    <p className="text-lg font-medium text-gray-800">{format(checkOutDate, 'EEEE, MMMM d, yyyy')}</p>
                    <p className="text-sm text-gray-600">Before 11:00 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Users className="h-5 w-5 text-[var(--terracotta)] mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Guests</h3>
                    <p className="text-gray-800">{booking.adults} adult{booking.adults !== 1 ? 's' : ''}, {booking.children} child{booking.children !== 1 ? 'ren' : ''}</p>
                    <p className="text-sm text-gray-600">{stayNights} night{stayNights !== 1 ? 's' : ''} stay</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-[var(--terracotta)] mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Property</h3>
                    <p className="text-gray-800">Kefalonia Vintage Home</p>
                    <p className="text-sm text-gray-600">Fiscardo, Kefalonia, Greece</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 md:col-span-2">
                  <CreditCard className="h-5 w-5 text-[var(--terracotta)] mt-1" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment</h3>
                    <p className="text-xl font-bold text-[var(--deep-blue)]">€{(booking.totalAmount / 100).toFixed(2)}</p>
                    <p className="text-sm text-gray-600">
                      Paid with {paymentMethod === 'paypal' ? 'PayPal' : 'Credit Card'} • 
                      <span className="text-green-600 font-medium"> {booking.paymentStatus === 'confirmed' ? 'Confirmed' : booking.paymentStatus}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Booking ID: {booking.id.substring(0, 8).toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Booked on: {booking.bookingTime ? new Date(booking.bookingTime).toLocaleString() : new Date().toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {booking.specialRequests && (
                  <div className="md:col-span-2 mt-2 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Your Special Requests</h3>
                    <p className="text-gray-700 italic">"{booking.specialRequests}"</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* What's next information */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-[var(--deep-blue)] mb-4">What's Next?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[var(--primary-blue)] text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-700">You'll receive a <strong>detailed confirmation email</strong> with your booking details.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[var(--primary-blue)] text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-700"><strong>Three days before your arrival</strong>, we'll send check-in instructions and directions to the property.</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-[var(--primary-blue)] text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-700">A <strong>welcome basket</strong> with local Kefalonian treats will be waiting for you upon arrival.</p>
                </li>
              </ul>
            </div>
            
            {/* Contact and action buttons */}
            <div className="mt-8 flex flex-col md:flex-row md:justify-between items-center">
              <div className="text-center md:text-left mb-6 md:mb-0">
                <p className="text-sm text-gray-500">Questions about your booking?</p>
                <p className="text-[var(--primary-blue)]">Contact us at <a href="mailto:alexandros@potamianosgroup.com" className="font-medium">alexandros@potamianosgroup.com</a></p>
              </div>
              <Button 
                className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 min-w-[200px]"
                onClick={() => window.location.href = "/"}
              >
                Return to Homepage
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingSuccessPage;