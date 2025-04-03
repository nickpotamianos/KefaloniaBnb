import { useState, useEffect } from "react";
import { isWithinInterval, isSameDay } from "date-fns";
import ICAL from "ical.js";
import { API_BASE_URL } from "../lib/api-config";

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

// Use our server-side proxy instead of AllOrigins
const useServerProxy = true;

export const useBookings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingEvent[]>([]);

  // Fetch booking data from both iCal feeds and direct bookings
  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const allBookings: BookingEvent[] = [];
        
        // First fetch direct bookings from our server API
        try {
          const directResponse = await fetch(`${API_BASE_URL}/api/calendar/blocked-dates`);
          
          if (directResponse.ok) {
            const blockedDates = await directResponse.json();
            
            // Convert server format to our BookingEvent format
            blockedDates.forEach((blockedDate: any) => {
              allBookings.push({
                startDate: new Date(blockedDate.start),
                endDate: new Date(blockedDate.end),
                summary: blockedDate.summary || "Booked"
              });
            });
            
            console.log("Loaded direct bookings:", blockedDates.length);
          } else {
            console.error("Failed to fetch direct bookings:", directResponse.statusText);
          }
        } catch (err) {
          console.error("Error fetching direct bookings:", err);
          // Don't fail completely if direct bookings fail, try external feeds
        }
        
        // Then fetch external calendar feeds through our server API
        try {
          const externalResponse = await fetch(`${API_BASE_URL}/api/calendar/availability`);
          
          if (externalResponse.ok) {
            const data = await externalResponse.json();
            
            if (data.success && Array.isArray(data.icalData)) {
              // Process each returned iCal feed
              data.icalData.forEach((icalData: string, index: number) => {
                try {
                  // Skip empty feeds
                  if (!icalData || icalData.trim().length === 0) {
                    console.warn(`Empty iCal feed from index ${index}`);
                    return;
                  }
                  
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
                } catch (parseErr) {
                  console.error(`Error parsing iCal feed ${index}:`, parseErr);
                }
              });
              
              console.log("Loaded external bookings from server:", data.icalData.length, "feeds");
            } else {
              console.error("Invalid server response format:", data);
            }
          } else {
            console.error("Failed to fetch external calendars:", externalResponse.statusText);
          }
        } catch (externalErr) {
          console.error("Error fetching external calendars from server:", externalErr);
        }
        
        // Deduplicate bookings that might appear in multiple sources
        // (based on same start/end date)
        const uniqueBookings = allBookings.filter((booking, index, self) => 
          index === self.findIndex(b => 
            b.startDate.getTime() === booking.startDate.getTime() && 
            b.endDate.getTime() === booking.endDate.getTime()
          )
        );
        
        setBookings(uniqueBookings);
        console.log("Total unique bookings loaded:", uniqueBookings.length);
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