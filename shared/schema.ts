import { pgTable, text, serial, integer, boolean, uuid, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull()
});

export const newsletter = pgTable("newsletter", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: text("created_at").notNull()
});

export const bookings = pgTable("bookings", {
  id: uuid("id").defaultRandom().primaryKey(),
  checkIn: date("check_in").notNull(),
  checkOut: date("check_out").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  guests: integer("guests").notNull(),
  adults: integer("adults").notNull(),
  children: integer("children").default(0).notNull(),
  specialRequests: text("special_requests"),
  totalAmount: integer("total_amount").notNull(),  // in cents
  stripeSessionId: text("stripe_session_id"),
  paypalOrderId: text("paypal_order_id"),
  paymentMethod: text("payment_method"),   // 'stripe' or 'paypal'
  paymentStatus: text("payment_status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  bookingTime: timestamp("booking_time"),  // For receipt/invoice details
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  name: true,
  email: true,
  phone: true,
  subject: true,
  message: true,
}).extend({
  privacy: z.boolean().refine(val => val === true, {
    message: "You must accept the privacy policy"
  })
});

export const insertNewsletterSchema = createInsertSchema(newsletter).pick({
  email: true,
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
export type Newsletter = typeof newsletter.$inferSelect;

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
