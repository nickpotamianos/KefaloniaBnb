import { MapPin, Anchor, Umbrella, Navigation, Sun, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Heading } from "../ui/heading";
import { Helmet } from "react-helmet-async";
import { Link } from "wouter";

const BeachExploration = () => {
  return (
    <>
      <Helmet>
        <title>Best Beaches in Kefalonia | Complete Guide to Fiscardo Area Beaches | Villa Fiscardo</title>
        <meta name="description" content="Discover Kefalonia's most stunning beaches near Fiscardo including Myrtos, Antisamos, and hidden coves. Complete guide with insider tips from Villa Fiscardo." />
        <meta name="keywords" content="Kefalonia beaches, Fiscardo beaches, Myrtos beach, Antisamos beach, best beaches Kefalonia, Fiskardo beach guide, Villa Fiscardo" />
        <link rel="canonical" href="https://villafiscardo.com/blog/beach-exploration" />

        {/* Open Graph */}
        <meta property="og:title" content="Best Beaches in Kefalonia | Complete Guide to Fiscardo Area" />
        <meta property="og:description" content="Discover Kefalonia's most stunning beaches near Fiscardo including Myrtos, Antisamos, and hidden coves with insider tips." />
        <meta property="og:image" content="https://villafiscardo.com/images/myrtos2.jpg" />
        <meta property="og:url" content="https://villafiscardo.com/blog/beach-exploration" />
        <meta property="og:type" content="article" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Beaches in Kefalonia | Complete Guide" />
        <meta name="twitter:description" content="Discover Kefalonia's most stunning beaches near Fiscardo with insider tips from Villa Fiscardo." />
        <meta name="twitter:image" content="https://villafiscardo.com/images/myrtos2.jpg" />

        {/* Article schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "Kefalonia's Breathtaking Beaches: A Complete Guide to Fiscardo Area",
              "image": "https://villafiscardo.com/images/myrtos2.jpg",
              "author": {
                "@type": "Person",
                "name": "Villa Fiscardo Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Villa Fiscardo",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://villafiscardo.com/images/logokef1.webp"
                }
              },
              "datePublished": "2024-01-15",
              "dateModified": "2025-04-30",
              "description": "Discover the most stunning beaches near Fiscardo and throughout Kefalonia with our insider's guide to the island's coastal treasures.",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://villafiscardo.com/blog/beach-exploration"
              },
              "keywords": "Kefalonia beaches, Fiscardo beaches, Myrtos beach, Antisamos beach, Greek island beaches"
            }
          `}
        </script>
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* SEO-optimized heading structure */}
        <div className="mb-10 text-center">
          <span className="inline-block mb-3 px-4 py-2 bg-[var(--sea-blue)]/10 rounded-full text-[var(--primary-blue)] text-sm font-medium flex items-center justify-center mx-auto">
            <Umbrella className="mr-1.5 h-4 w-4" />
            Best Beaches in Kefalonia
          </span>

          <Heading
            title="Kefalonia's Breathtaking Beaches: A Complete Guide"
            description="Discover the most stunning beaches near Fiskardo and throughout Kefalonia with our insider's guide to the island's coastal treasures."
            centered
          />
        </div>

        {/* Hero image with overlay */}
        <div className="relative h-[60vh] mb-10 rounded-xl overflow-hidden">
          <img
            src="/images/myrtos2.webp"
            alt="Myrtos Beach in Kefalonia with turquoise waters and white sand"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-10 left-10 max-w-xl text-white">
            <h2 className="text-3xl font-bold mb-3 playfair">Myrtos Beach</h2>
            <p className="text-white/90">One of Greece's most photographed beaches and just a 20-minute drive from Villa Fiscardo</p>
          </div>
        </div>

        {/* Introduction with SEO-rich content */}
        <div className="prose max-w-none mb-12 text-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Explore Kefalonia's Pristine Coastline</h2>

          <p className="mb-4">
            Kefalonia, the largest of the Ionian Islands, is renowned for having some of the most spectacular beaches in all of Greece. From our traditional villa in the charming north of the island, you'll have easy access to both world-famous beaches and hidden coastal gems that many tourists never discover.
          </p>

          <p className="mb-4">
            Whether you're seeking dramatic landscapes, family-friendly swimming spots, or secluded coves for private relaxation, our local guide to Kefalonia's beaches will help you discover your perfect seaside escape during your stay at Villa Fiscardo.
          </p>

          <div className="bg-[var(--sand)]/10 p-6 rounded-lg border border-[var(--sand)]/20 mb-8">
            <h3 className="text-xl font-semibold mb-3 text-[var(--deep-blue)]">Best Time for Beach Exploration in Kefalonia</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
                <p><strong>May-June:</strong> Warm weather, uncrowded beaches, perfect for exploration</p>
              </div>
              <div className="flex items-center">
                <Sun className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
                <p><strong>July-August:</strong> Peak season with hottest temperatures, ideal for swimming</p>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
                <p><strong>September-October:</strong> Pleasant warmth, quieter beaches, clearest water for snorkeling</p>
              </div>
            </div>
          </div>
        </div>

        {/* Beach sections with alternating layouts */}
        <div className="space-y-16 mb-16">
          {/* Myrtos Beach */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Myrtos Beach</h2>
              <div className="flex items-center mb-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>20 minutes drive from Villa Fiscardo</span>
              </div>

              <p className="mb-4 text-gray-700">
                Often ranked among Greece's top beaches, Myrtos Beach is a breathtaking crescent of white pebbles set against dramatic limestone cliffs. The intense blue waters range from deep cobalt to vibrant turquoise, creating the iconic view featured on countless Kefalonia postcards.
              </p>

              <p className="mb-4 text-gray-700">
                The steep descent to the beach offers increasingly spectacular views, making even the journey there a memorable experience. Once on the beach, you'll find basic amenities including sunbeds and umbrellas for rent, along with a small canteen during high season.
              </p>

              <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Insider Tips</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Visit in the morning for the best light for photographs</li>
                  <li>The beach can get crowded in July and August - arrive early</li>
                  <li>Strong currents can develop - be cautious when swimming</li>
                  <li>Bring water shoes as the white pebbles can get hot in summer</li>
                </ul>
              </div>
            </div>

            <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
              <img
                src="/images/myrtos.webp"
                alt="Aerial view of Myrtos Beach in Kefalonia showing white sand and bright blue water"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Foki Beach */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-xl overflow-hidden h-80">
              <img
                src="/images/foki.webp"
                alt="Foki Beach near Fiskardo, Kefalonia with crystal clear water and surrounding pine trees"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Foki Beach</h2>
              <div className="flex items-center mb-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>6 minutes drive from Villa Fiscardo</span>
              </div>

              <p className="mb-4 text-gray-700">
                This picturesque small pebble cove is one of the closest beaches to our Villa Fiscardo. Nestled within a natural inlet and framed by cypress and olive trees, Foki Beach offers crystal-clear, calm waters perfect for swimming and snorkeling.
              </p>

              <p className="mb-4 text-gray-700">
                What makes Foki special is the peaceful atmosphere and beautiful surroundings. The beach gets its name from the Mediterranean monk seals (φώκια, "fókia" in Greek) that sometimes visit the sea caves nearby, though these endangered creatures are rarely spotted.
              </p>

              <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Why We Love It</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Natural shade from olive trees - perfect for afternoon visits</li>
                  <li>Excellent snorkeling around the sides of the cove</li>
                  <li>Nearby taverna serving fresh seafood</li>
                  <li>One of the best beaches in North Kefalonia for families</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Emblisi Beach */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Emblisi Beach</h2>
              <div className="flex items-center mb-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>6 minutes drive from Villa Fiscardo</span>
              </div>

              <p className="mb-4 text-gray-700">
                Just a short distance from Fiskardo harbor, Emblisi Beach is a beautiful natural inlet with crystal-clear turquoise waters. The beach features smooth white pebbles and flat rock platforms perfect for sunbathing and easy water access.
              </p>

              <p className="mb-4 text-gray-700">
                Popular with both locals and visitors, Emblisi offers excellent swimming conditions in a picturesque setting. The surrounding rock formations create natural pools and interesting spots to explore, making it ideal for snorkeling enthusiasts.
              </p>

              <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Perfect For</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Relaxed swimming in calm, shallow waters</li>
                  <li>Snorkeling along the rocky edges</li>
                  <li>Easy access - parking available nearby</li>
                  <li>Quick beach trips when staying near Fiskardo</li>
                </ul>
              </div>
            </div>

            <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
              <img
                src="/images/emplisi.webp"
                alt="Emblisi Beach near Fiskardo with clear turquoise waters"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Antisamos Beach */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-xl overflow-hidden h-80">
              <img
                src="/images/antisamos.webp"
                alt="Antisamos Beach in Kefalonia with emerald waters and lush green surroundings"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Antisamos Beach</h2>
              <div className="flex items-center mb-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>38 minutes drive from Villa Fiscardo</span>
              </div>

              <p className="mb-4 text-gray-700">
                Featured in the Hollywood film "Captain Corelli's Mandolin," Antisamos is one of Kefalonia's most beautiful organized beaches. This stunning pebble beach is set against a backdrop of lush green hills and features striking turquoise waters.
              </p>

              <p className="mb-4 text-gray-700">
                While a bit farther from our villa, the drive to Antisamos takes you through some of the most scenic parts of the island, making the journey itself worthwhile. The beach offers excellent facilities including sunbeds, umbrellas, water sports, and beachside cafes.
              </p>

              <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Worth the Drive</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>One of the most photogenic beaches on the island</li>
                  <li>Excellent facilities for a full day visit</li>
                  <li>Watersports available including paddleboarding and kayaking</li>
                  <li>Beach bars serving food and refreshments</li>
                </ul>
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
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Hidden Gems: Kefalonia's Secret Beaches</h2>
          <p className="mb-6 text-gray-700">
            Beyond the famous beaches, Kefalonia offers several hidden coves and secluded beaches that reward the adventurous traveler. Here are some lesser-known spots that provide a more authentic and private experience:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Dafnoudi Beach</h3>
              <p className="text-gray-700 mb-3">A secluded pebble cove reached via a scenic 15-minute walk through a cypress forest. The effort required to reach it means it's never crowded.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>10 minutes drive + 15 minute walk from Villa Fiscardo</span>
              </div>
            </div>

            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Kimilia Beach</h3>
              <p className="text-gray-700 mb-3">A hidden gem with crystal waters, accessible via a walking path from Fiskardo or by boat. Perfect for those seeking tranquility.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>7 minutes drive + 20 minute walk from Villa Fiscardo</span>
              </div>
            </div>

            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Alaties Beach</h3>
              <p className="text-gray-700 mb-3">A tiny but picturesque pebble beach with natural salt pans and remarkable sunset views. Has a lovely taverna overlooking the sea.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>15 minutes drive from Villa Fiscardo</span>
              </div>
            </div>

            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Agia Jerusalem Beach</h3>
              <p className="text-gray-700 mb-3">A remote and unspoiled beach on the western side of Kefalonia, featuring dramatic sea caves and impressive rock formations.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>45 minutes drive from Villa Fiscardo</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Practical information */}
        <div className="bg-[var(--sand)]/10 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Beach Essentials: What to Bring</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)] flex items-center">
                <Umbrella className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
                Beach Gear
              </h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Water shoes (for pebble beaches)</li>
                <li>Snorkeling equipment</li>
                <li>Beach umbrella (if visiting unorganized beaches)</li>
                <li>Portable beach chair</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)] flex items-center">
                <Sun className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
                Sun Protection
              </h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>High SPF sunscreen</li>
                <li>Hat and sunglasses</li>
                <li>Light cover-up clothing</li>
                <li>Beach umbrella (for shade)</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-5 shadow-sm">
              <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)] flex items-center">
                <Anchor className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
                Extras
              </h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Insulated water bottle</li>
                <li>Waterproof phone case</li>
                <li>Small cooler for drinks and snacks</li>
                <li>Cash for beach bars (not all accept cards)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Beach by boat section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Exploring Kefalonia's Beaches by Boat</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <p className="mb-4 text-gray-700">
                One of the best ways to experience Kefalonia's coastline is by boat. The northern part of the island near Fiskardo is particularly well-suited for boat exploration, with numerous secluded coves and beaches that are difficult or impossible to reach by land.
              </p>

              <p className="mb-4 text-gray-700">
                From Fiskardo harbor, you can rent motorboats that don't require a license, making this adventure accessible to everyone. A boat allows you to discover your own private swimming spots, visit the famous blue caves, and even take a day trip to neighboring Ithaca.
              </p>

              <div className="bg-[var(--sea-blue)]/5 p-5 rounded-lg mb-4">
                <h3 className="font-semibold text-[var(--primary-blue)] mb-3">Recommended Boat Rentals in Fiskardo</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <Navigation className="h-5 w-5 mr-2 text-[var(--terracotta)] mt-0.5" />
                    <div>
                      <span className="font-medium">Fiskardo Boat Rentals</span> - Reliable service with well-maintained boats at reasonable prices
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Navigation className="h-5 w-5 mr-2 text-[var(--terracotta)] mt-0.5" />
                    <div>
                      <span className="font-medium">Fiscardo Waterfront</span> - Excellent quality boats with comprehensive safety equipment
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <img
                src="/images/rent.webp"
                alt="Aerial view of boat exploring Kefalonia's coastline"
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Boat Trip Highlights</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                  <li>Blue caves of Agia Efimia</li>
                  <li>Secluded beaches near Fiskardo</li>
                  <li>Day trip to Ithaca</li>
                  <li>Swimming in crystal-clear waters</li>
                </ul>
                <p className="text-sm text-gray-600"><strong>Average Cost:</strong> €80-120 per day plus fuel</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Beach-focused itinerary */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair text-center">Perfect 3-Day Beach Itinerary</h2>
          <p className="text-center text-gray-700 mb-8">Make the most of your stay at Villa Fiscardo with this beach-focused itinerary</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[var(--sea-blue)] text-white p-4 text-center">
                <h3 className="font-bold text-xl">Day 1: Local Treasures</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">M</span>
                    <div>
                      <span className="font-medium">Morning:</span> Visit Foki Beach for a calm swim and snorkeling
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">A</span>
                    <div>
                      <span className="font-medium">Afternoon:</span> Lunch at Foki Taverna, then explore Emblisi Beach
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">E</span>
                    <div>
                      <span className="font-medium">Evening:</span> Sunset walk around Fiskardo harbor
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[var(--olive)] text-white p-4 text-center">
                <h3 className="font-bold text-xl">Day 2: Famous Beaches</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">M</span>
                    <div>
                      <span className="font-medium">Morning:</span> Early visit to Myrtos Beach when light is perfect
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">A</span>
                    <div>
                      <span className="font-medium">Afternoon:</span> Drive to Antisamos Beach for swimming and lunch
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">E</span>
                    <div>
                      <span className="font-medium">Evening:</span> Sunset at Alaties Beach with dinner at the taverna
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[var(--terracotta)] text-white p-4 text-center">
                <h3 className="font-bold text-xl">Day 3: Hidden Gems</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">M</span>
                    <div>
                      <span className="font-medium">Morning:</span> Hike to Dafnoudi Beach through cypress forest
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">A</span>
                    <div>
                      <span className="font-medium">Afternoon:</span> Rent a boat to discover hidden coves near Fiskardo
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">E</span>
                    <div>
                      <span className="font-medium">Evening:</span> Return to favorite beach for final sunset swim
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-[var(--deep-blue)] text-white rounded-xl p-8 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 playfair">Ready to Explore Kefalonia's Beaches?</h2>
          <p className="mb-6 text-white/80 max-w-2xl mx-auto">
            Stay at our traditional Kefalonian villa in Fiskardo and enjoy easy access to all these stunning beaches and more. Our beautifully restored 100-year-old home offers the perfect base for your beach exploration adventures.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-white text-[var(--deep-blue)] font-semibold px-8 py-3 rounded-full hover:bg-[var(--sand)] transition-colors duration-300"
          >
            Book Your Beach Getaway
          </Link>
        </div>

        {/* FAQ section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Frequently Asked Questions About Kefalonia's Beaches</h2>

          <div className="space-y-4">
            <div className="border border-[var(--sand)]/30 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Which beach in Kefalonia has the best sand?</h3>
              <p className="text-gray-700">
                While most of Kefalonia's beaches are pebble or shingle, Skala Beach and Lourdas Beach in the south have sandy shores. For the classic white pebble beaches with the most stunning water colors, Myrtos Beach and Antisamos are unbeatable.
              </p>
            </div>

            <div className="border border-[var(--sand)]/30 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Are Kefalonia's beaches good for children?</h3>
              <p className="text-gray-700">
                Several beaches near our villa are excellent for families with children. Foki Beach has shallow entry and calm waters, while Emblisi also offers safe swimming conditions. When staying in north Kefalonia, these are the most convenient family-friendly options.
              </p>
            </div>

            <div className="border border-[var(--sand)]/30 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">What is the water temperature like in Kefalonia?</h3>
              <p className="text-gray-700">
                The Ionian Sea around Kefalonia is wonderfully warm during summer months. Water temperatures typically range from 75°F (24°C) in June to 79°F (26°C) in August, making it perfect for extended swimming sessions. May and October still offer comfortable swimming with temperatures around a refreshing 72°F (22°C).
              </p>
            </div>

            <div className="border border-[var(--sand)]/30 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Do I need water shoes for Kefalonia beaches?</h3>
              <p className="text-gray-700">
                Water shoes are highly recommended for most beaches in Kefalonia as they are primarily pebble beaches rather than sand. They make walking on the pebbles more comfortable and protect your feet from sea urchins when swimming or snorkeling around rocky areas.
              </p>
            </div>
          </div>
        </div>

        {/* Related experiences */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair text-center">Explore More Kefalonia Experiences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/culinary-delights" className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src="/images/fiskardo.webp"
                    alt="Traditional Greek taverna in Fiskardo with sea view"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Culinary Delights</h3>
                  <p className="text-gray-700 text-sm">Discover authentic Kefalonian cuisine at family-run tavernas around the island</p>
                </div>
              </div>
            </Link>

            <Link href="/blog/island-cruising" className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src="/images/DJI_0722.webp"
                    alt="Boat exploring the coast of Kefalonia with blue waters"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Island Cruising</h3>
                  <p className="text-gray-700 text-sm">Explore hidden sea caves, crystal-clear coves, and take day trips to nearby islands</p>
                </div>
              </div>
            </Link>

            <Link href="/blog/wine-tasting" className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src="/images/Robola.webp"
                    alt="Vineyard in Kefalonia with mountains in background"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Wine Tasting</h3>
                  <p className="text-gray-700 text-sm">Sample the distinctive Robola wine and learn about local winemaking traditions</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BeachExploration;