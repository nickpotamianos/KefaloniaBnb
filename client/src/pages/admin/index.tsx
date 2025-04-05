import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { API_ENDPOINTS } from '@/lib/api-config';
import axios from 'axios';
import { Loader2, AlertCircle, CheckCircle, XCircle, User, Calendar, Euro } from 'lucide-react';

// Admin key handling
const ADMIN_KEY = localStorage.getItem('adminKey') || '';

const AdminPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [adminKey, setAdminKey] = useState(ADMIN_KEY);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load bookings when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    } else {
      // If admin key exists in local storage, try to authenticate
      if (adminKey) {
        verifyAdminKey();
      }
    }
  }, [isAuthenticated]);

  // Fetch all bookings
  const fetchBookings = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_ENDPOINTS.ADMIN_BOOKINGS}?adminKey=${adminKey}`);
      
      if (response.data.success) {
        // Sort bookings by check-in date, with most recent first
        const sortedBookings = response.data.bookings.sort((a: any, b: any) => {
          return new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime();
        });
        setBookings(sortedBookings);
      } else {
        setError(response.data.message || 'Failed to fetch bookings');
      }
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      setError(error.response?.data?.message || 'Failed to fetch bookings. Please try again.');
      
      // If unauthorized, reset authentication
      if (error.response?.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('adminKey');
        setAdminKey('');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle admin key verification
  const verifyAdminKey = async () => {
    if (!adminKey) {
      setError('Admin key is required');
      return;
    }
    
    try {
      const response = await axios.get(`${API_ENDPOINTS.ADMIN_BOOKINGS}?adminKey=${adminKey}`);
      
      if (response.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('adminKey', adminKey);
        setError(null);
      } else {
        setError('Invalid admin key');
        localStorage.removeItem('adminKey');
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error.response?.data?.message || 'Authentication failed. Please check your admin key.');
      localStorage.removeItem('adminKey');
    }
  };

  // Handle login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    verifyAdminKey();
  };

  // Cancel a booking
  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    setCancellingId(bookingId);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.ADMIN_CANCEL_BOOKING}/${bookingId}/cancel?adminKey=${adminKey}`,
        { reason: 'Cancelled by admin' }
      );
      
      if (response.data.success) {
        setSuccessMessage('Booking cancelled successfully');
        fetchBookings(); // Refresh the list
      } else {
        setError(response.data.message || 'Failed to cancel booking');
      }
    } catch (error: any) {
      console.error('Error cancelling booking:', error);
      setError(error.response?.data?.message || 'Failed to cancel booking. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminKey');
    setAdminKey('');
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  // Get status badge based on payment status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Admin Login | Kefalonia Vintage Home</title>
        </Helmet>
        
        <div className="max-w-md mx-auto">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Admin Access</h2>
            <p className="mt-2 text-sm text-gray-600">
              Please enter your admin key to access the booking management system
            </p>
          </div>
          
          {error && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="admin-key" className="sr-only">Admin Key</label>
                <input
                  id="admin-key"
                  name="adminKey"
                  type="password"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Admin Key"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <Button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Bookings Admin | Kefalonia Vintage Home</title>
      </Helmet>
      
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Booking Management</h1>
          <div className="flex space-x-4">
            <Button 
              onClick={fetchBookings} 
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                'Refresh Bookings'
              )}
            </Button>
            <Button onClick={handleLogout} className="bg-red-100 text-red-800 hover:bg-red-200">
              Logout
            </Button>
          </div>
        </div>
        
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {successMessage && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">{successMessage}</p>
              </div>
            </div>
          </div>
        )}
        
        {isLoading && !bookings.length ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">Loading bookings...</span>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white shadow overflow-hidden sm:rounded-md p-6 text-center">
            <p className="text-gray-500">No bookings found</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-[var(--deep-blue)]">{booking.name}</p>
                          <p className="text-sm text-gray-500">{booking.email}</p>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        {getStatusBadge(booking.paymentStatus)}
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <span>
                          {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <span>
                          {booking.adults} adult{booking.adults !== 1 ? 's' : ''}, {booking.children} child{booking.children !== 1 ? 'ren' : ''}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Euro className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <span>€{(booking.totalAmount / 100).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {booking.specialRequests && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Special Requests:</span> {booking.specialRequests}
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-4 flex justify-end">
                      {booking.paymentStatus !== 'cancelled' ? (
                        <Button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
                          disabled={cancellingId === booking.id}
                        >
                          {cancellingId === booking.id ? (
                            <>
                              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                              Cancelling...
                            </>
                          ) : (
                            'Cancel Booking'
                          )}
                        </Button>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 text-sm text-gray-500">
                          Booking cancelled
                        </span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;