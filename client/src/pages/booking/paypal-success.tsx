import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { format, differenceInDays } from 'date-fns';
import { CheckCircle, Loader2, ChevronLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { motion } from 'framer-motion';
import { API_ENDPOINTS } from '@/lib/api-config';

const PayPalSuccessPage: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);
  
  useEffect(() => {
    const capturePayment = async () => {
      // Extract order ID and booking ID from URL
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get('orderId');
      const bookingId = params.get('bookingId');
      
      if (!orderId || !bookingId) {
        setError('Missing order information. Please contact support.');
        setLoading(false);
        return;
      }
      
      try {
        // Capture the PayPal payment
        const captureResponse = await axios.post(API_ENDPOINTS.CAPTURE_PAYPAL_PAYMENT, {
          orderId,
          bookingId
        });
        
        if (captureResponse.data.success) {
          // Get the booking details
          const bookingResponse = await axios.get(`${API_ENDPOINTS.PAYPAL_ORDER}/${orderId}`);
          
          if (bookingResponse.data.success && bookingResponse.data.booking) {
            setBooking(bookingResponse.data.booking);
          } else {
            setError('Could not retrieve booking details. Please contact support.');
          }
        } else {
          setError(captureResponse.data.message || 'Payment could not be completed. Please contact support.');
        }
      } catch (error: any) {
        console.error('Error processing payment:', error);
        setError(error.response?.data?.message || 'An error occurred while processing your payment. Please contact support.');
      } finally {
        setLoading(false);
      }
    };
    
    capturePayment();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-blue)] mx-auto" />
          <h2 className="text-xl font-bold mt-4">Processing your payment...</h2>
          <p className="text-gray-600 mt-2">Please wait while we confirm your reservation.</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-center mb-4">
            <AlertCircle size={64} className="text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Payment Error</h2>
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
  
  if (booking) {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const stayNights = differenceInDays(checkOutDate, checkInDate);
    
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
            Thank you {booking.name}! Your reservation has been confirmed. A confirmation email has been sent to {booking.email}.
          </p>
          <div className="mt-6 p-6 bg-white rounded-lg shadow-sm">
            <h2 className="font-bold text-lg text-gray-800 mb-4">Booking Details:</h2>
            <div className="space-y-2 text-left">
              <p><strong>Check-in:</strong> {format(checkInDate, 'MMMM d, yyyy')}</p>
              <p><strong>Check-out:</strong> {format(checkOutDate, 'MMMM d, yyyy')}</p>
              <p><strong>Nights:</strong> {stayNights}</p>
              <p><strong>Adults:</strong> {booking.adults}</p>
              <p><strong>Children:</strong> {booking.children}</p>
              <p><strong>Total Guests:</strong> {booking.guests}</p>
              <p><strong>Total Amount:</strong> €{booking.total}</p>
              {booking.specialRequests && (
                <p><strong>Special Requests:</strong> {booking.specialRequests}</p>
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
  
  return null;
};

export default PayPalSuccessPage;