import React, { useState, useEffect } from "react";
import { addMonths, format, isWithinInterval, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, 
  isBefore, isToday, compareAsc, startOfWeek, endOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useBookings } from "@/hooks/use-bookings";

type AvailabilityCalendarProps = {
  className?: string;
};

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ className }) => {
  const { isLoading, error, bookings } = useBookings();
  const [month, setMonth] = useState<Date>(new Date());
  const [days, setDays] = useState<{date: Date, isBooked: boolean, isPast: boolean, isCurrentMonth: boolean}[]>([]);
  
  // New states for date selection
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);
  const [selectionPhase, setSelectionPhase] = useState<'start' | 'end'>('start');
  const [showBookButton, setShowBookButton] = useState(false);
  const [animateButton, setAnimateButton] = useState(false);
  
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
      isCurrentMonth: day.getMonth() === month.getMonth()
    }));
    
    setDays(daysWithStatus);
  }, [month, bookings]); // Only depend on month and bookings, not the function

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
        ))}
      </div>
    );
  };
  
  return (
    <div className={cn("availability-calendar relative", className)}>
      <div className="space-y-4">
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