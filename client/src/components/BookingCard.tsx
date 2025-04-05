import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users, Home, Bed, Bath, Languages, MapPin, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";
import AvailabilityCalendar from "./AvailabilityCalendar";

const BookingCard = () => {
  return (
    <div className="sticky top-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass-card p-6 rounded-xl shadow-lg border-t border-white/40">
          <h3 className="text-2xl font-semibold playfair text-[var(--deep-blue)] mb-5 flex items-center">
            <span className="relative">
              Book Your Kefalonian Escape
              <span className="absolute -bottom-1 left-0 h-1 w-16 bg-[var(--terracotta)] rounded-full"></span>
            </span>
          </h3>
          
          <div className="space-y-3.5 mb-6" aria-label="Accommodation details">
            <div className="flex items-center gap-3">
              <div className="bg-[var(--sea-blue)]/10 p-2 rounded-lg">
                <Star className="h-5 w-5 text-[var(--terracotta)]" />
              </div>
              <div>
                <p className="font-medium text-gray-700">
                  <span className="font-bold">Hosted by Alex</span> · Superhost · 4.67★
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[var(--sea-blue)]/10 p-2 rounded-lg">
                <Users className="h-5 w-5 text-[var(--primary-blue)]" />
              </div>
              <p className="font-medium text-gray-700">5 guests</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[var(--sea-blue)]/10 p-2 rounded-lg">
                <Home className="h-5 w-5 text-[var(--primary-blue)]" />
              </div>
              <p className="font-medium text-gray-700">2 bedrooms (1 master, 1 guest)</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[var(--sea-blue)]/10 p-2 rounded-lg">
                <Bed className="h-5 w-5 text-[var(--primary-blue)]" />
              </div>
              <p className="font-medium text-gray-700">5 beds (2 double, 1 single, 2 sofa beds)</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[var(--sea-blue)]/10 p-2 rounded-lg">
                <Bath className="h-5 w-5 text-[var(--primary-blue)]" />
              </div>
              <p className="font-medium text-gray-700">1 bathroom</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[var(--sea-blue)]/10 p-2 rounded-lg">
                <Languages className="h-5 w-5 text-[var(--primary-blue)]" />
              </div>
              <p className="font-medium text-gray-700">English, Greek</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-[var(--sea-blue)]/10 p-2 rounded-lg">
                <MapPin className="h-5 w-5 text-[var(--primary-blue)]" />
              </div>
              <p className="font-medium text-gray-700">Fiscardo, Kefalonia, Greece</p>
            </div>
          </div>
          
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-5" aria-hidden="true" />
          
          <div className="mb-5 bg-[var(--sand)]/30 p-4 rounded-lg">
            <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[var(--terracotta)]" />
              <span>2025 Availability Calendar</span>
            </h4>
            <p className="text-gray-700 mb-4">Check our calendar for available dates. Book early for the summer season (June-September)!</p>
            
            {/* Dynamic availability calendar that shows prices */}
            <AvailabilityCalendar showPrices={true} showHelpText={true} />
          </div>
          
          <div className="space-y-3">
            <Button 
              asChild 
              className="w-full bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              aria-label="Book on Airbnb"
            >
              <a 
                href="https://airbnb.com/h/kefalonianvintagehome" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <img src="/images/wairbnb.svg" alt="Airbnb logo" className="h-5 w-5" />
                Book on Airbnb
              </a>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              className="w-full bg-white/50 backdrop-blur-sm text-[var(--deep-blue)] border-[var(--deep-blue)] hover:bg-white/80 py-6 rounded-xl transition-all duration-300"
              aria-label="Contact for direct booking"
            >
              <a href="#contact" className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Contact for Direct Booking
              </a>
            </Button>
          </div>
          
          <div className="mt-6 text-gray-600 bg-white/50 p-3 rounded-lg text-center">
            <p>Questions about our traditional Kefalonian house?</p>
            <a 
              href="tel:+306948201383" 
              className="font-bold text-[var(--deep-blue)] hover:text-[var(--primary-blue)] transition-colors flex items-center justify-center gap-2 mt-1"
            >
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-[var(--sea-blue)]/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </span>
              +30 694 820 1383
            </a>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingCard;
