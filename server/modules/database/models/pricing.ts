import mongoose from 'mongoose';

// Define the seasonal price schema
const seasonalPriceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  startMonth: { type: Number, required: true },
  endMonth: { type: Number, required: true },
  pricePerNight: { type: Number, required: true }
});

// Define the discount schema
const discountSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  minNights: { type: Number, required: true },
  discountPercentage: { type: Number, required: true }
});

// Define the pricing configuration schema
const pricingSchema = new mongoose.Schema({
  id: { type: String, default: 'default', required: true }, // We'll use a single document
  seasonalPrices: [seasonalPriceSchema],
  discounts: [discountSchema],
  cleaningFee: { type: Number, required: true, default: 60 },
  updatedAt: { type: Date, default: Date.now }
});

// Create and export the model
export const PricingModel = mongoose.model('Pricing', pricingSchema);

export default PricingModel;