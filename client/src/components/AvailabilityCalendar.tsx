import React, { useState, useEffect } from "react";
import { addMonths, format, isWithinInterval, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, 
  isBefore, isToday, compareAsc, startOfWeek, endOfWeek, getMonth } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookings } from "@/hooks/use-bookings";

type AvailabilityCalendarProps = {
  className?: string;
  showPrices?: boolean;
  showHelpText?: boolean;
};

// Price configuration per night based on seasons
const getPriceForDate = (date: Date): number => {
  const month = getMonth(date);
  
  // June
  if (month === 5) return 180;
  // July and August - peak season
  if (month === 6 || month === 7) return 200; 
  // April and May - early season
  if (month === 3 || month === 4) return 170;
  // September - late summer
  if (month === 8) return 180;
  // Rest of the year - off-season
  return 150;
};

// Calculate discounts based on length of stay
const calculateDiscount = (nights: number): { discountPercentage: number, discountText: string } => {
  // 20% off for stays of 30+ nights
  if (nights >= 30) return { discountPercentage: 0.20, discountText: '20% monthly discount' };
  // 12% off for stays of 7+ nights
  if (nights >= 7) return { discountPercentage: 0.12, discountText: '12% weekly discount' };
  // No discount
  return { discountPercentage: 0, discountText: '' };
};

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ 
  className, 
  showPrices = false,
  showHelpText = false 
}) => {
  const { isLoading, error, bookings } = useBookings();
  const [month, setMonth] = useState<Date>(new Date());
  const [days, setDays] = useState<{
    date: Date, 
    isBooked: boolean, 
    isPast: boolean, 
    isCurrentMonth: boolean,
    price: number
  }[]>([]);
  
  // New states for date selection
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectionPhase, setSelectionPhase] = useState<'start' | 'end'>('start');
  const [showBookButton, setShowBookButton] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const [discountInfo, setDiscountInfo] = useState<{percentage: number, text: string} | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  
  // Create isDateBooked function within component to prevent dependency issues
  const isDateBooked = (date: Date): boolean => {
    return bookings.some(booking => 
      isWithinInterval(date, { 
        start: booking.startDate, 
        end: booking.endDate 
      }) || 
      isSameDay(date, booking.startDate) || 
      isSameDay(date, booking.endDate)
    );
  };
  
  // Calculate days for the current month with booking status
  useEffect(() => {
    // Get all days in the current month, plus days from prev/next month to fill the week
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const calendarStart = startOfWeek(monthStart);
    const calendarEnd = endOfWeek(monthEnd);
    
    const daysInView = eachDayOfInterval({ start: calendarStart, end: calendarEnd });
    const today = new Date();
    
    // Calculate booking status for each day
    const daysWithStatus = daysInView.map(day => ({
      date: day,
      isBooked: isDateBooked(day),
      isPast: isBefore(day, today) && !isToday(day),
      isCurrentMonth: day.getMonth() === month.getMonth(),
      price: getPriceForDate(day)
    }));
    
    setDays(daysWithStatus);
  }, [month, bookings]); // Only depend on month and bookings, not the function

  // Calculate the total price when date range changes
  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      const nights = Math.max(1, Math.round((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)));
      let totalCost = 0;
      
      // Get all dates in the selected range
      const datesInRange = eachDayOfInterval({
        start: selectedStartDate,
        end: new Date(selectedEndDate.getTime() - 86400000) // Subtract one day as checkout day is not counted
      });
      
      // Sum up the price for each night
      datesInRange.forEach(date => {
        totalCost += getPriceForDate(date);
      });
      
      // Apply discount based on length of stay
      const { discountPercentage, discountText } = calculateDiscount(nights);
      if (discountPercentage > 0) {
        const discountAmount = totalCost * discountPercentage;
        totalCost = totalCost - discountAmount;
        setDiscountInfo({
          percentage: discountPercentage * 100,
          text: discountText
        });
      } else {
        setDiscountInfo(null);
      }
      
      // Add cleaning fee (€60)
      totalCost += 60;
      
      setTotalPrice(totalCost);
    } else {
      setTotalPrice(null);
      setDiscountInfo(null);
    }
  }, [selectedStartDate, selectedEndDate]);

  // Handle date selection
  const handleDateClick = (day: {date: Date, isBooked: boolean, isPast: boolean, isCurrentMonth: boolean}) => {
    if (day.isPast || day.isBooked) return;
    
    if (selectionPhase === 'start') {
      // Starting a new selection
      setSelectedStartDate(day.date);
      setSelectedEndDate(null);
      setSelectionPhase('end');
      setShowBookButton(false);
    } else {
      // Completing the selection
      // Ensure end date is after start date
      if (selectedStartDate && compareAsc(day.date, selectedStartDate) >= 0) {
        setSelectedEndDate(day.date);
        setSelectionPhase('start');
        
        // Animate the button appearance
        setTimeout(() => {
          setShowBookButton(true);
          setTimeout(() => setAnimateButton(true), 100);
        }, 300);
      } else {
        // If user clicks a date before start date, treat it as a new start date
        setSelectedStartDate(day.date);
        setSelectedEndDate(null);
      }
    }
  };
  
  // Check if a date is within the selected range
  const isInSelectedRange = (date: Date): boolean => {
    if (!selectedStartDate || !selectedEndDate) {
      return false;
    }
    return isWithinInterval(date, {
      start: selectedStartDate,
      end: selectedEndDate
    });
  };
  
  // Check if a date is the selected start or end date
  const isSelectedDate = (date: Date): boolean => {
    return (selectedStartDate && isSameDay(date, selectedStartDate)) || 
           (selectedEndDate && isSameDay(date, selectedEndDate));
  };
  
  const handlePreviousMonth = () => {
    setMonth(prev => addMonths(prev, -1));
  };
  
  const handleNextMonth = () => {
    setMonth(prev => addMonths(prev, 1));
  };

  const handleBookNow = () => {
    if (selectedStartDate && selectedEndDate) {
      const startDateStr = format(selectedStartDate, 'yyyy-MM-dd');
      const endDateStr = format(selectedEndDate, 'yyyy-MM-dd');
      
      // Use the current domain instead of hardcoded production URL
      // This ensures it works both in development and production
      const currentDomain = window.location.origin;
      window.location.href = `${currentDomain}/booking?checkIn=${startDateStr}&checkOut=${endDateStr}`;
    }
  };

  // Reset selection
  const handleResetSelection = () => {
    setSelectedStartDate(null);
    setSelectedEndDate(null);
    setSelectionPhase('start');
    setShowBookButton(false);
    setAnimateButton(false);
  };

  // Create a visual calendar grid
  const renderCalendarGrid = () => {
    if (isLoading) {
      return (
        <div className="h-[320px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[var(--terracotta)]"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="h-[200px] flex items-center justify-center">
          <div className="text-red-500 text-center">
            <p>{error}</p>
            <button 
              className="mt-3 px-4 py-2 bg-[var(--terracotta)] text-white rounded-md hover:bg-[var(--terracotta)]/90"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1 mt-3">
        {/* Render weekday names */}
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-center text-xs font-medium text-gray-500 mb-1">
            {day}
          </div>
        ))}
        
        {/* Render days in month */}
        {days.map((day, i) => (
          <div 
            key={i}
            className="relative"
          >
            <div 
              onClick={() => handleDateClick(day)}
              className={cn(
                "h-10 w-full flex items-center justify-center rounded-md text-sm transition-all",
                !day.isCurrentMonth && "opacity-40",
                isToday(day.date) && !isSelectedDate(day.date) && "border-2 border-[var(--sea-blue)]",
                day.isPast 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                  : day.isBooked 
                    ? "bg-red-100 text-red-700 line-through cursor-not-allowed" 
                    : isSelectedDate(day.date)
                      ? "bg-[var(--terracotta)] text-white font-bold hover:bg-[var(--terracotta)]/90 cursor-pointer"
                      : isInSelectedRange(day.date)
                        ? "bg-[var(--terracotta)]/20 hover:bg-[var(--terracotta)]/30 cursor-pointer"
                        : selectedStartDate && !selectedEndDate && isSameDay(day.date, selectedStartDate)
                          ? "bg-[var(--terracotta)] text-white font-bold cursor-pointer"
                          : "bg-green-50 hover:bg-green-100 cursor-pointer",
                "transition-all duration-200"
              )}
            >
              {format(day.date, "d")}
            </div>
            {showPrices && day.isCurrentMonth && !day.isPast && !day.isBooked && (
              <div className="text-[9px] text-center mt-1 font-medium text-gray-600">
                €{day.price}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className={cn("availability-calendar relative", className)}>
      <div className="space-y-4">
        {showHelpText && (
          <div className="relative">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium text-gray-700">Check Availability & Prices</h3>
              <button 
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowHelp(!showHelp)}
              >
                <Info className="h-4 w-4" />
              </button>
            </div>
            
            {showHelp && (
              <div className="absolute right-0 mt-2 w-72 bg-white p-3 rounded-md shadow-lg z-10 text-xs leading-relaxed text-gray-700 border border-gray-200">
                <p className="font-medium mb-1">How to use this calendar:</p>
                <ol className="list-decimal ml-4 space-y-1">
                  <li>Click once to select your check-in date</li>
                  <li>Click again to select your check-out date</li>
                  <li>View the total price with any applicable discounts</li>
                </ol>
                <p className="mt-2 font-medium">Special offers:</p>
                <ul className="list-disc ml-4 space-y-1">
                  <li>12% discount for 7+ night stays</li>
                  <li>20% discount for 30+ night stays</li>
                </ul>
                <p className="mt-2 text-[10px] text-gray-500">Prices shown include taxes.</p>
              </div>
            )}
          </div>
        )}
      
        <div className="flex justify-between items-center">
          <button 
            onClick={handlePreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          
          <h3 className="text-lg font-semibold text-gray-800">
            {format(month, "MMMM yyyy")}
          </h3>
          
          <button 
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
        
        {renderCalendarGrid()}
        
        <div className="flex justify-between items-center pt-2">
          <div className="flex gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-red-100"></span>
              <span>Booked</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green-50"></span>
              <span>Available</span>
            </div>
          </div>
          
          {selectedStartDate && (
            <button 
              onClick={handleResetSelection}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Reset selection
            </button>
          )}
        </div>
        
        {/* Seasonal price info */}
        {showPrices && (
          <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            <p className="font-medium mb-1">Seasonal Rates:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <div>Apr-May: <span className="font-medium">€170/night</span></div>
              <div>Jun & Sep: <span className="font-medium">€180/night</span></div>
              <div>Jul-Aug: <span className="font-medium">€200/night</span></div>
              <div>Rest of year: <span className="font-medium">€150/night</span></div>
            </div>
          </div>
        )}
        
        {/* Selection info */}
        {selectedStartDate && (
          <div className="pt-2 text-sm">
            <p className="font-medium">
              {selectionPhase === 'end' ? 'Select checkout date' : 'Selected dates:'}
            </p>
            <p className="text-gray-600">
              {format(selectedStartDate, 'MMM d, yyyy')}
              {selectedEndDate ? ` to ${format(selectedEndDate, 'MMM d, yyyy')}` : ''}
            </p>
            
            {/* Price calculation */}
            {totalPrice && selectedEndDate && (
              <div className="mt-2 p-3 bg-gray-50 rounded-md">
                <div className="text-gray-700 font-medium">Price Details:</div>
                <div className="text-sm text-gray-600 mt-1">
                  <div className="flex justify-between">
                    <span>Nightly rate × {Math.round((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24))} nights</span>
                    <span>€{totalPrice - 60}</span>
                  </div>
                  
                  {discountInfo && (
                    <div className="flex justify-between text-green-600">
                      <span>{discountInfo.text}</span>
                      <span>-{discountInfo.percentage}%</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>€60</span>
                  </div>
                  
                  <div className="flex justify-between font-medium border-t border-gray-200 pt-1 mt-1 text-gray-700">
                    <span>Total</span>
                    <span>€{totalPrice}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Book Now button */}
      {showBookButton && (
        <div className={cn(
          "mt-4 transition-all duration-500 ease-in-out transform",
          animateButton ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <button
            onClick={handleBookNow}
            className="w-full flex items-center justify-center gap-2 bg-[var(--terracotta)] text-white py-3 px-6 rounded-lg shadow-lg hover:bg-[var(--terracotta)]/90 transition-all"
          >
            <CalendarIcon className="h-5 w-5" />
            <span className="font-medium">Complete Booking</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AvailabilityCalendar;