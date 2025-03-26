import { cn } from "@/lib/utils";
import { Experience } from "@/lib/types";

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

const ExperienceCard = ({ experience, className }: ExperienceCardProps) => {
  return (
    <div className={cn(
      "bg-[#F8F6F2] rounded-lg overflow-hidden shadow-md transition-transform hover:scale-[1.02]",
      className
    )}>
      <div className="h-64 overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-[#2C5F89] mb-2 playfair">{experience.title}</h3>
        <p className="text-gray-700">{experience.description}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
