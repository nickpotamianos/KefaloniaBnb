import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/api-config";
import { format, differenceInDays } from "date-fns";

const PayPalSuccess: React.FC = () => {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  
  useEffect(() => {
    const capturePayment = async () => {
      try {
        // Get orderId from URL params 
        // (note: bookingId is no longer needed as we'll get the booking by orderId)
        const params = new URLSearchParams(window.location.search);
        const orderId = params.get("token"); // PayPal sends token parameter after approval
        
        if (!orderId) {
          setError("Missing order information. Please try booking again.");
          setIsLoading(false);
          return;
        }
        
        // Capture the PayPal payment
        const captureResponse = await axios.post(API_ENDPOINTS.CAPTURE_PAYPAL_PAYMENT, {
          orderId
        });
        
        if (captureResponse.data.success) {
          // Payment capture successful, get booking details
          const bookingResponse = await axios.get(`${API_ENDPOINTS.PAYPAL_ORDER_DETAILS}/${orderId}`);
          
          if (bookingResponse.data.success) {
            setBookingDetails(bookingResponse.data.booking);
          } else {
            setError("We couldn't find your booking details. Please contact support.");
          }
        } else {
          setError("Failed to complete payment. Please try again or contact support.");
        }
      } catch (err: any) {
        console.error("Payment capture error:", err);
        setError(err.response?.data?.message || "There was an error processing your payment. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    capturePayment();
  }, [setLocation]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[var(--primary-blue)] mx-auto" />
          <h2 className="text-xl font-bold mt-4">Processing Your Payment...</h2>
          <p className="text-gray-600 mt-2">Please wait while we confirm your reservation.</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-6 md:p-10">
        <Helmet>
          <title>Payment Error | Kefalonia Vintage Home</title>
        </Helmet>
        
        <div className="text-center mb-10 p-8 bg-red-50 rounded-xl">
          <div className="flex justify-center mb-4">
            <AlertTriangle size={64} className="text-red-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Payment Error</h1>
          <p className="mt-4 text-gray-600">{error}</p>
          <Button 
            className="mt-8 bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
            onClick={() => window.location.href = "/booking"}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  if (bookingDetails) {
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
  
  return null;
};

export default PayPalSuccess;