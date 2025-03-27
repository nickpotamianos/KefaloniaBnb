import { Star } from "lucide-react";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import ReviewCard from "@/components/ReviewCard";
import { reviews } from "@/lib/constants";
import { Helmet } from "react-helmet";

const ReviewsSection = () => {
  // Calculate average rating from reviews
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = (totalRating / reviews.length).toFixed(1);

  return (
    <>
      <Helmet>
        <title>Guest Reviews | Kefalonian Vintage Home</title>
        <meta name="description" content="See what our guests say about their stay at our traditional Kefalonian home. Authentic reviews highlighting our hospitality, location, and unique experience." />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "AggregateRating",
              "itemReviewed": {
                "@type": "LodgingBusiness",
                "name": "Kefalonian Vintage Home",
                "image": "/images/cropped_83A0388.jpg",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Fiscardo",
                  "addressRegion": "Kefalonia",
                  "addressCountry": "Greece"
                }
              },
              "ratingValue": "${averageRating}",
              "bestRating": "5",
              "worstRating": "1",
              "ratingCount": "${reviews.length}",
              "description": "Guest reviews of Kefalonian Vintage Home in Fiscardo"
            }
          `}
        </script>
      </Helmet>
      
      <section id="reviews" className="py-20 px-4 bg-gradient-to-b from-[#F8F6F2] to-[#F2F7FC]">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <Heading
              title="Guest Reviews"
              description="Hear from our past guests about their experiences staying at our traditional Kefalonian home."
              centered
            />
            
            <div className="mb-10 text-center">
              <div className="flex items-center justify-center">
                <div className="flex text-[#D17A46]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6" fill="currentColor" />
                  ))}
                </div>
                <span className="ml-3 text-gray-600">from {reviews.length} reviews on Airbnb</span>
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
                <a href="#booking" aria-label="Book your stay at our Kefalonian Vintage Home">Book Your Stay Today</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewsSection;
