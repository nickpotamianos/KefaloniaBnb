import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#2C5F89] text-white py-16" itemScope itemType="https://schema.org/WPFooter">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center mb-6">
              <img src="/images/2logokef1.png" alt="Kefalonian Vintage Home Logo" className="h-12 mr-3" />
              <h2 className="text-2xl font-bold playfair">Kefalonian Vintage Home</h2>
            </div>
            <p className="mb-6 max-w-md opacity-80">
              Experience authentic Greek island living in our beautifully restored 100-year-old traditional home in the heart of Fiscardo, Kefalonia.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/kefalonianvintagehome" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#D17A46] transition duration-300" 
                aria-label="Follow us on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/kefalonianvintagehome" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#D17A46] transition duration-300" 
                aria-label="Follow us on Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.057 1.805.249 2.227.419.562.217.96.477 1.382.896.419.42.679.819.896 1.381.17.422.363 1.057.42 2.227.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.057 1.17-.249 1.805-.419 2.227-.217.562-.477.96-.896 1.382-.419.419-.819.679-1.381.896-.422.17-1.057.363-2.227.42-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.057-1.805-.249-2.227-.419-.562-.217-.96-.477-1.382-.896-.419-.419-.679-.819-.896-1.381-.17-.422-.363-1.057-.42-2.227-.058-1.266-.07-1.645-.07-4.85s.012-3.584.07-4.85c.057-1.17.249-1.805.419-2.227.217-.562.477-.96.896-1.382.419-.419.819-.679 1.381-.896.422-.17 1.057-.363 2.227-.42 1.266-.058 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.06-2.148.262-2.913.558-.789.306-1.459.717-2.126 1.384s-1.079 1.336-1.384 2.126c-.296.765-.499 1.636-.558 2.913-.058 1.28-.072 1.689-.072 4.948 0 3.259.014 3.668.072 4.948.06 1.277.262 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126-.667-.667-1.335-1.079-2.126-1.384-.765-.297-1.636-.499-2.913-.558-1.28-.058-1.689-.072-4.949-.072h.003z"></path>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"></path>
                  <circle cx="18.406" cy="5.594" r="1.44"></circle>
                </svg>
              </a>
              <a 
                href="https://www.airbnb.com/h/kefalonianvintagehome" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group transition duration-300" 
                aria-label="View our Airbnb listing"
              >
                <svg 
                  className="h-5 w-5" 
                  viewBox="-1 0 20 20" 
                  xmlns="http://www.w3.org/2000/svg" 
                  preserveAspectRatio="xMidYMid"
                >
                  <path 
                    d="M17.497 13.278c1.017 2.29.441 4.676-1.433 5.938-.774.522-1.592.783-2.431.783-.848 0-1.716-.266-2.583-.797-.512-.314-.966-.72-1.405-1.112-.14-.125-.28-.25-.422-.371a1.07 1.07 0 0 1-.171-.192c-.122.108-.239.214-.353.318-.432.392-.841.762-1.286 1.078-1.643 1.167-3.276 1.38-4.856.635a4.446 4.446 0 0 1-2.3-5.5c.493-1.414 1.135-2.79 1.757-4.12l.02-.043c.883-1.89 1.806-3.797 2.698-5.641l.793-1.641c.34-.706.795-1.498 1.595-2.026.823-.543 1.783-.717 2.703-.49.937.233 1.735.86 2.248 1.764.763 1.346 1.44 2.762 2.015 3.984a374.857 374.857 0 0 1 3.411 7.433zM11.62 3.97l-.555-1.165c-.412-.869-1.167-1.392-2.02-1.4-.873.004-1.65.512-2.09 1.394-.132.265-.268.528-.404.79-.226.439-.46.892-.674 1.35-1.5 3.224-2.883 6.218-4.227 9.152-.396.863-.41 1.772-.043 2.627.35.814.974 1.422 1.757 1.711.324.12.66.179.999.179.483 0 .971-.12 1.432-.36.585-.304 1.097-.738 1.593-1.157.216-.183.432-.366.653-.537.579-.448.26-.959.136-1.158-.572-.915-1.164-1.862-1.624-2.842-.444-.948-.538-1.903-.278-2.837.413-1.482 1.952-2.33 3.503-1.93 1.456.374 2.341 1.873 2.058 3.486-.194 1.107-.66 2.178-1.51 3.475-.055.082-.12.168-.186.255-.24.317-.511.677-.451 1.064.064.41.426.705.745.965.071.058.142.116.206.172.805.711 1.719 1.371 2.951 1.388h.026l.025-.003c.078-.01.156-.019.235-.027.19-.02.389-.04.589-.097a3.056 3.056 0 0 0 1.953-1.692c.37-.83.356-1.766-.038-2.634-1.547-3.41-3.18-6.846-4.761-10.169zm-1.162 7.32c.183-.907.054-1.46-.43-1.85-.311-.248-.642-.373-.988-.373-.256 0-.52.068-.793.204-.545.274-.78.748-.737 1.495.076 1.313.747 2.383 1.504 3.483.633-.89 1.221-1.854 1.444-2.96z"
                    className="fill-white group-hover:fill-[#D17A46] transition-colors duration-300"
                  />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold playfair mb-6">Navigation</h4>
              <nav aria-label="Footer Navigation">
                <ul className="space-y-3 opacity-80">
                  <li><a href="#home" className="hover:text-[#D17A46] transition duration-300">Home</a></li>
                  <li><a href="#house" className="hover:text-[#D17A46] transition duration-300">The House</a></li>
                  <li><a href="#location" className="hover:text-[#D17A46] transition duration-300">Location</a></li>
                  <li><a href="#experiences" className="hover:text-[#D17A46] transition duration-300">Experiences</a></li>
                  <li><a href="#reviews" className="hover:text-[#D17A46] transition duration-300">Reviews</a></li>
                  <li><a href="#contact" className="hover:text-[#D17A46] transition duration-300">Contact</a></li>
                </ul>
              </nav>
            </div>
            <div>
              <h4 className="text-xl font-bold playfair mb-6">Useful Info</h4>
              <ul className="space-y-3 opacity-80">
                <li><a href="#house" className="hover:text-[#D17A46] transition duration-300">Amenities</a></li>
                <li><a href="#booking" className="hover:text-[#D17A46] transition duration-300">Booking</a></li>
                <li><a href="#" className="hover:text-[#D17A46] transition duration-300">House Rules</a></li>
                <li><a href="#" className="hover:text-[#D17A46] transition duration-300">Cancellation Policy</a></li>
                <li><a href="#" className="hover:text-[#D17A46] transition duration-300">FAQ</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-xl font-bold playfair mb-6">Contact Us</h4>
              <ul className="space-y-4 opacity-80">
                <li className="flex">
                  <Mail className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <a href="mailto:info@kefalonianvintagehome.com" className="hover:text-[#D17A46] transition duration-300">info@kefalonianvintagehome.com</a>
                </li>
                <li className="flex">
                  <Phone className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <a href="tel:+306948201383" className="hover:text-[#D17A46] transition duration-300">+30 694 820 1383</a>
                </li>
                <li className="flex">
                  <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                  <address className="not-italic">
                    Kefalonian Vintage Home<br />
                    Fiscardo<br />
                    Kefalonia, 28081<br />
                    Greece
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm opacity-70 mb-4 md:mb-0">
              © {currentYear} Kefalonian Vintage Home. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-sm opacity-70 hover:text-[#D17A46] transition duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-sm opacity-70 hover:text-[#D17A46] transition duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-sm opacity-70 hover:text-[#D17A46] transition duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
