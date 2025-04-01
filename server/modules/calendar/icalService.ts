import { storage } from '../../storage';
import ICAL from 'ical.js';
import fetch from 'node-fetch';
import { differenceInDays, addDays } from 'date-fns';

// External calendar URLs (these could be moved to environment variables)
const CALENDAR_URLS = [
  //"https://api.host.holidu.com/pmc/rest/apartments/62738918/ical.ics?key=133c7bc35012e5825e06b5cd503c77e8",
  "https://ical.booking.com/v1/export?t=ae535b52-549f-4976-bffd-dd05f7121b9c",
  "https://www.airbnb.com/calendar/ical/936140466545331330.ics?s=4db5df46d02514f399d3cc9362b00162",
  "http://www.vrbo.com/icalendar/a5f9a9c10a434d21a93c76b054037556.ics?nonTentative",
  //"https://my-api.hometogo.com/api/calendar/export/M2BH67W.ics"
];

// Types for date ranges
interface DateRange {
  start: Date;
  end: Date;
  source: string;
}

/**
 * Fetches iCal data from all external calendars
 * @returns Array of iCal data as strings
 */
async function fetchExternalCalendars(): Promise<string[]> {
  try {
    const icalPromises = CALENDAR_URLS.map(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Failed to fetch from ${url}: ${response.statusText}`);
          return "";
        }
        return response.text();
      } catch (error) {
        console.error(`Error fetching from ${url}:`, error);
        return "";
      }
    });
    
    const results = await Promise.all(icalPromises);
    return results.filter(data => data !== "");
  } catch (error) {
    console.error("Error fetching external calendars:", error);
    return [];
  }
}

/**
 * Parses iCal data and extracts booked date ranges
 * @param icalData iCal data as string
 * @param source Source name for the booking (e.g., "Airbnb", "Booking.com")
 * @returns Array of date ranges
 */
function parseICalData(icalData: string, source: string): DateRange[] {
  try {
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const events = comp.getAllSubcomponents('vevent');
    
    return events.map(event => {
      const icalEvent = new ICAL.Event(event);
      const startDate = icalEvent.startDate.toJSDate();
      // Some calendar systems don't include time with the end date, making it end at 00:00
      // which effectively means the checkout is the day before. Adjust by adding 1 day.
      const endDate = icalEvent.endDate.toJSDate();
      
      return {
        start: startDate,
        end: endDate,
        source
      };
    }).filter(range => {
      // Filter out past bookings
      const now = new Date();
      return range.end >= now;
    });
  } catch (error) {
    console.error(`Error parsing iCal data from ${source}:`, error);
    return [];
  }
}

/**
 * Gets all booked date ranges from external calendars and direct bookings
 * @returns Array of all booked date ranges
 */
async function getAllBookedDateRanges(): Promise<DateRange[]> {
  try {
    // Get external calendar bookings
    const externalIcalData = await fetchExternalCalendars();
    const externalBookings = externalIcalData.flatMap((icalData, index) => 
      parseICalData(icalData, `External-${index}`)
    );
    
    // Get direct bookings from database
    const directBookings = await storage.getAllBookings();
    const directBookingRanges = directBookings
      .filter(booking => booking.paymentStatus === 'confirmed')
      .map(booking => ({
        start: new Date(booking.checkIn),
        end: new Date(booking.checkOut),
        source: 'DirectBooking'
      }));
    
    return [...externalBookings, ...directBookingRanges];
  } catch (error) {
    console.error("Error getting all booked date ranges:", error);
    return [];
  }
}

/**
 * Checks if a date range is available (not overlapping with any booked dates)
 * @param startDate Check-in date
 * @param endDate Check-out date
 * @returns Boolean indicating if the date range is available
 */
export async function isDateRangeAvailable(startDate: Date, endDate: Date): Promise<boolean> {
  try {
    const bookedRanges = await getAllBookedDateRanges();
    
    // Check for overlaps with any booked range
    for (const bookedRange of bookedRanges) {
      // Check if there's any overlap between the dates
      if (
        (startDate < bookedRange.end && endDate > bookedRange.start)
      ) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error("Error checking date availability:", error);
    return false;
  }
}

/**
 * Gets all blocked date ranges for display in the calendar
 * @returns Array of blocked date ranges
 */
export async function getBlockedDateRanges(): Promise<DateRange[]> {
  return await getAllBookedDateRanges();
}

/**
 * Generates an iCal file with all bookings
 * @returns iCal file as string
 */
export async function generateICalFile(): Promise<string> {
  try {
    const bookedRanges = await getAllBookedDateRanges();
    
    // Create iCal calendar
    const calendar = new ICAL.Component(['vcalendar', [], []]);
    calendar.updatePropertyWithValue('prodid', '-//KefaloniaBnb//Direct Booking Calendar//EN');
    calendar.updatePropertyWithValue('version', '2.0');
    
    // Add events for each booking
    bookedRanges.forEach((range, index) => {
      const event = new ICAL.Component(['vevent', [], []]);
      
      // Create a unique ID for the event
      const uid = `booking-${index}-${Date.now()}@kefalonia-bnb.com`;
      
      // Set event properties
      event.updatePropertyWithValue('uid', uid);
      event.updatePropertyWithValue('summary', 'Booked');
      event.updatePropertyWithValue('description', `Booked (Source: ${range.source})`);
      
      // Set start and end dates
      const startDate = new ICAL.Time.fromJSDate(range.start, false);
      const endDate = new ICAL.Time.fromJSDate(range.end, false);
      event.updatePropertyWithValue('dtstart', startDate);
      event.updatePropertyWithValue('dtend', endDate);
      
      // Add event to calendar
      calendar.addSubcomponent(event);
    });
    
    return calendar.toString();
  } catch (error) {
    console.error("Error generating iCal file:", error);
    throw error;
  }
}