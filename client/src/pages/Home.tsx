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
        
        {/* Local Business Schema - Enhanced for Google Rich Results */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "@id": "https://villafiscardo.com/#lodging",
              "identifier": {
                "@type": "PropertyValue",
                "propertyID": "villafiscardo",
                "value": "villa-fiscardo-kefalonia"
              },
              "additionalType": "https://schema.org/VacationRental",
              "name": "Villa Fiscardo",
              "description": "Premium villa rental in Fiscardo, Kefalonia featuring a traditional 100-year-old Greek house with modern amenities",
              "url": "https://villafiscardo.com",
              "image": [
                "https://villafiscardo.com/images/cropped_83A0388.jpg",
                "https://villafiscardo.com/images/_83A0388.jpg",
                "https://villafiscardo.com/images/myrtos2.jpg",
                "https://villafiscardo.com/images/fiskardo.jpeg",
                "https://villafiscardo.com/images/DJI_0722.jpg",
                "https://villafiscardo.com/images/hikepng.png",
                "https://villafiscardo.com/images/Robola.jpg",
                "https://villafiscardo.com/images/alaties.jpg"
              ],
              "telephone": "+30 694 820 1383",
              "email": "info@villafiscardo.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Fiscardo Village",
                "addressLocality": "Fiscardo", 
                "addressRegion": "Kefalonia",
                "addressCountry": "Greece",
                "postalCode": "28081"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "38.447111",
                "longitude": "20.555222"
              },
              "containsPlace": {
                "@type": "Accommodation",
                "name": "Villa Fiscardo Main House",
                "occupancy": {
                  "@type": "QuantitativeValue",
                  "value": 4
                },
                "numberOfRooms": 2
              },
              "priceRange": "€€€",
              "numberOfRooms": 2,
              "maximumAttendeeCapacity": 4,
              "checkinTime": "15:00:00",
              "checkoutTime": "11:00:00",
              "amenityFeature": [
                {"@type": "LocationFeatureSpecification", "name": "Free WiFi", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Air Conditioning", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Sea View", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Private Garden", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Kitchen", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Free Parking", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Terrace", "value": true},
                {"@type": "LocationFeatureSpecification", "name": "Traditional Architecture", "value": true}
              ],
              "makesOffer": {
                "@type": "Offer",
                "identifier": "villa-fiscardo-rental-offer",
                "name": "Villa Fiscardo Vacation Rental",
                "description": "Luxury villa rental in prime Fiscardo location",
                "availability": "https://schema.org/InStock",
                "itemOffered": {
                  "@type": "Service",
                  "serviceType": "Vacation Rental"
                },
                "priceSpecification": {
                  "@type": "PriceSpecification",
                  "priceCurrency": "EUR",
                  "price": "150",
                  "unitText": "per night",
                  "minPrice": "120",
                  "maxPrice": "250"
                },
                "checkinTime": "15:00:00",
                "checkoutTime": "11:00:00"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "47",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "author": {
                    "@type": "Person",
                    "name": "Sarah & Mike"
                  },
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "reviewBody": "The best villa in Fiscardo! Perfect location, stunning views, and authentic Greek charm."
                }
              ]
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
