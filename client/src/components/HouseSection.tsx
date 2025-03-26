import { Check } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import GalleryImage from "@/components/GalleryImage";
import BookingCard from "@/components/BookingCard";
import { galleryImages, houseHighlights } from "@/lib/constants";

const HouseSection = () => {
  return (
    <section id="house" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <Heading
          title="Unique Kefalonian Vintage Home"
          description="Experience the charm of our beautifully restored 100-year-old traditional Kefalonian home that blends heritage with modern comforts."
          centered
        />
        
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {galleryImages.map((image, index) => (
            <GalleryImage 
              key={index}
              src={image.src}
              alt={image.alt}
            />
          ))}
        </div>
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-6">About the House</h3>
            <p className="text-gray-700 mb-4">
              Welcome to our unique Kefalonian vintage home with over 100 years of history. This beautifully restored traditional house embodies the authentic charm and character of 19th-century Kefalonian architecture while offering all the modern comforts you need.
            </p>
            <p className="text-gray-700 mb-4">
              The house comfortably accommodates up to 5 guests with 2 bedrooms (one with a double bed and the living room with 2 sofa beds). It features 1 bathroom, a fully equipped kitchen, and a dedicated workspace perfect for remote working.
            </p>
            <p className="text-gray-700 mb-8">
              Throughout the property, you'll find a thoughtful blend of heritage elements and contemporary amenities, creating a space that honors its history while ensuring a comfortable and convenient stay for all our guests.
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
    </section>
  );
};

export default HouseSection;
