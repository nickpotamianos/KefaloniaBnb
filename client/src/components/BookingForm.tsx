import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CustomDateRangePicker from '@/components/CustomDateRangePicker';
import { Users, Baby, Minus, Plus, Calendar, CheckCircle, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookings } from '@/hooks/use-bookings';
import pricingService from '@/lib/pricingService';

// Use centralized pricing service instead of hardcoded constants
export const MIN_NIGHTS = 2;

// Country codes for phone numbers - comprehensive worldwide list
const countryCodes = [
  // Europe (putting Greece first since it's the most relevant)
  { code: '+30', country: 'Greece', flag: '🇬🇷' },
  { code: '+355', country: 'Albania', flag: '🇦🇱' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+375', country: 'Belarus', flag: '🇧🇾' },
  { code: '+32', country: 'Belgium', flag: '🇧🇪' },
  { code: '+387', country: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
  { code: '+385', country: 'Croatia', flag: '🇭🇷' },
  { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
  { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
  { code: '+45', country: 'Denmark', flag: '🇩🇰' },
  { code: '+372', country: 'Estonia', flag: '🇪🇪' },
  { code: '+358', country: 'Finland', flag: '🇫🇮' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+36', country: 'Hungary', flag: '🇭🇺' },
  { code: '+354', country: 'Iceland', flag: '🇮🇸' },
  { code: '+353', country: 'Ireland', flag: '🇮🇪' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+371', country: 'Latvia', flag: '🇱🇻' },
  { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
  { code: '+352', country: 'Luxembourg', flag: '🇬🇷' },
  { code: '+356', country: 'Malta', flag: '🇲🇹' },
  { code: '+373', country: 'Moldova', flag: '🇲🇩' },
  { code: '+377', country: 'Monaco', flag: '🇲🇨' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+47', country: 'Norway', flag: '🇳🇴' },
  { code: '+48', country: 'Poland', flag: '🇵🇱' },
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+40', country: 'Romania', flag: '🇷🇴' },
  { code: '+7', country: 'Russia', flag: '🇷🇺' },
  { code: '+381', country: 'Serbia', flag: '🇷🇸' },
  { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
  { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
  { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  
  // North America
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
  
  // Asia
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬' },
  { code: '+66', country: 'Thailand', flag: '🇹🇭' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+63', country: 'Philippines', flag: '🇵🇭' },
  { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
  { code: '+971', country: 'United Arab Emirates', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+972', country: 'Israel', flag: '🇮🇱' },
  
  // Australia & Oceania
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
  
  // South America
  { code: '+55', country: 'Brazil', flag: '🇧🇷' },
  { code: '+54', country: 'Argentina', flag: '🇦🇷' },
  { code: '+56', country: 'Chile', flag: '🇨🇱' },
  { code: '+57', country: 'Colombia', flag: '🇨🇴' },
  { code: '+51', country: 'Peru', flag: '🇵🇪' },
  { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
  
  // Africa
  { code: '+27', country: 'South Africa', flag: '🇿🇦' },
  { code: '+20', country: 'Egypt', flag: '🇪🇬' },
  { code: '+212', country: 'Morocco', flag: '🇲🇦' },
  { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', country: 'Kenya', flag: '🇰🇪' },
  { code: '+233', country: 'Ghana', flag: '🇬🇭' },
];

interface BookingFormProps {
  checkIn?: Date;
  checkOut?: Date;
  setCheckIn: (date?: Date) => void;
  setCheckOut: (date?: Date) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  adults: number;
  setAdults: (guests: number) => void;
  children: number;
  setChildren: (children: number) => void;
  specialRequests: string;
  setSpecialRequests: (requests: string) => void;
  bookingError: string | null;
}

const BookingForm: React.FC<BookingFormProps> = ({
  checkIn,
  checkOut,
  setCheckIn,
  setCheckOut,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  adults,
  setAdults,
  children,
  setChildren,
  specialRequests,
  setSpecialRequests,
  bookingError
}) => {
  // Total guests calculation
  const totalGuests = adults + children;
  
  // Default to Greece country code (+30)
  const [selectedCountryCode, setSelectedCountryCode] = useState('+30');

  // State for pricing information
  const [priceSummary, setPriceSummary] = useState<{
    basePrice: number;
    nights: number;
    discount: number;
    discountPercentage: number;
    discountText: string;
    cleaningFee: number;
    totalPrice: number;
  }>({
    basePrice: 0,
    nights: 0,
    discount: 0,
    discountPercentage: 0,
    discountText: '',
    cleaningFee: 0,
    totalPrice: 0
  });

  // Get booking data from the same hook used in AvailabilityCalendar
  const { isDateBooked } = useBookings();
  
  // Update pricing information when dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const pricing = pricingService.calculateTotalPrice(checkIn, checkOut);
      setPriceSummary(pricing);
    } else {
      setPriceSummary({
        basePrice: 0,
        nights: 0,
        discount: 0,
        discountPercentage: 0,
        discountText: '',
        cleaningFee: 0,
        totalPrice: 0
      });
    }
  }, [checkIn, checkOut]);
  
  // Parse phone number to separate country code and number
  const getPhoneWithoutCode = () => {
    // If phone already starts with a plus sign, try to extract the actual number
    if (phone.startsWith('+')) {
      // Find the first non-digit character after the plus sign
      const match = phone.match(/^\+\d+\s*(.*)$/);
      return match ? match[1] : '';
    }
    return phone;
  };

  // Handle date change from picker
  const handleDateChange = (range: { from?: Date, to?: Date }) => {
    setCheckIn(range.from);
    setCheckOut(range.to);
  };
  
  // Handle country code change
  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCode = e.target.value;
    setSelectedCountryCode(newCode);
    
    // Update the full phone number with the new country code
    setPhone(`${newCode} ${getPhoneWithoutCode()}`);
  };
  
  // Handle phone number change
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    // Always combine the country code with the phone number
    setPhone(`${selectedCountryCode} ${phoneNumber}`);
  };

  // Helper function for rendering guest counter
  const GuestCounter = ({ 
    value, 
    setValue, 
    min, 
    max, 
    label, 
    icon, 
    hint 
  }: { 
    value: number, 
    setValue: (val: number) => void,
    min: number,
    max: number,
    label: string,
    icon: React.ReactNode,
    hint: string
  }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-[var(--sea-blue)]/10 p-2 rounded-lg text-[var(--primary-blue)]">
            {icon}
          </div>
          <div>
            <p className="font-medium text-gray-800">{label}</p>
            <p className="text-xs text-gray-500">{hint}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className={cn(
              "rounded-full h-8 w-8 flex items-center justify-center transition-colors",
              "text-gray-500 hover:text-[var(--primary-blue)] hover:bg-[var(--sea-blue)]/10",
              value <= min && "opacity-30 cursor-not-allowed hover:bg-transparent hover:text-gray-500"
            )}
            onClick={() => setValue(Math.max(min, value - 1))}
            disabled={value <= min}
          >
            <Minus size={16} />
          </Button>
          
          <div className="mx-2 w-8 text-center font-semibold text-lg">
            {value}
          </div>
          
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className={cn(
              "rounded-full h-8 w-8 flex items-center justify-center transition-colors",
              "text-gray-500 hover:text-[var(--primary-blue)] hover:bg-[var(--sea-blue)]/10",
              value >= max || totalGuests >= 8 ? "opacity-30 cursor-not-allowed hover:bg-transparent hover:text-gray-500" : ""
            )}
            onClick={() => setValue(Math.min(max, value + 1))}
            disabled={value >= max || totalGuests >= 8}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[var(--sea-blue)] to-[var(--primary-blue)]" 
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
      
      {value >= max && (
        <p className="text-xs text-amber-600 mt-1.5 flex items-center">
          <span className="mr-1"><CheckCircle size={12} /></span>
          Maximum reached
        </p>
      )}
    </div>
  );

  return (
    <div className="p-6 md:p-8 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="space-y-3">
        {/* Section Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center rounded-full bg-[var(--sea-blue)]/10 p-2 mb-3">
            <Calendar className="h-5 w-5 text-[var(--primary-blue)]" />
          </div>
          <h2 className="text-2xl font-bold text-[var(--deep-blue)] mb-1">Complete Your Reservation</h2>
          <p className="text-gray-600">Just a few steps to secure your perfect Kefalonian getaway</p>
        </div>

        {/* Date Selection */}
        <div className="bg-[var(--off-white)]/30 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-[var(--deep-blue)] mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
            Select Your Dates
          </h3>
          
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <CustomDateRangePicker
              initialStartDate={checkIn}
              initialEndDate={checkOut}
              isDateDisabled={isDateBooked}
              onChange={handleDateChange}
              className="border-0 p-0 shadow-none"
              showPrices={true}
            />
          </div>
          
          {checkIn && checkOut && (
            <div className="mt-4 p-4 bg-[var(--sand)]/20 rounded-lg border border-[var(--sand)]/20">
              <p className="font-medium text-[var(--deep-blue)] mb-2">Your Stay Details</p>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-gray-600">Check-in</span>
                <span className="font-semibold">{format(checkIn, 'MMMM d, yyyy')}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Check-out</span>
                <span className="font-semibold">{format(checkOut, 'MMMM d, yyyy')}</span>
              </div>
              
              {/* Price Summary - using pricing service data */}
              {priceSummary.nights > 0 && (
                <div className="mt-4 pt-3 border-t border-[var(--sand)]/30">
                  <p className="font-medium text-[var(--deep-blue)] mb-2">Price Summary</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        €{Math.round(priceSummary.basePrice / priceSummary.nights)} × {priceSummary.nights} nights
                      </span>
                      <span>€{priceSummary.basePrice}</span>
                    </div>
                    
                    {priceSummary.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>{priceSummary.discountText} ({Math.round(priceSummary.discountPercentage * 100)}% off)</span>
                        <span>-€{priceSummary.discount}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span>€{priceSummary.cleaningFee}</span>
                    </div>
                    
                    <div className="flex justify-between font-medium pt-2 border-t border-[var(--sand)]/30 mt-2">
                      <span>Total</span>
                      <span className="text-[var(--deep-blue)]">€{priceSummary.totalPrice}</span>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-1">Price includes all taxes and fees</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Guest Count */}
        <div className="bg-[var(--off-white)]/30 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-[var(--deep-blue)] mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
            Guest Selection
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <GuestCounter
              value={adults}
              setValue={setAdults}
              min={1}
              max={5}
              label="Adults"
              icon={<Users className="h-4 w-4" />}
              hint="Ages 13+"
            />
            <GuestCounter
              value={children}
              setValue={setChildren}
              min={0}
              max={3}
              label="Children"
              icon={<Baby className="h-4 w-4" />}
              hint="Ages 0-12"
            />
          </div>
        </div>
        
        {/* Personal Information */}
        <div className="bg-[var(--off-white)]/30 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-[var(--deep-blue)] mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
            Personal Information
          </h3>
          
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-1.5 block">
                  First Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="First name"
                  value={name.split(' ')[0] || ''}
                  onChange={(e) => {
                    const lastName = name.split(' ').slice(1).join(' ');
                    setName(`${e.target.value} ${lastName}`.trim());
                  }}
                  required
                  className="w-full px-4 py-2 border-gray-200 rounded-md focus:ring-2 focus:ring-[var(--sea-blue)] focus:border-transparent"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Last Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={name.split(' ').slice(1).join(' ')}
                  onChange={(e) => {
                    const firstName = name.split(' ')[0] || '';
                    setName(`${firstName} ${e.target.value}`.trim());
                  }}
                  required
                  className="w-full px-4 py-2 border-gray-200 rounded-md focus:ring-2 focus:ring-[var(--sea-blue)] focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1.5 block">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border-gray-200 rounded-md focus:ring-2 focus:ring-[var(--sea-blue)] focus:border-transparent"
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1.5 block">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <div className="flex rounded-md">
                <div className="relative">
                  <select 
                    className="h-full py-2 pl-3 pr-8 bg-gray-50 border border-gray-200 border-r-0 rounded-l-md text-sm focus:ring-2 focus:ring-[var(--sea-blue)] focus:border-transparent"
                    value={selectedCountryCode}
                    onChange={handleCountryCodeChange}
                  >
                    {countryCodes.map(({ code, flag }) => (
                      <option key={`${code}-${flag}`} value={code}>
                        {flag} {code}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={getPhoneWithoutCode()}
                  onChange={handlePhoneChange}
                  required
                  className="flex-grow rounded-l-none border-l-0 focus:ring-2 focus:ring-[var(--sea-blue)] focus:border-transparent"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">We'll only contact you about your reservation</p>
            </div>
          </div>
        </div>
        
        {/* Special Requests */}
        <div className="bg-[var(--off-white)]/30 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-[var(--deep-blue)] mb-4 flex items-center">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--terracotta)]">
                <path d="M8 21h12a2 2 0 0 0 2-2v-2H10v2a2 2 0 0 1-2 2Z"/>
                <path d="M19 15V2a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v15h15Z"/>
                <path d="M6 15v2a2 2 0 0 0 2 2h2"/>
                <path d="M13.3 7.4a.7.7 0 0 1-.3-.6.7.7 0 0 1 .7-.7h4.7a.7.7 0 0 1 .6.3"/>
                <path d="M13.8 10.4a.7.7 0 0 1-.4-.3.7.7 0 0 1 .3-1h3.6a.7.7 0 0 1 .7.7.7.7 0 0 1-.3.6"/>
                <path d="M14.6 13.4a.7.7 0 0 1-.6-.3.7.7 0 0 1 0-1 .7.7 0 0 1 .6-.3h1.8a.7.7 0 0 1 .6.3.7.7 0 0 1 .1 1 .7.7 0 0 1-.7.3"/>
              </svg>
            </span>
            Special Requests
          </h3>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Textarea
              placeholder="Let us know if you have any special requests or needs for your stay..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full px-4 py-3 border-gray-200 rounded-md min-h-32 focus:ring-2 focus:ring-[var(--sea-blue)] focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-2">Optional: Let us know about any special preferences or accommodations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;