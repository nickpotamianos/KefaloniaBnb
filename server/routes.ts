import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertNewsletterSchema } from "@shared/schema";
import { z } from "zod";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
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
