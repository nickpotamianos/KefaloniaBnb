import { addDays, differenceInDays, startOfDay } from 'date-fns';

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
  // Seasonal pricing tiers
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

  // Get the base price for a specific date
  public getPriceForDate(date: Date): number {
    const month = date.getMonth();
    
    // Find the season pricing tier for this month
    const season = this.seasonalPrices.find(s => 
      (s.startMonth <= s.endMonth && month >= s.startMonth && month <= s.endMonth) || 
      (s.startMonth > s.endMonth && (month >= s.startMonth || month <= s.endMonth))
    );
    
    // Default to low season if no match is found (should never happen)
    return season ? season.pricePerNight : 150; 
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
    this.cleaningFee = fee;
  }

  // Get cleaning fee
  public getCleaningFee(): number {
    return this.cleaningFee;
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