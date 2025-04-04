import { 
  users, contacts, newsletter, bookings,
  type User, type InsertUser,
  type Contact, type Newsletter,
  type Booking, type InsertBooking
} from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

// Data file path for persistence
const DATA_FILE_PATH = path.join(process.cwd(), 'data.json');

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  createBooking(data: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
  getBookingByStripeSession(sessionId: string): Promise<Booking | undefined>;
  getBookingByPayPalOrder(orderId: string): Promise<Booking | undefined>;
  // Other methods...
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactsList: Map<number, Contact>;
  private newsletterList: Map<number, Newsletter>;
  private bookingsList: Map<string, Booking>;
  
  private userCurrentId: number;
  private contactCurrentId: number;
  private newsletterCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactsList = new Map();
    this.newsletterList = new Map();
    this.bookingsList = new Map();
    
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;

    // Load existing data from file if it exists
    this.loadFromFile();
  }

  // File persistence methods
  private saveToFile(): void {
    try {
      const data = {
        users: Array.from(this.users.entries()),
        contacts: Array.from(this.contactsList.entries()),
        newsletter: Array.from(this.newsletterList.entries()),
        bookings: Array.from(this.bookingsList.entries()),
        counters: {
          userCurrentId: this.userCurrentId,
          contactCurrentId: this.contactCurrentId,
          newsletterCurrentId: this.newsletterCurrentId
        }
      };
      
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
      console.log(`Data successfully saved to ${DATA_FILE_PATH}`);
    } catch (error) {
      console.error('Error saving data to file:', error);
    }
  }

  private loadFromFile(): void {
    try {
      if (fs.existsSync(DATA_FILE_PATH)) {
        console.log(`Loading data from ${DATA_FILE_PATH}`);
        const jsonData = fs.readFileSync(DATA_FILE_PATH, 'utf8');
        const data = JSON.parse(jsonData);
        
        // Restore maps from file data
        this.users = new Map(data.users);
        this.contactsList = new Map(data.contacts);
        this.newsletterList = new Map(data.newsletter);
        this.bookingsList = new Map(data.bookings);
        
        // Restore counters
        this.userCurrentId = data.counters.userCurrentId;
        this.contactCurrentId = data.counters.contactCurrentId;
        this.newsletterCurrentId = data.counters.newsletterCurrentId;
        
        console.log(`Successfully loaded ${this.bookingsList.size} bookings from storage file.`);
      } else {
        console.log('No persistent data file found. Starting with empty storage.');
      }
    } catch (error) {
      console.error('Error loading data from file:', error);
      // Continue with empty maps if file reading fails
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    this.saveToFile();
    return user;
  }
  
  // Contact methods
  async getContact(id: number): Promise<Contact | undefined> {
    return this.contactsList.get(id);
  }
  
  async createContact(contactData: Omit<Contact, "id">): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact = { ...contactData, id };
    this.contactsList.set(id, contact);
    this.saveToFile();
    return contact;
  }
  
  // Newsletter methods
  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletterList.values()).find(
      (subscription) => subscription.email === email,
    );
  }
  
  async createNewsletterSubscription(data: Omit<Newsletter, "id">): Promise<Newsletter> {
    const id = this.newsletterCurrentId++;
    const subscription = { ...data, id };
    this.newsletterList.set(id, subscription);
    this.saveToFile();
    return subscription;
  }
  
  // Booking methods
  async getBooking(id: string): Promise<Booking | undefined> {
    return this.bookingsList.get(id);
  }
  
  async getBookingByStripeSession(sessionId: string): Promise<Booking | undefined> {
    return Array.from(this.bookingsList.values()).find(
      (booking) => booking.stripeSessionId === sessionId
    );
  }
  
  async getBookingByPayPalOrder(orderId: string): Promise<Booking | undefined> {
    return Array.from(this.bookingsList.values()).find(
      (booking) => booking.paypalOrderId === orderId
    );
  }
  
  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...bookingData, 
      id, 
      createdAt: new Date() 
    };
    this.bookingsList.set(id, booking);
    this.saveToFile();
    return booking;
  }
  
  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    const booking = this.bookingsList.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, paymentStatus: status };
    this.bookingsList.set(id, updatedBooking);
    this.saveToFile();
    return updatedBooking;
  }
  
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookingsList.values());
  }
  
  async getBookingsBetweenDates(startDate: Date, endDate: Date): Promise<Booking[]> {
    return Array.from(this.bookingsList.values()).filter(booking => {
      const bookingStart = new Date(booking.checkIn);
      const bookingEnd = new Date(booking.checkOut);
      
      // Check if there's any overlap between the date ranges
      return (
        (bookingStart <= endDate && bookingEnd >= startDate) ||
        (bookingStart >= startDate && bookingStart <= endDate) ||
        (bookingEnd >= startDate && bookingEnd <= endDate)
      );
    });
  }
}

export const storage = new MemStorage();
