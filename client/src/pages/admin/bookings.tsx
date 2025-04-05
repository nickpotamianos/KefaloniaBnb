import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { format, differenceInDays, parseISO } from 'date-fns';
import { Calendar, Users, CreditCard, CheckCircle, Clock, AlertTriangle, X, Eye, Download } from 'lucide-react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { API_ENDPOINTS } from '@/lib/api-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

// Types
interface Booking {
  id: string;
  checkIn: string;
  checkOut: string;
  name: string;
  email: string;
  phone?: string;
  adults: number;
  children: number;
  guests: number;
  specialRequests?: string;
  totalAmount: number;
  paymentStatus: 'pending' | 'confirmed' | 'cancelled';
  paymentMethod?: 'stripe' | 'paypal';
  stripeSessionId?: string;
  paypalOrderId?: string;
  bookingTime?: string;
  createdAt: string;
}

const AdminBookingsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [location, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [adminKey, setAdminKey] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for admin key in localStorage
    const storedKey = localStorage.getItem('adminKey');
    if (storedKey) {
      setAdminKey(storedKey);
      setIsAuthenticated(true);
      fetchBookings(storedKey);
    }
  }, []);

  const fetchBookings = async (key: string) => {
    setLoading(true);
    try {
      const response = await axios.get(API_ENDPOINTS.ADMIN_BOOKINGS, {
        headers: { 'x-admin-key': key }
      });

      if (response.data.success) {
        const sortedBookings = response.data.bookings.sort((a: Booking, b: Booking) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        
        setBookings(sortedBookings);
        setFilteredBookings(sortedBookings);
      } else {
        setError('Failed to retrieve bookings. Please try again.');
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('adminKey');
        setError('Authentication failed. Please log in again.');
      } else {
        setError('Failed to retrieve bookings. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminKey.trim()) {
      setError('Admin key is required.');
      return;
    }

    try {
      await fetchBookings(adminKey);
      setIsAuthenticated(true);
      localStorage.setItem('adminKey', adminKey);
      setError(null);
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminKey');
    setAdminKey('');
  };

  // Filter bookings based on search term and status filter
  useEffect(() => {
    const filtered = bookings.filter(booking => {
      const matchesSearch = 
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (booking.phone && booking.phone.includes(searchTerm));
      
      const matchesStatus = 
        statusFilter === 'all' || 
        booking.paymentStatus === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredBookings(filtered);
  }, [searchTerm, statusFilter, bookings]);

  const handleCancelBooking = async (bookingId: string) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }
    
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.ADMIN_CANCEL_BOOKING}/${bookingId}`, 
        { reason: 'Admin cancellation' },
        { 
          headers: { 'x-admin-key': adminKey },
          params: { sendEmail: true }
        }
      );
      
      if (response.data.success) {
        // Update the booking status in the local state
        setBookings(prevBookings => 
          prevBookings.map(booking => 
            booking.id === bookingId 
              ? { ...booking, paymentStatus: 'cancelled' }
              : booking
          )
        );
        alert('Booking cancelled successfully.');
      } else {
        alert('Failed to cancel booking. Please try again.');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('Failed to cancel booking. Please try again.');
    }
  };

  const formatCurrency = (amount: number) => {
    return `€${(amount / 100).toFixed(2)}`;
  };
  
  const formatDate = (dateString: string, includeDay = false) => {
    try {
      const date = new Date(dateString);
      return format(date, includeDay ? 'EEE, MMM d, yyyy' : 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };
  
  const formatDateTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d, yyyy HH:mm:ss');
    } catch (e) {
      return 'Invalid date';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'cancelled':
        return <X className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const getPaymentMethodLabel = (method?: string) => {
    switch (method) {
      case 'stripe':
        return 'Credit Card';
      case 'paypal':
        return 'PayPal';
      default:
        return 'Unknown';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Helmet>
          <title>Admin Login | Kefalonia Vintage Home</title>
        </Helmet>
        
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <img 
              src="/images/logokef1.png" 
              alt="Kefalonia Vintage Home" 
              className="h-16 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter your admin key to access the booking dashboard</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-md mb-6 text-sm flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Key
              </label>
              <Input
                id="adminKey"
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter your admin key"
                required
                className="w-full"
              />
            </div>
            
            <Button type="submit" className="w-full bg-[var(--primary-blue)]">
              Login
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Helmet>
        <title>Manage Bookings | Admin Dashboard</title>
      </Helmet>
      
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img 
                src="/images/logokef1.png" 
                alt="Kefalonia Vintage Home" 
                className="h-10 mr-4"
              />
              <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-gray-600"
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Booking Management</h2>
          
          <div className="mt-4 md:mt-0 flex flex-wrap gap-3">
            <Button 
              onClick={() => fetchBookings(adminKey)}
              variant="outline" 
              className="bg-white"
            >
              Refresh List
            </Button>
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="bg-white">
                View Public Site
              </Button>
            </a>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white shadow rounded-lg mb-8 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search Bookings
              </label>
              <Input
                id="search"
                type="text"
                placeholder="Search by name, email, or booking ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Payment Status
              </label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredBookings.length}</span> bookings found
              </div>
            </div>
          </div>
        </div>
        
        {/* Bookings List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[var(--primary-blue)]"></div>
            <p className="mt-4 text-gray-600">Loading bookings...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-8 rounded-lg text-center">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <p>{error}</p>
            <Button 
              onClick={() => fetchBookings(adminKey)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white"
            >
              Retry
            </Button>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white shadow rounded-lg text-center py-12">
            <p className="text-gray-600">No bookings found matching your filters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map(booking => {
              const checkInDate = new Date(booking.checkIn);
              const checkOutDate = new Date(booking.checkOut);
              const nights = differenceInDays(checkOutDate, checkInDate);
              
              return (
                <div 
                  key={booking.id} 
                  className="bg-white shadow rounded-lg overflow-hidden"
                >
                  {/* Booking Header */}
                  <div className="border-b px-6 py-4 flex flex-wrap justify-between items-center gap-3">
                    <div>
                      <div className="flex items-center mb-1">
                        <h3 className="text-lg font-semibold text-gray-900 mr-3">
                          {booking.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.paymentStatus)}`}>
                          {getStatusIcon(booking.paymentStatus)}
                          {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Booking ID: <span className="font-mono">{booking.id.substring(0, 8).toUpperCase()}</span>
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-gray-300 text-gray-700"
                        disabled={booking.paymentStatus === 'cancelled'}
                        onClick={() => handleCancelBooking(booking.id)}
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  </div>
                  
                  {/* Booking Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Guest Information */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Guest Information</h4>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="font-medium">{booking.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{booking.email}</p>
                          </div>
                          {booking.phone && (
                            <div>
                              <p className="text-sm text-gray-500">Phone</p>
                              <p className="font-medium">{booking.phone}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-gray-500">Guests</p>
                            <p className="font-medium">
                              {booking.adults} adult{booking.adults !== 1 ? 's' : ''}, {booking.children} child{booking.children !== 1 ? 'ren' : ''}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Stay Details */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Stay Details</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">Check-in</p>
                              <p className="font-medium">{formatDate(booking.checkIn, true)}</p>
                              <p className="text-xs text-gray-500">After 3:00 PM</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Calendar className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">Check-out</p>
                              <p className="font-medium">{formatDate(booking.checkOut, true)}</p>
                              <p className="text-xs text-gray-500">Before 11:00 AM</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Users className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">Length of Stay</p>
                              <p className="font-medium">{nights} night{nights !== 1 ? 's' : ''}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Payment Details */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Payment Details</h4>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <CreditCard className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">Amount</p>
                              <p className="font-medium">{formatCurrency(booking.totalAmount)}</p>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment Method</p>
                            <p className="font-medium">{getPaymentMethodLabel(booking.paymentMethod)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Booking Date</p>
                            <p className="font-medium">
                              {booking.bookingTime 
                                ? formatDateTime(booking.bookingTime)
                                : formatDateTime(booking.createdAt)
                              }
                            </p>
                          </div>
                          {booking.paymentMethod === 'stripe' && booking.stripeSessionId && (
                            <div>
                              <p className="text-sm text-gray-500">Stripe Session</p>
                              <p className="font-mono text-xs">{booking.stripeSessionId}</p>
                            </div>
                          )}
                          {booking.paymentMethod === 'paypal' && booking.paypalOrderId && (
                            <div>
                              <p className="text-sm text-gray-500">PayPal Order</p>
                              <p className="font-mono text-xs">{booking.paypalOrderId}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="text-sm font-medium text-yellow-800 mb-2">Special Requests</h4>
                        <p className="text-gray-700 italic">"{booking.specialRequests}"</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBookingsPage;