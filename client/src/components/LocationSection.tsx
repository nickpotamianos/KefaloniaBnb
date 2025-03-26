import { MapPin, Camera, Zap } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { nearbyBeaches, localAttractions, diningOptions } from "@/lib/constants";

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
  // Kefalonia coordinates (approximate center of the island)
  const position: [number, number] = [38.1754, 20.5692];
  
  return (
    <section id="location" className="py-20 px-4 bg-[#F8F6F2]">
      <div className="container mx-auto">
        <Heading
          title="Location"
          description="Discover the perfect location for your Greek island getaway, with easy access to beaches, villages, and natural wonders."
          centered
        />
        
        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="md:w-1/2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-96">
              <MapContainer 
                center={position} 
                zoom={11} 
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={customIcon}>
                  <Popup>
                    Villa Kefalonia <br /> Your luxury escape awaits!
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
                  <p className="text-gray-700">Villa Kefalonia, Agia Efimia, Kefalonia 28081, Greece</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 mb-3">
                <Camera className="h-6 w-6 text-[#D17A46] flex-shrink-0" />
                <div>
                  <span className="font-bold text-gray-700">Nearest Airport:</span>
                  <p className="text-gray-700">Kefalonia International Airport (EFL) - 40 minutes by car</p>
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
            <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-6">Explore Kefalonia</h3>
            <p className="text-gray-700 mb-6">
              Our villa is perfectly positioned to explore the best of what Kefalonia has to offer. From pristine beaches and charming villages to natural wonders and historical sites, everything is within easy reach.
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
  );
};

export default LocationSection;
