import { MapPin, Anchor, Ship, Navigation, Sun, Calendar, Compass, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Heading from "../ui/heading";

const IslandCruising = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* SEO-optimized heading structure */}
      <div className="mb-10 text-center">
        <span className="inline-block mb-3 px-4 py-2 bg-[var(--sea-blue)]/10 rounded-full text-[var(--primary-blue)] text-sm font-medium flex items-center justify-center mx-auto">
          <Ship className="mr-1.5 h-4 w-4" />
          Boating & Sailing
        </span>

        <Heading
          title="Exploring Kefalonia's Coast by Boat: Hidden Coves & Sea Caves"
          description="Discover secluded beaches, crystal-clear coves, and breathtaking blue caves with our guide to boating around Kefalonia's stunning coastline."
          centered
        />
      </div>

      {/* Hero image with overlay */}
      <div className="relative h-[60vh] mb-10 rounded-xl overflow-hidden">
        <img
          src="/images/foki.webp"
          alt="Boat cruising along Kefalonia's turquoise waters with view of dramatic coastline and sea caves"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-10 max-w-xl text-white">
          <h2 className="text-3xl font-bold mb-3 playfair">Freedom on the Ionian Sea</h2>
          <p className="text-white/90">Experience Kefalonia from a new perspective with easy boat rentals from Fiskardo harbor</p>
        </div>
      </div>

      {/* Introduction with SEO-rich content */}
      <div className="prose max-w-none mb-12 text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">The Magic of Exploring Kefalonia by Water</h2>

        <p className="mb-4">
          While Kefalonia's landscapes are undeniably beautiful when explored by land, the island reveals its most spectacular treasures when viewed from the sea. The crystalline waters of the Ionian Sea, the hidden caves accessible only by boat, and the secluded beaches nestled between towering cliffs create an unforgettable experience for visitors who venture offshore.
        </p>

        <p className="mb-4">
          From Villa Fiscardo, you're perfectly positioned to embark on maritime adventures. The charming harbor of Fiskardo, just minutes from your accommodation, offers numerous boat rental options suitable for all experience levels. Even if you've never captained a vessel before, the calm waters and easy navigation of the area make this the perfect place to experience the freedom of the sea.
        </p>

        <div className="bg-[var(--sand)]/10 p-6 rounded-lg border border-[var(--sand)]/20 mb-8">
          <h3 className="text-xl font-semibold mb-3 text-[var(--deep-blue)]">Why Boat Rental is the Ultimate Kefalonia Experience</h3>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <Anchor className="h-5 w-5 mr-3 text-[var(--sea-blue)]" />
              <p><strong>Discover hidden gems:</strong> Access secluded beaches and caves inaccessible by land</p>
            </div>
            <div className="flex items-center">
              <Anchor className="h-5 w-5 mr-3 text-[var(--sea-blue)]" />
              <p><strong>Freedom and flexibility:</strong> Create your own itinerary and explore at your own pace</p>
            </div>
            <div className="flex items-center">
              <Anchor className="h-5 w-5 mr-3 text-[var(--sea-blue)]" />
              <p><strong>Unforgettable swimming:</strong> Dive into crystal-clear waters away from the crowds</p>
            </div>
            <div className="flex items-center">
              <Anchor className="h-5 w-5 mr-3 text-[var(--sea-blue)]" />
              <p><strong>Perfect for everyone:</strong> No license required for small motorboats under 30hp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Boat rental information section */}
      <div className="space-y-16 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Renting a Boat in Fiskardo</h2>

        {/* Boat rental options */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Motorboat Rentals (No License Required)</h2>

            <p className="mb-4 text-gray-700">
              The most popular and accessible option for visitors is renting a small motorboat, which doesn't require any special boating license. These boats are perfect for exploring the coastline at a leisurely pace, visiting nearby beaches, and discovering hidden coves along the shore.
            </p>

            <p className="mb-4 text-gray-700">
              Boats with engines up to 30 horsepower can be rented without prior experience, making this a fantastic opportunity for first-time captains to enjoy the freedom of the sea. The rental companies provide comprehensive safety briefings and easy-to-follow instructions before you set out.
            </p>

            <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">What's Included</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Life jackets for all passengers</li>
                <li>Basic navigation instructions and area map</li>
                <li>Anchor and safety equipment</li>
                <li>Sun canopy for shade</li>
                <li>Cooler for drinks and snacks (usually)</li>
                <li>Emergency contact information</li>
              </ul>
            </div>

            <div className="bg-[var(--sand)]/10 p-4 rounded-lg">
              <h3 className="font-semibold text-[var(--deep-blue)] mb-2">Practical Information</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Sun className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Rental period:</strong> Full day (9am-6pm) or half day options</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Sun className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Cost:</strong> €80-120 per day + fuel (approx. €40)</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Sun className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Capacity:</strong> Most boats accommodate 4-6 people</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Sun className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Booking:</strong> Reserve 2-3 days in advance (essential in peak season)</span>
                </div>
              </div>
              <div className="mt-3">
                <a
                  href="https://www.fiscardo.com/boat-rentals/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
                >
                  Browse Fiskardo boat rental options
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
            <img
              src="/images/boat-rental-02.webp"
              alt="Small motorboat rental in Kefalonia's crystal clear waters near hidden beach coves"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Skippered boats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-xl overflow-hidden h-80">
            <img
              src="/images/Rental-Boat-Moraitis-Skipper-NC42-2024-MAIN.webp"
              alt="Skippered boat tour in Kefalonia with experienced local captain showing hidden caves"
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Skippered Boat Tours</h2>

            <p className="mb-4 text-gray-700">
              If you prefer to sit back and enjoy the journey without the responsibility of navigating, skippered boat tours offer a wonderful alternative. With a knowledgeable local captain at the helm, you'll benefit from their expertise and insider knowledge of the best spots along Kefalonia's coast.
            </p>

            <p className="mb-4 text-gray-700">
              These guided excursions often include stops at famous landmarks such as the Blue Caves, secluded beaches, and prime swimming and snorkeling locations. Many tours also include visits to neighboring islands like Ithaca, known as the legendary home of Odysseus.
            </p>

            <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Types of Guided Tours</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Half-day coastal tours:</strong> Perfect for exploring nearby beaches and caves</li>
                <li><strong>Full-day island hopping:</strong> Visit Ithaca or other nearby islands</li>
                <li><strong>Sunset cruises:</strong> Romantic evening voyages with stunning views</li>
                <li><strong>Private charters:</strong> Customized itineraries for your group</li>
                <li><strong>Fishing trips:</strong> Try your hand at traditional fishing methods</li>
              </ul>
            </div>

            <div className="bg-[var(--sand)]/10 p-4 rounded-lg">
              <h3 className="font-semibold text-[var(--deep-blue)] mb-2">Recommended Tour Operators</h3>
              <p className="text-gray-700 mb-3">
                Several reputable companies operate from Fiskardo harbor, offering a range of experiences to suit different preferences and budgets:
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Navigation className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Ionian Discoveries:</strong> Expert guides with extensive knowledge of local history</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Navigation className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Fiskardo Divers:</strong> Combines boat tours with snorkeling opportunities</span>
                </div>
              </div>
              <div className="mt-3">
                <a
                  href="https://www.tripadvisor.com/Attractions-g644214-Activities-c55-Fiskardo_Cephalonia_Ionian_Islands.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
                >
                  View top-rated Fiskardo boat tours
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sailing options */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Sailing Adventures</h2>

            <p className="mb-4 text-gray-700">
              For those with sailing experience or a desire to learn, Kefalonia offers excellent sailing conditions with predictable winds and protected waters. The Ionian Sea is renowned as one of the world's premier sailing destinations, perfect for both beginners and experienced sailors.
            </p>

            <p className="mb-4 text-gray-700">
              Sailing around Kefalonia allows you to experience the island in the most environmentally friendly way, harnessing the power of the wind while enjoying the peace and tranquility that comes with the absence of engine noise. It's a truly magical way to explore the coastline.
            </p>

            <div className="bg-[var(--sea-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Sailing Options</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Bareboat charter:</strong> For experienced sailors with appropriate qualifications</li>
                <li><strong>Skippered yacht charter:</strong> Professional captain but you can get involved</li>
                <li><strong>Sailing lessons:</strong> Learn the basics during your vacation</li>
                <li><strong>Day sailing trips:</strong> Experience sailing without commitment</li>
              </ul>
            </div>

            <div className="bg-[var(--sand)]/10 p-4 rounded-lg">
              <h3 className="font-semibold text-[var(--deep-blue)] mb-2">Planning Your Sailing Adventure</h3>
              <p className="text-gray-700 mb-3">
                Sailing charters typically require more advance planning than day boat rentals. Here's what you need to know:
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Booking:</strong> Reserve 3-6 months ahead for peak season (July-August)</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Duration:</strong> Typically available as week-long charters (Saturday to Saturday)</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Calendar className="h-4 w-4 mr-2 text-[var(--terracotta)]" />
                  <span><strong>Cost:</strong> From €1,500-4,000 per week depending on yacht size and season</span>
                </div>
              </div>
              <div className="mt-3">
                <a
                  href="https://www.sunsail.com/destinations/mediterranean/greece/ionian-islands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
                >
                  Explore sailing charter options
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
            <img
              src="/images/sailing.webp"
              alt="Sailing yacht cruising along Kefalonia's coastline with full sails and blue water"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Must-visit locations by boat */}
      <motion.div
        className="bg-white rounded-xl shadow-md p-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Top Destinations to Explore by Boat</h2>
        <p className="mb-6 text-gray-700">
          With your boat rental from Fiskardo, you'll have access to some of the most beautiful and secluded spots around northern Kefalonia. Here are the must-visit locations that should be on your maritime itinerary:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Blue Caves of Agia Efimia</h3>
            <p className="text-gray-700 mb-3">Spectacular sea caves where the water glows with an ethereal blue light due to the way sunlight reflects off the white seabed. The caves feature impressive rock formations and are perfect for swimming and snorkeling.</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span>East coast, approximately 45 minutes by boat from Fiskardo</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Compass className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Tip:</strong> Visit between 10am-2pm when sunlight creates the most intense blue effect</span>
            </div>
          </div>

          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Dafnoudi Beach</h3>
            <p className="text-gray-700 mb-3">While accessible by land via a forest trail, arriving at Dafnoudi by boat reveals its true beauty. This small pebble cove with crystal-clear turquoise water is surrounded by dramatic white cliffs and sea caves.</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span>Northeast coast, 15 minutes by boat from Fiskardo</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Compass className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Highlight:</strong> Explore the small sea cave on the right side of the beach</span>
            </div>
          </div>

          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Ithaca's East Coast</h3>
            <p className="text-gray-700 mb-3">Cross the narrow channel between Kefalonia and Ithaca to discover the mythical island of Odysseus. The east coast of Ithaca features picturesque fishing villages, secluded beaches, and quiet bays perfect for swimming.</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span>20-30 minutes by boat from Fiskardo to Frikes or Kioni villages</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Compass className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Recommendation:</strong> Stop for lunch at a waterfront taverna in Kioni</span>
            </div>
            <a
              href="https://www.visitgreece.gr/islands/ionian-islands/ithaca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[var(--terracotta)] hover:underline mt-3 text-sm"
            >
              Learn more about Ithaca
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>

          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Alaties Beach & Natural Arch</h3>
            <p className="text-gray-700 mb-3">This small but stunning beach is known for its natural rock arch and salt pans. The emerald waters and unique geology make it one of the most photogenic spots on the island, especially beautiful when approached by boat.</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span>Northwest coast, 25 minutes by boat from Fiskardo</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Compass className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Perfect for:</strong> Sunset visits with incredible photo opportunities</span>
            </div>
          </div>

          <div className="border border-[var(--sand)]/20 rounded-lg p-5 md:col-span-2">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Xi Beach (For Longer Excursions)</h3>
            <p className="text-gray-700 mb-3">For those planning a full day of exploration, the distinctive red sand beach of Xi on Kefalonia's southern coast is worth the journey. The striking contrast between the terra-cotta colored sand and turquoise water creates a unique landscape unlike anywhere else on the island.</p>
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span>Southern peninsula, approximately 3-4 hours by boat from Fiskardo</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Compass className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Note:</strong> This is an ambitious journey - check weather conditions and plan fuel stops</span>
            </div>
            <a
              href="https://www.kefalonia.net/xi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[var(--terracotta)] hover:underline mt-3 text-sm"
            >
              See photos of Xi Beach
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Practical information */}
      <div className="bg-[var(--sand)]/10 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Essential Boating Tips for Kefalonia</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)] flex items-center">
              <Sun className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
              Safety First
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Always wear life jackets, especially children</li>
              <li>Check weather forecasts before departing</li>
              <li>Keep a charged mobile phone in a waterproof case</li>
              <li>Avoid rocky areas and stick to recommended routes</li>
              <li>Never exceed passenger capacity of your boat</li>
              <li>Maintain a safe speed, especially near swimmers</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)] flex items-center">
              <Sun className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
              Navigation & Planning
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Download offline maps or navigation apps</li>
              <li>Calculate fuel needs generously (add 30% buffer)</li>
              <li>Plan your route with wind direction in mind</li>
              <li>Start early to avoid afternoon winds</li>
              <li>Check operating hours for harbor restaurants</li>
              <li>Ask locals about hidden spots and conditions</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-5 shadow-sm">
            <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)] flex items-center">
              <Sun className="h-5 w-5 mr-2 text-[var(--terracotta)]" />
              What to Pack
            </h3>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>High SPF sunscreen (reapply frequently)</li>
              <li>Wide-brimmed hats and sunglasses</li>
              <li>Towels and change of clothes</li>
              <li>Plenty of water and snacks</li>
              <li>Waterproof camera or phone case</li>
              <li>Cash for small harbors and tavernas</li>
              <li>Snorkeling gear to explore underwater</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg mt-6 shadow-sm">
          <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)]">Understanding Kefalonia's Weather Patterns</h3>
          <p className="text-gray-700 mb-4">
            The Ionian Sea around Kefalonia typically offers calm morning conditions, with thermal winds picking up in the afternoon. This predictable pattern makes morning departures ideal, especially for less experienced boaters.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-[var(--terracotta)] mb-2">Summer Conditions (June-September)</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Morning (6am-11am):</strong> Usually calm, perfect for departure</li>
                <li><strong>Midday/Afternoon (12pm-5pm):</strong> Northwest winds 2-4 Beaufort</li>
                <li><strong>Evening (after 6pm):</strong> Winds typically die down</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[var(--terracotta)] mb-2">Best Months for Boating</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>May & October:</strong> Less crowded, generally calm seas</li>
                <li><strong>June & September:</strong> Perfect balance of weather and water temperature</li>
                <li><strong>July & August:</strong> Warmest water but busier harbors and stronger afternoon winds</li>
              </ul>
            </div>
          </div>
          <a
            href="https://www.windy.com/?38.458,20.576,9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[var(--terracotta)] hover:underline mt-4 text-sm"
          >
            Check Kefalonia wind forecasts
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </div>

      {/* Island hopping section */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Day Trip to Ithaca: Following Odysseus' Path</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <p className="mb-4 text-gray-700">
              One of the most rewarding boat excursions from Fiskardo is a day trip to the neighboring island of Ithaca. Separated from Kefalonia by a narrow channel of just 2-3 kilometers, Ithaca is steeped in mythology as the legendary home of Odysseus, hero of Homer's epic poem "The Odyssey."
            </p>

            <p className="mb-4 text-gray-700">
              The journey across the strait takes approximately 20-30 minutes, making it perfect for a day trip. Once there, you'll discover an island that feels like a step back in time, with picturesque fishing villages, traditional architecture, and a pace of life that invites relaxation and exploration.
            </p>

            <div className="bg-[var(--sea-blue)]/5 p-5 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-3">Highlights of Ithaca by Boat</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Anchor className="h-5 w-5 mr-2 text-[var(--sea-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Kioni Village:</span> Perhaps Ithaca's most picturesque harbor, with colorful houses cascading down to a horseshoe bay. Several excellent tavernas line the waterfront, perfect for a leisurely lunch.
                  </div>
                </li>
                <li className="flex items-start">
                  <Anchor className="h-5 w-5 mr-2 text-[var(--sea-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Frikes:</span> A charming fishing village with several tavernas and a relaxed atmosphere. The harbor offers good protection and convenient mooring for visiting boats.
                  </div>
                </li>
                <li className="flex items-start">
                  <Anchor className="h-5 w-5 mr-2 text-[var(--sea-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Gidaki Beach:</span> Only accessible by boat or a long hiking trail, this stunning beach offers crystal-clear waters and white pebbles in a dramatic setting beneath towering cliffs.
                  </div>
                </li>
                <li className="flex items-start">
                  <Anchor className="h-5 w-5 mr-2 text-[var(--sea-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Agios Ioannis Beach:</span> A beautiful secluded bay with turquoise waters, often with few other visitors even in peak season.
                  </div>
                </li>
              </ul>
            </div>
            <a
              href="https://www.greeka.com/ionian/ithaca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Discover more about Ithaca
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <img
              src="/images/ithaca.webp"
              alt="Colorful fishing village of Kioni in Ithaca with boats moored in the harbor"
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Planning Your Ithaca Day Trip</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                <li>Depart Fiskardo early (before 10am)</li>
                <li>Check weather – the channel can be windy</li>
                <li>Bring passport if stopping at a port</li>
                <li>Reserve a restaurant table in advance during peak season</li>
                <li>Allow 5-6 hours for a satisfying visit</li>
              </ul>
              <p className="text-sm text-gray-600"><strong>Distance:</strong> 2-3km from Fiskardo to Ithaca's northeast coast</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Suggested itineraries */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair text-center">Perfect Boating Itineraries</h2>
        <p className="text-center text-gray-700 mb-8">Make the most of your boat rental with these carefully crafted routes</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-[var(--sea-blue)] text-white p-4 text-center">
              <h3 className="font-bold text-xl">Half-Day Adventure (4-5 hours)</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">1</span>
                  <div>
                    <span className="font-medium">Depart Fiskardo Harbor</span> (9:00 AM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">2</span>
                  <div>
                    <span className="font-medium">Foki Beach</span> - First swimming stop in a protected cove (9:15 AM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">3</span>
                  <div>
                    <span className="font-medium">Dafnoudi Beach</span> - Explore sea caves and enjoy crystal waters (10:30 AM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">4</span>
                  <div>
                    <span className="font-medium">Emblisi Beach</span> - Snorkeling and lunch from packed provisions (12:00 PM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">5</span>
                  <div>
                    <span className="font-medium">Return to Fiskardo</span> - Before afternoon winds pick up (1:30 PM)
                  </div>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4"><strong>Perfect for:</strong> Beginners or those with limited time</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-[var(--primary-blue)] text-white p-4 text-center">
              <h3 className="font-bold text-xl">Full-Day Coastal Exploration (8-9 hours)</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">1</span>
                  <div>
                    <span className="font-medium">Depart Fiskardo Harbor</span> (8:30 AM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">2</span>
                  <div>
                    <span className="font-medium">Jerusalem Beach</span> - Secluded morning swim (9:30 AM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">3</span>
                  <div>
                    <span className="font-medium">Alaties Beach</span> - Explore natural rock formations (11:00 AM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">4</span>
                  <div>
                    <span className="font-medium">Assos Village</span> - Lunch at harborside taverna (1:00 PM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">5</span>
                  <div>
                    <span className="font-medium">Multiple swimming stops</span> - Explore hidden coves (3:00-5:00 PM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">6</span>
                  <div>
                    <span className="font-medium">Return to Fiskardo</span> - As evening approaches (5:30 PM)
                  </div>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4"><strong>Perfect for:</strong> Those comfortable with longer journeys</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-[var(--terracotta)] text-white p-4 text-center">
              <h3 className="font-bold text-xl">Ithaca Island Hopping (Full Day)</h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">1</span>
                  <div>
                    <span className="font-medium">Early departure from Fiskardo</span> (8:00 AM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">2</span>
                  <div>
                    <span className="font-medium">Cross to Ithaca</span> - Morning calm waters (8:30 AM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">3</span>
                  <div>
                    <span className="font-medium">Gidaki Beach</span> - Swimming in pristine waters (9:30 AM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">4</span>
                  <div>
                    <span className="font-medium">Kioni Village</span> - Lunch and village exploration (12:30 PM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">5</span>
                  <div>
                    <span className="font-medium">Frikes Village</span> - Coffee stop and swimming (3:00 PM)
                  </div>
                </li>
                <li className="flex">
                  <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">6</span>
                  <div>
                    <span className="font-medium">Return to Fiskardo</span> - Cross channel before evening (5:00 PM)
                  </div>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4"><strong>Perfect for:</strong> Adventurous travelers seeking cultural experiences</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-[var(--deep-blue)] text-white rounded-xl p-8 text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 playfair">Ready to Set Sail from Villa Fiscardo?</h2>
        <p className="mb-6 text-white/80 max-w-2xl mx-auto">
          Stay at our traditional Kefalonian villa and enjoy easy access to Fiskardo harbor, where unforgettable maritime adventures await. Our prime location means you're just minutes away from embarking on the boating experience of a lifetime.
        </p>
        <a
          href="/booking"
          className="inline-block bg-white text-[var(--deep-blue)] font-semibold px-8 py-3 rounded-full hover:bg-[var(--sand)] transition-colors duration-300"
        >
          Book Your Stay & Set Sail
        </a>
      </div>

      {/* FAQ section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Frequently Asked Questions About Boating in Kefalonia</h2>

        <div className="space-y-4">
          <div className="border border-[var(--sand)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Do I need a license to rent a boat in Kefalonia?</h3>
            <p className="text-gray-700">
              For small motorboats with engines up to 30 horsepower, no boating license is typically required in Greece. These boats are limited to a speed of about 25-30 km/h and must stay within 6 nautical miles of the coast. For more powerful boats or sailing yachts, an appropriate license is generally necessary. The rental companies will provide safety instructions and a brief orientation regardless of whether a license is required. Always confirm the specific requirements with your chosen rental company, as regulations may change.
            </p>
          </div>

          <div className="border border-[var(--sand)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">How much does it cost to rent a boat for a day in Fiskardo?</h3>
            <p className="text-gray-700">
              In 2025, the approximate cost for a small motorboat (5-6 person capacity with 15-30hp engine) ranges from €80-120 per day, plus fuel which typically adds around €30-50 depending on your journey. Skippered boat tours start from about €150 per person for a full day tour, or €300-600 for a private boat with captain. Prices vary by season, with July and August commanding premium rates. Most companies offer discounts for multi-day rentals. Additional costs may include mooring fees if you visit other harbors (€5-10) and a security deposit (typically €150-300) which is refundable upon safe return.
            </p>
          </div>

          <div className="border border-[var(--sand)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Is it safe to navigate around Kefalonia for beginners?</h3>
            <p className="text-gray-700">
              The waters around northern Kefalonia are generally considered excellent for beginners, especially in the morning when the sea is typically calm. The coastline is clear with good visibility, and navigation between points is relatively straightforward. Rental companies provide detailed maps and instructions, often marking recommended routes and areas to avoid. Mobile phone coverage is good around the coast, providing an additional safety net. However, beginners should stay closer to shore, keep an eye on weather conditions, and return to port if winds pick up in the afternoon. The area between Fiskardo and nearby beaches is particularly beginner-friendly.
            </p>
          </div>

          <div className="border border-[var(--sand)]/30 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">What's the best time of year for boating around Kefalonia?</h3>
            <p className="text-gray-700">
              The boating season in Kefalonia runs from May to October, with June and September offering the ideal balance of warm temperatures, calm seas, and fewer crowds. During July and August, the water is warmest (25-27°C) but harbors are busier and afternoon winds can be stronger. May and October offer peaceful exploration with comfortable temperatures (sea typically 20-23°C), though some facilities in smaller harbors might have limited hours. For wildlife enthusiasts, spring months may offer opportunities to spot dolphins and even the rare Mediterranean monk seal. The morning hours (before noon) generally offer the calmest conditions regardless of the month you visit.
            </p>
          </div>
        </div>
      </div>

      {/* Related experiences */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair text-center">Explore More Kefalonia Experiences</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/blog/beach-exploration" className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/ftekari1.webp"
                  alt="Hidden beach accessible only by boat in Kefalonia"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Beach Exploration</h3>
                <p className="text-gray-700 text-sm">Discover Kefalonia's most pristine and secluded coves</p>
              </div>
            </div>
          </Link>

          <Link href="/blog/sunset-magic" className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/DJI_0798.webp"
                  alt="Spectacular sunset viewed from a boat off the coast of Kefalonia"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Sunset Magic</h3>
                <p className="text-gray-700 text-sm">Experience the golden hour magic from the deck of a boat</p>
              </div>
            </div>
          </Link>

          <Link href="/blog/culinary-delights" className="block group">
            <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
              <div className="h-48 overflow-hidden">
                <img
                  src="/images/fiskardo.webp"
                  alt="Seaside taverna in Kefalonia serving fresh seafood"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Culinary Delights</h3>
                <p className="text-gray-700 text-sm">Combine your cruising with stops at authentic seaside tavernas</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Structured data for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: `
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "Exploring Kefalonia's Coast by Boat: Hidden Coves & Sea Caves",
          "image": "https://villafiscardo.com/images/DJI_0722.jpg",
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
          "datePublished": "2023-04-20",
          "dateModified": "2023-12-15",
          "description": "Discover secluded beaches, crystal-clear coves, and breathtaking blue caves with our guide to boating around Kefalonia's stunning coastline.",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://villafiscardo.com/blog/island-cruising"
          }
        }
      `}} />
    </div>
  );
};

export default IslandCruising;