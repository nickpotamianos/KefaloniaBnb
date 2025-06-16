import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HouseSection from "@/components/HouseSection";
import LocationSection from "@/components/LocationSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>      <Helmet>
        <title>Villa Fiscardo | Best Fiscardo Villa Rental Kefalonia | Luxury Sea View Villa</title>
        <meta name="description" content="⭐ #1 rated villa rental in Fiscardo, Kefalonia. Luxury traditional Greek villa with stunning sea views, 2 bedrooms, prime location near Myrtos Beach. Book direct for best rates! Perfect for couples and families." />
        <meta name="keywords" content="villa fiscardo, fiscardo villa, fiscardo villas, villa rental fiscardo, fiscardo kefalonia villa, best villa fiscardo, luxury villa fiscardo, traditional villa fiscardo, sea view villa fiscardo, fiscardo accommodation, kefalonia luxury villa rental, fiskardo villa" />
        <link rel="canonical" href="https://villafiscardo.com/" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Villa Fiscardo",
              "description": "Premium villa rental in Fiscardo, Kefalonia featuring a traditional 100-year-old Greek house with modern amenities",
              "url": "https://villafiscardo.com",
              "image": "https://villafiscardo.com/images/cropped_83A0388.jpg",
              "telephone": "+30 694 820 1383",
              "email": "info@villafiscardo.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Fiscardo", 
                "addressRegion": "Kefalonia",
                "addressCountry": "Greece",
                "postalCode": "28084"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "38.4567",
                "longitude": "20.5673"
              },
              "priceRange": "€€€",
              "amenityFeature": [
                {"@type": "LocationFeatureSpecification", "name": "Free WiFi"},
                {"@type": "LocationFeatureSpecification", "name": "Air Conditioning"},
                {"@type": "LocationFeatureSpecification", "name": "Sea View"},
                {"@type": "LocationFeatureSpecification", "name": "Private Garden"},
                {"@type": "LocationFeatureSpecification", "name": "Kitchen"},
                {"@type": "LocationFeatureSpecification", "name": "Traditional Architecture"}
              ],
              "starRating": {
                "@type": "Rating",
                "ratingValue": "5"
              }
            }
          `}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-[#F8F6F2]">
      <Navbar />
      <HeroSection />
      <HouseSection />
      <LocationSection />
      <ExperiencesSection />        <ContactSection />
        <FaqSection />
        <Footer />
      </div>
    </>
  );
};

export default Home;
