import { useParams, Link } from 'wouter';
import { useState, useEffect } from 'react';
import BeachExploration from '../components/blogs/BeachExploration';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChevronLeft } from 'lucide-react';

// Import metadata for SEO
import { Helmet } from 'react-helmet-async';

// Blog metadata for SEO
const blogMetadata = {
  'beach-exploration': {
    title: "Kefalonia's Breathtaking Beaches: A Complete Guide | Villa Fiscardo",
    description: "Discover the most stunning beaches near Fiskardo and throughout Kefalonia. From Myrtos to Antisamos, explore the island's pristine coastline during your stay at Villa Fiscardo.",
    image: "/images/myrtos2.jpg",
    publishDate: "2023-03-15",
    modifiedDate: "2023-12-10",
    keywords: "kefalonia beaches, fiskardo beaches, myrtos beach, foki beach, emblisi beach, antisamos beach, best beaches in kefalonia, north kefalonia beaches"
  },
  'culinary-delights': {
    title: "Authentic Kefalonian Cuisine: A Food Lover's Guide | Villa Fiscardo",
    description: "Experience the rich flavors of traditional Greek cuisine in Kefalonia. Discover the best tavernas, local specialties, and culinary experiences near Villa Fiscardo.",
    image: "/images/fiskardo.jpeg",
    publishDate: "2023-04-02",
    modifiedDate: "2023-12-10",
    keywords: "kefalonia food, fiskardo restaurants, greek cuisine kefalonia, traditional tavernas, best restaurants near fiskardo, kefalonian specialties"
  },
  'island-cruising': {
    title: "Exploring Kefalonia by Boat: Hidden Coves & Sea Caves | Villa Fiscardo",
    description: "Discover how to explore Kefalonia's stunning coastline by boat. Find secluded beaches, visit the famous blue caves, and enjoy day trips to Ithaca from Villa Fiscardo.",
    image: "/images/DJI_0722.jpg",
    publishDate: "2023-04-20",
    modifiedDate: "2023-12-15",
    keywords: "kefalonia boat trips, fiskardo boat rental, kefalonia blue caves, boat day trips, ithaca day trip, explore kefalonia by boat"
  },
  'nature-hikes': {
    title: "Hiking in Kefalonia: Best Trails & Nature Experiences | Villa Fiscardo",
    description: "Discover the most beautiful hiking trails in North Kefalonia. Explore scenic routes, mountain views, and coastal paths from Villa Fiscardo.",
    image: "/images/hikepng.png",
    publishDate: "2023-05-05",
    modifiedDate: "2023-12-18",
    keywords: "kefalonia hiking trails, hiking near fiskardo, nature walks kefalonia, best hikes in north kefalonia, foki to dafnoudi trail"
  },
  'wine-tasting': {
    title: "Kefalonia Wine Tasting Guide: Exploring Robola & Local Wines | Villa Fiscardo",
    description: "Discover Kefalonia's unique wine culture, visit local wineries, and sample the distinctive Robola variety during your stay at Villa Fiscardo.",
    image: "/images/Robola.jpg",
    publishDate: "2023-05-20",
    modifiedDate: "2023-12-20",
    keywords: "kefalonia wines, robola wine kefalonia, kefalonia wineries, wine tasting in kefalonia, greek island wines"
  },
  'sunset-magic': {
    title: "Best Sunset Spots in Kefalonia: Magical Evening Views | Villa Fiscardo",
    description: "Discover the most breathtaking places to watch the sunset in Kefalonia. From Alaties Beach to Fiskardo harbor, find the perfect spot for an unforgettable evening.",
    image: "/images/alaties.jpg",
    publishDate: "2023-06-10",
    modifiedDate: "2023-12-22",
    keywords: "kefalonia sunset spots, best sunset views kefalonia, alaties beach sunset, romantic places kefalonia, fiskardo sunset"
  }
};

const Blog = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [slug]);
  
  // Map slugs to components
  const getBlogComponent = () => {
    switch(slug) {
      case 'beach-exploration':
        return <BeachExploration />;
      // Other blog components will be added here
      default:
        return (
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4 text-[var(--deep-blue)]">Blog Post Not Found</h1>
            <p className="mb-8">The blog post you're looking for doesn't exist or is still being written.</p>
            <Link to="/" className="text-[var(--terracotta)] hover:underline">
              Return to Homepage
            </Link>
          </div>
        );
    }
  };
  
  // Get metadata for current blog
  const metadata = slug ? blogMetadata[slug as keyof typeof blogMetadata] : null;
  
  return (
    <>
      {metadata && (
        <Helmet>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="article" />
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:image" content={`https://villafiscardo.com${metadata.image}`} />
          <meta property="og:url" content={`https://villafiscardo.com/blog/${slug}`} />
          
          {/* Twitter */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content={`https://villafiscardo.com${metadata.image}`} />
          
          {/* Article specific metadata */}
          <meta property="article:published_time" content={metadata.publishDate} />
          <meta property="article:modified_time" content={metadata.modifiedDate} />
          
          {/* Canonical URL */}
          <link rel="canonical" href={`https://villafiscardo.com/blog/${slug}`} />
        </Helmet>
      )}
      
      <Navbar />
      
      <div className="pt-20 bg-[var(--bg-color)]">
        {/* Back button */}
        <div className="container mx-auto px-4 py-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-[var(--primary-blue)] hover:text-[var(--terracotta)] transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Link>
        </div>
        
        {isLoading ? (
          <div className="container mx-auto px-4 py-16 flex justify-center">
            <div className="w-8 h-8 border-4 border-[var(--sea-blue)] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          getBlogComponent()
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default Blog;