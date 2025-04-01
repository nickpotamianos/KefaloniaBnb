import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema, insertBookingSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import fetch from "node-fetch";
import { 
  generateICalFile, 
  getBlockedDateRanges,
  isDateRangeAvailable 
} from "./modules/calendar/icalService";
import { 
  validateBooking, 
  createCheckoutSession,
  verifyWebhookSignature,
  getCheckoutSession
} from "./modules/payment/paymentService";
import { 
  sendBookingConfirmation,
  sendOwnerNotification 
} from "./modules/email/emailService";
import bodyParser from 'body-parser';

export async function registerRoutes(app: Express): Promise<Server> {
  // Availability calendar endpoint
  app.get("/api/calendar/availability", async (_req, res) => {
    try {
      const calendarUrls = [
        //"https://api.host.holidu.com/pmc/rest/apartments/62738918/ical.ics?key=133c7bc35012e5825e06b5cd503c77e8",
        "https://ical.booking.com/v1/export?t=ae535b52-549f-4976-bffd-dd05f7121b9c",
        "https://www.airbnb.com/calendar/ical/936140466545331330.ics?s=4db5df46d02514f399d3cc9362b00162",
        "http://www.vrbo.com/icalendar/a5f9a9c10a434d21a93c76b054037556.ics?nonTentative",
        //"https://my-api.hometogo.com/api/calendar/export/M2BH67W.ics"
      ];
      
      // Fetch all iCal feeds
      const icalPromises = calendarUrls.map(async (url) => {
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
      
      const icalResults = await Promise.all(icalPromises);
      
      // Process the data and extract booking dates
      // We'll send this raw data to the client and process there
      // to avoid adding ical.js as a server dependency
      
      res.json({
        success: true,
        icalData: icalResults.filter(data => data !== "")
      });
    } catch (error) {
      console.error("Calendar availability error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch availability data. Please try again later."
      });
    }
  });

  // Add new calendar endpoints
  
  // Combined iCal calendar (for external calendars to consume)
  app.get("/api/calendar.ics", async (_req, res) => {
    try {
      const icalData = await generateICalFile();
      
      res.setHeader('Content-Type', 'text/calendar');
      res.setHeader('Content-Disposition', 'attachment; filename="kefalonia-bnb-calendar.ics"');
      res.send(icalData);
    } catch (error) {
      console.error("Error generating calendar:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to generate calendar. Please try again later."
      });
    }
  });
  
  // Blocked dates endpoint (for frontend date picker)
  app.get("/api/blocked-dates", async (_req, res) => {
    try {
      const blockedDates = await getBlockedDateRanges();
      
      res.json({
        success: true,
        blockedDates
      });
    } catch (error) {
      console.error("Error fetching blocked dates:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch blocked dates. Please try again later."
      });
    }
  });
  
  // Check date availability endpoint
  app.post("/api/check-availability", async (req, res) => {
    try {
      const { checkIn, checkOut } = req.body;
      
      if (!checkIn || !checkOut) {
        return res.status(400).json({
          success: false,
          message: "Both check-in and check-out dates are required"
        });
      }
      
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);
      
      const isAvailable = await isDateRangeAvailable(startDate, endDate);
      
      res.json({
        success: true,
        available: isAvailable
      });
    } catch (error) {
      console.error("Availability check error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to check availability. Please try again later."
      });
    }
  });
  
  // Create checkout session for booking
  app.post("/api/create-checkout", async (req, res) => {
    try {
      // Validate booking request
      const bookingData = req.body;
      const validation = await validateBooking(bookingData);
      
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          message: validation.message
        });
      }
      
      // Create Stripe checkout session
      const session = await createCheckoutSession(bookingData);
      
      // Create a pending booking in database
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      const totalAmountFromMeta = parseInt(session.metadata?.totalAmount || '0');
      
      await storage.createBooking({
        checkIn,
        checkOut,
        name: bookingData.name!,
        email: bookingData.email!,
        phone: bookingData.phone,
        guests: (bookingData.adults || 0) + (bookingData.children || 0),
        adults: bookingData.adults!,
        children: bookingData.children || 0,
        specialRequests: bookingData.specialRequests,
        totalAmount: totalAmountFromMeta,
        stripeSessionId: session.id,
        paymentStatus: 'pending'
      });
      
      res.json({
        success: true,
        sessionUrl: session.url
      });
    } catch (error) {
      console.error("Checkout creation error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create checkout session. Please try again later."
      });
    }
  });
  
  // Stripe webhook endpoint
  // Use raw bodyParser to get the raw body for Stripe signature verification
  app.post("/api/stripe-webhook", 
    bodyParser.raw({ type: 'application/json' }), 
    async (req, res) => {
      try {
        const payload = req.body.toString();
        const signature = req.headers['stripe-signature'] as string;
        
        if (!signature) {
          return res.status(400).json({ success: false, message: 'Missing stripe-signature header' });
        }
        
        // Verify webhook signature
        const event = verifyWebhookSignature(payload, signature);
        
        // Handle the event
        if (event.type === 'checkout.session.completed') {
          const session = event.data.object as any;
          const sessionId = session.id;
          
          // Find the booking with this session ID
          const booking = await storage.getBookingByStripeSession(sessionId);
          
          if (booking) {
            // Update booking status
            const updatedBooking = await storage.updateBookingStatus(booking.id, 'confirmed');
            
            if (updatedBooking) {
              // Send confirmation emails
              await Promise.all([
                sendBookingConfirmation(updatedBooking),
                sendOwnerNotification(updatedBooking)
              ]);
            }
          }
        }
        
        res.json({ received: true });
      } catch (error) {
        console.error('Webhook error:', error);
        return res.status(400).json({ success: false, message: 'Webhook error' });
      }
    }
  );
  
  // Session status endpoint (for frontend to check if payment was successful)
  app.get("/api/checkout-session/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      
      if (!sessionId) {
        return res.status(400).json({
          success: false,
          message: "Session ID is required"
        });
      }
      
      const session = await getCheckoutSession(sessionId);
      const booking = await storage.getBookingByStripeSession(sessionId);
      
      res.json({
        success: true,
        status: session.payment_status,
        booking: booking || null
      });
    } catch (error) {
      console.error("Session status error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to get session status. Please try again later."
      });
    }
  });
  
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactSchema.parse(req.body);
      
      // Convert the data to format for storage (without privacy flag)
      const contactData = {
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        subject: data.subject,
        message: data.message,
        createdAt: new Date().toISOString()
      };
      
      const contact = await storage.createContact(contactData);
      
      res.json({ 
        success: true, 
        message: "Your message has been sent successfully! We'll get back to you soon.",
        contactId: contact.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to submit your message. Please try again later."
      });
    }
  });

  // Newsletter subscription
  app.post("/api/newsletter", async (req, res) => {
    try {
      const data = insertNewsletterSchema.parse(req.body);
      
      // Check if email already exists
      const existingSubscription = await storage.getNewsletterByEmail(data.email);
      
      if (existingSubscription) {
        return res.json({ 
          success: true, 
          message: "You're already subscribed to our newsletter!"
        });
      }
      
      const subscription = await storage.createNewsletterSubscription({
        email: data.email,
        createdAt: new Date().toISOString()
      });
      
      res.json({ 
        success: true, 
        message: "Thank you for subscribing to our newsletter!",
        subscriptionId: subscription.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ 
          success: false, 
          message: validationError.message
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: "Failed to subscribe. Please try again later."
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
