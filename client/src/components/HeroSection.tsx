import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import AvailabilityCalendar from "./AvailabilityCalendar";

const HeroSection = () => {
  return (
    <>
      <Helmet>
        <title>Kefalonia Vintage Home | Authentic Greek Island Getaway in Fiscardo</title>
        <meta name="description" content="Experience the authentic beauty of Kefalonia in our traditional seaside villa with breathtaking views of the Ionian Sea, near pristine beaches and charming local attractions." />
      </Helmet>
      
      <section 
        id="home" 
        className="relative h-screen bg-cover bg-center"
        aria-label="Kefalonian Vintage Home Introduction"
      >
        <video 
          className="absolute inset-0 w-full h-full object-cover" 
          src="/images/homepage.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          aria-hidden="true"
        ></video>
        
        {/* Enhanced gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Badge for authenticity */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-6 inline-block"
            >
              <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm uppercase tracking-wider font-medium border border-white/30">
                Authentic Greek Experience
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl text-white font-bold mb-6 playfair leading-tight"
            >
              Your Seaside Escape<br className="hidden sm:block" /> in Kefalonia
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light"
            >
              Experience the timeless charm of Greece in our 100-year-old villa with panoramic views of the crystal-clear Ionian Sea in picturesque Fiscardo.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-5 justify-center"
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <a href="#booking" aria-label="Book your stay at Kefalonian Vintage Home now">
                  Book Your Stay
                </a>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-white text-lg px-8 py-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <a href="#house" aria-label="View details about our traditional Kefalonian house">
                  Explore the Villa
                </a>
              </Button>
            </motion.div>
            
            {/* Features highlights */}
            <motion.div 
              className="mt-12 flex flex-wrap justify-center gap-6 md:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <div className="flex items-center gap-2 text-white/90">
                <span className="w-1.5 h-1.5 bg-[var(--sea-blue)] rounded-full"></span>
                <span>Scenic Ocean Views</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <span className="w-1.5 h-1.5 bg-[var(--sea-blue)] rounded-full"></span>
                <span>Traditional Architecture</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <span className="w-1.5 h-1.5 bg-[var(--sea-blue)] rounded-full"></span>
                <span>Near Famous Beaches</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <span className="w-1.5 h-1.5 bg-[var(--sea-blue)] rounded-full"></span>
                <span>12% off for weekly stays</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <span className="w-1.5 h-1.5 bg-[var(--sea-blue)] rounded-full"></span>
                <span>20% off for monthly stays</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <motion.a 
            href="#house" 
            className="text-white animate-bounce p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
            aria-label="Scroll down to learn more about our Kefalonian house"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <ChevronDown className="h-6 w-6" />
          </motion.a>
        </div>
      </section>
      
      {/* Booking Section with Calendar */}
      <section id="booking" className="px-4 py-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 playfair mb-4">
              Check Availability & Book Your Stay
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the natural beauty of Kefalonia with our special pricing and discounts for longer stays. 
              Enjoy 12% off for weekly bookings and 20% off for monthly stays.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <AvailabilityCalendar showPrices={true} showHelpText={true} />
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Kefalonia Through the Seasons</h3>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[var(--sea-blue)]">
                  <h4 className="font-semibold text-lg mb-2">April - May (€170/night)</h4>
                  <p className="text-gray-600">
                    Spring brings mild temperatures, wildflowers, and fewer tourists. Perfect for hiking and exploring the island's natural beauty.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-[var(--terracotta)]">
                  <h4 className="font-semibold text-lg mb-2">June & September (€180/night)</h4>
                  <p className="text-gray-600">
                    The ideal shoulder seasons with warm sea temperatures, perfect weather, and less crowded beaches.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-amber-500">
                  <h4 className="font-semibold text-lg mb-2">July - August (€200/night)</h4>
                  <p className="text-gray-600">
                    Peak summer season with hot sunny days, vibrant nightlife, and the full Greek island experience in all its glory.
                  </p>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500">
                  <h4 className="font-semibold text-lg mb-2">October - March (€150/night)</h4>
                  <p className="text-gray-600">
                    Experience the authentic local life with mild winters, peaceful surroundings, and the island's natural beauty without the crowds.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg shadow-sm border border-green-200 mt-6">
                  <h4 className="font-semibold text-lg text-green-700 mb-2">Special Discounts</h4>
                  <ul className="text-gray-600 list-disc pl-5 space-y-1">
                    <li><span className="font-medium">Stay 7+ nights:</span> Get 12% off your entire booking</li>
                    <li><span className="font-medium">Stay 30+ nights:</span> Enjoy 20% off for extended stays</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
