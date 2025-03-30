import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import fetch from "node-fetch";

export async function registerRoutes(app: Express): Promise<Server> {
  // Availability calendar endpoint
  app.get("/api/calendar/availability", async (_req, res) => {
    try {
      const calendarUrls = [
        "https://api.host.holidu.com/pmc/rest/apartments/62738918/ical.ics?key=133c7bc35012e5825e06b5cd503c77e8",
        "https://ical.booking.com/v1/export?t=ae535b52-549f-4976-bffd-dd05f7121b9c",
        "https://www.airbnb.com/calendar/ical/936140466545331330.ics?s=4db5df46d02514f399d3cc9362b00162",
        "http://www.vrbo.com/icalendar/a5f9a9c10a434d21a93c76b054037556.ics?nonTentative",
        "https://my-api.hometogo.com/api/calendar/export/M2BH67W.ics"
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
