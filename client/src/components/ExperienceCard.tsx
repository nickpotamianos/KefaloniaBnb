import { cn } from "@/lib/utils";
import { Experience } from "@/lib/types";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

const ExperienceCard = ({ experience, className }: ExperienceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className={cn(
        "bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
        className
      )}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={experience.image} 
          alt={experience.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered && "scale-110"
          )}
          loading="lazy"
        />
        
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70"></div>
        
        {/* Location indicator */}
        {experience.location && (
          <div className="absolute bottom-4 left-4 flex items-center bg-black/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            <span>{experience.location}</span>
          </div>
        )}
        
        {/* Season indicator if available */}
        {experience.season && (
          <div className="absolute bottom-4 right-4 flex items-center bg-[var(--sand)]/70 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            <span>{experience.season}</span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-[var(--deep-blue)] mb-3 playfair">{experience.title}</h3>
        
        {/* Category badges if available */}
        {experience.categories && experience.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {experience.categories.map((category, index) => (
              <span 
                key={index} 
                className="bg-[var(--sea-blue)]/10 text-[var(--primary-blue)] text-xs px-2.5 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-gray-700 mb-4">{experience.description}</p>
        
        {/* Distance or duration if available */}
        <div className="flex items-center justify-between mt-4">
          {experience.distance && (
            <span className="text-sm text-gray-500">
              {experience.distance} from villa
            </span>
          )}
          
          {experience.duration && (
            <span className="text-sm text-gray-500">
              {experience.duration}
            </span>
          )}
          
          {/* Learn more button */}
          <motion.div 
            className="text-[var(--terracotta)] font-medium text-sm flex items-center cursor-pointer group"
            whileHover={{ x: 3 }}
          >
            Learn more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
