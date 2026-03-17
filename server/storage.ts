import { 
  users, contacts, newsletter, bookings,
  type User, type InsertUser,
  type Contact, type Newsletter,
  type Booking, type InsertBooking
} from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";
import { MongoDBStorage } from "./modules/database/database";

// Data file path for fallback persistence
const DATA_FILE_PATH = path.join(process.cwd(), 'data.json');

// Interface for storage implementations
export interface IStorage {
  createBooking(data: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: string, status: string): Promise<Booking | undefined>;
  getAllBookings(): Promise<Booking[]>;
  getBookingByStripeSession(sessionId: string): Promise<Booking | undefined>;
  getBookingByPayPalOrder(orderId: string): Promise<Booking | undefined>;
  getBooking(id: string): Promise<Booking | undefined>;
  getBookingsBetweenDates(startDate: Date, endDate: Date): Promise<Booking[]>;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(insertUser: InsertUser): Promise<User>;
  
  // Contact methods
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contactData: Omit<Contact, "id">): Promise<Contact>;
  
  // Newsletter methods
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  createNewsletterSubscription(data: Omit<Newsletter, "id">): Promise<Newsletter>;
}

// Memory-based storage implementation with file persistence
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
    const id = bookingData.id || randomUUID();
    
    // Add payment method based on session IDs
    const paymentMethod = bookingData.stripeSessionId ? 'stripe' : 
                         bookingData.paypalOrderId ? 'paypal' : undefined;
    
    // Record booking time for receipt information
    const bookingTime = new Date();
    
    const booking: Booking = { 
      ...bookingData, 
      id,
      paymentMethod,
      createdAt: bookingData.createdAt || new Date(),
      bookingTime
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

// Hybrid storage class that tries MongoDB first, then falls back to file storage
export class HybridStorage implements IStorage {
  private mongoStorage: MongoDBStorage;
  private fileStorage: MemStorage;
  private usesMongo: boolean = false;

  constructor() {
    this.mongoStorage = new MongoDBStorage();
    this.fileStorage = new MemStorage();
    
    // Initialize MongoDB connection
    this.initMongoDB();
  }

  private async initMongoDB(): Promise<void> {
    try {
      // Just create a test booking to check MongoDB connectivity
      await this.mongoStorage.getAllBookings();
      this.usesMongo = true;
      console.log("Using MongoDB for primary storage");
    } catch (error) {
      this.usesMongo = false;
      console.log("MongoDB not available, using file-based storage");
    }
  }

  // Booking methods
  async getBooking(id: string): Promise<Booking | undefined> {
    try {
      if (this.usesMongo) {
        const booking = await this.mongoStorage.getBooking(id);
        if (booking) return booking;
      }
    } catch (error) {
      console.error('MongoDB getBooking failed, falling back to file storage:', error);
    }
    return await this.fileStorage.getBooking(id);
  }
  
  async getBookingByStripeSession(sessionId: string): Promise<Booking | undefined> {
    try {
      if (this.usesMongo) {
        const booking = await this.mongoStorage.getBookingByStripeSession(sessionId);
        if (booking) return booking;
      }
    } catch (error) {
      console.error('MongoDB getBookingByStripeSession failed, falling back to file storage:', error);
    }
    return await this.fileStorage.getBookingByStripeSession(sessionId);
  }
  
  async getBookingByPayPalOrder(orderId: string): Promise<Booking | undefined> {
    try {
      if (this.usesMongo) {
        const booking = await this.mongoStorage.getBookingByPayPalOrder(orderId);
        if (booking) return booking;
      }
    } catch (error) {
      console.error('MongoDB getBookingByPayPalOrder failed, falling back to file storage:', error);
    }
    return await this.fileStorage.getBookingByPayPalOrder(orderId);
  }
  
  async createBooking(bookingData: InsertBooking): Promise<Booking> {
    // Always try MongoDB first for new data
    if (this.usesMongo) {
      try {
        const booking = await this.mongoStorage.createBooking(bookingData);
        
        // Also save to file storage as backup
        await this.fileStorage.createBooking(booking);
        
        return booking;
      } catch (error) {
        console.error('MongoDB createBooking failed, using file storage:', error);
      }
    }
    
    // Fall back to file storage
    return await this.fileStorage.createBooking(bookingData);
  }
  
  async updateBookingStatus(id: string, status: string): Promise<Booking | undefined> {
    // Try MongoDB first
    if (this.usesMongo) {
      try {
        const booking = await this.mongoStorage.updateBookingStatus(id, status);
        
        // Also update file storage if MongoDB succeeded
        if (booking) {
          await this.fileStorage.updateBookingStatus(id, status);
        }
        
        return booking;
      } catch (error) {
        console.error('MongoDB updateBookingStatus failed, using file storage:', error);
      }
    }
    
    // Fall back to file storage
    return await this.fileStorage.updateBookingStatus(id, status);
  }
  
  async getAllBookings(): Promise<Booking[]> {
    if (this.usesMongo) {
      try {
        return await this.mongoStorage.getAllBookings();
      } catch (error) {
        console.error('MongoDB getAllBookings failed, using file storage:', error);
      }
    }
    
    return await this.fileStorage.getAllBookings();
  }
  
  async getBookingsBetweenDates(startDate: Date, endDate: Date): Promise<Booking[]> {
    if (this.usesMongo) {
      try {
        return await this.mongoStorage.getBookingsBetweenDates(startDate, endDate);
      } catch (error) {
        console.error('MongoDB getBookingsBetweenDates failed, using file storage:', error);
      }
    }
    
    return await this.fileStorage.getBookingsBetweenDates(startDate, endDate);
  }
  
  // Other interface methods delegate to file storage for now
  async getUser(id: number): Promise<User | undefined> {
    return await this.fileStorage.getUser(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return await this.fileStorage.getUserByUsername(username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    return await this.fileStorage.createUser(insertUser);
  }
  
  async getContact(id: number): Promise<Contact | undefined> {
    return await this.fileStorage.getContact(id);
  }
  
  async createContact(contactData: Omit<Contact, "id">): Promise<Contact> {
    return await this.fileStorage.createContact(contactData);
  }
  
  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return await this.fileStorage.getNewsletterByEmail(email);
  }
  
  async createNewsletterSubscription(data: Omit<Newsletter, "id">): Promise<Newsletter> {
    return await this.fileStorage.createNewsletterSubscription(data);
  }
}

// Export hybrid storage instance as the main storage
export const storage = new HybridStorage();
