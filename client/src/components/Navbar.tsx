import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-white bg-opacity-95 shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-[#3B83BD] playfair">Villa Kefalonia</span>
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
        <nav className="hidden md:flex space-x-8">
          <a href="#home" className="text-[#3B83BD] hover:text-[#2C5F89] font-medium transition duration-300">Home</a>
          <a href="#house" className="text-[#3B83BD] hover:text-[#2C5F89] font-medium transition duration-300">The House</a>
          <a href="#location" className="text-[#3B83BD] hover:text-[#2C5F89] font-medium transition duration-300">Location</a>
          <a href="#experiences" className="text-[#3B83BD] hover:text-[#2C5F89] font-medium transition duration-300">Experiences</a>
          <a href="#reviews" className="text-[#3B83BD] hover:text-[#2C5F89] font-medium transition duration-300">Reviews</a>
          <a href="#contact" className="text-[#3B83BD] hover:text-[#2C5F89] font-medium transition duration-300">Contact</a>
          <Button asChild className="bg-[#D17A46] hover:bg-[#A65C32] text-white px-4 py-2 rounded transition duration-300">
            <a href="#booking">Book Now</a>
          </Button>
        </nav>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <a onClick={closeMenu} href="#home" className="text-[#3B83BD] py-2 block border-b border-gray-100">Home</a>
            <a onClick={closeMenu} href="#house" className="text-[#3B83BD] py-2 block border-b border-gray-100">The House</a>
            <a onClick={closeMenu} href="#location" className="text-[#3B83BD] py-2 block border-b border-gray-100">Location</a>
            <a onClick={closeMenu} href="#experiences" className="text-[#3B83BD] py-2 block border-b border-gray-100">Experiences</a>
            <a onClick={closeMenu} href="#reviews" className="text-[#3B83BD] py-2 block border-b border-gray-100">Reviews</a>
            <a onClick={closeMenu} href="#contact" className="text-[#3B83BD] py-2 block border-b border-gray-100">Contact</a>
            <Button asChild className="bg-[#D17A46] w-full justify-center">
              <a onClick={closeMenu} href="#booking">Book Now</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
