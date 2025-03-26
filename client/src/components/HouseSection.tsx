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
          title="The House"
          description="Discover our beautiful villa nestled on the hills of Kefalonia with panoramic sea views and all the comforts of modern luxury."
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
            <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-6">About the Villa</h3>
            <p className="text-gray-700 mb-4">
              Perched on a hillside overlooking the crystal-clear waters of the Ionian Sea, our villa combines traditional Greek architecture with modern luxury. Bright and airy spaces filled with natural light create the perfect atmosphere for your dream vacation.
            </p>
            <p className="text-gray-700 mb-4">
              The villa features 3 bedrooms, 2 bathrooms, a fully equipped kitchen, spacious living areas, and multiple terraces for enjoying the magnificent sea views and spectacular sunsets.
            </p>
            <p className="text-gray-700 mb-8">
              Throughout the property, you'll find a thoughtful blend of contemporary design and authentic Mediterranean touches, creating a space that is both stylish and comfortable.
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
