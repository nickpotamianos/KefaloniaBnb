import { storage } from '../../storage';
import ICAL from 'ical.js';
import fetch from 'node-fetch';
import { differenceInDays, addDays, isBefore, isAfter, isEqual } from 'date-fns';
import { Booking } from '@shared/schema';
import axios from 'axios';

// External calendar URLs (these could be moved to environment variables)
const CALENDAR_URLS = [
  //"https://api.host.holidu.com/pmc/rest/apartments/62738918/ical.ics?key=133c7bc35012e5825e06b5cd503c77e8",
  "https://ical.booking.com/v1/export?t=ae535b52-549f-4976-bffd-dd05f7121b9c",
  "https://www.airbnb.com/calendar/ical/936140466545331330.ics?s=4db5df46d02514f399d3cc9362b00162",
  "http://www.vrbo.com/icalendar/a5f9a9c10a434d21a93c76b054037556.ics?nonTentative",
  //"https://my-api.hometogo.com/api/calendar/export/M2BH67W.ics"
];

// iCal feed URL for our own calendar that other platforms can subscribe to
const OUR_ICAL_URL = process.env.ICAL_FEED_URL || 'https://villakefalonia.potamianosgroup.com/api/calendar.ics';

// Types for date ranges
interface DateRange {
  start: Date;
  end: Date;
  source: string;
  uid?: string; // Unique identifier for the event
  summary?: string; // Event title/summary
}

/**
 * Fetches an iCal feed from a given URL
 * 
 * @param url The URL of the iCal feed to fetch
 * @returns The iCal data as a string
 */
export async function fetchIcalFeed(url: string): Promise<string> {
  try {
    const response = await axios.get(url, {
      timeout: 15000, // Increased timeout to 15 seconds
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/calendar,text/plain,application/octet-stream'
      },
      maxRedirects: 5, // Explicitly handle up to 5 redirects
      validateStatus: status => status < 500 // Consider only 500+ errors as axios errors
    });
    
    // Even if we get a non-200 status, we'll handle it ourselves
    if (response.status !== 200) {
      console.warn(`Received non-200 status (${response.status}) from ${url}`);
      if (response.status === 404) {
        throw new Error(`Calendar feed not found at ${url}`);
      }
      // For 400-level errors other than 404, log but return empty calendar
      if (response.status >= 400 && response.status < 500) {
        console.error(`Client error (${response.status}) fetching from ${url}`);
        return "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//KefaloniaBnb//Failed Calendar//EN\nEND:VCALENDAR";
      }
    }
    
    // Validate that we received valid iCal data (should start with BEGIN:VCALENDAR)
    const data = response.data.toString();
    if (!data.includes('BEGIN:VCALENDAR')) {
      console.error(`Invalid iCal data received from ${url}`);
      console.debug(`First 100 chars: ${data.substring(0, 100)}`);
      return "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//KefaloniaBnb//Invalid Calendar//EN\nEND:VCALENDAR";
    }
    
    return data;
  } catch (error) {
    // More detailed error logging
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        console.error(`Timeout fetching iCal feed from ${url}`);
      } else if (error.response) {
        console.error(`Error response fetching from ${url}: ${error.response.status}`);
      } else if (error.request) {
        console.error(`No response received from ${url}`);
      } else {
        console.error(`Error fetching iCal feed from ${url}: ${error.message}`);
      }
    } else {
      console.error(`Non-axios error fetching iCal feed from ${url}:`, error);
    }
    
    // Return an empty calendar instead of throwing
    return "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//KefaloniaBnb//Error Calendar//EN\nEND:VCALENDAR";
  }
}

/**
 * Fetches iCal data from all external calendars
 * @returns Array of iCal data as strings
 */
async function fetchExternalCalendars(): Promise<string[]> {
  try {
    const icalPromises = CALENDAR_URLS.map(async (url) => {
      try {
        const response = await fetchIcalFeed(url);
        return response;
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
    // Parse iCal data
    const jcalData = ICAL.parse(icalData);
    const comp = new ICAL.Component(jcalData);
    const events = comp.getAllSubcomponents("vevent");
    
    // Extract date ranges from events
    return events.map(event => {
      const icalEvent = new ICAL.Event(event);
      const startDate = icalEvent.startDate.toJSDate();
      const endDate = icalEvent.endDate.toJSDate();
      
      // For booking purposes, the end date is exclusive in iCal,
      // so we consider the day before as the last booked day
      const adjustedEndDate = addDays(endDate, -1);
      
      return {
        start: startDate,
        end: adjustedEndDate,
        source,
        uid: icalEvent.uid || undefined,
        summary: icalEvent.summary || 'Booked'
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
      parseICalData(icalData, CALENDAR_URLS[index])
    );
    
    // Get direct bookings from database
    const directBookings = await storage.getAllBookings();
    const directBookingRanges = directBookings
      .filter(booking => booking.paymentStatus === 'confirmed')
      .map(booking => ({
        start: new Date(booking.checkIn),
        end: new Date(booking.checkOut),
        source: 'DirectBooking',
        uid: booking.id,
        summary: `Booking: ${booking.name}`
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
    console.log(`Checking availability for date range: ${startDate.toISOString()} to ${endDate.toISOString()}`);
    
    // First, ensure dates are interpreted as start/end of day
    const adjustedStartDate = new Date(new Date(startDate).setHours(0, 0, 0, 0));
    // Checkout day should be available for new guests (use previous day as last booked day)
    const adjustedEndDate = new Date(new Date(endDate).setHours(0, 0, 0, 0));
    
    const bookedRanges = await getAllBookedDateRanges();
    console.log(`Found ${bookedRanges.length} booked ranges to check against`);
    
    // Log direct bookings specifically for debugging
    const directBookings = await storage.getAllBookings();
    console.log(`Direct bookings in storage: ${directBookings.length}`);
    directBookings.forEach(booking => {
      console.log(`Direct booking: ${booking.id}, ${booking.name}, ${new Date(booking.checkIn).toISOString()} to ${new Date(booking.checkOut).toISOString()}, status: ${booking.paymentStatus}`);
    });
    
    // Check for overlaps with any booked range
    for (const bookedRange of bookedRanges) {
      // Create new Date objects to avoid modifying the original objects
      const bookedStart = new Date(new Date(bookedRange.start).setHours(0, 0, 0, 0));
      const bookedEnd = new Date(new Date(bookedRange.end).setHours(0, 0, 0, 0));
      
      // Standard overlap check: one range starts before the other ends and ends after the other starts
      if (
        (adjustedStartDate < bookedEnd && adjustedEndDate > bookedStart)
      ) {
        console.log(`Date range ${adjustedStartDate.toISOString()} to ${adjustedEndDate.toISOString()} overlaps with booking ${bookedStart.toISOString()} to ${bookedEnd.toISOString()} from ${bookedRange.source}`);
        return false;
      }
    }
    
    console.log(`Date range ${adjustedStartDate.toISOString()} to ${adjustedEndDate.toISOString()} is available`);
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
    calendar.updatePropertyWithValue('calscale', 'GREGORIAN');
    calendar.updatePropertyWithValue('method', 'PUBLISH');
    calendar.updatePropertyWithValue('x-wr-calname', 'Kefalonia Vintage Home Availability');
    calendar.updatePropertyWithValue('x-wr-timezone', 'Europe/Athens');
    
    // Add events for each booking
    bookedRanges.forEach((range, index) => {
      const event = new ICAL.Component(['vevent', [], []]);
      
      // Create a unique ID for the event
      const uid = range.uid || `booking-${index}-${Date.now()}@kefalonia-bnb.com`;
      
      // Set event properties
      event.updatePropertyWithValue('uid', uid);
      event.updatePropertyWithValue('summary', range.summary || 'Booked');
      event.updatePropertyWithValue('description', `Booked (Source: ${range.source})`);
      
      // Set start and end dates - for iCal export, end date should be exclusive
      // (the day after the last booked night)
      const startDate = ICAL.Time.fromJSDate(range.start, false);
      // Add 1 day to end date to make it exclusive (standard for iCal format)
      const endDate = ICAL.Time.fromJSDate(addDays(range.end, 1), false);
      
      event.updatePropertyWithValue('dtstart', startDate);
      event.updatePropertyWithValue('dtend', endDate);
      event.updatePropertyWithValue('dtstamp', ICAL.Time.fromJSDate(new Date(), false));
      event.updatePropertyWithValue('created', ICAL.Time.fromJSDate(new Date(), false));
      
      // Set status
      event.updatePropertyWithValue('status', 'CONFIRMED');
      
      // Add event to calendar
      calendar.addSubcomponent(event);
    });
    
    return calendar.toString();
  } catch (error) {
    console.error("Error generating iCal file:", error);
    throw error;
  }
}

/**
 * Synchronizes bookings from external calendars to our system
 * @returns Boolean indicating success
 */
export async function syncFromExternalCalendars(): Promise<boolean> {
  try {
    // Fetch and parse all external calendar data
    const externalIcalData = await fetchExternalCalendars();
    const externalBookings: DateRange[] = [];
    
    // Parse each calendar's data
    externalIcalData.forEach((icalData, index) => {
      if (icalData) {
        const sourceUrl = CALENDAR_URLS[index];
        const sourceName = sourceUrl.includes('airbnb') ? 'Airbnb' : 
                           sourceUrl.includes('booking.com') ? 'Booking.com' :
                           sourceUrl.includes('vrbo') ? 'VRBO' : 'External';
        
        const bookings = parseICalData(icalData, sourceName);
        externalBookings.push(...bookings);
      }
    });
    
    // Get our existing direct bookings
    const directBookings = await storage.getAllBookings();
    
    // Check for any new external bookings that overlap with our direct bookings
    const conflicts = externalBookings.filter(externalBooking => {
      return directBookings.some(directBooking => {
        if (directBooking.paymentStatus !== 'confirmed') return false;
        
        const directStart = new Date(directBooking.checkIn);
        const directEnd = new Date(directBooking.checkOut);
        
        // Check for overlap
        return (externalBooking.start <= directEnd && externalBooking.end >= directStart);
      });
    });
    
    if (conflicts.length > 0) {
      console.warn('Found calendar conflicts:', conflicts);
      // Here you could implement conflict resolution or notification
      // For now, we'll just log the conflicts
    }
    
    console.log(`Synchronized ${externalBookings.length} external bookings`);
    return true;
  } catch (error) {
    console.error('Error synchronizing from external calendars:', error);
    return false;
  }
}

/**
 * Adds a new booking to external calendars
 * @param booking The booking to add
 * @returns Boolean indicating success
 */
export async function syncBookingToExternalCalendars(booking: Booking): Promise<boolean> {
  try {
    console.log(`Synchronizing booking ${booking.id} to external calendars`);
    
    // In a real implementation, this would push the booking to external calendars
    // through their APIs. For platforms that don't support direct API updates,
    // we provide our iCal feed URL that they can subscribe to.
    
    // Example code for direct API updates (commented out as it's platform-specific):
    /*
    // Update Airbnb calendar via API
    await fetch('https://api.airbnb.com/v2/calendar_operations', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${AIRBNB_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        listing_id: AIRBNB_LISTING_ID,
        operations: [{
          start_date: format(new Date(booking.checkIn), 'yyyy-MM-dd'),
          end_date: format(new Date(booking.checkOut), 'yyyy-MM-dd'),
          status: 'unavailable'
        }]
      })
    });
    */
    
    // For now, we'll just ensure our iCal feed is up to date
    // Other platforms will pull from our iCal feed URL
    await generateICalFile();
    
    return true;
  } catch (error) {
    console.error('Error synchronizing booking to external calendars:', error);
    return false;
  }
}

/**
 * Marks a booking as cancelled in the calendar
 * @param bookingId ID of the booking to cancel
 * @returns Boolean indicating success
 */
export async function cancelBookingInCalendar(bookingId: string): Promise<boolean> {
  try {
    // Update booking status in our database
    const booking = await storage.getBooking(bookingId);
    if (!booking) {
      console.error(`Booking ${bookingId} not found`);
      return false;
    }
    
    // Update booking status to 'cancelled'
    await storage.updateBookingStatus(bookingId, 'cancelled');
    
    // In a real implementation, we would also update external calendars
    // For now, our iCal feed will automatically exclude cancelled bookings
    
    console.log(`Cancelled booking ${bookingId} in calendar`);
    return true;
  } catch (error) {
    console.error('Error cancelling booking in calendar:', error);
    return false;
  }
}

/**
 * Checks if a booking exists in any external calendar
 * @param checkIn Check-in date
 * @param checkOut Check-out date
 * @returns Boolean indicating if a booking exists
 */
export async function checkExternalBookingExists(checkIn: Date, checkOut: Date): Promise<boolean> {
  try {
    const externalIcalData = await fetchExternalCalendars();
    const externalBookings = externalIcalData.flatMap((icalData, index) => 
      parseICalData(icalData, CALENDAR_URLS[index])
    );
    
    // Check if any external booking overlaps with the given dates
    return externalBookings.some(booking => {
      return (booking.start <= checkOut && booking.end >= checkIn);
    });
  } catch (error) {
    console.error('Error checking external bookings:', error);
    return false;
  }
}

/**
 * Scheduled function to sync calendars
 * Should be called periodically (e.g., every hour)
 */
export async function scheduledCalendarSync(): Promise<void> {
  try {
    console.log('Running scheduled calendar sync');
    await syncFromExternalCalendars();
    console.log('Scheduled calendar sync completed');
  } catch (error) {
    console.error('Error in scheduled calendar sync:', error);
  }
}