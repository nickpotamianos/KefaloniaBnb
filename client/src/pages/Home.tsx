import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HouseSection from "@/components/HouseSection";
import LocationSection from "@/components/LocationSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import FaqSection from "@/components/FaqSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      <Navbar />
      <HeroSection />
      <HouseSection />
      <LocationSection />
      <ExperiencesSection />
      <ReviewsSection />
      <ContactSection />
      <FaqSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Home;
