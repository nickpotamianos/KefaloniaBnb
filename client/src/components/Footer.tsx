import { Mail, Phone, MapPin, Facebook, Instagram, Globe, Clock, Sun, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-b from-[var(--deep-blue)] to-[#164B77] text-white pt-20 pb-8" itemScope itemType="https://schema.org/WPFooter">
      {/* Wave separator removed */}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-x-8 gap-y-16 mb-16">
          {/* Brand and Social - Takes up 3 columns on md screens */}
          <div className="md:col-span-3 space-y-8">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <img src="/images/2logokef1.png" alt="Kefalonian Vintage Home Logo" className="h-14 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold playfair">Kefalonia Vintage Home</h2>
                  <p className="text-white/60 text-sm">Traditional Greek Island Escape</p>
                </div>
              </div>
              
              <p className="mb-8 text-white/80 leading-relaxed max-w-md">
                Experience authentic Greek island living in our beautifully restored 100-year-old traditional home with breathtaking sea views in picturesque Fiscardo, Kefalonia.
              </p>
              
              <div className="flex space-x-5">
                <a 
                  href="https://www.facebook.com/kefalonianvintagehome" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-[var(--terracotta)]/80 p-2.5 rounded-full transition-all duration-300 text-white hover:text-white hover:scale-110" 
                  aria-label="Follow us on Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/kefalonianvintagehome" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-[var(--terracotta)]/80 p-2.5 rounded-full transition-all duration-300 text-white hover:text-white hover:scale-110" 
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.airbnb.com/h/kefalonianvintagehome" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-[var(--terracotta)]/80 p-2.5 rounded-full transition-all duration-300 text-white hover:text-white hover:scale-110" 
                  aria-label="View our Airbnb listing"
                >
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
            
            {/* Quick booking info */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-5 border-t border-l border-white/10">
              <h4 className="text-lg font-semibold playfair flex items-center mb-3">
                <Clock className="h-4 w-4 mr-2 text-[var(--sea-blue)]" />
                Quick Booking Info
              </h4>
              
              <ul className="space-y-3 text-sm">
                <li className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-white/60" />
                  <span>Check-in: 3:00 PM - 8:00 PM</span>
                </li>
                <li className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-white/60" />
                  <span>Check-out: 11:00 AM</span>
                </li>
                <li className="flex items-center">
                  <Sun className="h-4 w-4 mr-2 text-white/60" />
                  <span>Best season: April - October</span>
                </li>
              </ul>
              
              <div className="mt-3 pt-3 border-t border-white/10">
                <a 
                  href="#booking" 
                  className="text-white hover:text-[var(--terracotta)] transition-colors duration-300 text-sm font-medium flex items-center"
                >
                  Book your stay
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Navigation - Takes up 2 columns on md screens */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-xl font-bold playfair mb-6">
                <span className="relative inline-block">
                  Navigation
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[var(--terracotta)]"></span>
                </span>
              </h4>
              <nav aria-label="Footer Navigation">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <li>
                    <a 
                      href="#home" 
                      className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--sea-blue)] mr-2"></span>
                      Home
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#house" 
                      className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--sea-blue)] mr-2"></span>
                      The House
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#location" 
                      className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--sea-blue)] mr-2"></span>
                      Location
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#experiences" 
                      className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--sea-blue)] mr-2"></span>
                      Experiences
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#reviews" 
                      className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--sea-blue)] mr-2"></span>
                      Reviews
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#contact" 
                      className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--sea-blue)] mr-2"></span>
                      Contact
                    </a>
                  </li>
                </ul>
              </nav>
              
              <h4 className="text-xl font-bold playfair mb-6 mt-10">
                <span className="relative inline-block">
                  Useful Info
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[var(--terracotta)]"></span>
                </span>
              </h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                <li>
                  <a 
                    href="#house" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--sand)] mr-2"></span>
                    Amenities
                  </a>
                </li>
                <li>
                  <a 
                    href="#booking" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--sand)] mr-2"></span>
                    Booking
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--sand)] mr-2"></span>
                    House Rules
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--sand)] mr-2"></span>
                    Policy
                  </a>
                </li>
                <li>
                  <a 
                    href="#faq" 
                    className="text-white/80 hover:text-white transition-colors duration-300 flex items-center hover:translate-x-1 transform"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--sand)] mr-2"></span>
                    FAQ
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
          
          {/* Contact - Takes up 2 columns on md screens */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-xl font-bold playfair mb-6">
                <span className="relative inline-block">
                  Contact Us
                  <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-[var(--terracotta)]"></span>
                </span>
              </h4>
              <ul className="space-y-5">
                <li className="flex">
                  <div className="bg-white/10 rounded-full p-2 mr-4 flex-shrink-0">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h5 className="text-white/60 text-sm">Email</h5>
                    <a 
                      href="mailto:alexandros@potamianosgroup.com" 
                      className="text-white hover:text-[var(--sea-blue)] transition-colors duration-300"
                    >
                      alexandros@potamianosgroup.com
                    </a>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-white/10 rounded-full p-2 mr-4 flex-shrink-0">
                    <Phone className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h5 className="text-white/60 text-sm">Phone</h5>
                    <a 
                      href="tel:+306948201383" 
                      className="text-white hover:text-[var(--sea-blue)] transition-colors duration-300"
                    >
                      +30 694 820 1383 (Alex)
                    </a>
                    <br />
                    <a 
                      href="tel:+306986792378" 
                      className="text-white hover:text-[var(--sea-blue)] transition-colors duration-300"
                    >
                      +30 698 679 2378 (Nick)
                    </a>
                  </div>
                </li>
                <li className="flex">
                  <div className="bg-white/10 rounded-full p-2 mr-4 flex-shrink-0">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h5 className="text-white/60 text-sm">Address</h5>
                    <address className="not-italic text-white/90">
                      Epar. Odos Fiscardou - Magganou<br />
                      Fiscardo<br />
                      Kefalonia, 28081<br />
                      Greece
                    </address>
                  </div>
                </li>
              </ul>
            </motion.div>
            
            {/* Map or additional info */}
            <div className="mt-8 relative overflow-hidden rounded-lg h-32 opacity-90 hover:opacity-100 transition-opacity">
              <a 
                href="https://maps.app.goo.gl/5dfiX2VPvbXASHiC9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 hover:bg-black/30 transition-colors"
              >
                <span className="bg-white/80 backdrop-blur-sm text-[var(--deep-blue)] px-3 py-1.5 rounded-full text-sm font-medium">
                  View on Google Maps
                </span>
              </a>
              <img 
                src="/images/fiskardo.jpeg" 
                alt="Map of Fiscardo, Kefalonia" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white/60 mb-4 md:mb-0">
              © {currentYear} Kefalonia Vintage Home. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
