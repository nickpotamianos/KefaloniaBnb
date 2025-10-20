import { MapPin, Sunset, Star, Clock, ExternalLink, Camera } from "lucide-react";
import { motion } from "framer-motion";
import { Heading } from "../ui/heading";

const SunsetMagic = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* SEO-optimized heading structure */}
      <div className="mb-10 text-center">
        <span className="inline-block mb-3 px-4 py-2 bg-[var(--terracotta)]/10 rounded-full text-[var(--terracotta)] text-sm font-medium flex items-center justify-center mx-auto">
          <Sunset className="mr-1.5 h-4 w-4" />
          Sunset Viewing
        </span>
        
        <Heading
          title="Kefalonia's Most Magical Sunset Spots: A Traveler's Guide"
          description="Discover the most breathtaking locations to witness Kefalonia's legendary sunset views, from secluded beaches to panoramic mountain vistas."
          centered
        />
      </div>

      {/* Hero image with overlay */}
      <div className="relative h-[60vh] mb-10 rounded-xl overflow-hidden">
        <img 
          src="/images/alaties.webp" 
          alt="Stunning sunset view over Alaties Beach in Kefalonia" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-10 max-w-xl text-white">
          <h2 className="text-3xl font-bold mb-3 playfair">Golden Hour Magic</h2>
          <p className="text-white/90">Experience the captivating beauty of Kefalonia as the sun paints the sky in vibrant hues</p>
        </div>
      </div>

      {/* Introduction with SEO-rich content */}
      <div className="prose max-w-none mb-12 text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Sunset Chasing in Kefalonia</h2>
        
        <p className="mb-4">
          Kefalonia offers some of the most spectacular sunset views in the Mediterranean. As the day draws to a close, the island's western orientation creates perfect conditions for witnessing breathtaking sunset displays. The combination of crystal-clear waters, dramatic cliffs, and the golden Mediterranean light creates a mesmerizing natural spectacle that's not to be missed during your stay.
        </p>
        
        <p className="mb-4">
          While staying at Villa Fiscardo, you're perfectly positioned to explore several world-class sunset viewing spots. From easily accessible beaches to scenic mountain viewpoints, Kefalonia offers diverse settings for enjoying the island's famous sunset magic. Planning your evening around these golden hour moments will create unforgettable memories of your Kefalonian adventure.
        </p>
        
        <div className="bg-[var(--sand)]/10 p-6 rounded-lg border border-[var(--sand)]/20 mb-8">
          <h3 className="text-xl font-semibold mb-3 text-[var(--deep-blue)]">Best Times for Sunset Viewing</h3>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Summer (June-August):</strong> 8:30 PM - 9:00 PM</p>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Spring/Fall:</strong> 7:00 PM - 8:00 PM</p>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Winter:</strong> 5:30 PM - 6:30 PM</p>
            </div>
            <div className="flex items-center">
              <Camera className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Pro tip:</strong> Arrive 30-45 minutes before sunset for the best experience and photos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top sunset spots section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Kefalonia's Top Sunset Viewing Spots</h2>
        
        {/* Spot 1: Alaties Beach */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-2 order-2 md:order-1">
            <h3 className="text-xl font-semibold mb-2 text-[var(--deep-blue)]">1. Alaties Beach</h3>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>North Kefalonia, 30 min drive from Villa Fiscardo</span>
            </div>
            <p className="text-gray-700 mb-3">
              Alaties Beach is widely regarded as Kefalonia's premier sunset spot. This small pebble cove on the northwest coast features dramatic rock formations that frame the setting sun perfectly. The natural rock pools reflect the vibrant sunset colors, creating a magical atmosphere as day turns to night.
            </p>
            <div className="flex items-center text-sm text-[var(--terracotta)]">
              <Star className="h-4 w-4 mr-1.5 fill-current" />
              <span className="font-medium">Local tip: The small taverna overlooking the beach offers front-row sunset views with delicious local cuisine</span>
            </div>
          </div>
          <div className="md:col-span-3 order-1 md:order-2 rounded-lg overflow-hidden h-64">
            <img 
              src="/images/alaties.webp" 
              alt="Alaties Beach sunset with colorful sky reflection in rock pools" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Spot 2: Petani Beach */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-3 rounded-lg overflow-hidden h-64">
            <img 
              src="/images/myrtos.webp" 
              alt="Sunset view from Petani Beach with dramatic cliffs" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-2 text-[var(--deep-blue)]">2. Petani Beach</h3>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>Paliki Peninsula, 1 hour drive from Villa Fiscardo</span>
            </div>
            <p className="text-gray-700 mb-3">
              Petani Beach offers a stunning sunset backdrop with its imposing cliffs and crystal-clear waters. The western-facing beach provides unobstructed views of the sun as it dips below the horizon, casting a golden glow across the impressive landscape. The drive to Petani is an experience itself, with winding coastal roads offering panoramic views.
            </p>
            <div className="flex items-center text-sm text-[var(--terracotta)]">
              <Star className="h-4 w-4 mr-1.5 fill-current" />
              <span className="font-medium">Perfect for: Photography enthusiasts looking for dramatic landscapes</span>
            </div>
          </div>
        </div>
        
        {/* Spot 3: Fiskardo Harbor */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-2 order-2 md:order-1">
            <h3 className="text-xl font-semibold mb-2 text-[var(--deep-blue)]">3. Fiskardo Harbor</h3>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>5 min drive from Villa Fiscardo</span>
            </div>
            <p className="text-gray-700 mb-3">
              You don't need to venture far from Villa Fiscardo to enjoy beautiful sunset views. The charming harbor of Fiskardo offers a different kind of sunset experience, where the fading light illuminates the colorful buildings and creates a romantic atmosphere as it reflects off the harbor waters. The yachts and fishing boats silhouetted against the sunset sky create a quintessentially Mediterranean scene.
            </p>
            <div className="flex items-center text-sm text-[var(--terracotta)]">
              <Star className="h-4 w-4 mr-1.5 fill-current" />
              <span className="font-medium">Combine with: Dinner at a waterfront taverna for the perfect evening</span>
            </div>
          </div>
          <div className="md:col-span-3 order-1 md:order-2 rounded-lg overflow-hidden h-64">
            <img 
              src="/images/fiskardo.webp" 
              alt="Sunset over Fiskardo harbor with boats and colorful buildings" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Spot 4: Mount Ainos */}
        <div className="mb-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-3 rounded-lg overflow-hidden h-64">
            <img 
              src="/images/DJI_0727.webp" 
              alt="Panoramic sunset view from Mount Ainos overlooking Kefalonia" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-2 text-[var(--deep-blue)]">4. Mount Ainos</h3>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>Central Kefalonia, 1.5 hour drive from Villa Fiscardo</span>
            </div>
            <p className="text-gray-700 mb-3">
              For a truly unique sunset perspective, head to Mount Ainos, the highest peak in Kefalonia. From this elevated vantage point (1,628 meters), you can witness the sun setting over the entire island, with views extending across the Ionian Sea to neighboring islands and even the Greek mainland on clear days. The national park's rare black fir trees create striking silhouettes against the colorful sky.
            </p>
            <div className="flex items-center text-sm text-[var(--terracotta)]">
              <Star className="h-4 w-4 mr-1.5 fill-current" />
              <span className="font-medium">Note: Plan to leave before complete darkness for the safest mountain driving</span>
            </div>
          </div>
        </div>
        
        {/* Spot 5: Assos Village */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-2 order-2 md:order-1">
            <h3 className="text-xl font-semibold mb-2 text-[var(--deep-blue)]">5. Assos Village</h3>
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>20 min drive from Villa Fiscardo</span>
            </div>
            <p className="text-gray-700 mb-3">
              The picturesque peninsula of Assos offers charming sunset views in a postcard-perfect setting. While not directly facing west, the golden hour light bathes the colorful houses and Venetian fortress ruins in a warm glow. Find a spot at one of the waterfront tavernas or climb to the fortress ruins for elevated views of the sun setting behind the surrounding mountains, with beautiful light reflections in the horseshoe-shaped bay.
            </p>
            <div className="flex items-center text-sm text-[var(--terracotta)]">
              <Star className="h-4 w-4 mr-1.5 fill-current" />
              <span className="font-medium">Best for: Combining history, village charm, and beautiful evening light</span>
            </div>
          </div>
          <div className="md:col-span-3 order-1 md:order-2 rounded-lg overflow-hidden h-64">
            <img 
              src="/images/assos.webp" 
              alt="Evening view of Assos village peninsula with golden hour lighting" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Sunset photography tips */}
      <div className="mb-16 bg-[var(--deep-blue)]/5 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Sunset Photography Tips</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[var(--deep-blue)]">Camera Settings</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-[var(--terracotta)] text-sm font-medium">1</span>
                </div>
                <p className="text-gray-700"><strong>Use bracket exposures</strong> to capture both the bright sky and darker foreground</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-[var(--terracotta)] text-sm font-medium">2</span>
                </div>
                <p className="text-gray-700"><strong>Shoot in RAW format</strong> for maximum editing flexibility afterward</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-[var(--terracotta)] text-sm font-medium">3</span>
                </div>
                <p className="text-gray-700"><strong>Use a lower ISO</strong> (100-400) for cleaner images with less noise</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-[var(--terracotta)] text-sm font-medium">4</span>
                </div>
                <p className="text-gray-700"><strong>Bring a tripod</strong> for sharper images in lower light conditions</p>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-[var(--deep-blue)]">Composition Ideas</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-[var(--terracotta)] text-sm font-medium">1</span>
                </div>
                <p className="text-gray-700"><strong>Include foreground elements</strong> like rocks, boats, or silhouettes for depth</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-[var(--terracotta)] text-sm font-medium">2</span>
                </div>
                <p className="text-gray-700"><strong>Look for reflections</strong> in water for mirror-like compositions</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-[var(--terracotta)] text-sm font-medium">3</span>
                </div>
                <p className="text-gray-700"><strong>Don't place the sun in the center</strong> - use the rule of thirds for more dynamic images</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mr-2 mt-0.5">
                  <span className="text-[var(--terracotta)] text-sm font-medium">4</span>
                </div>
                <p className="text-gray-700"><strong>Don't leave right after sunset</strong> - some of the best colors appear 15-20 minutes after the sun disappears</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Planning your sunset experience */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Planning Your Perfect Sunset Experience</h2>
        
        <div className="space-y-4">
          <p className="text-gray-700">
            To make the most of Kefalonia's spectacular sunsets, consider these practical tips:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-[var(--terracotta)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--deep-blue)]">Timing</h3>
              <p className="text-gray-700">
                Check the exact sunset time for your specific dates. Arrive at least 30-45 minutes early to find the perfect spot and watch the changing colors as the sun approaches the horizon.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-[var(--terracotta)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--deep-blue)]">Transportation</h3>
              <p className="text-gray-700">
                Plan your return journey before departing, especially from remote locations. Some roads in Kefalonia can be challenging to navigate after dark. Consider bringing a flashlight if visiting beaches or natural areas.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="h-12 w-12 rounded-full bg-[var(--terracotta)]/10 flex items-center justify-center mb-4">
                <ExternalLink className="h-6 w-6 text-[var(--terracotta)]" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-[var(--deep-blue)]">Comfort</h3>
              <p className="text-gray-700">
                Bring a light jacket or sweater as temperatures can drop after sunset, even in summer. Consider packing a small blanket, water, and snacks if visiting beaches or remote viewing spots.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-gradient-to-r from-[var(--deep-blue)] to-[var(--sea-blue)] text-white p-8 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4 playfair">Experience Kefalonia's Sunset Magic</h2>
        <p className="mb-6 max-w-2xl mx-auto">
          At Villa Fiscardo, we're perfectly positioned to help you experience the best sunset views Kefalonia has to offer. Ask us for personalized recommendations based on your preferences, and we can help arrange transportation or special sunset experiences.
        </p>
        <a 
          href="/booking" 
          className="inline-block px-6 py-3 bg-white text-[var(--deep-blue)] font-medium rounded-lg hover:bg-[var(--sand)] transition-colors"
        >
          Book Your Stay Now
        </a>
      </div>
    </div>
  );
};

export default SunsetMagic;