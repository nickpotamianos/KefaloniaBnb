import { 
  users, contacts, newsletter,
  type User, type InsertUser,
  type Contact, type Newsletter
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact methods
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contactData: Omit<Contact, "id">): Promise<Contact>;
  
  // Newsletter methods
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  createNewsletterSubscription(data: Omit<Newsletter, "id">): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactsList: Map<number, Contact>;
  private newsletterList: Map<number, Newsletter>;
  
  private userCurrentId: number;
  private contactCurrentId: number;
  private newsletterCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contactsList = new Map();
    this.newsletterList = new Map();
    
    this.userCurrentId = 1;
    this.contactCurrentId = 1;
    this.newsletterCurrentId = 1;
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
    return subscription;
  }
}

export const storage = new MemStorage();
