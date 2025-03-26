import { Star } from "lucide-react";
import { Review } from "@/lib/types";

interface ReviewCardProps {
  review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img 
          src={review.avatarUrl} 
          className="w-12 h-12 rounded-full mr-4" 
          alt={`${review.name} profile picture`}
          loading="lazy"
        />
        <div>
          <h4 className="font-bold text-gray-800">{review.name}</h4>
          <div className="flex text-[#D17A46]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4" fill="currentColor" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 italic cormorant text-lg">{review.text}</p>
      <p className="text-gray-500 mt-2 text-sm">{review.date}</p>
    </div>
  );
};

export default ReviewCard;
