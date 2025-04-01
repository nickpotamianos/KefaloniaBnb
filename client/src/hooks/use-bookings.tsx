import { useState, useEffect } from "react";
import { isWithinInterval, isSameDay } from "date-fns";
import ICAL from "ical.js";

export type BookingEvent = {
  startDate: Date;
  endDate: Date;
  summary: string;
};

const CALENDAR_URLS = [
  //"https://api.host.holidu.com/pmc/rest/apartments/62738918/ical.ics?key=133c7bc35012e5825e06b5cd503c77e8",
  "https://ical.booking.com/v1/export?t=ae535b52-549f-4976-bffd-dd05f7121b9c",
  "https://www.airbnb.com/calendar/ical/936140466545331330.ics?s=4db5df46d02514f399d3cc9362b00162",
  "http://www.vrbo.com/icalendar/a5f9a9c10a434d21a93c76b054037556.ics?nonTentative",
  //"https://my-api.hometogo.com/api/calendar/export/M2BH67W.ics"
];

// For development, use AllOrigins as a CORS proxy
const corsProxyUrl = "https://api.allorigins.win/raw?url=";

export const useBookings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingEvent[]>([]);

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

  // Utility function to check if a date is booked
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

  return {
    bookings,
    isLoading,
    error,
    isDateBooked
  };
};