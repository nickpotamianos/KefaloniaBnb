import { IStorage } from "../../storage";
import { 
  type User, type InsertUser,
  type Contact, type Newsletter,
  type Booking, type InsertBooking 
} from "@shared/schema";
import { randomUUID } from "crypto";
import { getDatabase } from "./mongodb";
import BookingModel from "./models/booking";
import mongoose from "mongoose";

/**
 * MongoDB implementation of the storage interface
 */
export class MongoDBStorage implements IStorage {
  constructor() {
    console.log("MongoDB storage initialized");
  }

  // ======== BOOKING METHODS ========
  async getBooking(id: string): Promise<Booking | undefined> {
    try {
      await getDatabase();
      const booking = await BookingModel.findOne({ id });
      return booking ? booking.toObject() as Booking : undefined;
    } catch (error) {
      console.error('MongoDB getBooking error:', error);
      return undefined;
    }
  }
  
  async getBookingByStripeSession(sessionId: string): Promise<Booking | undefined> {
    try {
      await getDatabase();
      const booking = await BookingModel.findOne({ stripeSessionId: sessionId });
      return booking ? booking.toObject() as Booking : undefined;
    } catch (error) {
      console.error('MongoDB getBookingByStripeSession error:', error);
      return undefined;
    }
  }
  
  async getBookingByPayPalOrder(orderId: string): Promise<Booking | undefined> {
    try {
      await getDatabase();
      const booking = await BookingModel.findOne({ paypalOrderId: orderId });
      return booking ? booking.toObject() as Booking : undefined;
    } catch (error) {
      console.error('MongoDB getBookingByPayPalOrder error:', error);
      return undefined;
    }
  }
  
  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    try {
      await getDatabase();
      
      // Determine payment method from session IDs
      const paymentMethod = bookingData.stripeSessionId ? 'stripe' : 
                            bookingData.paypalOrderId ? 'paypal' : undefined;
      
      const id = bookingData.id || randomUUID();
      const nowDate = new Date();
      
      const booking: Booking = { 
        ...bookingData, 
        id,
        paymentMethod,
        createdAt: bookingData.createdAt || nowDate,
        bookingTime: nowDate, // Record exact booking time for receipt
      };
      
      // Upsert (update or insert) based on the ID
      await BookingModel.findOneAndUpdate(
        { id: booking.id },
        booking,
        { upsert: true, new: true }
      );
      
      return booking;
    } catch (error) {
      console.error('MongoDB createBooking error:', error);
      throw error;
    }
  }
  
  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    try {
      await getDatabase();
      const booking = await BookingModel.findOneAndUpdate(
        { id },
        { paymentStatus: status },
        { new: true }
      );
      return booking ? booking.toObject() as Booking : undefined;
    } catch (error) {
      console.error('MongoDB updateBookingStatus error:', error);
      return undefined;
    }
  }
  
  async getAllBookings(): Promise<Booking[]> {
    try {
      await getDatabase();
      const bookings = await BookingModel.find().sort({ createdAt: -1 });
      return bookings.map(booking => booking.toObject() as Booking);
    } catch (error) {
      console.error('MongoDB getAllBookings error:', error);
      return [];
    }
  }
  
  async getBookingsBetweenDates(startDate: Date, endDate: Date): Promise<Booking[]> {
    try {
      await getDatabase();
      const bookings = await BookingModel.find({
        $or: [
          { 
            checkIn: { $lte: endDate }, 
            checkOut: { $gte: startDate } 
          },
          {
            checkIn: { $gte: startDate, $lte: endDate }
          },
          {
            checkOut: { $gte: startDate, $lte: endDate }
          }
        ]
      });
      return bookings.map(booking => booking.toObject() as Booking);
    } catch (error) {
      console.error('MongoDB getBookingsBetweenDates error:', error);
      return [];
    }
  }
  
  // ======== USER METHODS (STUBS) ========
  // These methods are stubs to satisfy the interface
  // They would be implemented with MongoDB in a production app
  async getUser(id: number): Promise<User | undefined> {
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error("Method not implemented.");
  }
  
  // ======== CONTACT METHODS (STUBS) ========
  async getContact(id: number): Promise<Contact | undefined> {
    return undefined;
  }
  
  async createContact(contactData: Omit<Contact, "id">): Promise<Contact> {
    throw new Error("Method not implemented.");
  }
  
  // ======== NEWSLETTER METHODS (STUBS) ========
  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return undefined;
  }
  
  async createNewsletterSubscription(data: Omit<Newsletter, "id">): Promise<Newsletter> {
    throw new Error("Method not implemented.");
  }
}