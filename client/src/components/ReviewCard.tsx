import { Star } from "lucide-react";
import { Review } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  const { name, date, rating, text, avatar } = review;
  
  return (
    <div 
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-100" 
      itemScope 
      itemType="https://schema.org/Review"
    >
      <meta itemProp="datePublished" content={date} />
      <div className="flex items-start mb-4">
        <img 
          src={avatar} 
          alt={`${name} profile picture`} 
          className="h-12 w-12 rounded-full mr-4 object-cover"
          itemProp="author" 
          itemScope 
          itemType="https://schema.org/Person"
        />
        <div>
          <h4 className="font-bold text-gray-800" itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">{name}</span>
          </h4>
          <span className="text-gray-500 text-sm">{date}</span>
          
          <div 
            className="flex mt-1 text-[#D17A46]"
            itemProp="reviewRating" 
            itemScope 
            itemType="https://schema.org/Rating"
          >
            <meta itemProp="worstRating" content="1" />
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="ratingValue" content={String(rating)} />
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={cn("h-4 w-4", i < rating ? "fill-current" : "fill-none")} 
              />
            ))}
          </div>
        </div>
      </div>
      
      <div 
        className="text-gray-700"
        itemProp="reviewBody"
      >
        {text}
      </div>
      
      <meta itemProp="itemReviewed" content="Kefalonian Vintage Home" />
    </div>
  );
};

export default ReviewCard;
