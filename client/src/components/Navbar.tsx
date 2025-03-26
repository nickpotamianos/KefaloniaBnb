import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Handle the background change on scroll
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Find the active section based on scroll position
      const sections = ["home", "house", "location", "experiences", "reviews", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="flex items-center space-x-3">
          <div className="h-9 w-9 bg-[#3B83BD] rounded-md flex items-center justify-center text-white font-bold text-xl">
            VK
          </div>
          <span className="text-2xl font-bold text-[#3B83BD] playfair">Vintage Kefalonia Home</span>
        </a>
        
        {/* Mobile menu button */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-[#3B83BD] focus:outline-none"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#home" 
            className={`text-[#3B83BD] hover:text-[#2C5F89] font-medium transition-all duration-300 border-b-2 py-1 ${activeSection === "home" ? "border-[#D17A46]" : "border-transparent"}`}
          >
            Home
          </a>
          <a 
            href="#house" 
            className={`text-[#3B83BD] hover:text-[#2C5F89] font-medium transition-all duration-300 border-b-2 py-1 ${activeSection === "house" ? "border-[#D17A46]" : "border-transparent"}`}
          >
            The House
          </a>
          <a 
            href="#location" 
            className={`text-[#3B83BD] hover:text-[#2C5F89] font-medium transition-all duration-300 border-b-2 py-1 ${activeSection === "location" ? "border-[#D17A46]" : "border-transparent"}`}
          >
            Location
          </a>
          <a 
            href="#experiences" 
            className={`text-[#3B83BD] hover:text-[#2C5F89] font-medium transition-all duration-300 border-b-2 py-1 ${activeSection === "experiences" ? "border-[#D17A46]" : "border-transparent"}`}
          >
            Experiences
          </a>
          <a 
            href="#reviews" 
            className={`text-[#3B83BD] hover:text-[#2C5F89] font-medium transition-all duration-300 border-b-2 py-1 ${activeSection === "reviews" ? "border-[#D17A46]" : "border-transparent"}`}
          >
            Reviews
          </a>
          <a 
            href="#contact" 
            className={`text-[#3B83BD] hover:text-[#2C5F89] font-medium transition-all duration-300 border-b-2 py-1 ${activeSection === "contact" ? "border-[#D17A46]" : "border-transparent"}`}
          >
            Contact
          </a>
          <Button asChild className="bg-[#D17A46] hover:bg-[#A65C32] text-white px-6 py-2 rounded-full transition duration-300">
            <a href="#booking">Book Now</a>
          </Button>
        </nav>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <a 
              onClick={closeMenu} 
              href="#home" 
              className={`text-[#3B83BD] py-2 block ${activeSection === "home" ? "font-bold border-l-4 border-[#D17A46] pl-2" : ""}`}
            >
              Home
            </a>
            <a 
              onClick={closeMenu} 
              href="#house" 
              className={`text-[#3B83BD] py-2 block ${activeSection === "house" ? "font-bold border-l-4 border-[#D17A46] pl-2" : ""}`}
            >
              The House
            </a>
            <a 
              onClick={closeMenu} 
              href="#location" 
              className={`text-[#3B83BD] py-2 block ${activeSection === "location" ? "font-bold border-l-4 border-[#D17A46] pl-2" : ""}`}
            >
              Location
            </a>
            <a 
              onClick={closeMenu} 
              href="#experiences" 
              className={`text-[#3B83BD] py-2 block ${activeSection === "experiences" ? "font-bold border-l-4 border-[#D17A46] pl-2" : ""}`}
            >
              Experiences
            </a>
            <a 
              onClick={closeMenu} 
              href="#reviews" 
              className={`text-[#3B83BD] py-2 block ${activeSection === "reviews" ? "font-bold border-l-4 border-[#D17A46] pl-2" : ""}`}
            >
              Reviews
            </a>
            <a 
              onClick={closeMenu} 
              href="#contact" 
              className={`text-[#3B83BD] py-2 block ${activeSection === "contact" ? "font-bold border-l-4 border-[#D17A46] pl-2" : ""}`}
            >
              Contact
            </a>
            <Button asChild className="bg-[#D17A46] w-full justify-center rounded-full">
              <a onClick={closeMenu} href="#booking">Book Now</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
