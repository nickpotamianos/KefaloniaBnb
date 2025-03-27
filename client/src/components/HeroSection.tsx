import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const HeroSection = () => {
  return (
    <>
      <Helmet>
        <title>Kefalonian Vintage Home | Authentic Greek Island Getaway in Fiscardo</title>
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
    </>
  );
};

export default HeroSection;
