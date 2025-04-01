import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { format, differenceInDays } from 'date-fns';
import { CheckCircle, Loader2, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { motion } from 'framer-motion';

const BookingSuccessPage: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState<any>(null);
  
  useEffect(() => {
    const fetchBookingDetails = async () => {
      // Extract session ID from URL
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');
      
      if (!sessionId) {
        setError('No booking information found. Please contact support.');
        setLoading(false);
        return;
      }
      
      try {
        const response = await axios.get(`/api/checkout-session/${sessionId}`);
        
        if (response.data.success && response.data.booking) {
          setBooking(response.data.booking);
        } else {
          setError('Could not retrieve booking details. Please contact support.');
        }
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setError('An error occurred while retrieving your booking. Please contact support.');
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
          <h2 className="text-xl font-bold mt-4">Confirming your booking...</h2>
          <p className="text-gray-600 mt-2">Please wait while we process your reservation.</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Error</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button 
              onClick={() => window.location.href = '/booking'}
              className="bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/90"
            >
              Try Again
            </Button>
          </div>
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
  const nights = differenceInDays(checkOutDate, checkInDate);
  const totalAmount = (booking.totalAmount / 100).toFixed(2); // Convert cents to EUR
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <Helmet>
        <title>Booking Confirmed | Kefalonia Vintage Home</title>
        <meta name="description" content="Your booking at Kefalonia Vintage Home has been confirmed. We look forward to hosting you!" />
      </Helmet>
      
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <a 
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to home
          </a>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-8 bg-green-50 flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle size={48} className="text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Booking Confirmed!</h1>
            <p className="mt-2 text-lg text-gray-600">
              Thank you for booking with Kefalonia Vintage Home.
            </p>
          </div>
          
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Check-in</h3>
                  <p className="text-gray-800">{format(checkInDate, 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Check-out</h3>
                  <p className="text-gray-800">{format(checkOutDate, 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Number of Nights</h3>
                  <p className="text-gray-800">{nights}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Guests</h3>
                  <p className="text-gray-800">{booking.adults} adult{booking.adults !== 1 ? 's' : ''}, {booking.children} child{booking.children !== 1 ? 'ren' : ''}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Name</h3>
                  <p className="text-gray-800">{booking.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="text-gray-800">{booking.email}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Total Amount</h3>
                  <p className="text-lg font-bold text-gray-800">€{totalAmount}</p>
                </div>
                {booking.specialRequests && (
                  <div className="md:col-span-2">
                    <h3 className="text-sm font-medium text-gray-500">Special Requests</h3>
                    <p className="text-gray-800">{booking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">What's Next?</h2>
              <ul className="text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">📧</span>
                  <span>A confirmation email has been sent to your email address.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📅</span>
                  <span>Your booking has been added to our calendar.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🏠</span>
                  <span>We'll send you check-in details a few days before your arrival.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button 
                onClick={() => window.location.href = '/'}
                className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
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