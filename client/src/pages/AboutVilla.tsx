import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Heading from '../components/Heading';
import { Calendar, Users, Home, Wifi, Utensils, Mountain } from 'lucide-react';

const AboutVilla = () => {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About Villa Fiscardo | Our Story and History in Kefalonia</title>
        <meta 
          name="description" 
          content="Learn about Villa Fiscardo, our authentic 100-year-old traditional Kefalonian home in Fiscardo with modern amenities and breathtaking sea views. Discover our story and what makes us special."
        />
        <meta 
          name="keywords" 
          content="Villa Fiscardo, Villa Fiscardo history, about Villa Fiscardo, Fiscardo accommodation, traditional villa Kefalonia"
        />
        <link rel="canonical" href="https://villafiscardo.com/about" />
      </Helmet>
      
      {/* Hero section */}
      <div className="relative">
        <div className="h-[60vh] w-full overflow-hidden">
          <img 
            src="/images/cropped_83A0388.jpg" 
            alt="Villa Fiscardo exterior view" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 lg:p-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl text-white font-bold playfair leading-tight max-w-4xl"
            >
              The Story of Villa Fiscardo
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/90 mt-4 max-w-2xl text-lg"
            >
              A beautifully restored 100-year-old traditional Kefalonian home with modern comforts
            </motion.p>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Heading
            title="About Villa Fiscardo"
            subtitle="Our authentic Greek island retreat in beautiful Fiscardo"
            centered={true}
          />
          
          <div className="mt-10 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-[var(--deep-blue)] mb-4">Our History</h2>
            <p>
              Villa Fiscardo stands as a testament to Kefalonia's rich architectural heritage. Originally built over 100 years ago by a local family, this traditional stone house has witnessed the island's history unfold while maintaining its authentic Kefalonian character.
            </p>
            <p>
              Lovingly restored in 2020, we've preserved the villa's original charm while integrating modern comforts that today's travelers expect. The renovation process was carefully managed to honor the building's heritage while creating a comfortable and stylish retreat for our guests.
            </p>
            
            <h2 className="text-2xl font-bold text-[var(--deep-blue)] mt-10 mb-4">Perfect Location</h2>
            <p>
              Nestled in the picturesque village of Fiscardo on Kefalonia's northern tip, Villa Fiscardo enjoys a privileged position with breathtaking views of the Ionian Sea. The villa is ideally situated just minutes from Fiscardo's charming harbor with its colorful fishing boats and waterfront tavernas.
            </p>
            <p>
              Our location offers the perfect balance of tranquility and convenience. While peacefully situated away from the bustle, you're still within easy walking distance of Fiscardo's restaurants, shops, and amenities. The beautiful Foki Beach is just a short drive away, and the villa serves as an ideal base for exploring Kefalonia's northern treasures.
            </p>
            
            <h2 className="text-2xl font-bold text-[var(--deep-blue)] mt-10 mb-4">Villa Fiscardo Experience</h2>
            <p>
              Staying at Villa Fiscardo means experiencing the authentic essence of Kefalonian living. From the moment you arrive, you'll feel the property's unique character and the warm hospitality that defines Greek island culture.
            </p>
            <p>
              Our villa combines traditional architecture—thick stone walls, wooden beams, and classic design elements—with thoughtfully chosen modern amenities to ensure your comfort. The private garden offers a tranquil outdoor space for relaxation, dining, and soaking in the Mediterranean sunshine.
            </p>
            
            <h2 className="text-2xl font-bold text-[var(--deep-blue)] mt-10 mb-6">Why Choose Villa Fiscardo</h2>
          </div>
          
          {/* Features grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-[var(--sea-blue)]/5 p-6 rounded-xl flex">
              <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg h-fit">
                <Home className="h-6 w-6 text-[var(--deep-blue)]" />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg text-[var(--deep-blue)]">Authentic Experience</h3>
                <p className="text-gray-700 mt-1">Stay in a genuine piece of Kefalonian architectural heritage with 100 years of island history.</p>
              </div>
            </div>
            
            <div className="bg-[var(--sea-blue)]/5 p-6 rounded-xl flex">
              <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg h-fit">
                <Users className="h-6 w-6 text-[var(--deep-blue)]" />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg text-[var(--deep-blue)]">Personal Touch</h3>
                <p className="text-gray-700 mt-1">Experience our dedicated hospitality with personalized recommendations and a welcome basket of local treats.</p>
              </div>
            </div>
            
            <div className="bg-[var(--sea-blue)]/5 p-6 rounded-xl flex">
              <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg h-fit">
                <Mountain className="h-6 w-6 text-[var(--deep-blue)]" />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg text-[var(--deep-blue)]">Prime Location</h3>
                <p className="text-gray-700 mt-1">Enjoy Fiscardo's beauty with easy access to beaches, restaurants, and Kefalonia's natural wonders.</p>
              </div>
            </div>
            
            <div className="bg-[var(--sea-blue)]/5 p-6 rounded-xl flex">
              <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg h-fit">
                <Wifi className="h-6 w-6 text-[var(--deep-blue)]" />
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-lg text-[var(--deep-blue)]">Modern Comforts</h3>
                <p className="text-gray-700 mt-1">Enjoy heritage charm without sacrificing amenities like air conditioning, WiFi, and fully-equipped kitchen.</p>
              </div>
            </div>
          </div>
          
          {/* Call to action */}
          <div className="mt-16 bg-gradient-to-r from-[var(--deep-blue)] to-[var(--primary-blue)] p-8 rounded-xl text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Experience Villa Fiscardo</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Discover the authentic charm of our traditional Kefalonian villa with modern comforts. The perfect base for your Kefalonia adventures.
            </p>
            <a 
              href="/booking" 
              className="inline-block bg-white text-[var(--deep-blue)] px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-all"
            >
              Check Availability
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutVilla;
