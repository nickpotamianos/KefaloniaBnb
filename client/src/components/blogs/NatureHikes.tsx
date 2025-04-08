import { MapPin, Mountain, Cloud, Layers, Clock, Bird, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Heading from "../ui/heading";

const NatureHikes = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* SEO-optimized heading structure */}
      <div className="mb-10 text-center">
        <span className="inline-block mb-3 px-4 py-2 bg-[var(--terracotta)]/10 rounded-full text-[var(--terracotta)] text-sm font-medium flex items-center justify-center mx-auto">
          <Mountain className="mr-1.5 h-4 w-4" />
          Hiking & Nature
        </span>
        
        <Heading
          title="Kefalonia's Natural Trails: Hiking Through Pristine Landscapes"
          description="Discover the island's hidden gems on foot, from mountain paths with panoramic views to coastal trails leading to secluded beaches."
          centered
        />
      </div>

      {/* Hero image with overlay */}
      <div className="relative h-[60vh] mb-10 rounded-xl overflow-hidden">
        <img 
          src="/images/hike.jpg" 
          alt="Hiker on mountain trail overlooking Kefalonia's dramatic coastline with turquoise waters below" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-10 max-w-xl text-white">
          <h2 className="text-3xl font-bold mb-3 playfair">Experience Kefalonia on Foot</h2>
          <p className="text-white/90">Explore ancient paths, dense forests, and coastal trails with stunning views at every turn</p>
        </div>
      </div>

      {/* Introduction with SEO-rich content */}
      <div className="prose max-w-none mb-12 text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Discover Kefalonia's Natural Beauty on Foot</h2>
        
        <p className="mb-4">
          While Kefalonia is renowned for its stunning beaches and crystal-clear waters, the island's interior offers equally breathtaking landscapes waiting to be explored. From the majestic Mount Ainos National Park to coastal paths revealing hidden coves and spectacular vistas, hiking in Kefalonia provides access to natural wonders that can't be seen from the road.
        </p>
        
        <p className="mb-4">
          The island's diverse terrain creates an ideal environment for hikers of all levels. Whether you're seeking a challenging ascent to panoramic viewpoints or a gentle stroll through olive groves and traditional villages, Kefalonia's network of trails offers something for everyone. And with the perfect Mediterranean climate, hiking is possible year-round, though spring and autumn provide the most comfortable temperatures.
        </p>
        
        <div className="bg-[var(--sand)]/10 p-6 rounded-lg border border-[var(--sand)]/20 mb-8">
          <h3 className="text-xl font-semibold mb-3 text-[var(--deep-blue)]">Why Hiking is the Perfect Way to Experience Kefalonia</h3>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <Mountain className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Access hidden spots:</strong> Discover secluded beaches and viewpoints unreachable by car</p>
            </div>
            <div className="flex items-center">
              <Mountain className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Connect with nature:</strong> Encounter native wildlife and rare plant species</p>
            </div>
            <div className="flex items-center">
              <Mountain className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Experience authentic Kefalonia:</strong> Pass through traditional villages and meet locals</p>
            </div>
            <div className="flex items-center">
              <Mountain className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Capture stunning photos:</strong> Find the most scenic vantage points on the island</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured trails section */}
      <div className="space-y-16 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Top Hiking Trails Near Villa Fiscardo</h2>
        
        {/* Fiskardo to Emblisi Beach */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Fiskardo to Emblisi Beach Coastal Path</h2>
            
            <p className="mb-4 text-gray-700">
              This gentle coastal walk is perfect for all fitness levels and offers spectacular sea views throughout. Beginning at Fiskardo harbor, the well-marked trail follows the rugged coastline to Emblisi Beach, one of northern Kefalonia's most beautiful swimming spots.
            </p>
            
            <p className="mb-4 text-gray-700">
              Along the way, you'll pass through fragrant pine forests and Mediterranean scrubland, with numerous opportunities to spot local birdlife and admire the crystal-clear waters below. The path occasionally dips down to secluded coves where you can pause for a refreshing swim away from the crowds.
            </p>
            
            <div className="bg-[var(--primary-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Trail Details</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Distance:</strong> 2.5 km one way</li>
                <li><strong>Difficulty:</strong> Easy (suitable for families)</li>
                <li><strong>Duration:</strong> 40-50 minutes (one way)</li>
                <li><strong>Starting point:</strong> Fiskardo harbor, 5-minute walk from Villa Fiscardo</li>
                <li><strong>Terrain:</strong> Mostly flat with some gentle inclines, coastal path</li>
                <li><strong>Highlights:</strong> Sea views, swimming opportunities, lighthouse</li>
              </ul>
            </div>
            
            <div className="bg-[var(--sand)]/10 p-4 rounded-lg">
              <h3 className="font-semibold text-[var(--deep-blue)] mb-2">Local Tips</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Best time:</strong> Early morning or late afternoon to avoid heat</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>What to bring:</strong> Water, hat, swimwear, camera</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Perfect for:</strong> Sunset walks with spectacular photography opportunities</span>
                </div>
              </div>
              <div className="mt-3">
                <a 
                  href="https://www.alltrails.com/greece/kefalonia" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
                >
                  View trail map on AllTrails
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
            <img 
              src="/images/foki.jpeg" 
              alt="Coastal path from Fiskardo to Emblisi Beach with turquoise waters and pine trees" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
        {/* Mount Ainos National Park */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-xl overflow-hidden h-80">
            <img 
              src="/images/hikepng.png" 
              alt="Hikers on a trail through Mount Ainos National Park with endemic Kefalonian fir trees" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Mount Ainos National Park Summit Trail</h2>
            
            <p className="mb-4 text-gray-700">
              For more adventurous hikers, the ascent to the summit of Mount Ainos offers a rewarding challenge. Standing at 1,628 meters, Mount Ainos is the highest peak in the Ionian islands and home to the rare Kefalonian fir tree (Abies Cephalonica), which grows nowhere else in the world.
            </p>
            
            <p className="mb-4 text-gray-700">
              The well-maintained trail takes you through dense forests, opening occasionally to reveal breathtaking panoramic views across the entire island and beyond. On clear days, you can see as far as Zakynthos to the south and the Greek mainland to the east. The mountain is also home to a small herd of semi-wild ponies, which you might be lucky enough to spot on your hike.
            </p>
            
            <div className="bg-[var(--primary-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Trail Details</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Distance:</strong> 7 km round trip from Digaleto monastery</li>
                <li><strong>Difficulty:</strong> Moderate to challenging</li>
                <li><strong>Duration:</strong> 3-4 hours total</li>
                <li><strong>Starting point:</strong> 1.5 hour drive from Villa Fiscardo</li>
                <li><strong>Terrain:</strong> Forest paths and rocky sections with some steep inclines</li>
                <li><strong>Highlights:</strong> Endemic fir forest, potential wild pony sightings, 360° views</li>
              </ul>
            </div>
            
            <div className="bg-[var(--sand)]/10 p-4 rounded-lg">
              <h3 className="font-semibold text-[var(--deep-blue)] mb-2">Important Information</h3>
              <p className="text-gray-700 mb-3">
                This is a more challenging hike that requires proper preparation:
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Mountain className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Equipment:</strong> Sturdy hiking boots, layers of clothing (temperatures can be 5-10°C cooler at the summit)</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mountain className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Season:</strong> Best in spring (April-June) when wildflowers bloom or autumn (September-October)</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Mountain className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Safety:</strong> Not recommended in strong winds or during summer heat (July-August)</span>
                </div>
              </div>
              <div className="mt-3">
                <a 
                  href="https://www.kefalonia.org.uk/ainos-national-park/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
                >
                  Learn more about Mount Ainos National Park
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Assos Peninsula Loop */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Assos Peninsula & Venetian Castle Loop</h2>
            
            <p className="mb-4 text-gray-700">
              This picturesque circular route combines natural beauty with historical interest, taking you around the charming Assos peninsula and up to the impressive 16th-century Venetian fortress that crowns the headland. The trail offers stunning views at every turn, with the colorful village of Assos and its horseshoe bay on one side and the open Ionian Sea on the other.
            </p>
            
            <p className="mb-4 text-gray-700">
              The path winds through cypress and olive groves, passing the ruins of the Venetian fortress which once protected the area from pirate raids. Inside the castle walls, you'll find remnants of an old settlement, churches, and even a small café during the summer months where you can refresh yourself before continuing your journey.
            </p>
            
            <div className="bg-[var(--primary-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Trail Details</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Distance:</strong> 5 km circular route</li>
                <li><strong>Difficulty:</strong> Moderate (some steep sections)</li>
                <li><strong>Duration:</strong> 2-2.5 hours including stops</li>
                <li><strong>Starting point:</strong> Assos village, 40-minute drive from Villa Fiscardo</li>
                <li><strong>Terrain:</strong> Mixed paved and dirt paths, some stone steps</li>
                <li><strong>Highlights:</strong> Venetian fortress, village views, coastal vistas</li>
              </ul>
            </div>
            
            <div className="bg-[var(--sand)]/10 p-4 rounded-lg">
              <h3 className="font-semibold text-[var(--deep-blue)] mb-2">Visitor Tips</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Layers className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Best time:</strong> Early morning to avoid crowds and heat</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Layers className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Facilities:</strong> Restaurants and cafés in Assos village, limited facilities in the castle</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Layers className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>After your hike:</strong> Reward yourself with a swim in Assos Bay and lunch at a waterfront taverna</span>
                </div>
              </div>
              <div className="mt-3">
                <a 
                  href="https://www.visit-ithaca-kefalonia.com/listing/assos-castle-hike/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
                >
                  Find guided tours to Assos Castle
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
            <img 
              src="/images/assos.jpg" 
              alt="Assos peninsula with Venetian castle ruins and village views surrounded by turquoise water" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Seasonal hiking guide */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Hiking Through the Seasons in Kefalonia</h2>
        <p className="mb-6 text-gray-700">
          Kefalonia offers excellent hiking conditions most of the year, with each season providing a different experience of the island's landscapes. Here's what to expect throughout the year:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <img src="/images/spring.jpg" alt="Spring flowers on Kefalonian trail" className="w-12 h-12 rounded-full object-cover mr-3" />
              <h3 className="font-bold text-lg text-[var(--primary-blue)]">Spring (March-May)</h3>
            </div>
            <p className="text-gray-700 mb-3">The ideal hiking season with mild temperatures, spectacular wildflower displays, and lush green landscapes after the winter rains. Waterfalls and streams are at their fullest.</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Cloud className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Temperature:</strong> 15-22°C (59-72°F)</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Bird className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Highlight:</strong> Orchids and spring migration birds</span>
            </div>
          </div>
          
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <img src="/images/summer.jpg" alt="Summer coastline in Kefalonia" className="w-12 h-12 rounded-full object-cover mr-3" />
              <h3 className="font-bold text-lg text-[var(--primary-blue)]">Summer (June-August)</h3>
            </div>
            <p className="text-gray-700 mb-3">Hot days make hiking challenging during midday, but early morning coastal hikes with swimming breaks are wonderful. Mountain trails offer cooler temperatures.</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Cloud className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Temperature:</strong> 25-32°C (77-90°F)</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Bird className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Highlight:</strong> Combining hikes with beach swims</span>
            </div>
          </div>
          
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <img src="/images/autumn.jpg" alt="Autumn colors in Kefalonian forest" className="w-12 h-12 rounded-full object-cover mr-3" />
              <h3 className="font-bold text-lg text-[var(--primary-blue)]">Autumn (September-November)</h3>
            </div>
            <p className="text-gray-700 mb-3">Another excellent hiking season with warm seas for swimming, fewer crowds, and the start of autumn colors. Seasonal fruits like figs and grapes line many trails.</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Cloud className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Temperature:</strong> 18-28°C (64-82°F)</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Bird className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Highlight:</strong> Autumn bird migration, grape harvest</span>
            </div>
          </div>
          
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <div className="flex items-center mb-3">
              <img src="/images/winter.png" alt="Winter view of Kefalonia mountains" className="w-12 h-12 rounded-full object-cover mr-3" />
              <h3 className="font-bold text-lg text-[var(--primary-blue)]">Winter (December-February)</h3>
            </div>
            <p className="text-gray-700 mb-3">Mild compared to mainland Europe, with occasional rain but many clear, sunny days. Mount Ainos may see snow. Lower crowds make for peaceful experiences.</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Cloud className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Temperature:</strong> 10-15°C (50-59°F)</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Bird className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Highlight:</strong> Dramatic seascapes, snow on Mt. Ainos</span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--sand)]/10 p-5 rounded-lg mt-6">
          <h3 className="font-semibold text-[var(--deep-blue)] mb-3">When to Plan Your Hiking Trip</h3>
          <p className="text-gray-700 mb-4">
            For the optimal hiking experience in Kefalonia, consider visiting during the shoulder seasons:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2">
            <li><strong>Late April to early June:</strong> Perfect temperatures, wildflowers in bloom, and fewer tourists</li>
            <li><strong>September to mid-October:</strong> Still warm enough for swimming after hikes, beautiful light for photography, and harvest season for local produce</li>
          </ul>
          <a 
            href="https://www.weatherbase.com/weather/weather.php3?s=108288&cityname=Kefalonia%2C+Greece" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-[var(--terracotta)] hover:underline mt-4 text-sm"
          >
            Check Kefalonia's climate data
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </motion.div>
      
      {/* Flora and fauna section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Kefalonia's Natural Treasures: What to Look For</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <p className="mb-4 text-gray-700">
              Kefalonia's diverse ecosystems support a remarkable variety of plant and animal life, making hiking here a delight for nature enthusiasts. The island's relative isolation has preserved many endemic species that can be found nowhere else, while its position on Mediterranean migration routes brings seasonal visitors throughout the year.
            </p>
            
            <p className="mb-4 text-gray-700">
              From rare orchids and aromatic herbs to elusive wild ponies and loggerhead turtles, the island offers countless opportunities for wildlife observation. Bring binoculars and a camera with a zoom lens to make the most of these encounters, and remember to tread lightly to protect these fragile habitats.
            </p>
            
            <div className="bg-[var(--primary-blue)]/5 p-5 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-3">Notable Wildlife to Watch For</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Bird className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Kefalonian wild ponies:</span> A small population of semi-wild ponies lives on the slopes of Mount Ainos, believed to be descendants of horses brought by Crusaders. They are rarely seen but occasionally appear in forest clearings.
                  </div>
                </li>
                <li className="flex items-start">
                  <Bird className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Loggerhead sea turtles (Caretta caretta):</span> These endangered marine reptiles nest on certain beaches on the island. If hiking coastal trails during summer, you might spot them swimming near shore.
                  </div>
                </li>
                <li className="flex items-start">
                  <Bird className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Mediterranean monk seals (Monachus monachus):</span> One of the world's most endangered marine mammals, occasionally spotted in remote sea caves around the northern coast.
                  </div>
                </li>
                <li className="flex items-start">
                  <Bird className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Golden eagles:</span> These majestic birds of prey nest in the mountains and can sometimes be seen soaring above the higher trails.
                  </div>
                </li>
              </ul>
            </div>
            <a 
              href="https://www.wildlifesense.com/kefalonia/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Learn about wildlife conservation in Kefalonia
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <img 
              src="/images/hikepng.png" 
              alt="Endemic Kefalonian flora with colorful wildflowers growing along hiking trail" 
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Plant Life Along the Trails</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                <li><strong>Kefalonian fir (Abies cephalonica):</strong> Endemic to Greece, forming forests on Mount Ainos</li>
                <li><strong>Wild orchids:</strong> Over 35 species bloom in spring, particularly in meadows and olive groves</li>
                <li><strong>Aromatic herbs:</strong> Thyme, sage, oregano, and mint scent the air along many trails</li>
                <li><strong>Strawberry tree (Arbutus unedo):</strong> Produces distinctive red fruits in autumn</li>
              </ul>
              <p className="text-sm text-gray-600"><strong>Best time for wildflowers:</strong> Late March through May</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Guided hikes vs. self-guided */}
      <div className="bg-[var(--sand)]/10 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Guided vs. Self-Guided Hiking in Kefalonia</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="bg-[var(--primary-blue)] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shrink-0">
                <Mountain className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-xl text-[var(--primary-blue)]">Self-Guided Adventures</h3>
            </div>
            
            <p className="text-gray-700 mb-4">
              For independent travelers who enjoy exploring at their own pace, self-guided hiking offers flexibility and spontaneity. Kefalonia has several well-marked trails that can be easily followed without a guide, particularly around Fiskardo, Assos, and parts of Mount Ainos.
            </p>
            
            <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Perfect for you if:</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
              <li>You enjoy setting your own pace and schedule</li>
              <li>You have some hiking experience</li>
              <li>You prefer quiet contemplation while walking</li>
              <li>You want to keep your itinerary flexible</li>
              <li>You're on a budget (it's free!)</li>
            </ul>
            
            <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Essential Resources:</h4>
            <ul className="space-y-2 mb-3">
              <li className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                <span><strong>Anavasi Hiking Map of Kefalonia</strong> (available at bookstores in Argostoli)</span>
              </li>
              <li className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                <span><strong>AllTrails app</strong> with downloaded routes for offline use</span>
              </li>
              <li className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                <span><strong>"Walking and Trekking on Kefalonia"</strong> guidebook by Loraine Wilson</span>
              </li>
            </ul>
            
            <a 
              href="https://www.amazon.com/Walking-Trekking-Kefalonia-countryside-Greek/dp/1852848812/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Find hiking guidebooks online
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="bg-[var(--terracotta)] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shrink-0">
                <Mountain className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-xl text-[var(--primary-blue)]">Guided Hiking Experiences</h3>
            </div>
            
            <p className="text-gray-700 mb-4">
              Joining a guided hike with a knowledgeable local guide enhances your experience with insights into the island's ecology, history, and culture that you might otherwise miss. Guides know the hidden spots, identify plants and wildlife, and share local stories that bring the landscape to life.
            </p>
            
            <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Perfect for you if:</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
              <li>You want to learn about local ecology and history</li>
              <li>You prefer the security of hiking with an expert</li>
              <li>You'd like to meet other travelers with similar interests</li>
              <li>You want access to lesser-known trails</li>
              <li>You're interested in specialized themes (botany, birdwatching, etc.)</li>
            </ul>
            
            <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Recommended Operators:</h4>
            <ul className="space-y-2 mb-3">
              <li className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                <span><strong>Kefalonia Hiking Tours</strong> - Specializes in small-group experiences</span>
              </li>
              <li className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                <span><strong>Fiskardo Hiking Club</strong> - Weekly guided walks from Fiskardo</span>
              </li>
              <li className="flex items-center text-gray-700">
                <MapPin className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                <span><strong>Natura Expedition</strong> - Expert guides for Mount Ainos treks</span>
              </li>
            </ul>
            
            <a 
              href="https://www.tripadvisor.com/Attractions-g189457-Activities-c61-t87-Cephalonia_Ionian_Islands.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Browse guided hiking tours on TripAdvisor
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg mt-6 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)]">Villa Fiscardo's Guest Hiking Support</h3>
          <p className="text-gray-700 mb-4">
            As a guest at Villa Fiscardo, you'll have access to our curated hiking information pack which includes:
          </p>
          <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
            <li>Detailed trail maps of the northern peninsula</li>
            <li>Our personal recommendations based on your fitness level and interests</li>
            <li>Contact information for trusted local guides</li>
            <li>Picnic lunch arrangements for full-day hikes (upon request)</li>
            <li>Transportation assistance to trailheads further from the villa</li>
          </ul>
          <p className="text-sm text-gray-600">
            We can also arrange for a local guide to lead a private hike tailored to your interests – just let us know when booking your stay.
          </p>
        </div>
      </div>
      
      {/* Safety tips section */}
      <motion.div 
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Hiking Safety in Kefalonia</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <p className="mb-4 text-gray-700">
              While hiking in Kefalonia is generally safe and enjoyable, the Mediterranean environment presents some specific challenges that require preparation. Following these safety guidelines will help ensure a positive experience on the island's trails.
            </p>
            
            <div className="bg-[var(--primary-blue)]/5 p-5 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-3">Essential Safety Tips</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Mountain className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Heat awareness:</span> Summer temperatures can exceed 30°C (86°F). Start early, carry plenty of water (at least 2 liters per person for half-day hikes), and avoid strenuous hiking between 11am-4pm in July and August.
                  </div>
                </li>
                <li className="flex items-start">
                  <Mountain className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Navigation:</span> While main trails are marked, markings can be faded in places. Carry a paper map and download offline maps to your phone. Take photos of trail junctions as you go.
                  </div>
                </li>
                <li className="flex items-start">
                  <Mountain className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Communication:</span> Cell phone coverage is generally good near villages but can be patchy in mountainous areas. Let someone know your planned route and expected return time.
                  </div>
                </li>
                <li className="flex items-start">
                  <Mountain className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Wildlife awareness:</span> Kefalonia has no large predators, but watch out for snakes (most are harmless, but the horned viper is venomous). Stick to paths and watch where you place your feet and hands.
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="bg-[var(--terracotta)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--terracotta)] mb-2">Emergency Information</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Emergency number:</strong> 112 (European emergency number)</li>
                <li><strong>Mountain rescue:</strong> Contact the local fire department at 199</li>
                <li><strong>Medical emergencies:</strong> Argostoli General Hospital +30 26710 38000</li>
                <li><strong>Tourist police:</strong> +30 26710 22815</li>
              </ul>
            </div>
            
            <a 
              href="https://www.visitgreece.gr/travel-safely/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Official Greek tourism safety information
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <img 
              src="/images/hike.jpg" 
              alt="Hiker with proper equipment on Kefalonian mountain trail" 
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">What to Pack for Day Hikes</h3>
              <div className="grid grid-cols-2 gap-2">
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Sturdy walking shoes</li>
                  <li>Hat and sunglasses</li>
                  <li>High SPF sunscreen</li>
                  <li>Plenty of water</li>
                  <li>Energy snacks</li>
                </ul>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Light layers of clothing</li>
                  <li>Basic first aid kit</li>
                  <li>Mobile phone (charged)</li>
                  <li>Trail map or GPS app</li>
                  <li>Camera for scenic views</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Family-friendly hikes */}
      <div className="bg-[var(--sea-blue)]/5 rounded-xl p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair text-center">Family-Friendly Hikes in Kefalonia</h2>
        <p className="text-center text-gray-700 mb-8">Sharing Kefalonia's natural beauty with younger adventurers</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img 
              src="/images/_83A0543.jpg" 
              alt="Family hiking on easy coastal trail in Kefalonia" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Foki Beach Nature Trail</h3>
              <p className="text-gray-700 mb-4">
                This gentle, shaded path winds through ancient olive groves to a picturesque pebble beach with a sea cave. The well-maintained trail is mostly flat and offers plenty of shade, making it ideal for families with children of all ages.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Distance:</strong> 1.2 km one way</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Duration:</strong> 30-40 minutes each way at a child's pace</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Highlight:</strong> Sea cave exploration and shallow swimming area</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600">
                <strong>Starting point:</strong> Just a 10-minute walk from Villa Fiscardo
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img 
              src="/images/fiskardo.jpg" 
              alt="Family hiking to old lighthouse ruins near Fiskardo" 
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Lighthouse Loop &amp; Roman Cemetery</h3>
              <p className="text-gray-700 mb-4">
                This short circular walk combines history and natural beauty, taking you to the old lighthouse ruins and a fascinating Roman cemetery with ancient tombs. The varied terrain and historical features keep children engaged throughout the journey.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Distance:</strong> 2 km circular route</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Duration:</strong> 1-1.5 hours including exploration time</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <Clock className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Highlight:</strong> Historical ruins and panoramic sea views</span>
                </li>
              </ul>
              <p className="text-sm text-gray-600">
                <strong>Best for:</strong> Children aged 5+ who enjoy historical stories
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-5 rounded-lg mt-6 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)]">Tips for Hiking with Children in Kefalonia</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Start early in the morning to avoid midday heat</li>
              <li>Pack extra water and snacks - kids dehydrate quicker</li>
              <li>Choose routes with interesting features (caves, ruins, etc.)</li>
              <li>Create a nature scavenger hunt to keep them engaged</li>
              <li>Take frequent breaks in shady spots</li>
            </ul>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Bring a simple first aid kit for minor scrapes</li>
              <li>Pack a change of clothes if the trail ends at a beach</li>
              <li>Use child-friendly sunscreen with high SPF</li>
              <li>Consider walking poles for older children</li>
              <li>Take plenty of photos to create a hiking memory book</li>
            </ul>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            <strong>Note:</strong> Trails marked as "family-friendly" in our hiking information pack at Villa Fiscardo have been personally tested with children of various ages
          </p>
        </div>
      </div>
      
      {/* CTA section */}
      <div className="bg-[var(--deep-blue)] text-white rounded-xl p-8 text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 playfair">Ready to Explore Kefalonia's Hidden Paths?</h2>
        <p className="mb-6 text-white/80 max-w-2xl mx-auto">
          Stay at Villa Fiscardo and enjoy easy access to the island's most beautiful hiking trails. Our traditional Kefalonian home puts you at the doorstep of natural wonders waiting to be discovered.
        </p>
        <a 
          href="/booking" 
          className="inline-block bg-white text-[var(--deep-blue)] font-semibold px-8 py-3 rounded-full hover:bg-[var(--sand)] transition-colors duration-300"
        >
          Book Your Hiking Getaway
        </a>
      </div>
      
      {/* FAQ section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Frequently Asked Questions About Hiking in Kefalonia</h2>
        
        <div className="space-y-4">
          <div className="border border-[var(--sand)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Are Kefalonia's hiking trails well-marked?</h3>
            <p className="text-gray-700">
              The quality of trail marking varies across the island. Popular routes like the Fiskardo coastal paths and main Mount Ainos trails are generally well-marked with red or blue paint markers on rocks and trees. However, some lesser-used paths may have faded markings that can be difficult to follow. In recent years, local authorities have been improving signage, particularly in the north of the island. For more remote hikes, we recommend carrying a detailed hiking map (Anavasi publishes an excellent one), downloading offline trail maps to your phone, or hiring a local guide who knows the terrain well.
            </p>
          </div>
          
          <div className="border border-[var(--sand)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">What wildlife might I encounter while hiking in Kefalonia?</h3>
            <p className="text-gray-700">
              Kefalonia's diverse ecosystems support a variety of wildlife, though many species are shy and primarily active at dawn and dusk. You might spot wild rabbits, hedgehogs, and various lizard species on most trails. Birdwatchers can observe falcons, eagles, and numerous migratory species depending on the season. The rare Kefalonian wild ponies can occasionally be seen on Mount Ainos, though sightings are uncommon. While hiking, you may encounter snakes—most are harmless, but the horned viper (rare but present) is venomous, so it's wise to watch where you step and use a walking stick if hiking through dense undergrowth. Marine wildlife, including dolphins and the endangered Mediterranean monk seal, may be visible from coastal paths, particularly around the Fiskardo area.
            </p>
          </div>
          
          <div className="border border-[var(--sand)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Can I hike year-round in Kefalonia?</h3>
            <p className="text-gray-700">
              Yes, Kefalonia's mild Mediterranean climate makes hiking possible throughout the year, though each season offers a different experience. Spring (April-May) and autumn (September-October) provide ideal hiking conditions with comfortable temperatures and beautiful landscapes—spring brings wildflowers and flowing streams, while autumn offers warm sea temperatures for post-hike swims. Summer (June-August) hiking is enjoyable but requires extra precautions against heat; early morning starts and coastal routes with swimming opportunities are recommended. Winter (November-March) offers peaceful trails and dramatic landscapes, though some days bring rain and higher trails on Mount Ainos may see occasional snow. Winter hikers should pack waterproof gear and check weather forecasts carefully, as storms can develop quickly, particularly in mountain areas.
            </p>
          </div>
          
          <div className="border border-[var(--sand)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Do I need special hiking boots for Kefalonia's trails?</h3>
            <p className="text-gray-700">
              The footwear required depends on the trails you plan to tackle. For coastal walks and gentle forest paths (including most trails around Fiskardo), sturdy walking shoes or trail runners with good grip are generally sufficient. For more challenging terrain like Mount Ainos or rocky limestone paths, proper hiking boots with ankle support are recommended. Kefalonia's limestone can be slippery, especially when wet, so footwear with good traction is important regardless of the trail difficulty. In summer, breathable footwear helps prevent overheating, while in winter, waterproof options are valuable. For short, easy walks to beaches and viewpoints, sports sandals with closed toes and good soles can be adequate, though they offer less protection from rocks and vegetation. Whatever footwear you choose, make sure it's broken in before your trip to prevent blisters.
            </p>
          </div>
        </div>
      </div>
      
      {/* Related experiences */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair text-center">Explore More Kefalonia Experiences</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/blog/island-cruising" className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/DJI_0722.jpg" 
                  alt="Boat cruising along Kefalonia's coastline with view of hiking trails from the sea" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Island Cruising</h3>
                <p className="text-gray-700 text-sm">Access remote hiking trails and combine walking with boating adventures</p>
              </div>
            </div>
          </a>
          
          <a href="/blog/culinary-delights" className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/fiskardo.jpeg" 
                  alt="Traditional Greek taverna with local cuisine after a day of hiking" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Culinary Delights</h3>
                <p className="text-gray-700 text-sm">Refuel with authentic local cuisine after your hiking adventures</p>
              </div>
            </div>
          </a>
          
          <a href="/blog/wine-tasting" className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/Robola.jpg" 
                  alt="Vineyard in Kefalonia with hiking paths through wine country" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Wine Tasting</h3>
                <p className="text-gray-700 text-sm">Combine hiking with visits to local vineyards in Kefalonia's wine country</p>
              </div>
            </div>
          </a>
        </div>
      </div>
      
      {/* Structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: `
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Kefalonia's Natural Trails: Hiking Through Pristine Landscapes",
          "image": "https://villafiscardo.com/images/hike.jpg",
          "author": {
            "@type": "Person",
            "name": "Villa Fiscardo Team"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Villa Fiscardo",
            "logo": {
              "@type": "ImageObject",
              "url": "https://villafiscardo.com/images/logokef1.png"
            }
          },
          "datePublished": "2023-05-10",
          "dateModified": "2023-12-20",
          "description": "Discover the island's hidden gems on foot, from mountain paths with panoramic views to coastal trails leading to secluded beaches.",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://villafiscardo.com/blog/nature-hikes"
          }
        }
      `}} />
    </div>
  );
};

export default NatureHikes;