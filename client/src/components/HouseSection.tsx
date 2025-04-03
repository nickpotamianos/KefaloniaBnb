import { Check, CalendarDays, Sun, Cloud, Leaf } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import BookingCard from "@/components/BookingCard";
import PhotoGallery from "@/components/PhotoGallery";
import { houseHighlights } from "@/lib/constants";
import { roomPhotos } from "@/lib/photoData";
import { Helmet } from "react-helmet";
import { useState } from "react";

type Season = 'spring' | 'summer' | 'autumn' | 'winter';

interface SeasonInfo {
  title: string;
  description: string;
  activities: string[];
  temp: string;
  icon: JSX.Element;
}

const HouseSection = () => {
  const [activeSeason, setActiveSeason] = useState<Season>('summer');
  
  // Seasons information
  const seasons: Record<Season, SeasonInfo> = {
    spring: {
      title: "Spring (April-May)",
      description: "Lush greenery, wildflowers, and comfortable temperatures make spring perfect for hiking and exploring the island without crowds.",
      activities: ["Wildflower hiking", "Easter celebrations", "Village exploration"],
      temp: "15-24°C",
      icon: <Leaf className="h-5 w-5" />
    },
    summer: {
      title: "Summer (June-Sept)",
      description: "Crystal clear waters, vibrant beach life, and warm evenings spent in village tavernas define the perfect Mediterranean summer.",
      activities: ["Beach days", "Boat trips", "Evening dining"],
      temp: "25-32°C",
      icon: <Sun className="h-5 w-5" />
    },
    autumn: {
      title: "Autumn (Oct-Nov)",
      description: "Still-warm sea waters and fewer tourists create a peaceful atmosphere to enjoy authentic local experiences.",
      activities: ["Wine harvest", "Swimming", "Local festivals"],
      temp: "18-26°C",
      icon: <Leaf className="h-5 w-5" />
    },
    winter: {
      title: "Winter (Dec-Mar)",
      description: "Experience the authentic local life as the island returns to its peaceful rhythm with mild temperatures and occasional rainfall.",
      activities: ["Local culture", "Olive harvest", "Nature photography"],
      temp: "10-15°C",
      icon: <Cloud className="h-5 w-5" />
    }
  };

  return (
    <>
      <Helmet>
        <title>The House | Kefalonia Vintage Home in Fiscardo</title>
        <meta name="description" content="Traditional 100-year-old Kefalonian house beautifully restored with modern comforts. 2 bedrooms, fully equipped kitchen, private garden, and authentic Greek charm." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Accommodation",
              "name": "Kefalonia Vintage Home",
              "description": "Beautifully restored 100-year-old traditional Kefalonian house blending heritage with modern comforts",
              "numberOfRooms": "2",
              "amenityFeature": [
                {"@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Fully Equipped Kitchen", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Garden", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Traditional Architecture", "value": true}
              ],
              "occupancy": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 5
              },
              "floorSize": {
                "@type": "QuantitativeValue",
                "unitCode": "MTK",
                "value": "90"
              }
            }
          `}
        </script>
      </Helmet>
      
      <section id="house" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <Heading
            title="Unique Kefalonia Vintage Home"
            description="Experience the charm of our beautifully restored 100-year-old traditional Kefalonian home that blends heritage with modern comforts."
            centered
          />
          
          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roomPhotos.map((room, index) => (
              <PhotoGallery 
                key={index}
                title={room.title}
                folderPath={room.folderPath}
                photos={room.photos}
              />
            ))}
          </div>
          
          <div className="mt-12">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-6">About the House</h3>
                <p className="text-gray-700 mb-4">
                  Welcome to our unique Kefalonian vintage home with over 100 years of history. This beautifully restored traditional house embodies the authentic charm and character of 19th-century Kefalonian architecture while offering all the modern comforts you need for a memorable Greek island experience.
                </p>
                <p className="text-gray-700 mb-4">
                  The house comfortably accommodates up to 5 guests with 2 bedrooms (two with a double bed, one with a single bed) and the living room with 2 comfortable sofa beds. It features 1 bathroom, a fully equipped kitchen perfect for preparing local dishes, and a dedicated workspace with WiFi for remote working.
                </p>
                <p className="text-gray-700 mb-8">
                  Throughout the property, you'll find a thoughtful blend of heritage elements and contemporary amenities, creating a space that honors its history while ensuring a comfortable and convenient stay. From the traditional stone walls to the modern air conditioning, every detail has been carefully considered.
                </p>
                
                <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-6">Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {houseHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <Check className="h-6 w-6 text-[#D17A46] flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
                
                {/* Island Seasons Feature */}
                <div className="mt-12 mb-8">
                  <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-6 flex items-center">
                    <CalendarDays className="h-6 w-6 mr-2 text-[#D17A46]" />
                    Kefalonia Through the Seasons
                  </h3>
                  
                  <div className="bg-gradient-to-r from-[#F8F6F2] to-white rounded-2xl overflow-hidden border border-[#D17A46]/10 shadow-sm">
                    {/* Season Selector Tabs */}
                    <div className="flex overflow-x-auto scrollbar-hide">
                      {Object.entries(seasons).map(([key, season]) => (
                        <button
                          key={key}
                          onClick={() => setActiveSeason(key as Season)}
                          className={`flex-1 min-w-[110px] py-4 px-3 text-center transition duration-300 ${
                            activeSeason === key 
                              ? "bg-[#2C5F89] text-white" 
                              : "bg-[#F8F6F2] text-gray-700 hover:bg-[#2C5F89]/10"
                          }`}
                        >
                          <div className="flex flex-col items-center">
                            {season.icon}
                            <span className="mt-1 font-medium text-sm">{season.title}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {/* Season Content */}
                    <div className="p-6">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <p className="text-gray-700 mb-4">
                            {seasons[activeSeason].description}
                          </p>
                          
                          <div className="flex flex-col sm:flex-row mt-4 gap-8">
                            {/* Activities */}
                            <div className="sm:w-1/2">
                              <h4 className="font-bold text-[#2C5F89] mb-3 text-sm uppercase tracking-wider">Popular Activities</h4>
                              <ul className="space-y-2">
                                {seasons[activeSeason].activities.map((activity: string, index: number) => (
                                  <li key={index} className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#D17A46]"></div>
                                    <span className="text-gray-700">{activity}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            {/* Weather */}
                            <div className="sm:w-1/2">
                              <h4 className="font-bold text-[#2C5F89] mb-3 text-sm uppercase tracking-wider">Weather</h4>
                              <div className="flex items-center gap-2 text-gray-700">
                                <span className="text-2xl font-light">{seasons[activeSeason].temp}</span>
                              </div>
                              
                              {/* Season-specific recommendation */}
                              <div className="mt-4 p-3 bg-[#2C5F89]/5 rounded-lg border border-[#2C5F89]/10">
                                <p className="text-sm text-gray-700 italic">
                                  {activeSeason === "summer" && "Book early for summer stays as this is our most popular season!"}
                                  {activeSeason === "spring" && "Spring offers the perfect balance of good weather and fewer tourists."}
                                  {activeSeason === "autumn" && "Experience the authentic island life with locals during autumn."}
                                  {activeSeason === "winter" && "Enjoy special winter rates for long-term stays during this peaceful season."}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Season-specific image */}
                    <div className="h-40 bg-cover bg-center" style={{
                      backgroundImage: activeSeason === "summer" ? "url('/images/myrtos.jpg')" :
                                      activeSeason === "spring" ? "url('/images/hike.jpg')" :
                                      activeSeason === "autumn" ? "url('/images/Robola.jpg')" : 
                                      "url('/images/fiskardo.jpeg')"
                    }}></div>
                  </div>
                </div>
              </div>
              
              {/* Booking CTA Card */}
              <div className="md:w-1/3" id="booking">
                <BookingCard />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HouseSection;
