import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Photo {
  src: string;
  alt: string;
}

interface PhotoGalleryProps {
  folderPath: string;
  photos: Photo[];
  title: string;
}

const PhotoGallery = ({ folderPath, photos, title }: PhotoGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Handle keyboard navigation when modal is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "ArrowLeft") {
        setCurrentPhotoIndex((prev) => 
          prev === 0 ? photos.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentPhotoIndex((prev) => 
          prev === photos.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, photos.length]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? photos.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentPhotoIndex((prev) => 
      prev === photos.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      
      {/* Stacked photos appearance */}
      <div 
        className="relative cursor-pointer" 
        style={{ 
          height: "240px",
          perspective: "1000px"
        }}
        onClick={() => openModal(0)}
      >
        {photos.slice(0, Math.min(3, photos.length)).map((photo, index) => (
          <div
            key={index}
            className="absolute w-full h-full rounded-lg shadow-md transition-all duration-300"
            style={{
              transform: `rotate(${index * 2 - 2}deg) translateZ(${-index * 10}px)`,
              zIndex: photos.length - index,
            }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/20 rounded-lg transition-opacity">
          <span className="text-white bg-black/50 px-4 py-2 rounded-full text-sm font-medium">
            View All {photos.length} Photos
          </span>
        </div>
      </div>

      {/* Full screen modal carousel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full max-w-4xl mx-auto px-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-4 text-white hover:bg-white/20"
              onClick={closeModal}
            >
              <X size={24} />
              <span className="sr-only">Close</span>
            </Button>

            <div className="relative">
              <img
                src={photos[currentPhotoIndex].src}
                alt={`Kefalonian Vintage Home - ${photos[currentPhotoIndex].alt} - Traditional Greek accommodation in Fiscardo`}
                className="w-full object-contain max-h-[80vh]"
                loading="lazy"
              />
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-10 w-10 rounded-full"
                onClick={goToPrevious}
              >
                <ChevronLeft size={24} />
                <span className="sr-only">Previous image</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-10 w-10 rounded-full"
                onClick={goToNext}
              >
                <ChevronRight size={24} />
                <span className="sr-only">Next image</span>
              </Button>
              
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                <span className="bg-black/70 text-white px-4 py-1 rounded-full text-sm">
                  {currentPhotoIndex + 1} / {photos.length}
                </span>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {photos.map((photo, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "cursor-pointer flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2",
                    currentPhotoIndex === index ? "border-white" : "border-transparent"
                  )}
                  onClick={() => setCurrentPhotoIndex(index)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;