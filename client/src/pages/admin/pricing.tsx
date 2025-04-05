import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Info, AlertCircle, CheckCircle, Euro, Percent, Calendar } from 'lucide-react';
import pricingService, { SeasonalPrice, Discount } from '@/lib/pricingService';

const PricingAdmin: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState(localStorage.getItem('adminKey') || '');
  const [seasonalPrices, setSeasonalPrices] = useState<SeasonalPrice[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [cleaningFee, setCleaningFee] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load data on initial render if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadPricingData();
    } else if (adminKey) {
      // If admin key exists in local storage, consider the user authenticated
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  // Load pricing data from service
  const loadPricingData = () => {
    setIsLoading(true);
    try {
      setSeasonalPrices(pricingService.getSeasonalPrices());
      setDiscounts(pricingService.getDiscounts());
      setCleaningFee(pricingService.getCleaningFee());
    } catch (err) {
      setError('Error loading pricing data');
      console.error('Error loading pricing data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey) {
      setError('Admin key is required');
      return;
    }
    
    // In a real app, you would verify the admin key with your backend
    // Here we're just checking if it exists in localStorage as a simple example
    if (adminKey === localStorage.getItem('adminKey')) {
      setIsAuthenticated(true);
      setError(null);
    } else {
      setError('Invalid admin key');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Update a seasonal price
  const handleUpdateSeasonalPrice = (index: number, field: keyof SeasonalPrice, value: any) => {
    const updatedPrices = [...seasonalPrices];
    updatedPrices[index] = { ...updatedPrices[index], [field]: value };
    setSeasonalPrices(updatedPrices);
  };

  // Update a discount
  const handleUpdateDiscount = (index: number, field: keyof Discount, value: any) => {
    const updatedDiscounts = [...discounts];
    updatedDiscounts[index] = { ...updatedDiscounts[index], [field]: value };
    setDiscounts(updatedDiscounts);
  };

  // Save all pricing changes
  const handleSavePricing = () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      // Update all pricing data
      pricingService.setSeasonalPrices(seasonalPrices);
      pricingService.setDiscounts(discounts);
      pricingService.setCleaningFee(cleaningFee);
      
      setSuccessMessage('Pricing updated successfully');
    } catch (err) {
      setError('Error saving pricing data');
      console.error('Error saving pricing data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset pricing to defaults
  const handleResetPricing = () => {
    if (window.confirm('Are you sure you want to reset all pricing to defaults?')) {
      pricingService.resetToDefaults();
      loadPricingData();
      setSuccessMessage('Pricing reset to defaults');
    }
  };

  // Format month name
  const getMonthName = (monthIndex: number) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthIndex];
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
              Please enter your admin key to access the pricing management
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
        <title>Pricing Management | Kefalonia Vintage Home</title>
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Pricing Management</h1>
          <div className="flex space-x-4">
            <Button 
              onClick={() => window.location.href = '/admin'}
              className="bg-gray-100 text-gray-800 hover:bg-gray-200"
            >
              Back to Admin
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
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            <span className="ml-2 text-gray-500">Loading pricing data...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Seasonal Pricing Section */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
                    Seasonal Pricing
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Info className="h-4 w-4 mr-1" />
                    <span>Adjust prices for different seasons</span>
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                  <div className="sm:col-span-2 font-medium text-sm text-gray-600">Season</div>
                  <div className="sm:col-span-3 font-medium text-sm text-gray-600">Time Period</div>
                  <div className="sm:col-span-1 font-medium text-sm text-gray-600 text-right">Price per Night</div>
                  
                  {seasonalPrices.map((season, index) => (
                    <React.Fragment key={season.id}>
                      <div className="sm:col-span-2">
                        <Input
                          value={season.name}
                          onChange={(e) => handleUpdateSeasonalPrice(index, 'name', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
                        />
                      </div>
                      <div className="sm:col-span-3 flex items-center gap-2">
                        <span className="text-gray-500">From</span>
                        <select
                          value={season.startMonth}
                          onChange={(e) => handleUpdateSeasonalPrice(index, 'startMonth', parseInt(e.target.value))}
                          className="rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
                        >
                          {Array.from({ length: 12 }).map((_, i) => (
                            <option key={i} value={i}>{getMonthName(i)}</option>
                          ))}
                        </select>
                        <span className="text-gray-500">to</span>
                        <select
                          value={season.endMonth}
                          onChange={(e) => handleUpdateSeasonalPrice(index, 'endMonth', parseInt(e.target.value))}
                          className="rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
                        >
                          {Array.from({ length: 12 }).map((_, i) => (
                            <option key={i} value={i}>{getMonthName(i)}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sm:col-span-1">
                        <div className="relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">€</span>
                          </div>
                          <Input
                            type="number"
                            value={season.pricePerNight}
                            onChange={(e) => handleUpdateSeasonalPrice(index, 'pricePerNight', parseInt(e.target.value))}
                            className="pl-7 w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Discounts Section */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    <Percent className="h-5 w-5 mr-2 text-green-600" />
                    Stay Discounts
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Info className="h-4 w-4 mr-1" />
                    <span>Set discounts for longer stays</span>
                  </div>
                </div>
              </div>
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                  <div className="sm:col-span-3 font-medium text-sm text-gray-600">Discount Type</div>
                  <div className="sm:col-span-1 font-medium text-sm text-gray-600 text-center">Minimum Nights</div>
                  <div className="sm:col-span-2 font-medium text-sm text-gray-600 text-center">Discount Percentage</div>
                  
                  {discounts.map((discount, index) => (
                    <React.Fragment key={discount.id}>
                      <div className="sm:col-span-3">
                        <Input
                          value={discount.name}
                          onChange={(e) => handleUpdateDiscount(index, 'name', e.target.value)}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
                        />
                      </div>
                      <div className="sm:col-span-1">
                        <Input
                          type="number"
                          value={discount.minNights}
                          onChange={(e) => handleUpdateDiscount(index, 'minNights', parseInt(e.target.value))}
                          className="w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <div className="relative rounded-md shadow-sm">
                          <Input
                            type="number"
                            value={discount.discountPercentage}
                            onChange={(e) => handleUpdateDiscount(index, 'discountPercentage', parseInt(e.target.value))}
                            className="pr-12 w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <span className="text-gray-500 sm:text-sm">%</span>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Cleaning Fee Section */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                    <Euro className="h-5 w-5 mr-2 text-[var(--deep-blue)]" />
                    Additional Fees
                  </h3>
                </div>
              </div>
              <div className="bg-white px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 gap-x-4">
                  <div className="sm:col-span-3 font-medium text-sm text-gray-600">Fee Type</div>
                  <div className="sm:col-span-3 font-medium text-sm text-gray-600">Amount</div>
                  
                  <div className="sm:col-span-3">
                    <span className="text-gray-700">Cleaning Fee</span>
                  </div>
                  <div className="sm:col-span-3">
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">€</span>
                      </div>
                      <Input
                        type="number"
                        value={cleaningFee}
                        onChange={(e) => setCleaningFee(parseInt(e.target.value))}
                        className="pl-7 w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-blue)] focus:ring-[var(--primary-blue)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <Button 
                onClick={handleResetPricing}
                className="bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Reset to Defaults
              </Button>
              <Button
                onClick={handleSavePricing}
                className="bg-[var(--terracotta)] text-white hover:bg-[var(--terracotta)]/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Pricing Changes'
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PricingAdmin;