import { addDays, differenceInDays, startOfDay } from 'date-fns';
import axios from 'axios';
import { API_ENDPOINTS } from './api-config';

// Types for pricing management
export interface SeasonalPrice {
  id: string;
  name: string;
  startMonth: number;
  endMonth: number;
  pricePerNight: number;
}

export interface Discount {
  id: string;
  name: string;
  minNights: number;
  discountPercentage: number;
}

// Centralized price management
class PricingService {
  // Property to store the pricing data
  private seasonalPrices: SeasonalPrice[] = [
    { id: "high-season", name: "High Season", startMonth: 6, endMonth: 7, pricePerNight: 200 }, // July-August
    { id: "mid-season", name: "Mid Season", startMonth: 5, endMonth: 8, pricePerNight: 180 },  // June & September
    { id: "shoulder-season", name: "Shoulder Season", startMonth: 3, endMonth: 4, pricePerNight: 170 }, // April-May
    { id: "low-season", name: "Low Season", startMonth: 0, endMonth: 2, pricePerNight: 150 } // Jan-Mar
  ];

  // Discount tiers based on length of stay
  private discounts: Discount[] = [
    { id: "monthly", name: "Monthly Discount", minNights: 30, discountPercentage: 20 },
    { id: "weekly", name: "Weekly Discount", minNights: 7, discountPercentage: 12 }
  ];

  // Cleaning fee is fixed
  private cleaningFee: number = 60;
  
  // Flag to indicate if pricing has been loaded from the server
  private isInitialized: boolean = false;
  
  constructor() {
    // Try to load pricing from the server
    this.loadPricingFromServer().catch(err => {
      // Just use the defaults, no need to log an error to console that might confuse users
      this.isInitialized = true;
    });
  }
  
  // Initialize pricing from the server
  public async loadPricingFromServer(): Promise<void> {
    try {
      // Use the public endpoint that doesn't require admin authentication
      const response = await axios.get(API_ENDPOINTS.PRICING);
      
      if (response.data.success && response.data.pricing) {
        const { seasonalPrices, discounts, cleaningFee } = response.data.pricing;
        
        if (Array.isArray(seasonalPrices) && seasonalPrices.length > 0) {
          // Ensure all price values are whole numbers
          this.seasonalPrices = seasonalPrices.map(price => ({
            ...price,
            pricePerNight: Math.round(price.pricePerNight)
          }));
        }
        
        if (Array.isArray(discounts) && discounts.length > 0) {
          this.discounts = discounts.map(discount => ({
            ...discount,
            discountPercentage: Math.round(discount.discountPercentage)
          }));
        }
        
        if (typeof cleaningFee === 'number') {
          this.cleaningFee = Math.round(cleaningFee);
        }
      }
    } catch (error) {
      // For the public pricing endpoint, don't display errors in console
      // Just silently fall back to default pricing
      console.log("Using default pricing");
    } finally {
      this.isInitialized = true;
    }
  }

  // Get the base price for a specific date
  public getPriceForDate(date: Date): number {
    const month = date.getMonth();
    
    if (this.seasonalPrices.length === 0) {
      return 160; // Default fallback price if no seasons defined
    }
    
    // Create comprehensive mapping of months to seasonal prices
    const monthPriceMap = new Map<number, number>();
    
    // Fill the month-to-price mapping
    this.seasonalPrices.forEach(season => {
      if (season.startMonth <= season.endMonth) {
        // Normal range: e.g. April(3)-May(4)
        for (let m = season.startMonth; m <= season.endMonth; m++) {
          monthPriceMap.set(m, season.pricePerNight);
        }
      } else {
        // Range spans year end: e.g. November(10)-February(1)
        // First part: startMonth to December(11)
        for (let m = season.startMonth; m <= 11; m++) {
          monthPriceMap.set(m, season.pricePerNight);
        }
        // Second part: January(0) to endMonth
        for (let m = 0; m <= season.endMonth; m++) {
          monthPriceMap.set(m, season.pricePerNight);
        }
      }
    });
    
    // Look up the price for this month
    if (monthPriceMap.has(month)) {
      return monthPriceMap.get(month)!;
    }
    
    // If no mapping exists for this month (should never happen with proper setup)
    // Find the low season price as fallback
    const lowSeason = this.seasonalPrices.find(s => s.id === "low-season");
    if (lowSeason) {
      return lowSeason.pricePerNight;
    }
    
    // Ultimate fallback
    return 160;
  }

  // Calculate discount based on length of stay
  public calculateDiscount(nights: number): { 
    discountPercentage: number; 
    discountText: string; 
  } {
    // Find the highest applicable discount tier
    const applicableTier = [...this.discounts]
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .find(tier => nights >= tier.minNights);
    
    if (applicableTier) {
      return {
        discountPercentage: applicableTier.discountPercentage / 100,
        discountText: applicableTier.name
      };
    }
    
    return {
      discountPercentage: 0,
      discountText: ''
    };
  }

  // Calculate the total price for a stay
  public calculateTotalPrice(checkIn: Date, checkOut: Date): {
    basePrice: number;
    nights: number;
    discount: number;
    discountPercentage: number;
    discountText: string;
    cleaningFee: number;
    totalPrice: number;
  } {
    // Normalize dates to start of day
    const startDate = startOfDay(checkIn);
    const endDate = startOfDay(checkOut);
    
    // Calculate number of nights
    const nights = differenceInDays(endDate, startDate);
    
    // If invalid dates or 0 nights, return 0
    if (nights <= 0) {
      return {
        basePrice: 0,
        nights: 0,
        discount: 0,
        discountPercentage: 0,
        discountText: '',
        cleaningFee: 0,
        totalPrice: 0
      };
    }
    
    // Calculate the price for each night and sum them
    let basePrice = 0;
    let currentDate = startDate;
    
    for (let i = 0; i < nights; i++) {
      basePrice += this.getPriceForDate(currentDate);
      currentDate = addDays(currentDate, 1);
    }
    
    // Round basePrice to whole number
    basePrice = Math.round(basePrice);
    
    // Apply discount if applicable
    const { discountPercentage, discountText } = this.calculateDiscount(nights);
    const discount = Math.round(basePrice * discountPercentage);
    const discountedPrice = basePrice - discount;
    
    // Add cleaning fee
    const totalPrice = discountedPrice + this.cleaningFee;
    
    return {
      basePrice,
      nights,
      discount,
      discountPercentage: discountPercentage * 100, // Convert to percentage for display
      discountText,
      cleaningFee: this.cleaningFee,
      totalPrice: Math.round(totalPrice)
    };
  }

  // Calculate the subtotal (base price minus discount, before adding cleaning fee)
  public calculateSubtotal(checkIn: Date, checkOut: Date): number {
    // Normalize dates to start of day
    const startDate = startOfDay(checkIn);
    const endDate = startOfDay(checkOut);
    
    // Calculate number of nights
    const nights = differenceInDays(endDate, startDate);
    
    // If invalid dates or 0 nights, return 0
    if (nights <= 0) {
      return 0;
    }
    
    // Calculate the price for each night and sum them
    let basePrice = 0;
    let currentDate = startDate;
    
    for (let i = 0; i < nights; i++) {
      basePrice += this.getPriceForDate(currentDate);
      currentDate = addDays(currentDate, 1);
    }
    
    // Apply discount if applicable
    const { discountPercentage } = this.calculateDiscount(nights);
    const discount = Math.round(basePrice * discountPercentage);
    
    // Return the subtotal (base price minus discount)
    return Math.round(basePrice - discount);
  }
  
  // Calculate total price (alias for calculateTotalPrice for compatibility)
  public calculateTotal(checkIn: Date, checkOut: Date): {
    basePrice: number;
    nights: number;
    discount: number;
    discountPercentage: number;
    discountText: string;
    cleaningFee: number;
    totalPrice: number;
  } {
    return this.calculateTotalPrice(checkIn, checkOut);
  }

  // Get seasonal prices for admin interface
  public getSeasonalPrices(): SeasonalPrice[] {
    return [...this.seasonalPrices];
  }

  // Set seasonal prices from admin interface
  public setSeasonalPrices(prices: SeasonalPrice[]): void {
    this.seasonalPrices = [...prices];
  }

  // Get discounts for admin interface
  public getDiscounts(): Discount[] {
    return [...this.discounts];
  }

  // Set discounts from admin interface
  public setDiscounts(discounts: Discount[]): void {
    this.discounts = [...discounts];
  }

  // Update cleaning fee
  public setCleaningFee(fee: number): void {
    this.cleaningFee = Math.round(fee);
  }

  // Get cleaning fee
  public getCleaningFee(): number {
    return this.cleaningFee;
  }

  // Save all pricing to the server (admin function)
  public async savePricingToServer(adminKey: string): Promise<boolean> {
    try {
      // Ensure all prices are rounded to whole numbers
      const roundedPrices = this.seasonalPrices.map(price => ({
        ...price,
        pricePerNight: Math.round(price.pricePerNight)
      }));
      
      // Add the admin key to both query params and headers for better compatibility
      const response = await axios.post(
        `${API_ENDPOINTS.ADMIN_PRICING}?adminKey=${adminKey}`,
        {
          adminKey, // Include in body as well
          seasonalPrices: roundedPrices,
          discounts: this.discounts,
          cleaningFee: Math.round(this.cleaningFee)
        },
        {
          headers: {
            'x-admin-key': adminKey // Add to headers
          }
        }
      );
      
      return response.data.success === true;
    } catch (error) {
      console.error("Error saving pricing to server:", error);
      return false;
    }
  }

  // Reset all pricing to defaults
  public resetToDefaults(): void {
    this.seasonalPrices = [
      { id: "high-season", name: "High Season", startMonth: 6, endMonth: 7, pricePerNight: 200 },
      { id: "mid-season", name: "Mid Season", startMonth: 5, endMonth: 8, pricePerNight: 180 },
      { id: "shoulder-season", name: "Shoulder Season", startMonth: 3, endMonth: 4, pricePerNight: 170 },
      { id: "low-season", name: "Low Season", startMonth: 0, endMonth: 2, pricePerNight: 150 }
    ];
    
    this.discounts = [
      { id: "monthly", name: "Monthly Discount", minNights: 30, discountPercentage: 20 },
      { id: "weekly", name: "Weekly Discount", minNights: 7, discountPercentage: 12 }
    ];
    
    this.cleaningFee = 60;
  }
}

// Export singleton instance
const pricingService = new PricingService();
export default pricingService;