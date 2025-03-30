import React, { useState, useEffect } from "react";
import { addMonths, format, isWithinInterval, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import ICAL from "ical.js";

type AvailabilityCalendarProps = {
  className?: string;
};

type BookingEvent = {
  startDate: Date;
  endDate: Date;
  summary: string;
};

const CALENDAR_URLS = [
  "https://api.host.holidu.com/pmc/rest/apartments/62738918/ical.ics?key=133c7bc35012e5825e06b5cd503c77e8",
  "https://ical.booking.com/v1/export?t=ae535b52-549f-4976-bffd-dd05f7121b9c",
  "https://www.airbnb.com/calendar/ical/936140466545331330.ics?s=4db5df46d02514f399d3cc9362b00162",
  "http://www.vrbo.com/icalendar/a5f9a9c10a434d21a93c76b054037556.ics?nonTentative",
  "https://my-api.hometogo.com/api/calendar/export/M2BH67W.ics"
];

// For development, use AllOrigins as a CORS proxy
const corsProxyUrl = "https://api.allorigins.win/raw?url=";

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingEvent[]>([]);
  const [month, setMonth] = useState<Date>(new Date());
  const [days, setDays] = useState<{date: Date, isBooked: boolean}[]>([]);
  
  // Fetch booking data from iCal feeds
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const allBookings: BookingEvent[] = [];
        
        // Process each calendar URL
        for (const url of CALENDAR_URLS) {
          try {
            // Use the CORS proxy to fetch the iCal feed
            const encodedUrl = encodeURIComponent(url);
            const response = await fetch(`${corsProxyUrl}${encodedUrl}`);
            
            if (!response.ok) {
              console.error(`Failed to fetch from ${url}: ${response.statusText}`);
              continue;
            }
            
            const icalData = await response.text();
            
            // Parse the iCal data
            try {
              const jcalData = ICAL.parse(icalData);
              const comp = new ICAL.Component(jcalData);
              const events = comp.getAllSubcomponents("vevent");
              
              events.forEach((event) => {
                const icalEvent = new ICAL.Event(event);
                const startDate = icalEvent.startDate.toJSDate();
                const endDate = icalEvent.endDate.toJSDate();
                
                // For booking purposes, the end date is exclusive in iCal,
                // so we consider the day before as the last booked day
                const adjustedEndDate = new Date(endDate);
                adjustedEndDate.setDate(adjustedEndDate.getDate() - 1);
                
                allBookings.push({
                  startDate,
                  endDate: adjustedEndDate,
                  summary: icalEvent.summary || "Booked"
                });
              });
            } catch (err) {
              console.error(`Error parsing iCal data from ${url}:`, err);
            }
          } catch (err) {
            console.error(`Error processing ${url}:`, err);
          }
        }
        
        setBookings(allBookings);
      } catch (err) {
        console.error("Calendar fetch error:", err);
        setError("Failed to load availability data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCalendarData();
  }, []);
  
  // Determine if a date is booked based on the fetched bookings
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
    // Get all days in the current month
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Calculate booking status for each day
    const daysWithStatus = daysInMonth.map(day => ({
      date: day,
      isBooked: isDateBooked(day)
    }));
    
    setDays(daysWithStatus);
  }, [month, bookings]);
  
  const handlePreviousMonth = () => {
    setMonth(prev => addMonths(prev, -1));
  };
  
  const handleNextMonth = () => {
    setMonth(prev => addMonths(prev, 1));
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
            className={cn(
              "h-10 w-full flex items-center justify-center rounded-md text-sm transition-colors",
              isSameDay(day.date, new Date()) && "border-2 border-[var(--sea-blue)]",
              day.isBooked 
                ? "bg-red-100 text-red-700 line-through" 
                : "bg-green-50 hover:bg-green-100 cursor-pointer"
            )}
          >
            {format(day.date, "d")}
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <div className={cn("availability-calendar", className)}>
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
        
        <div className="flex justify-between text-sm text-gray-600 pt-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-white border-2 border-[var(--sea-blue)]"></span>
            <span>Today</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-red-100"></span>
            <span>Booked</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-50"></span>
            <span>Available</span>
          </div>
        </div>
        
        {/* Seasonal indicators */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Season Information</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[var(--terracotta)]"></span>
              <span className="text-sm text-gray-600">Peak Season (Jun-Sep)</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[var(--sea-blue)]"></span>
              <span className="text-sm text-gray-600">Great Weather (Apr-May, Oct)</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 rounded-full bg-[var(--olive)]"></span>
              <span className="text-sm text-gray-600">Best Value (Nov-Mar)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;