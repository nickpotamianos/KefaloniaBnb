import { Heading } from "@/components/ui/heading";
import ReviewCard from "@/components/ReviewCard";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { reviews } from "@/lib/constants";

const ReviewsSection = () => {
  return (
    <section id="reviews" className="py-20 px-4 bg-[#F8F6F2]">
      <div className="container mx-auto">
        <Heading
          title="Guest Reviews"
          description="See what our guests have to say about their stay at our Kefalonia villa."
          centered
        />
        
        <div className="max-w-5xl mx-auto">
          {/* Review Rating Summary */}
          <div className="flex justify-center items-center mb-10">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-[#2C5F89] mr-3">4.9</span>
              <div className="flex text-[#D17A46]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6" fill="currentColor" />
                ))}
              </div>
              <span className="ml-3 text-gray-600">from 27 reviews on Airbnb</span>
            </div>
          </div>
          
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild className="bg-[#3B83BD] hover:bg-[#2C5F89] text-white">
              <a href="#booking">Book Your Stay Today</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
