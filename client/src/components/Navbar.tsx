import { useState, useEffect } from "react";
import { Menu, X, Sun, Home, MapPin, Compass, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isBlogPage?: boolean;
}

const Navbar = ({ isBlogPage = false }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  // Always set scrolled to true if on blog page initially
  const [scrolled, setScrolled] = useState(isBlogPage);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Handle the background change on scroll
      // Always set scrolled to true when on blog pages regardless of scroll position
      if (window.scrollY > 10 || isBlogPage) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Skip section detection on blog pages
      if (isBlogPage) return;

      // Find the active section based on scroll position
      const sections = ["home", "house", "location", "experiences", "contact"];
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
    // Run the handleScroll once on mount to ensure initial state is correct
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBlogPage]);

  // Force scrolled state on mount if this is a blog page
  useEffect(() => {
    if (isBlogPage) {
      setScrolled(true);
    }
  }, [isBlogPage]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  // Always use the solid logo on blog pages
  const logoSrc = scrolled || isBlogPage ? "/images/logokef1.webp" : "/images/2logokef1.webp";

  // For blog pages, we'll modify the navigation links
  const getNavLinks = () => {
    if (isBlogPage) {
      return (
        <>
          <NavLink
            href="/"
            text="Home"
            icon={<Sun size={16} />}
            isActive={false}
            scrolled={scrolled}
          />

          <NavLink
            href="/#house"
            text="The House"
            icon={<Home size={16} />}
            isActive={false}
            scrolled={scrolled}
          />

          <NavLink
            href="/#location"
            text="Location"
            icon={<MapPin size={16} />}
            isActive={false}
            scrolled={scrolled}
          />

          <NavLink
            href="/#experiences"
            text="Experiences"
            icon={<Compass size={16} />}
            isActive={false}
            scrolled={scrolled}
          />

          <NavLink
            href="/#contact"
            text="Contact"
            icon={<MessageCircle size={16} />}
            isActive={false}
            scrolled={scrolled}
          />

          <Button
            asChild
            className={`bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white px-6 py-2 rounded-full transition duration-300 shadow-sm hover:shadow-md`}
          >
            <a href="/#booking">Book Now</a>
          </Button>
        </>
      );
    }

    // Default home page navigation
    return (
      <>
        <NavLink
          href="#home"
          text="Home"
          icon={<Sun size={16} />}
          isActive={activeSection === "home"}
          scrolled={scrolled}
        />

        <NavLink
          href="#house"
          text="The House"
          icon={<Home size={16} />}
          isActive={activeSection === "house"}
          scrolled={scrolled}
        />

        <NavLink
          href="#location"
          text="Location"
          icon={<MapPin size={16} />}
          isActive={activeSection === "location"}
          scrolled={scrolled}
        />

        <NavLink
          href="#experiences"
          text="Experiences"
          icon={<Compass size={16} />}
          isActive={activeSection === "experiences"}
          scrolled={scrolled}
        />

        <NavLink
          href="#contact"
          text="Contact"
          icon={<MessageCircle size={16} />}
          isActive={activeSection === "contact"}
          scrolled={scrolled}
        />

        <Button
          asChild
          className={`bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white px-6 py-2 rounded-full transition duration-300 shadow-sm hover:shadow-md`}
        >
          <a href="#booking">Book Now</a>
        </Button>
      </>
    );
  };

  // Get mobile nav links based on whether it's a blog page
  const getMobileNavLinks = () => {
    if (isBlogPage) {
      return (
        <>
          <MobileNavLink
            onClick={closeMenu}
            href="/"
            text="Home"
            icon={<Sun size={18} className="text-[var(--primary-blue)]" />}
            isActive={false}
          />

          <MobileNavLink
            onClick={closeMenu}
            href="/#house"
            text="The House"
            icon={<Home size={18} className="text-[var(--primary-blue)]" />}
            isActive={false}
          />

          <MobileNavLink
            onClick={closeMenu}
            href="/#location"
            text="Location"
            icon={<MapPin size={18} className="text-[var(--primary-blue)]" />}
            isActive={false}
          />

          <MobileNavLink
            onClick={closeMenu}
            href="/#experiences"
            text="Experiences"
            icon={<Compass size={18} className="text-[var(--primary-blue)]" />}
            isActive={false}
          />

          <MobileNavLink
            onClick={closeMenu}
            href="/#contact"
            text="Contact"
            icon={<MessageCircle size={18} className="text-[var(--primary-blue)]" />}
            isActive={false}
          />

          <Button
            asChild
            className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 w-full justify-center rounded-full mt-2 shadow-sm"
          >
            <a onClick={closeMenu} href="/#booking">Book Now</a>
          </Button>
        </>
      );
    }

    // Default home page mobile navigation
    return (
      <>
        <MobileNavLink
          onClick={closeMenu}
          href="#home"
          text="Home"
          icon={<Sun size={18} className="text-[var(--primary-blue)]" />}
          isActive={activeSection === "home"}
        />

        <MobileNavLink
          onClick={closeMenu}
          href="#house"
          text="The House"
          icon={<Home size={18} className="text-[var(--primary-blue)]" />}
          isActive={activeSection === "house"}
        />

        <MobileNavLink
          onClick={closeMenu}
          href="#location"
          text="Location"
          icon={<MapPin size={18} className="text-[var(--primary-blue)]" />}
          isActive={activeSection === "location"}
        />

        <MobileNavLink
          onClick={closeMenu}
          href="#experiences"
          text="Experiences"
          icon={<Compass size={18} className="text-[var(--primary-blue)]" />}
          isActive={activeSection === "experiences"}
        />

        <MobileNavLink
          onClick={closeMenu}
          href="#contact"
          text="Contact"
          icon={<MessageCircle size={18} className="text-[var(--primary-blue)]" />}
          isActive={activeSection === "contact"}
        />

        <Button
          asChild
          className="bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 w-full justify-center rounded-full mt-2 shadow-sm"
        >
          <a onClick={closeMenu} href="#booking">Book Now</a>
        </Button>
      </>
    );
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between max-w-full">
        <a href={isBlogPage ? "/" : "#"} className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <img src={logoSrc} alt="Villa Fiscardo Logo" className="h-10 sm:h-12 w-auto" width="48" height="48" />
          <span className={`text-lg sm:text-2xl font-bold playfair ${scrolled ? 'text-[var(--deep-blue)]' : 'text-white'
            }`}>
            Villa Fiscardo
          </span>
        </a>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className={`md:hidden p-2 rounded-full ${scrolled
              ? "text-[var(--deep-blue)] hover:bg-gray-100"
              : "text-white hover:bg-white/10"
            } focus:outline-none transition-colors`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {getNavLinks()}
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md shadow-lg animate-slide-down overflow-hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 max-w-full">
            {getMobileNavLinks()}
          </div>
        </div>
      )}
    </header>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ href, text, icon, isActive, scrolled }: {
  href: string;
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
  scrolled: boolean;
}) => {
  return (
    <a
      href={href}
      className={`
        flex items-center gap-1.5 transition-all duration-300 font-medium px-2 py-1.5 rounded-md
        ${scrolled ? 'text-gray-700 hover:text-[var(--deep-blue)]' : 'text-white/90 hover:text-white'}
        ${isActive ? (scrolled ? 'border-b-2 border-[var(--terracotta)]' : 'border-b-2 border-white') : 'border-b-2 border-transparent'}
      `}
    >
      {icon}
      {text}
    </a>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ onClick, href, text, icon, isActive }: {
  onClick: () => void;
  href: string;
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
}) => {
  return (
    <a
      onClick={onClick}
      href={href}
      className={`
        flex items-center gap-3 py-3 px-4 rounded-lg transition-all
        ${isActive
          ? 'bg-[var(--sea-blue)]/10 text-[var(--deep-blue)] font-medium'
          : 'text-gray-700 hover:bg-gray-100'
        }
      `}
    >
      {icon}
      {text}
    </a>
  );
};

export default Navbar;
