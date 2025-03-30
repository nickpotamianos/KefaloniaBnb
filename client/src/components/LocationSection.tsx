import { MapPin, Camera, Navigation, Sailboat, Utensils, Waves, Mountain, Coffee } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { nearbyBeaches, localAttractions, diningOptions, cafeShoppingOptions } from "@/lib/constants";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";

// Custom villa marker icon
const customIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const LocationSection = () => {
  // Precise villa location in Fiscardo, Kefalonia
  const villaPosition: [number, number] = [38.447111, 20.555222];
  
  return (
    <>
      <Helmet>
        <title>Kefalonia Vintage Home in Fiscardo</title>
        <meta name="description" content="Perfectly positioned in Fiscardo, Kefalonia - just minutes from Myrtos Beach, Antisamos Beach, and charming fishing villages. Ideal base for exploring the island." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Place",
              "name": "Kefalonian Vintage Home Location",
              "description": "Traditional villa located in Fiscardo, Kefalonia, Greece, close to beaches and attractions",
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "38.447111",
                "longitude": "20.555222"
              },
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "Greece",
                "addressRegion": "Kefalonia",
                "addressLocality": "Fiscardo",
                "postalCode": "28081"
              }
            }
          `}
        </script>
      </Helmet>
      
      <section id="location" className="py-24 px-4 bg-gradient-to-b from-white to-[var(--off-white)]">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="inline-block mb-3 px-4 py-2 bg-[var(--sea-blue)]/10 rounded-full text-[var(--primary-blue)] text-sm font-medium flex items-center justify-center mx-auto">
              <MapPin className="mr-1.5 h-4 w-4" />
              Discover Kefalonia's Paradise
            </span>
            
            <Heading
              title="Your Perfect Island Location"
              description="Situated in picturesque Fiscardo with easy access to world-famous beaches, charming villages, and the natural wonders of Kefalonia."
              centered
            />
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Map and Getting Here Section */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[400px] relative z-0">
                <MapContainer 
                  center={villaPosition} 
                  zoom={13} 
                  scrollWheelZoom={false} 
                  className="h-[400px] w-full rounded-xl"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png?language=en"
                  />
                  <Marker position={villaPosition} icon={customIcon}>
                    <Popup>
                      <div className="text-center">
                        <strong className="text-[var(--deep-blue)] block">Kefalonian Vintage Home</strong>
                        <span className="text-sm block mb-2">Traditional villa in Fiscardo</span>
                        <a 
                          href="https://maps.app.goo.gl/5dfiX2VPvbXASHiC9" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--terracotta)] hover:underline"
                        >
                          Get Directions
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              
              <div className="mt-8">
                <h3 className="text-2xl font-semibold playfair text-[var(--deep-blue)] mb-5 relative">
                  <span className="relative">
                    Getting Here
                    <span className="absolute -bottom-1 left-0 h-1 w-12 bg-[var(--terracotta)] rounded-full"></span>
                  </span>
                </h3>
                
                <div className="space-y-6 mt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[var(--deep-blue)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Address</h4>
                      <p className="text-gray-600">Kefalonian Vintage Home, Fiscardo, Kefalonia 28081, Greece</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg flex-shrink-0">
                      <Camera className="h-6 w-6 text-[var(--deep-blue)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Nearest Airport</h4>
                      <p className="text-gray-600">Kefalonia International Airport (EFL) - 40 minutes by car (35km)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg flex-shrink-0">
                      <Navigation className="h-6 w-6 text-[var(--deep-blue)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Transportation</h4>
                      <p className="text-gray-600">Car rental recommended for exploring the island. We can arrange airport transfers upon request.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-4">
                  <Button 
                    asChild 
                    className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 rounded-full shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <a 
                      href="https://maps.app.goo.gl/5dfiX2VPvbXASHiC9" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Get Directions
                    </a>
                  </Button>
                  
                  <Button 
                    asChild 
                    variant="outline"
                    className="border-[var(--deep-blue)] text-[var(--deep-blue)] hover:bg-[var(--deep-blue)]/5 rounded-full"
                  >
                    <a href="#contact">
                      Ask for Transport Help
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
            
            {/* Island Exploration Section */}
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h3 className="text-2xl font-semibold playfair text-[var(--deep-blue)] mb-6 relative">
                <span className="relative">
                  Explore Kefalonia Island
                  <span className="absolute -bottom-1 left-0 h-1 w-12 bg-[var(--terracotta)] rounded-full"></span>
                </span>
              </h3>
              
              <p className="text-gray-700 mb-8 leading-relaxed">
                Our traditional villa is perfectly positioned in the enchanting village of Fiscardo, providing an ideal base for discovering Kefalonia's treasures. From world-renowned beaches like Myrtos and Antisamos to charming fishing villages and natural wonders, the island's most captivating attractions are all within easy reach.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <LocationCard 
                  title="Beaches & Coves" 
                  icon={<Waves className="h-5 w-5 text-white" />}
                  iconBg="bg-[var(--sea-blue)]"
                  items={nearbyBeaches}
                />
                
                <LocationCard 
                  title="Local Attractions" 
                  icon={<Mountain className="h-5 w-5 text-white" />}
                  iconBg="bg-[var(--olive)]"
                  items={localAttractions}
                />
                
                <LocationCard 
                  title="Dining & Tavernas" 
                  icon={<Utensils className="h-5 w-5 text-white" />}
                  iconBg="bg-[var(--terracotta)]"
                  items={diningOptions}
                />
                
                <LocationCard 
                  title="Cafés & Shopping" 
                  icon={<Coffee className="h-5 w-5 text-white" />}
                  iconBg="bg-[var(--stone)]"
                  items={cafeShoppingOptions}
                />
              </div>
              
              <div className="mt-8 p-5 rounded-xl bg-[var(--sand)]/20 border border-[var(--sand)]/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-[var(--sea-blue)]/10">
                    <Sailboat className="h-5 w-5 text-[var(--primary-blue)]" />
                  </div>
                  <h4 className="font-bold text-gray-800">Boat Rentals & Island Tours</h4>
                </div>
                <p className="text-gray-600 text-sm">
                  Discover hidden beaches and sea caves only accessible by water. We can help arrange boat rentals or guided tours around the island – just ask!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

// Location Card Component
interface LocationCardProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  items: Array<{
    name: string;
    distance: string;
    type?: string;
    description?: string;
  }>;
}

const LocationCard = ({ title, icon, iconBg, items }: LocationCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-t border-l border-gray-50">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-full ${iconBg} flex-shrink-0`}>
          {icon}
        </div>
        <h4 className="font-bold text-[var(--deep-blue)]">{title}</h4>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 font-medium">{item.name}</span>
              <span className="text-sm bg-[var(--off-white)] px-2 py-0.5 rounded-full text-gray-500">{item.distance}</span>
            </div>
            {item.description && (
              <span className="text-xs text-gray-500 mt-0.5">{item.description}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSection;
