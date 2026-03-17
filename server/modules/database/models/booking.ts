import mongoose from 'mongoose';

// Define the booking schema
const bookingSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  guests: { type: Number, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, default: 0 },
  specialRequests: { type: String },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, required: true, enum: ['pending', 'confirmed', 'cancelled'] },
  paymentMethod: { type: String, enum: ['stripe', 'paypal'] },
  stripeSessionId: { type: String },
  paypalOrderId: { type: String },
  createdAt: { type: Date, default: Date.now },
  bookingTime: { type: Date, default: Date.now }
});

// Create indices for frequent queries
bookingSchema.index({ stripeSessionId: 1 });
bookingSchema.index({ paypalOrderId: 1 });
bookingSchema.index({ email: 1 });
bookingSchema.index({ paymentStatus: 1 });

// Create and export the model
export const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;