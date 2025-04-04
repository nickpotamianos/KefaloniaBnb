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
  isDateRangeAvailable,
  syncBookingToExternalCalendars,
  syncFromExternalCalendars,
  cancelBookingInCalendar,
  fetchIcalFeed
} from "./modules/calendar/icalService";
import { 
  validateBooking, 
  createCheckoutSession,
  verifyWebhookSignature,
  getCheckoutSession,
  createPayPalOrder,
  capturePayPalPayment,
  getPayPalOrderDetails
} from "./modules/payment/paymentService";
import { 
  sendBookingConfirmation,
  sendOwnerNotification,
  sendCancellationEmail,
  sendPreArrivalEmail,
  sendTestEmail
} from "./modules/email/emailService";
import bodyParser from 'body-parser';
import { differenceInDays, addDays } from 'date-fns';

export async function registerRoutes(app: Express): Promise<Server> {
  // Calendar proxy endpoint for frontend to fetch external calendars
  app.get("/api/calendar/proxy", async (req, res) => {
    try {
      const { url } = req.query;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ 
          success: false, 
          message: "Missing or invalid URL parameter" 
        });
      }
      
      const icalData = await fetchIcalFeed(url);
      res.set('Content-Type', 'text/calendar');
      res.send(icalData);
    } catch (error) {
      console.error("Calendar proxy error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch calendar data" 
      });
    }
  });
  
  // Calendar availability endpoint - fetches all external calendars
  app.get("/api/calendar/availability", async (_req, res) => {
    try {
      // Fetch all external calendar data
      const icalDataArray = await Promise.all(
        [
          "https://ical.booking.com/v1/export?t=ae535b52-549f-4976-bffd-dd05f7121b9c",
          "https://www.airbnb.com/calendar/ical/936140466545331330.ics?s=4db5df46d02514f399d3cc9362b00162",
          "http://www.vrbo.com/icalendar/a5f9a9c10a434d21a93c76b054037556.ics?nonTentative"
        ].map(async (url) => {
          try {
            return await fetchIcalFeed(url);
          } catch (err) {
            console.error(`Error fetching calendar from ${url}:`, err);
            // Return empty calendar on error
            return "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//KefaloniaBnb//Error Calendar//EN\nEND:VCALENDAR";
          }
        })
      );
      
      res.json({
        success: true,
        icalData: icalDataArray
      });
    } catch (error) {
      console.error("Calendar availability error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to fetch calendar availability" 
      });
    }
  });
  
  // iCal feed endpoint for external services to pull our availability
  app.get("/api/calendar.ics", async (_req, res) => {
    try {
      const icalData = await generateICalFile();
      res.set('Content-Type', 'text/calendar');
      res.send(icalData);
    } catch (error) {
      console.error("iCal feed error:", error);
      res.status(500).send("Error generating calendar data");
    }
  });

  // Sync from external calendars manually
  app.post("/api/calendar/sync", async (_req, res) => {
    try {
      const success = await syncFromExternalCalendars();
      
      if (success) {
        res.json({
          success: true,
          message: "Calendar synchronized successfully"
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to synchronize calendar"
        });
      }
    } catch (error) {
      console.error("Error syncing calendar:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to synchronize calendar. Please try again later."
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

  // NEW ENDPOINT: Calendar blocked dates (for the client-side calendar component)
  app.get("/api/calendar/blocked-dates", async (_req, res) => {
    try {
      const blockedRanges = await getBlockedDateRanges();
      
      // Map the server format to the client format
      const formattedDates = blockedRanges.map(range => ({
        start: range.start,
        end: range.end,
        summary: range.summary || 'Booked',
        source: range.source
      }));
      
      res.json(formattedDates);
    } catch (error) {
      console.error("Error fetching calendar blocked dates:", error);
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
  
  // Test email endpoint
  app.post("/api/test-email", async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email address is required"
        });
      }
      
      const success = await sendTestEmail(email);
      
      if (success) {
        res.json({
          success: true,
          message: "Test email sent successfully"
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Failed to send test email"
        });
      }
    } catch (error) {
      console.error("Test email error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to send test email. Please check your email configuration."
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
  
  // Create PayPal order for booking
  app.post("/api/create-paypal-order", async (req, res) => {
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
      
      // Create PayPal order
      const order = await createPayPalOrder(bookingData);
      
      if (!order || !order.id) {
        return res.status(500).json({
          success: false,
          message: "Failed to create PayPal order"
        });
      }
      
      // Create a pending booking in database
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      
      // Get the total amount from booking data calculation instead of relying on the order structure
      const startDate = new Date(bookingData.checkIn);
      const endDate = new Date(bookingData.checkOut);
      const nights = differenceInDays(endDate, startDate);
      const basePrice = nights * 200; // €200 per night (BASE_PRICE_PER_NIGHT)
      const totalInEuros = basePrice + 60; // +€60 cleaning fee (CLEANING_FEE)
      const totalAmount = Math.round(totalInEuros * 100); // Convert to cents
      
      const booking = await storage.createBooking({
        checkIn,
        checkOut,
        name: bookingData.name!,
        email: bookingData.email!,
        phone: bookingData.phone,
        guests: (bookingData.adults || 0) + (bookingData.children || 0),
        adults: bookingData.adults!,
        children: bookingData.children || 0,
        specialRequests: bookingData.specialRequests,
        totalAmount,
        paypalOrderId: order.id,
        paymentStatus: 'pending'
      });
      
      res.json({
        success: true,
        orderId: order.id,
        bookingId: booking.id,
        approvalUrl: order.approvalUrl, // Send the PayPal approval URL to the client
        links: order.links
      });
    } catch (error) {
      console.error("PayPal order creation error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to create PayPal order. Please try again later."
      });
    }
  });
  
  // Capture PayPal payment
  app.post("/api/capture-paypal-payment", async (req, res) => {
    try {
      const { orderId } = req.body;
      
      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: "Order ID is required"
        });
      }
      
      // Capture the payment
      const captureData = await capturePayPalPayment(orderId);
      
      if (captureData.status === "COMPLETED") {
        // Find the booking with this order ID
        const booking = await storage.getBookingByPayPalOrder(orderId);
        
        if (booking) {
          // Update booking status
          const updatedBooking = await storage.updateBookingStatus(booking.id, 'confirmed');
          
          if (updatedBooking) {
            try {
              // Sync the booking to external calendars
              await syncBookingToExternalCalendars(updatedBooking);
              
              // Send confirmation emails
              await Promise.all([
                sendBookingConfirmation(updatedBooking),
                sendOwnerNotification(updatedBooking)
              ]);
              
              // Schedule pre-arrival email to be sent 3 days before check-in
              const checkInDate = new Date(updatedBooking.checkIn);
              const preArrivalDate = addDays(checkInDate, -3);
              const now = new Date();
              
              // If check-in is less than 3 days away, send pre-arrival email now
              if (preArrivalDate <= now) {
                await sendPreArrivalEmail(updatedBooking);
              }
              // Otherwise, we would ideally schedule this with a job queue
              // For simplicity, we're not implementing the job queue in this example
            } catch (emailError) {
              // Don't fail the payment process if emails fail
              console.error('Error in post-payment processes:', emailError);
            }
          }
        }
        
        return res.json({
          success: true,
          captureData: captureData
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Payment capture failed"
        });
      }
    } catch (error) {
      console.error("PayPal payment capture error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to capture PayPal payment. Please try again later."
      });
    }
  });
  
  // Get PayPal order details endpoint (for frontend to check if payment was successful)
  app.get("/api/paypal-order/:orderId", async (req, res) => {
    try {
      const { orderId } = req.params;
      
      if (!orderId) {
        return res.status(400).json({
          success: false,
          message: "Order ID is required"
        });
      }
      
      // Try to get booking from storage first
      let booking = await storage.getBookingByPayPalOrder(orderId);
      
      if (!booking) {
        // If booking not found in memory storage (e.g., after server restart)
        // retrieve it from PayPal directly
        try {
          const orderDetails = await getPayPalOrderDetails(orderId);
          
          if (orderDetails && orderDetails.status) {
            // Extract booking data from custom_id
            const customData = JSON.parse(orderDetails.purchase_units[0].custom_id);
            
            // Create a booking object from PayPal order data
            booking = {
              id: `paypal-${orderId}`,
              paypalOrderId: orderId,
              checkIn: new Date(customData.checkIn),
              checkOut: new Date(customData.checkOut),
              name: customData.name,
              email: customData.email,
              phone: customData.phone,
              adults: parseInt(customData.adults, 10),
              children: parseInt(customData.children, 10),
              guests: parseInt(customData.adults, 10) + parseInt(customData.children, 10),
              specialRequests: customData.specialRequests,
              paymentStatus: orderDetails.status === "COMPLETED" ? "confirmed" : "pending",
              totalAmount: parseInt(customData.totalAmount, 10),
              createdAt: new Date()
            };
            
            // Save this reconstructed booking to memory
            try {
              await storage.createBooking(booking);
            } catch (error) {
              // Continue anyway since we already have the booking data
              console.warn("Could not save reconstructed booking to storage");
            }
          }
        } catch (paypalError) {
          console.error('Error retrieving PayPal order', paypalError);
        }
      }
      
      if (booking) {
        return res.json({
          success: true,
          booking: booking
        });
      } else {
        return res.status(404).json({ 
          success: false, 
          message: "Could not retrieve booking details. Please contact support." 
        });
      }
    } catch (error) {
      console.error('PayPal order retrieval error', error);
      return res.status(500).json({ 
        success: false, 
        message: "Could not retrieve booking details. Please contact support." 
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
              try {
                // Sync the booking to external calendars
                await syncBookingToExternalCalendars(updatedBooking);
                
                // Send confirmation emails
                await Promise.all([
                  sendBookingConfirmation(updatedBooking),
                  sendOwnerNotification(updatedBooking)
                ]);
                
                // Schedule pre-arrival email to be sent 3 days before check-in
                const checkInDate = new Date(updatedBooking.checkIn);
                const preArrivalDate = addDays(checkInDate, -3);
                const now = new Date();
                
                // If check-in is less than 3 days away, send pre-arrival email now
                if (preArrivalDate <= now) {
                  await sendPreArrivalEmail(updatedBooking);
                }
              } catch (emailError) {
                // Don't fail the webhook process if emails fail
                console.error('Error in post-payment processes:', emailError);
              }
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
      
      // Try to get booking from storage first
      let booking = await storage.getBookingByStripeSession(sessionId);
      
      if (!booking) {
        // If booking not found in memory storage (e.g., after server restart)
        // retrieve it from Stripe directly
        try {
          const session = await getCheckoutSession(sessionId);
          
          // Reconstruct it from Stripe session metadata
          if (session && session.metadata) {
            // Create a booking object from Stripe metadata
            booking = {
              id: `stripe-${sessionId}`,
              stripeSessionId: sessionId,
              checkIn: session.metadata.checkIn,
              checkOut: session.metadata.checkOut,
              name: session.metadata.name,
              email: session.metadata.email,
              phone: session.metadata.phone,
              adults: parseInt(session.metadata.adults || '2', 10),
              children: parseInt(session.metadata.children || '0', 10),
              guests: parseInt(session.metadata.adults || '2', 10) + parseInt(session.metadata.children || '0', 10),
              specialRequests: session.metadata.specialRequests,
              paymentStatus: session.payment_status,
              totalAmount: parseInt(session.metadata.totalAmount || '0', 10),
              createdAt: new Date(session.created * 1000) // Convert UNIX timestamp to Date
            };

            // Save this reconstructed booking to memory
            try {
              await storage.createBooking(booking);
            } catch (error) {
              // Continue anyway since we already have the booking data
              console.warn("Could not save reconstructed booking to storage");
            }
          }
        } catch (stripeError) {
          console.error('Error retrieving Stripe session');
        }
      }
      
      if (booking) {
        return res.json({
          success: true,
          booking: booking
        });
      } else {
        return res.status(404).json({ 
          success: false, 
          message: "Could not retrieve booking details. Please contact support." 
        });
      }
    } catch (error) {
      console.error('Session retrieval error');
      return res.status(500).json({ 
        success: false, 
        message: "Could not retrieve booking details. Please contact support." 
      });
    }
  });
  
  // Cancel a booking
  app.post("/api/bookings/:bookingId/cancel", async (req, res) => {
    try {
      const { bookingId } = req.params;
      
      if (!bookingId) {
        return res.status(400).json({
          success: false,
          message: "Booking ID is required"
        });
      }
      
      // Get the booking
      const booking = await storage.getBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found"
        });
      }
      
      // Cancel the booking in the calendar
      const calendarSuccess = await cancelBookingInCalendar(bookingId);
      
      // Send cancellation emails
      let emailSuccess = false;
      try {
        emailSuccess = await sendCancellationEmail(booking);
      } catch (emailError) {
        console.error('Error sending cancellation email:', emailError);
      }
      
      res.json({
        success: true,
        calendarUpdated: calendarSuccess,
        emailSent: emailSuccess,
        booking: await storage.getBooking(bookingId) // Get the updated booking
      });
    } catch (error) {
      console.error('Booking cancellation error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to cancel booking. Please try again later."
      });
    }
  });
  
  // Send pre-arrival email manually
  app.post("/api/bookings/:bookingId/send-pre-arrival", async (req, res) => {
    try {
      const { bookingId } = req.params;
      
      if (!bookingId) {
        return res.status(400).json({
          success: false,
          message: "Booking ID is required"
        });
      }
      
      // Get the booking
      const booking = await storage.getBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found"
        });
      }
      
      // Send pre-arrival email
      const success = await sendPreArrivalEmail(booking);
      
      res.json({
        success: true,
        emailSent: success
      });
    } catch (error) {
      console.error('Pre-arrival email error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to send pre-arrival email. Please try again later."
      });
    }
  });
  
  // Admin endpoints with basic protection
  
  // Simple admin secret key - in production, use a proper authentication system
  const ADMIN_SECRET = process.env.ADMIN_SECRET || 'kefalonia-admin-2025';
  
  // Admin middleware to check for authorization
  const requireAdmin = (req: any, res: any, next: any) => {
    const adminKey = req.headers['x-admin-key'] || req.query.adminKey;
    
    if (!adminKey || adminKey !== ADMIN_SECRET) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Admin access required."
      });
    }
    
    next();
  };
  
  // Admin: List all bookings
  app.get("/api/admin/bookings", requireAdmin, async (_req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      
      res.json({
        success: true,
        bookings
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch bookings."
      });
    }
  });
  
  // Admin: Cancel booking manually (e.g., when someone calls)
  app.post("/api/admin/bookings/:bookingId/cancel", requireAdmin, async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { reason } = req.body;
      
      if (!bookingId) {
        return res.status(400).json({
          success: false,
          message: "Booking ID is required"
        });
      }
      
      // Get the booking
      const booking = await storage.getBooking(bookingId);
      
      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found"
        });
      }
      
      // Cancel the booking in the calendar
      const calendarSuccess = await cancelBookingInCalendar(bookingId);
      
      // Send cancellation emails if requested
      let emailSuccess = false;
      const sendEmail = req.query.sendEmail === 'true';
      
      if (sendEmail) {
        try {
          emailSuccess = await sendCancellationEmail(booking);
        } catch (emailError) {
          console.error('Error sending cancellation email:', emailError);
        }
      }
      
      const updatedBooking = await storage.getBooking(bookingId);
      
      res.json({
        success: true,
        message: "Booking cancelled successfully",
        calendarUpdated: calendarSuccess,
        emailSent: emailSuccess,
        booking: updatedBooking
      });
    } catch (error) {
      console.error('Admin booking cancellation error:', error);
      res.status(500).json({
        success: false,
        message: "Failed to cancel booking. Please try again later."
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
