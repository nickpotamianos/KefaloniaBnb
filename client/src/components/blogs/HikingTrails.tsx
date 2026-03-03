import { MapPin, Mountain, Clock, Sun, Calendar, Droplet, TrendingUp, Wind, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Heading } from "../ui/heading";

const HikingTrails = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* SEO-optimized heading structure */}
      <div className="mb-10 text-center">
        <span className="inline-block mb-3 px-4 py-2 bg-[var(--olive)]/10 rounded-full text-[var(--primary-blue)] text-sm font-medium flex items-center justify-center mx-auto">
          <Mountain className="mr-1.5 h-4 w-4" />
          Hiking Adventures in Kefalonia
        </span>

        <Heading
          title="Discovering Kefalonia on Foot: Best Hiking Trails Near Fiskardo"
          description="Explore the natural beauty of Kefalonia with our curated guide to the island's most scenic hiking trails, suitable for all experience levels."
          centered
        />
      </div>

      {/* Hero image with overlay */}
      <div className="relative h-[60vh] mb-10 rounded-xl overflow-hidden">
        <img
          src="/images/hike.webp"
          alt="Scenic hiking trail in Kefalonia with coastal views"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-10 max-w-xl text-white">
          <h2 className="text-3xl font-bold mb-3 playfair">Fiskardo Hiking Paths</h2>
          <p className="text-white/90">Discover ancient trails with breathtaking sea views just minutes from Villa Fiscardo</p>
        </div>
      </div>

      {/* Introduction with SEO-rich content */}
      <div className="prose max-w-none mb-12 text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Explore Kefalonia's Natural Wonders on Foot</h2>

        <p className="mb-4">
          While Kefalonia is renowned for its stunning beaches, the island's diverse landscape offers equally impressive experiences for hiking enthusiasts. From coastal paths with panoramic sea views to forest trails leading to historic ruins, Kefalonia's hiking routes showcase a different side of this Ionian paradise.
        </p>

        <p className="mb-4">
          Based at our traditional Villa Fiscardo in the charming north of the island, you'll have easy access to some of Kefalonia's most scenic hiking trails. Whether you're an experienced hiker looking for a challenge or simply enjoy leisurely walks in beautiful settings, our local guide will help you discover the perfect routes to explore during your stay.
        </p>

        <div className="bg-[var(--olive)]/10 p-6 rounded-lg border border-[var(--olive)]/20 mb-8">
          <h3 className="text-xl font-semibold mb-3 text-[var(--deep-blue)]">Best Seasons for Hiking in Kefalonia</h3>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-[var(--olive)]" />
              <p><strong>Spring (April-June):</strong> Comfortable temperatures, wildflowers in bloom, lush green landscapes</p>
            </div>
            <div className="flex items-center">
              <Sun className="h-5 w-5 mr-3 text-[var(--olive)]" />
              <p><strong>Summer (July-August):</strong> Hot weather, best for early morning or evening hikes, clearest coastal views</p>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-3 text-[var(--olive)]" />
              <p><strong>Autumn (September-October):</strong> Mild temperatures, perfect hiking conditions, fewer tourists</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trail sections with alternating layouts */}
      <div className="space-y-16 mb-16">
        {/* Fiskardo to Dafnoudi Beach Trail */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Fiskardo to Dafnoudi Beach</h2>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
              <span>10 minutes drive from Villa Fiscardo to trailhead</span>
            </div>

            <p className="mb-4 text-gray-700">
              This scenic coastal path takes you through a beautiful cypress forest to the secluded Dafnoudi Beach. The trail is well-marked and offers stunning views of the Ionian Sea throughout, with glimpses of Ithaca Island on clear days.
            </p>

            <p className="mb-4 text-gray-700">
              The hike ends at the pristine Dafnoudi Beach, where crystal-clear waters provide the perfect reward for your efforts. Look out for the sea caves that can be explored during calm sea conditions. This is one of the most accessible and rewarding hikes near Fiskardo.
            </p>

            <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Trail Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Duration:</strong> 30-40 minutes one way</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Difficulty:</strong> Easy to Moderate</span>
                </div>
                <div className="flex items-center">
                  <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Distance:</strong> 1.5 km one way</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Family-friendly:</strong> Yes</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
            <img
              src="/images/hikepng.webp"
              alt="Hiking path from Fiskardo to Dafnoudi Beach through cypress forest"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Fiskardo Peninsula Loop */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-xl overflow-hidden h-80">
            <img
              src="/images/fiskardo.webp"
              alt="Panoramic view of Fiskardo peninsula with hiking trails and coastal views"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Fiskardo Peninsula Loop</h2>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
              <span>5 minutes drive from Villa Fiscardo to trailhead</span>
            </div>

            <p className="mb-4 text-gray-700">
              This circular route takes you around the northern peninsula of Kefalonia, offering spectacular 360-degree views of the coastline, neighboring islands, and the picturesque harbor of Fiskardo. The trail leads through olive groves, past the ruins of a Venetian lighthouse, and along dramatic cliffs.
            </p>

            <p className="mb-4 text-gray-700">
              Along the way, you'll discover hidden coves perfect for a refreshing swim break. This trail is particularly magical in the late afternoon when the golden light illuminates the landscape and the sunset creates a stunning backdrop over the Ionian Sea.
            </p>

            <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Trail Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Duration:</strong> 2-3 hours (full loop)</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Difficulty:</strong> Moderate</span>
                </div>
                <div className="flex items-center">
                  <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Distance:</strong> 5 km circuit</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Family-friendly:</strong> Moderate</span>
                </div>
              </div>
            </div>
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
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Mount Ainos National Park</h2>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
              <span>50 minutes drive from Villa Fiscardo</span>
            </div>

            <p className="mb-4 text-gray-700">
              For more serious hikers, Mount Ainos National Park offers the island's premier mountain hiking experience. Standing at 1,628 meters, Mount Ainos is the highest peak in the Ionian Islands and home to the rare Kefalonian fir tree found nowhere else in the world.
            </p>

            <p className="mb-4 text-gray-700">
              The park features several well-marked trails of varying difficulty. The most popular route leads to the summit of Mount Ainos (also known as Mount Megas Soros), rewarding hikers with breathtaking panoramic views across the entire island and beyond to neighboring islands on clear days.
            </p>

            <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Trail Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Duration:</strong> 3-4 hours (return)</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Difficulty:</strong> Moderate to Challenging</span>
                </div>
                <div className="flex items-center">
                  <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Distance:</strong> 7 km (summit trail)</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Family-friendly:</strong> For experienced hikers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
            <img
              src="/images/Robola.webp"
              alt="Mount Ainos National Park with endemic Kefalonian fir trees"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Assos to Myrtos Beach */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-xl overflow-hidden h-80">
            <img
              src="/images/assos.webp"
              alt="View of Assos peninsula with hiking trail overlooking the sea"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Assos to Myrtos Beach Trail</h2>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
              <span>25 minutes drive from Villa Fiscardo to trailhead</span>
            </div>

            <p className="mb-4 text-gray-700">
              This spectacular coastal hike connects two of Kefalonia's most beautiful locations: the charming village of Assos and the world-famous Myrtos Beach. The trail follows old goat paths along dramatic cliffs, providing continuous breathtaking views of the Ionian Sea.
            </p>

            <p className="mb-4 text-gray-700">
              Starting from the picturesque peninsula of Assos with its Venetian castle, the path winds through Mediterranean scrub, offering plenty of photo opportunities. The hike culminates at the stunning viewpoint above Myrtos Beach, where you can continue down to the beach for a well-deserved swim.
            </p>

            <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Trail Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Duration:</strong> 2 hours one way</span>
                </div>
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Difficulty:</strong> Moderate</span>
                </div>
                <div className="flex items-center">
                  <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Distance:</strong> 4 km one way</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                  <span><strong>Family-friendly:</strong> For teens and up</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hidden gems section */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Hidden Gems: Lesser-Known Hiking Trails</h2>
        <p className="mb-6 text-gray-700">
          Beyond the popular hiking routes, Kefalonia offers several hidden trails that provide solitude and discovery for the adventurous hiker. Here are some lesser-known paths that showcase the island's diverse landscapes:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[var(--olive)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Old Fiskardo to Tselentata</h3>
            <p className="text-gray-700 mb-3">A historic path connecting ancient villages, featuring traditional stone walls, abandoned olive presses, and glimpses into Kefalonia's rural past.</p>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
              <span>7 minutes drive from Villa Fiscardo</span>
            </div>
          </div>

          <div className="border border-[var(--olive)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Kipouria Monastery Trail</h3>
            <p className="text-gray-700 mb-3">On the western side of the island, this trail leads to a remote monastery perched on dramatic cliffs with spectacular sunset views over the Ionian Sea.</p>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
              <span>55 minutes drive from Villa Fiscardo</span>
            </div>
          </div>

          <div className="border border-[var(--olive)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Melissani Lake Circuit</h3>
            <p className="text-gray-700 mb-3">A gentle loop around the famous Melissani Cave and Lake, offering unique perspectives of this natural wonder beyond the standard boat tour.</p>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
              <span>40 minutes drive from Villa Fiscardo</span>
            </div>
          </div>

          <div className="border border-[var(--olive)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Agia Dynati Mountain Trail</h3>
            <p className="text-gray-700 mb-3">Kefalonia's second-highest peak offers a less crowded alternative to Mount Ainos with equally impressive views spanning both sides of the island.</p>
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
              <span>35 minutes drive from Villa Fiscardo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Practical information */}
      <div className="bg-[var(--olive)]/10 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Hiking Essentials: What to Bring</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)] flex items-center">
              <Mountain className="h-5 w-5 mr-2 text-[var(--olive)]" />
              Basic Equipment
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Sturdy hiking shoes with ankle support</li>
              <li>Lightweight backpack</li>
              <li>Walking poles (for steeper trails)</li>
              <li>Trail map or offline GPS app</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)] flex items-center">
              <Sun className="h-5 w-5 mr-2 text-[var(--olive)]" />
              Weather Protection
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>High SPF sunscreen and lip balm</li>
              <li>Wide-brimmed hat and sunglasses</li>
              <li>Light, breathable clothing</li>
              <li>Light rain jacket (spring/autumn)</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)] flex items-center">
              <Droplet className="h-5 w-5 mr-2 text-[var(--olive)]" />
              Health & Safety
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>At least 2 liters of water per person</li>
              <li>Energy-rich snacks and fruit</li>
              <li>Basic first aid kit</li>
              <li>Fully charged mobile phone</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Seasonal hiking guide */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Hiking Kefalonia Through the Seasons</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/spring.webp"
              alt="Spring wildflowers along Kefalonia hiking trails"
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Spring Hiking</h3>
              <p className="text-gray-700 mb-3">
                Spring transforms Kefalonia's trails with vibrant wildflowers, lush greenery, and comfortable temperatures ranging from 15-22°C (59-72°F).
              </p>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Sun className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                <span><strong>Best For:</strong> Wildflower photography</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                <span><strong>Top Trail:</strong> Mount Ainos forest paths</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/summer.webp"
              alt="Summer coastal hiking in Kefalonia with clear blue skies"
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Summer Hiking</h3>
              <p className="text-gray-700 mb-3">
                Summer offers the clearest views but higher temperatures (25-32°C/77-90°F). Early morning or evening hikes are recommended to avoid midday heat.
              </p>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Sun className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                <span><strong>Best For:</strong> Coastal trails with swim breaks</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                <span><strong>Top Trail:</strong> Fiskardo coastal paths</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/autumn.webp"
              alt="Autumn colors on Kefalonia's hiking trails"
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Autumn Hiking</h3>
              <p className="text-gray-700 mb-3">
                Autumn brings mild temperatures (18-25°C/64-77°F), fewer tourists, and beautiful golden light for photography. The sea remains warm for post-hike swims.
              </p>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Sun className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                <span><strong>Best For:</strong> Comfortable all-day hiking</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                <span><strong>Top Trail:</strong> Assos to Myrtos trail</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/winter.webp"
              alt="Winter views from Kefalonia hiking trails with dramatic skies"
              className="w-full h-40 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Winter Hiking</h3>
              <p className="text-gray-700 mb-3">
                Winter offers a different perspective with cooler temperatures (8-15°C/46-59°F), dramatic skies, and occasional snow on Mount Ainos. Far fewer visitors.
              </p>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Sun className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                <span><strong>Best For:</strong> Solitude and dramatic photography</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                <span><strong>Top Trail:</strong> Lower elevation forest trails</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Guided hikes section */}
      <div className="bg-white rounded-xl shadow-md p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Local Guided Hiking Experiences</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="mb-4 text-gray-700">
              While most hiking trails in Kefalonia can be explored independently, joining a guided hike offers additional insights into the island's natural environment, history, and culture. Local guides can enhance your experience by:
            </p>

            <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
              <li>Sharing knowledge about local flora, fauna, and geology</li>
              <li>Pointing out features you might otherwise miss</li>
              <li>Taking you to hidden spots away from marked trails</li>
              <li>Providing cultural and historical context</li>
              <li>Ensuring your safety on more challenging routes</li>
            </ul>

            <p className="text-gray-700">
              At Villa Fiscardo, we can help arrange guided hiking experiences with trusted local experts who speak excellent English and know the island intimately. Just let us know your preferences and fitness level when booking.
            </p>
          </div>

          <div className="bg-[var(--olive)]/5 rounded-lg p-6">
            <h3 className="font-bold text-lg mb-4 text-[var(--primary-blue)]">Recommended Local Guides</h3>

            <div className="space-y-5">
              <div className="flex items-start">
                <img
                  src="/images/odysseas.webp"
                  alt="Kefalonia hiking guide Odysseas"
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-[var(--deep-blue)]">Odysseas Hiking Kefalonia</h4>
                  <p className="text-sm text-gray-700 mb-1.5">Specializes in natural history tours focused on Kefalonia's unique ecosystems. Perfect for nature enthusiasts and photographers.</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                    <span>Mount Ainos ecological tours</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <img
                  src="/images/alex.png"
                  alt="Kefalonia hiking guide Alexandra"
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-[var(--deep-blue)]">Kefalonia Trekking Club</h4>
                  <p className="text-sm text-gray-700 mb-1.5">Local hiking group that welcomes visitors for weekly group hikes. Great way to meet locals and explore authentic parts of the island.</p>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mountain className="h-4 w-4 mr-1.5 text-[var(--olive)]" />
                    <span>Weekly scheduled group hikes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-[var(--deep-blue)] text-white rounded-xl p-8 text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 playfair">Ready to Explore Kefalonia on Foot?</h2>
        <p className="mb-6 text-white/80 max-w-2xl mx-auto">
          Our traditional Kefalonian villa in Fiskardo provides the perfect base for your hiking adventures. Enjoy comfortable accommodations, local insights, and easy access to the island's most beautiful trails during your stay.
        </p>
        <Link
          href="/booking"
          className="inline-block bg-white text-[var(--deep-blue)] font-semibold px-8 py-3 rounded-full hover:bg-[var(--olive)] transition-colors duration-300"
        >
          Book Your Hiking Holiday
        </Link>
      </div>

      {/* FAQ section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Frequently Asked Questions About Hiking in Kefalonia</h2>

        <div className="space-y-4">
          <div className="border border-[var(--olive)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Are the hiking trails in Kefalonia well-marked?</h3>
            <p className="text-gray-700">
              The main trails in Kefalonia, especially in National Parks and popular areas, are generally well-marked. However, some of the more remote or less-traveled paths may have limited signage. We recommend using offline maps, joining guided tours for unfamiliar routes, or asking for detailed directions for lesser-known trails.
            </p>
          </div>

          <div className="border border-[var(--olive)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">What wildlife might I encounter while hiking in Kefalonia?</h3>
            <p className="text-gray-700">
              Kefalonia hosts a diverse range of wildlife. You might spot wild horses on Mount Ainos, various bird species including eagles and falcons, and plenty of lizards sunning themselves on rocks. The island's marine life can be spotted from coastal trails, including dolphins if you're lucky. Most wildlife is harmless, though be mindful of potential snake encounters in summer (most are non-venomous but best avoided).
            </p>
          </div>

          <div className="border border-[var(--olive)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Is it safe to hike alone in Kefalonia?</h3>
            <p className="text-gray-700">
              Kefalonia is generally very safe for solo hiking, especially on popular trails. However, as with any outdoor activity, it's wise to inform someone of your planned route and expected return time. Cell phone coverage is good in most (but not all) areas of the island. For remote or challenging trails, hiking with a companion or guide is recommended.
            </p>
          </div>

          <div className="border border-[var(--olive)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Are there any hiking trails suitable for children near Fiskardo?</h3>
            <p className="text-gray-700">
              Yes, several trails near Fiskardo are perfect for family hiking adventures. The shorter coastal paths, like parts of the Fiskardo Peninsula Loop and the trail to Emblisi Beach, are suitable for children. The beginning portion of the Fiskardo to Dafnoudi Beach trail is also family-friendly, with the option to turn back when little legs get tired. Always ensure children have adequate sun protection and plenty of water.
            </p>
          </div>
        </div>
      </div>

      {/* Related activities */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">More Outdoor Activities to Enjoy in Kefalonia</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/blog/beach-exploration" className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md h-full transition-transform duration-300 group-hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/myrtos.webp"
                  alt="Myrtos Beach in Kefalonia"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Beach Exploration</h3>
                <p className="text-gray-700 mb-4">
                  Discover Kefalonia's stunning beaches, from famous shorelines to hidden coves accessible only by foot or boat.
                </p>
                <span className="text-[var(--olive)] font-medium group-hover:underline">Read more</span>
              </div>
            </div>
          </Link>

          <Link href="#" className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md h-full transition-transform duration-300 group-hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/fiskardo.webp"
                  alt="Boat exploring caves in Kefalonia"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Boat Adventures</h3>
                <p className="text-gray-700 mb-4">
                  Rent a boat to explore Kefalonia's coastline, discover secluded beaches, and visit the famous blue caves.
                </p>
                <span className="text-[var(--olive)] font-medium group-hover:underline">Coming soon</span>
              </div>
            </div>
          </Link>

          <Link href="#" className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md h-full transition-transform duration-300 group-hover:translate-y-[-5px]">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/fiskardo.webp"
                  alt="Traditional village in Kefalonia"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Village Exploration</h3>
                <p className="text-gray-700 mb-4">
                  Visit Kefalonia's picturesque villages to experience local culture, architecture, and authentic Greek cuisine.
                </p>
                <span className="text-[var(--olive)] font-medium group-hover:underline">Coming soon</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HikingTrails;