import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Save, Plus, Trash, ArrowLeft, Calendar, Percent, Euro } from 'lucide-react';
import axios from 'axios';
import { API_ENDPOINTS } from '@/lib/api-config';

type SeasonalPrice = {
  id: string;
  name: string;
  startMonth: number;
  endMonth: number;
  pricePerNight: number;
};

type Discount = {
  id: string;
  name: string;
  minNights: number;
  discountPercentage: number;
};

const PricingAdmin: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [adminKey, setAdminKey] = useState(localStorage.getItem('adminKey') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('adminKey'));
  
  // Pricing state
  const [seasonalPrices, setSeasonalPrices] = useState<SeasonalPrice[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [cleaningFee, setCleaningFee] = useState<number>(60);

  // Month names for display
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  // Load pricing configuration
  useEffect(() => {
    if (isAuthenticated) {
      fetchPricingConfiguration();
    }
  }, [isAuthenticated]);
  
  const fetchPricingConfiguration = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`${API_ENDPOINTS.ADMIN_PRICING}?adminKey=${adminKey}`);
      
      if (response.data.success && response.data.pricing) {
        const { seasonalPrices, discounts, cleaningFee } = response.data.pricing;
        setSeasonalPrices(seasonalPrices || []);
        setDiscounts(discounts || []);
        setCleaningFee(cleaningFee || 60);
      } else {
        setError('Failed to load pricing configuration');
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
        localStorage.removeItem('adminKey');
        setError('Authentication failed. Please log in again.');
      } else {
        setError('Failed to load pricing configuration. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  
  // Add a new seasonal price entry
  const addSeasonalPrice = () => {
    const newId = `season-${Date.now()}`;
    setSeasonalPrices([
      ...seasonalPrices,
      {
        id: newId,
        name: "New Season",
        startMonth: 0,
        endMonth: 1,
        pricePerNight: 150
      }
    ]);
  };
  
  // Add a new discount entry
  const addDiscount = () => {
    const newId = `discount-${Date.now()}`;
    setDiscounts([
      ...discounts,
      {
        id: newId,
        name: "New Discount",
        minNights: 7,
        discountPercentage: 10
      }
    ]);
  };
  
  // Delete a seasonal price entry
  const deleteSeasonalPrice = (id: string) => {
    setSeasonalPrices(seasonalPrices.filter(price => price.id !== id));
  };
  
  // Delete a discount entry
  const deleteDiscount = (id: string) => {
    setDiscounts(discounts.filter(discount => discount.id !== id));
  };
  
  // Update a seasonal price field
  const updateSeasonalPrice = (id: string, field: keyof SeasonalPrice, value: string | number) => {
    setSeasonalPrices(
      seasonalPrices.map(price => 
        price.id === id 
          ? { ...price, [field]: field === 'name' ? value : Number(value) }
          : price
      )
    );
  };
  
  // Update a discount field
  const updateDiscount = (id: string, field: keyof Discount, value: string | number) => {
    setDiscounts(
      discounts.map(discount => 
        discount.id === id 
          ? { ...discount, [field]: field === 'name' ? value : Number(value) }
          : discount
      )
    );
  };
  
  // Save pricing configuration
  const savePricingConfiguration = async () => {
    setSaving(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.ADMIN_PRICING}?adminKey=${adminKey}`,
        {
          seasonalPrices,
          discounts,
          cleaningFee: Math.round(cleaningFee) // Ensure integer values for the database
        }
      );
      
      if (response.data.success) {
        setSuccessMessage('Pricing configuration saved successfully');
        // Reload the configuration to get the server-validated data
        fetchPricingConfiguration();
      } else {
        setError(response.data.message || 'Failed to save pricing configuration');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save pricing configuration');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle login submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!adminKey.trim()) {
      setError('Admin key is required');
      return;
    }
    
    localStorage.setItem('adminKey', adminKey);
    setIsAuthenticated(true);
  };
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminKey');
    setIsAuthenticated(false);
    setAdminKey('');
  };
  
  // Login form
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
            <p className="text-gray-600 mt-2">Enter your admin key to access the pricing management</p>
          </div>
          
          {error && (
            <div className="bg-red-50 text-red-800 p-3 rounded-md mb-6 text-sm">
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
        <title>Pricing Management | Admin Dashboard</title>
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
              <h1 className="text-xl font-bold text-gray-800">Pricing Management</h1>
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
      
      {/* Navigation */}
      <div className="bg-gray-100 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Button
            variant="ghost"
            onClick={() => setLocation('/admin')}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-[var(--primary-blue)]"></div>
            <p className="mt-4 text-gray-600">Loading pricing configuration...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {successMessage}
              </div>
            )}
            
            {/* Seasonal Pricing Section */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-[var(--primary-blue)] mr-2" />
                  <h2 className="text-lg font-medium text-gray-800">Seasonal Pricing</h2>
                </div>
                <Button 
                  onClick={addSeasonalPrice}
                  size="sm"
                  className="bg-[var(--primary-blue)]"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Season
                </Button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-500 mb-2 px-2">
                  <div className="col-span-3">Season Name</div>
                  <div className="col-span-3">Start Month</div>
                  <div className="col-span-3">End Month</div>
                  <div className="col-span-2">Price per Night</div>
                  <div className="col-span-1">Action</div>
                </div>
                
                {seasonalPrices.map((price) => (
                  <div key={price.id} className="grid grid-cols-12 gap-4 mb-4 items-center">
                    <div className="col-span-3">
                      <Input
                        value={price.name}
                        onChange={(e) => updateSeasonalPrice(price.id, 'name', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-3">
                      <select
                        value={price.startMonth}
                        onChange={(e) => updateSeasonalPrice(price.id, 'startMonth', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {monthNames.map((month, index) => (
                          <option key={`start-${index}`} value={index}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-3">
                      <select
                        value={price.endMonth}
                        onChange={(e) => updateSeasonalPrice(price.id, 'endMonth', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {monthNames.map((month, index) => (
                          <option key={`end-${index}`} value={index}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-span-2">
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                          €
                        </span>
                        <Input
                          type="number"
                          value={price.pricePerNight}
                          onChange={(e) => updateSeasonalPrice(price.id, 'pricePerNight', e.target.value)}
                          className="w-full pl-8"
                          min={1}
                        />
                      </div>
                    </div>
                    <div className="col-span-1 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSeasonalPrice(price.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {seasonalPrices.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No seasonal pricing configured. Add your first season.
                  </div>
                )}
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>Note: Seasonal pricing is based on calendar months. The system will use the highest applicable price if dates span multiple seasons.</p>
                </div>
              </div>
            </div>
            
            {/* Discounts Section */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Percent className="h-5 w-5 text-[var(--primary-blue)] mr-2" />
                  <h2 className="text-lg font-medium text-gray-800">Length of Stay Discounts</h2>
                </div>
                <Button 
                  onClick={addDiscount}
                  size="sm"
                  className="bg-[var(--primary-blue)]"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Discount
                </Button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-12 gap-4 font-medium text-sm text-gray-500 mb-2 px-2">
                  <div className="col-span-4">Discount Name</div>
                  <div className="col-span-3">Minimum Nights</div>
                  <div className="col-span-4">Discount Percentage</div>
                  <div className="col-span-1">Action</div>
                </div>
                
                {discounts.map((discount) => (
                  <div key={discount.id} className="grid grid-cols-12 gap-4 mb-4 items-center">
                    <div className="col-span-4">
                      <Input
                        value={discount.name}
                        onChange={(e) => updateDiscount(discount.id, 'name', e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        value={discount.minNights}
                        onChange={(e) => updateDiscount(discount.id, 'minNights', e.target.value)}
                        className="w-full"
                        min={1}
                      />
                    </div>
                    <div className="col-span-4">
                      <div className="relative">
                        <Input
                          type="number"
                          value={discount.discountPercentage}
                          onChange={(e) => updateDiscount(discount.id, 'discountPercentage', e.target.value)}
                          className="w-full pr-8"
                          min={1}
                          max={100}
                        />
                        <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                          %
                        </span>
                      </div>
                    </div>
                    <div className="col-span-1 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteDiscount(discount.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {discounts.length === 0 && (
                  <div className="text-center py-4 text-gray-500">
                    No discounts configured. Add your first discount.
                  </div>
                )}
                
                <div className="mt-4 text-sm text-gray-500">
                  <p>Note: Only the highest applicable discount will be applied to a booking.</p>
                </div>
              </div>
            </div>
            
            {/* Cleaning Fee Section */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b flex items-center">
                <Euro className="h-5 w-5 text-[var(--primary-blue)] mr-2" />
                <h2 className="text-lg font-medium text-gray-800">Cleaning Fee</h2>
              </div>
              
              <div className="p-6">
                <div className="max-w-md">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cleaning Fee (€)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      €
                    </span>
                    <Input
                      type="number"
                      value={cleaningFee}
                      onChange={(e) => setCleaningFee(Number(e.target.value))}
                      className="w-full pl-8"
                      min={0}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    This fee will be added to every booking regardless of length of stay.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Save button */}
            <div className="flex justify-end">
              <Button 
                onClick={savePricingConfiguration}
                className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Pricing Configuration
                  </>
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