import { useState } from "react";
import { cn } from "@/lib/utils";

interface GalleryImageProps {
  src: string;
  alt: string;
  className?: string;
}

const GalleryImage = ({ src, alt, className }: GalleryImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn(
      "overflow-hidden rounded-lg shadow-md h-64 md:h-80 relative transition-transform hover:scale-[1.02]",
      className
    )}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default GalleryImage;
