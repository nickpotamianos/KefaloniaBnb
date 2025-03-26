import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#2C5F89] pt-16 pb-8 px-4 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-xl font-bold playfair mb-6">Villa Kefalonia</h4>
            <p className="opacity-80 mb-6">Your luxury escape on the beautiful island of Kefalonia, Greece. Breathtaking views, modern amenities, and unforgettable experiences await.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-[#D17A46] transition duration-300" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.057 1.805.249 2.227.419.562.217.96.477 1.382.896.419.42.679.819.896 1.381.17.422.363 1.057.42 2.227.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.057 1.17-.249 1.805-.419 2.227-.217.562-.477.96-.896 1.382-.419.419-.819.679-1.381.896-.422.17-1.057.363-2.227.42-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.057-1.805-.249-2.227-.419-.562-.217-.96-.477-1.382-.896-.419-.419-.679-.819-.896-1.381-.17-.422-.363-1.057-.42-2.227-.058-1.266-.07-1.645-.07-4.85s.012-3.584.07-4.85c.057-1.17.249-1.805.419-2.227.217-.562.477-.96.896-1.382.419-.419.819-.679 1.381-.896.422-.17 1.057-.363 2.227-.42 1.266-.058 1.645-.07 4.85-.07zm0 2.163c-3.191 0-3.569.016-4.805.07-1.152.055-1.776.239-2.191.395-.522.217-.95.478-1.377.905-.427.427-.688.855-.905 1.376-.158.416-.34 1.04-.395 2.192-.055 1.237-.07 1.615-.07 4.806s.015 3.569.07 4.805c.055 1.152.239 1.776.395 2.191.216.522.478.95.905 1.377.427.427.855.688 1.376.905.416.158 1.04.34 2.192.395 1.237.055 1.615.07 4.806.07s3.569-.015 4.805-.07c1.152-.055 1.776-.239 2.191-.395.522-.216.95-.478 1.377-.905.427-.427.688-.855.905-1.376.158-.416.34-1.04.395-2.192.055-1.237.07-1.615.07-4.806s-.015-3.569-.07-4.805c-.055-1.152-.239-1.776-.395-2.191-.216-.522-.478-.95-.905-1.377-.427-.427-.855-.688-1.376-.905-.416-.158-1.04-.34-2.192-.395-1.237-.055-1.615-.07-4.806-.07z"/>
                  <path d="M12 6.865c-2.838 0-5.135 2.297-5.135 5.135s2.297 5.135 5.135 5.135 5.135-2.297 5.135-5.135-2.297-5.135-5.135-5.135zm0 8.468c-1.84 0-3.333-1.493-3.333-3.333s1.493-3.333 3.333-3.333 3.333 1.493 3.333 3.333-1.493 3.333-3.333 3.333z"/>
                  <circle cx="17.375" cy="6.625" r="1.205"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#D17A46] transition duration-300" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#D17A46] transition duration-300" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.12 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a href="#" className="text-white hover:text-[#D17A46] transition duration-300" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xl font-bold playfair mb-6">Quick Links</h4>
            <ul className="space-y-3 opacity-80">
              <li><a href="#home" className="hover:text-[#D17A46] transition duration-300">Home</a></li>
              <li><a href="#house" className="hover:text-[#D17A46] transition duration-300">The House</a></li>
              <li><a href="#location" className="hover:text-[#D17A46] transition duration-300">Location</a></li>
              <li><a href="#experiences" className="hover:text-[#D17A46] transition duration-300">Experiences</a></li>
              <li><a href="#reviews" className="hover:text-[#D17A46] transition duration-300">Reviews</a></li>
              <li><a href="#contact" className="hover:text-[#D17A46] transition duration-300">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold playfair mb-6">Useful Info</h4>
            <ul className="space-y-3 opacity-80">
              <li><a href="#" className="hover:text-[#D17A46] transition duration-300">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-[#D17A46] transition duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D17A46] transition duration-300">Booking Policy</a></li>
              <li><a href="#" className="hover:text-[#D17A46] transition duration-300">Local Weather</a></li>
              <li><a href="#" className="hover:text-[#D17A46] transition duration-300">Travel Tips</a></li>
              <li><a href="#" className="hover:text-[#D17A46] transition duration-300">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-bold playfair mb-6">Contact Us</h4>
            <ul className="space-y-3 opacity-80">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>Villa Kefalonia, Agia Efimia, Kefalonia 28081, Greece</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>info@villakefalonia.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>+30 123 456 7890</span>
              </li>
            </ul>
            <div className="mt-6">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Airbnb_Logo_Bélo.svg/2560px-Airbnb_Logo_Bélo.svg.png" alt="Airbnb Logo" className="h-8" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-8 text-center opacity-70 text-sm">
          <p>&copy; {new Date().getFullYear()} Villa Kefalonia. All rights reserved.</p>
          <p className="mt-2">Designed with ♥ for the beautiful island of Kefalonia.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
