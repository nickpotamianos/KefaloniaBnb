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
      </Helmet>
      
      <div className="min-h-screen bg-[#F8F6F2] overflow-x-hidden max-w-full">
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
