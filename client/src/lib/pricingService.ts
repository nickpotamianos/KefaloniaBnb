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
    { id: "low-season", name: "Low Season", startMonth: 0, endMonth: 2, pricePerNight: 150 }, // Jan-Mar
    { id: "shoulder-season", name: "Shoulder Season", startMonth: 3, endMonth: 4, pricePerNight: 170 }, // Apr-May
    { id: "mid-season", name: "Mid Season", startMonth: 5, endMonth: 8, pricePerNight: 180 },  // Jun & Sep
    { id: "high-season", name: "High Season", startMonth: 6, endMonth: 7, pricePerNight: 200 } // Jul-Aug
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
  
  // Promise to track when pricing data is loaded
  private initPromise: Promise<void> | null = null;
  
  // Default low season price if not configured
  private readonly DEFAULT_LOW_SEASON_PRICE = 150;
  
  constructor() {
    // Start loading pricing from the server immediately
    this.initPromise = this.loadPricingFromServer();
  }
  
  // Initialize pricing from the server
  public async loadPricingFromServer(): Promise<void> {
    try {
      // Use the public endpoint that doesn't require admin authentication
      console.log("PricingService: Loading pricing from server...");
      const response = await axios.get(API_ENDPOINTS.PRICING);
      
      console.log("PricingService: Raw server response:", JSON.stringify(response.data, null, 2));
      
      if (response.data.success && response.data.pricing) {
        const { seasonalPrices, discounts, cleaningFee } = response.data.pricing;
        console.log("PricingService: Received pricing data:", { 
          seasonalPrices: JSON.stringify(seasonalPrices),
          discountsCount: discounts?.length,
          cleaningFee
        });
        
        if (Array.isArray(seasonalPrices) && seasonalPrices.length > 0) {
          // Extract the actual data from MongoDB document objects
          // MongoDB documents may contain _doc property or other metadata
          const extractedPrices = seasonalPrices.map(price => {
            // If it's a MongoDB document with _doc property, use that
            if (price._doc) {
              return {
                id: price._doc.id,
                name: price._doc.name,
                startMonth: price._doc.startMonth,
                endMonth: price._doc.endMonth,
                pricePerNight: Math.round(price._doc.pricePerNight)
              };
            }
            // Otherwise take direct properties if they exist
            return {
              id: price.id,
              name: price.name,
              startMonth: price.startMonth,
              endMonth: price.endMonth,
              pricePerNight: Math.round(price.pricePerNight)
            };
          });
          
          this.seasonalPrices = extractedPrices;
          console.log("PricingService: Processed seasonal prices:", JSON.stringify(this.seasonalPrices));
          
          // Make sure we have a low-season entry
          const hasLowSeason = this.seasonalPrices.some(price => price.id === "low-season");
          if (!hasLowSeason) {
            console.warn("PricingService: No low-season entry found in data from server, adding default");
            this.seasonalPrices.push({
              id: "low-season",
              name: "Low Season",
              startMonth: 0,
              endMonth: 2,
              pricePerNight: this.DEFAULT_LOW_SEASON_PRICE
            });
          }
          
          console.log("PricingService: Final seasonal prices:", 
            this.seasonalPrices.map(s => `${s.id} (${s.name}): €${s.pricePerNight}`).join(', ')
          );
        } else {
          console.warn("PricingService: No seasonal prices in server response, keeping defaults");
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
      } else {
        console.warn("PricingService: Invalid or missing pricing data in server response, using defaults");
      }
      
      // After loading data, always check one more time for the low-season entry
      this.ensureLowSeasonExists();
    } catch (error) {
      // For the public pricing endpoint, don't display errors in console
      console.warn("PricingService: Error loading pricing, using default pricing", error);
      
      // After error, ensure we have a low-season entry for fallback
      this.ensureLowSeasonExists();
    } finally {
      this.isInitialized = true;
    }
  }
  
  // Make sure we always have a low-season entry
  private ensureLowSeasonExists(): void {
    const hasLowSeason = this.seasonalPrices.some(price => price.id === "low-season");
    if (!hasLowSeason) {
      console.warn("PricingService: No low-season entry found, adding fallback");
      this.seasonalPrices.push({
        id: "low-season",
        name: "Low Season",
        startMonth: 0,
        endMonth: 2,
        pricePerNight: this.DEFAULT_LOW_SEASON_PRICE
      });
    }
  }

  // Ensure pricing data is loaded before returning prices
  private async ensureInitialized(): Promise<void> {
    if (this.isInitialized) {
      return;
    }
    
    if (this.initPromise) {
      try {
        await this.initPromise;
      } catch (error) {
        console.error("PricingService: Error waiting for initialization", error);
        this.isInitialized = true; // Prevent further attempts
        
        // Ensure we have a low-season entry even if initialization failed
        this.ensureLowSeasonExists();
      }
    } else {
      // If initPromise is null for some reason, initialize now
      this.initPromise = this.loadPricingFromServer();
      await this.initPromise;
    }
  }

  // Get the base price for a specific date
  public async getPriceForDateAsync(date: Date): Promise<number> {
    await this.ensureInitialized();
    return this.getPriceForDate(date);
  }

  // Get the base price for a specific date (synchronous version)
  public getPriceForDate(date: Date): number {
    if (!this.isInitialized) {
      console.warn("PricingService: Getting price before initialization complete, might use default prices");
      // Make sure we have a low-season entry for fallback
      this.ensureLowSeasonExists();
    }
    
    const month = date.getMonth();
    
    // Debug seasonal prices state in problematic cases
    if (this.seasonalPrices.length === 0) {
      console.warn("PricingService: No seasonal prices defined! Using fallback price");
      return this.DEFAULT_LOW_SEASON_PRICE;
    }
    
    // Create comprehensive mapping of months to seasonal prices
    const monthPriceMap = new Map<number, number>();
    
    // Sort seasons by price - higher prices should override lower ones
    // This handles overlapping date ranges (like mid-season and high-season both containing June)
    const sortedSeasons = [...this.seasonalPrices].sort((a, b) => b.pricePerNight - a.pricePerNight);
    
    // Fill the month-to-price mapping
    sortedSeasons.forEach(season => {
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
    
    // Debug log for monthly prices (less verbose than per-date logging)
    if (!this._loggedMonthPrices) {
      console.log("PricingService: Month-to-price mapping:", 
        Array.from(monthPriceMap.entries())
          .sort((a, b) => a[0] - b[0])  // Sort by month for clearer output
          .map(([month, price]) => `Month ${month+1}: €${price}`)
          .join(', ')
      );
      this._loggedMonthPrices = true;
    }
    
    // Look up the price for this month
    if (monthPriceMap.has(month)) {
      const price = monthPriceMap.get(month)!;
      return price;
    }
    
    // If no mapping exists for this month (should never happen with proper setup)
    // Find the low season price as fallback
    const lowSeason = this.seasonalPrices.find(s => s.id === "low-season");
    if (lowSeason) {
      console.warn(`PricingService: No price mapping for month ${month+1}, using low season price: ${lowSeason.pricePerNight}`);
      return lowSeason.pricePerNight;
    }
    
    // This should never happen since we always ensure a low-season entry exists,
    // but kept as ultimate fallback for robustness
    console.error(
      `PricingService: CRITICAL - No low season found despite safeguards. Using fallback price ${this.DEFAULT_LOW_SEASON_PRICE}. ` +
      `Seasons available: ${this.seasonalPrices.map(s => s.id).join(', ')}`
    );
    
    // Add an emergency low season entry to prevent future errors
    this.seasonalPrices.push({
      id: "low-season",
      name: "Low Season (Emergency Fallback)",
      startMonth: 0, 
      endMonth: 2,
      pricePerNight: this.DEFAULT_LOW_SEASON_PRICE
    });
    
    return this.DEFAULT_LOW_SEASON_PRICE;
  }
  
  // Internal flag to prevent excessive logging
  private _loggedMonthPrices: boolean = false;

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
      const nightPrice = this.getPriceForDate(currentDate);
      basePrice += nightPrice;
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
    
    // Always ensure we have a low-season entry after setting prices
    this.ensureLowSeasonExists();
    
    // Reset the month price map cache
    this._loggedMonthPrices = false;
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

  // Public method to force reload pricing data from server
  public async reloadPricing(): Promise<void> {
    console.log("PricingService: Forced reload of pricing data requested");
    this.isInitialized = false;
    this._loggedMonthPrices = false;
    this.initPromise = this.loadPricingFromServer();
    await this.initPromise;
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
      
      if (response.data.success) {
        // If save was successful, reload pricing to ensure consistency
        await this.reloadPricing();
      }
      
      return response.data.success === true;
    } catch (error) {
      console.error("Error saving pricing to server:", error);
      return false;
    }
  }

  // Reset all pricing to defaults
  public resetToDefaults(): void {
    this.seasonalPrices = [
      { id: "low-season", name: "Low Season", startMonth: 0, endMonth: 2, pricePerNight: 150 },
      { id: "shoulder-season", name: "Shoulder Season", startMonth: 3, endMonth: 4, pricePerNight: 170 },
      { id: "mid-season", name: "Mid Season", startMonth: 5, endMonth: 8, pricePerNight: 180 },
      { id: "high-season", name: "High Season", startMonth: 6, endMonth: 7, pricePerNight: 200 }
    ];
    
    this.discounts = [
      { id: "monthly", name: "Monthly Discount", minNights: 30, discountPercentage: 20 },
      { id: "weekly", name: "Weekly Discount", minNights: 7, discountPercentage: 12 }
    ];
    
    this.cleaningFee = 60;
    
    // Reset initialization flags to trigger a reload
    this.isInitialized = false;
    this._loggedMonthPrices = false;
  }
}

// Export singleton instance
const pricingService = new PricingService();
export default pricingService;