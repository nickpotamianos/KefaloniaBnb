import { MapPin, Camera, Zap } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { nearbyBeaches, localAttractions, diningOptions } from "@/lib/constants";
import { Helmet } from "react-helmet";

// Fix for default marker icon in Leaflet with React
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
        <title>Location | Kefalonian Vintage Home in Fiscardo</title>
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
      
      <section id="location" className="py-20 px-4 bg-[#F8F6F2]">
        <div className="container mx-auto">
          <Heading
            title="Ideal Location in Kefalonia"
            description="Discover our perfect location in Fiscardo with easy access to world-famous beaches, charming villages, and natural wonders of Kefalonia."
            centered
          />
          
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-96 relative z-0">
                <MapContainer 
                  center={villaPosition} 
                  zoom={13} 
                  scrollWheelZoom={false} 
                  className="h-96 rounded-lg shadow-md"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={villaPosition} icon={customIcon}>
                    <Popup>
                      <strong>Kefalonian Vintage Home</strong> <br /> 
                      Traditional villa in Fiscardo <br />
                      <a href="https://goo.gl/maps/abcdefg" target="_blank" rel="noopener noreferrer">Directions</a>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-bold playfair text-[#2C5F89] mb-3">Getting Here</h3>
                <div className="flex items-start space-x-4 mb-3">
                  <MapPin className="h-6 w-6 text-[#D17A46] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-700">Address:</span>
                    <p className="text-gray-700">Kefalonian Vintage Home, Fiscardo, Kefalonia 28081, Greece</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 mb-3">
                  <Camera className="h-6 w-6 text-[#D17A46] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-700">Nearest Airport:</span>
                    <p className="text-gray-700">Kefalonia International Airport (EFL) - 40 minutes by car (35km)</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="h-6 w-6 text-[#D17A46] flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-700">Transportation:</span>
                    <p className="text-gray-700">Car rental recommended. We can arrange airport transfers upon request.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-6">Explore Kefalonia Island</h3>
              <p className="text-gray-700 mb-6">
                Our traditional villa is perfectly positioned in the picturesque village of Fiscardo, an ideal base for exploring Kefalonia's treasures. From world-renowned beaches like Myrtos and Antisamos to charming fishing villages and natural wonders, everything is within easy reach.
              </p>
              
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold text-[#2C5F89] mb-2">Nearby Beaches</h4>
                  <div className="space-y-3">
                    {nearbyBeaches.map((beach, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{beach.name}</span>
                        <span className="text-sm text-gray-500">{beach.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold text-[#2C5F89] mb-2">Local Attractions</h4>
                  <div className="space-y-3">
                    {localAttractions.map((attraction, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{attraction.name}</span>
                        <span className="text-sm text-gray-500">{attraction.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold text-[#2C5F89] mb-2">Dining & Shopping</h4>
                  <div className="space-y-3">
                    {diningOptions.map((option, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-gray-700">{option.name}</span>
                        <span className="text-sm text-gray-500">{option.distance}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LocationSection;
