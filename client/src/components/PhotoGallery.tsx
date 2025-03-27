import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="relative space-y-3">
      <h3 className="text-xl font-medium mb-3 playfair text-[var(--deep-blue)]">{title}</h3>
      
      {/* Modern masonry-style gallery */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {/* Featured large image */}
        <div 
          className="col-span-2 row-span-2 relative rounded-xl overflow-hidden group cursor-pointer"
          onClick={() => openModal(0)}
        >
          <div className="relative w-full h-0 pb-[75%] overflow-hidden">
            <img
              src={photos[0].src}
              alt={photos[0].alt}
              className="absolute inset-0 w-full h-full object-cover hover-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                <Camera size={18} className="text-white" />
                <span className="text-white font-medium text-sm">Featured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smaller gallery images */}
        {photos.slice(1, 5).map((photo, index) => (
          <div 
            key={index}
            className="relative rounded-xl overflow-hidden group cursor-pointer"
            onClick={() => openModal(index + 1)}
          >
            <div className="relative w-full h-0 pb-[75%] overflow-hidden">
              <img
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 w-full h-full object-cover hover-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        ))}

        {/* View all photos button */}
        {photos.length > 5 && (
          <div 
            className="relative rounded-xl overflow-hidden cursor-pointer"
            onClick={() => openModal(5)}
          >
            <div className="relative w-full h-0 pb-[75%] overflow-hidden">
              <img
                src={photos[5].src}
                alt={photos[5].alt}
                className="absolute inset-0 w-full h-full object-cover brightness-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                  +{photos.length - 5} more
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced full screen modal with animations */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="relative w-full max-w-5xl mx-auto px-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-4 text-white hover:bg-white/20 rounded-full"
                onClick={closeModal}
              >
                <X size={24} />
                <span className="sr-only">Close</span>
              </Button>

              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={photos[currentPhotoIndex].src}
                  alt={`Kefalonian Vintage Home - ${photos[currentPhotoIndex].alt} - Traditional Greek accommodation in Fiscardo`}
                  className="w-full object-contain max-h-[75vh]"
                  loading="lazy"
                />
                
                {/* Navigation buttons with hover effects */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 h-12 w-12 rounded-full backdrop-blur-sm transition-all duration-300"
                  onClick={goToPrevious}
                >
                  <ChevronLeft size={24} />
                  <span className="sr-only">Previous image</span>
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white hover:bg-black/60 h-12 w-12 rounded-full backdrop-blur-sm transition-all duration-300"
                  onClick={goToNext}
                >
                  <ChevronRight size={24} />
                  <span className="sr-only">Next image</span>
                </Button>
                
                {/* Enhanced photo counter */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                  <span className="bg-black/50 backdrop-blur-sm text-white px-5 py-2 rounded-full text-sm font-medium">
                    {currentPhotoIndex + 1} / {photos.length}
                  </span>
                </div>
              </motion.div>
              
              {/* Enhanced thumbnails with active state */}
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scroll-smooth hide-scrollbar">
                {photos.map((photo, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.2 + index * 0.05, duration: 0.3 }}
                    className={cn(
                      "cursor-pointer flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 transform",
                      currentPhotoIndex === index 
                        ? "border-white scale-105" 
                        : "border-transparent hover:border-white/50"
                    )}
                    onClick={() => setCurrentPhotoIndex(index)}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className={cn(
                        "w-full h-full object-cover transition-all",
                        currentPhotoIndex !== index && "filter grayscale-[30%]"
                      )}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;