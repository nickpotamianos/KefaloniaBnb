import { useEffect } from 'react';

/**
 * A component that directly injects a canonical URL tag into the document head
 * This is a backup to ensure canonical tags are always present, even if React Helmet fails
 */
const CanonicalTag = ({ url }) => {
  useEffect(() => {
    // Remove any existing canonical tags to prevent duplicates
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }
    
    // Create and append the new canonical tag
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = url;
    document.head.appendChild(link);
    
    // Cleanup function
    return () => {
      const canonicalToRemove = document.querySelector('link[rel="canonical"]');
      if (canonicalToRemove) {
        canonicalToRemove.remove();
      }
    };
  }, [url]);
  
  // This component doesn't render anything visible
  return null;
};

export default CanonicalTag;
