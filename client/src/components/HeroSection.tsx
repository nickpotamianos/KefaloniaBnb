import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

const HeroSection = () => {
  return (
    <>
      <Helmet>
        <title>Kefalonian Vintage Home | Authentic Seaside Escape in Fiscardo</title>
        <meta name="description" content="Experience the authentic beauty of Greece in our traditional Kefalonian villa with breathtaking views of the Ionian Sea, near Myrtos beach and local attractions." />
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/40"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl text-white font-bold mb-4 playfair"
          >
            Your Seaside Escape in Kefalonia
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl"
          >
            Experience the authentic beauty of Greece in our traditional 100-year-old villa with breathtaking views of the Ionian Sea in Fiscardo.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button asChild size="lg" className="bg-[#D17A46] hover:bg-[#A65C32] text-white text-lg">
              <a href="#booking" aria-label="Book your stay at Kefalonian Vintage Home now">Book Now</a>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white text-lg">
              <a href="#house" aria-label="View details about our traditional Kefalonian house">View the House</a>
            </Button>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <a 
            href="#house" 
            className="text-white animate-bounce"
            aria-label="Scroll down to learn more about our Kefalonian house"
          >
            <ChevronDown className="h-8 w-8" />
          </a>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
