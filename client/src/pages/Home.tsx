import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HouseSection from "@/components/HouseSection";
import LocationSection from "@/components/LocationSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <Navbar />
      <HeroSection />
      <HouseSection />
      <LocationSection />
      <ExperiencesSection />
      <ContactSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default Home;
