import { Link } from 'wouter';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import CanonicalTag from '../components/SEO/CanonicalTag';

// Import blog metadata from the Blog component
// This metadata is the same as what's in the Blog.tsx file
const blogMetadata = {
  'beach-exploration': {
    title: "Kefalonia's Breathtaking Beaches: A Complete Guide | Villa Fiscardo",
    description: "Discover the most stunning beaches near Fiskardo and throughout Kefalonia. From Myrtos to Antisamos, explore the island's pristine coastline during your stay at Villa Fiscardo.",
    image: "/images/myrtos2.jpg",
    publishDate: "2023-03-15",
    modifiedDate: "2023-12-10",
    keywords: "kefalonia beaches, fiskardo beaches, myrtos beach, foki beach, emblisi beach, antisamos beach, best beaches in kefalonia, north kefalonia beaches",
    shortTitle: "Kefalonia's Breathtaking Beaches"
  },
  'culinary-delights': {
    title: "Authentic Kefalonian Cuisine: A Food Lover's Guide | Villa Fiscardo",
    description: "Experience the rich flavors of traditional Greek cuisine in Kefalonia. Discover the best tavernas, local specialties, and culinary experiences near Villa Fiscardo.",
    image: "/images/fiskardo.jpeg",
    publishDate: "2023-04-02",
    modifiedDate: "2023-12-10",
    keywords: "kefalonia food, fiskardo restaurants, greek cuisine kefalonia, traditional tavernas, best restaurants near fiskardo, kefalonian specialties",
    shortTitle: "Authentic Kefalonian Cuisine"
  },
  'island-cruising': {
    title: "Exploring Kefalonia by Boat: Hidden Coves & Sea Caves | Villa Fiscardo",
    description: "Discover how to explore Kefalonia's stunning coastline by boat. Find secluded beaches, visit the famous blue caves, and enjoy day trips to Ithaca from Villa Fiscardo.",
    image: "/images/DJI_0722.jpg",
    publishDate: "2023-04-20",
    modifiedDate: "2023-12-15",
    keywords: "kefalonia boat trips, fiskardo boat rental, kefalonia blue caves, boat day trips, ithaca day trip, explore kefalonia by boat",
    shortTitle: "Exploring Kefalonia by Boat"
  },
  'nature-hikes': {
    title: "Hiking in Kefalonia: Best Trails & Nature Experiences | Villa Fiscardo",
    description: "Discover the most beautiful hiking trails in North Kefalonia. Explore scenic routes, mountain views, and coastal paths from Villa Fiscardo.",
    image: "/images/hikepng.png",
    publishDate: "2023-05-05",
    modifiedDate: "2023-12-18",
    keywords: "kefalonia hiking trails, hiking near fiskardo, nature walks kefalonia, best hikes in north kefalonia, foki to dafnoudi trail",
    shortTitle: "Hiking in Kefalonia"
  },
  'wine-tasting': {
    title: "Kefalonia Wine Tasting Guide: Exploring Robola & Local Wines | Villa Fiscardo",
    description: "Experience the unique wines of Kefalonia with our guide to local wineries, Robola varieties, and wine tasting experiences near Villa Fiscardo.",
    image: "/images/Robola.jpg",
    publishDate: "2023-05-20",
    modifiedDate: "2023-12-20",
    keywords: "kefalonia wines, robola wine, kefalonia wineries, wine tasting kefalonia, greek wine tours, fiskardo wine tours",
    shortTitle: "Kefalonia Wine Tasting Guide"
  },
  'sunset-magic': {
    title: "Best Sunset Spots in Kefalonia: Evening Magic Near Villa Fiscardo",
    description: "Discover the most breathtaking sunset viewing locations around Fiskardo and across Kefalonia, perfect for romantic evenings during your stay at Villa Fiscardo.",
    image: "/images/lighthouse.jpg",
    publishDate: "2023-06-10", 
    modifiedDate: "2023-12-22",
    keywords: "kefalonia sunset spots, best sunset views fiskardo, romantic sunset locations kefalonia, assos sunset, myrtos sunset, fiskardo lighthouse sunset",
    shortTitle: "Best Sunset Spots in Kefalonia"
  }
};

// Helper function to normalize URLs to the canonical version
const getCanonicalUrl = (path: string) => {
  // Always use the non-www version as the canonical form
  return `https://villafiscardo.com${path}`;
};

const BlogIndex = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for a smoother transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const canonicalUrl = getCanonicalUrl('/blog');
  return (
    <>
      {/* Direct DOM manipulation for canonical tag */}
      <CanonicalTag url={canonicalUrl} />
      
      <Helmet>
        <title>Villa Fiscardo Blog | Travel Tips & Insights for Kefalonia</title>
        <meta 
          name="description" 
          content="Explore guides, tips and local insights about Kefalonia, Fiskardo, beaches, dining, activities and more for your perfect Greek island vacation at Villa Fiscardo."
        />
        <meta 
          name="keywords" 
          content="villa fiscardo blog, kefalonia travel guide, fiskardo travel tips, kefalonia beaches, kefalonia activities, greek island vacation tips"
        />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Villa Fiscardo Blog | Travel Tips & Insights for Kefalonia" />
        <meta 
          property="og:description" 
          content="Explore guides, tips and local insights about Kefalonia, Fiskardo, beaches, dining, activities and more for your perfect Greek island vacation."
        />
        <meta property="og:image" content={getCanonicalUrl("/images/fiskardo.jpeg")} />
        <meta property="og:url" content={canonicalUrl} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Villa Fiscardo Blog | Travel Tips & Insights for Kefalonia" />
        <meta 
          name="twitter:description" 
          content="Explore guides, tips and local insights about Kefalonia, Fiskardo, beaches, dining, activities and more for your perfect Greek island vacation."
        />
        <meta name="twitter:image" content={getCanonicalUrl("/images/fiskardo.jpeg")} />
        
        {/* Canonical URL - both through Helmet and direct DOM manipulation */}
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>
      
      <Navbar isBlogPage={true} />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4 text-gray-800">Villa Fiscardo Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our guides and insights to make the most of your stay in Kefalonia.
            From hidden beaches to local cuisine, discover everything the island has to offer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(blogMetadata).map(([slug, meta]) => (
            <div 
              key={slug} 
              className="rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <Link href={`/blog/${slug}`}>
                <a className="block">
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={meta.image} 
                      alt={meta.shortTitle} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <div className="text-sm text-gray-500 mb-2">{new Date(meta.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <h2 className="text-xl font-serif font-semibold mb-3 text-gray-800">{meta.shortTitle}</h2>
                    <p className="text-gray-600 line-clamp-3">{meta.description}</p>
                    <div className="mt-4 text-blue-600 font-semibold">Read more →</div>
                  </div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default BlogIndex;
