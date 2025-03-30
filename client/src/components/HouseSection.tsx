import { Check } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import BookingCard from "@/components/BookingCard";
import PhotoGallery from "@/components/PhotoGallery";
import { houseHighlights } from "@/lib/constants";
import { roomPhotos } from "@/lib/photoData";
import { Helmet } from "react-helmet";

const HouseSection = () => {
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
