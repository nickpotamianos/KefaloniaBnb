import React from 'react';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import CustomDateRangePicker from '@/components/CustomDateRangePicker';
import { Users, Baby, Minus, Plus, Calendar, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Constants that can be imported by Booking.tsx
export const BASE_PRICE_PER_NIGHT = 150;
export const CLEANING_FEE = 50;
export const ADDITIONAL_GUEST_FEE = 25;
export const MIN_NIGHTS = 2;

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

  // Handle date change from picker
  const handleDateChange = (range: { from?: Date, to?: Date }) => {
    setCheckIn(range.from);
    setCheckOut(range.to);
  };

  // Check if date is booked (in a real app, this would interact with a backend)
  const isDateDisabled = (date: Date): boolean => {
    // Add logic here to check if a specific date is already booked
    // For now, this is just a placeholder implementation
    const bookedDates = [
      new Date(2025, 6, 15),  // July 15, 2025
      new Date(2025, 6, 16),  // July 16, 2025
      new Date(2025, 6, 17),  // July 17, 2025
      new Date(2025, 7, 10),  // August 10, 2025
      new Date(2025, 7, 11),  // August 11, 2025
    ];
    
    return bookedDates.some(bookedDate => 
      bookedDate.getDate() === date.getDate() &&
      bookedDate.getMonth() === date.getMonth() &&
      bookedDate.getFullYear() === date.getFullYear()
    );
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
      <div className="space-y-10">
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
              isDateDisabled={isDateDisabled}
              onChange={handleDateChange}
              className="border-0 p-0 shadow-none"
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
              hint="Ages 13 and up"
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