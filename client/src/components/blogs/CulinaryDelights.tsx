import { MapPin, Utensils, Star, Clock, Wine, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Heading } from "../ui/heading";
import { Helmet } from "react-helmet-async";

const CulinaryDelights = () => {
  return (
    <>
      <Helmet>
        <title>Kefalonia Food Guide | Best Restaurants & Tavernas in Fiscardo | Villa Fiscardo</title>
        <meta name="description" content="Discover authentic Kefalonian cuisine, traditional tavernas, and gourmet restaurants near Fiscardo. Complete food guide from Villa Fiscardo with insider recommendations." />
        <meta name="keywords" content="Kefalonia restaurants, Fiscardo tavernas, Greek food Kefalonia, traditional cuisine Kefalonia, best restaurants Fiscardo, Villa Fiscardo dining guide" />
        <link rel="canonical" href="https://villafiscardo.com/blog/culinary-delights" />

        {/* Open Graph */}
        <meta property="og:title" content="Kefalonia Food Guide | Best Restaurants in Fiscardo" />
        <meta property="og:description" content="Discover authentic Kefalonian cuisine and the best restaurants near Fiscardo with insider recommendations from Villa Fiscardo." />
        <meta property="og:image" content="https://villafiscardo.com/images/fiskardo.jpeg" />
        <meta property="og:url" content="https://villafiscardo.com/blog/culinary-delights" />
        <meta property="og:type" content="article" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kefalonia Food Guide | Best Restaurants in Fiscardo" />
        <meta name="twitter:description" content="Discover authentic Kefalonian cuisine and traditional tavernas with insider tips from Villa Fiscardo." />
        <meta name="twitter:image" content="https://villafiscardo.com/images/fiskardo.jpeg" />
      </Helmet>

      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* SEO-optimized heading structure */}
        <div className="mb-10 text-center">
          <span className="inline-block mb-3 px-4 py-2 bg-[var(--olive)]/10 rounded-full text-[var(--olive)] text-sm font-medium flex items-center justify-center mx-auto">
            <Utensils className="mr-1.5 h-4 w-4" />
            Traditional Cuisine
          </span>

          <Heading
            title="Authentic Kefalonian Cuisine: A Food Lover's Guide"
            description="Savor the distinctive flavors of Kefalonia, from fresh seafood and local specialties to award-winning wines and traditional dishes."
            centered
          />
        </div>

        {/* Hero image with overlay */}
        <div className="relative h-[60vh] mb-10 rounded-xl overflow-hidden">
          <img
            src="/images/fiskardo.webp"
            alt="Traditional Greek taverna in Fiskardo with seafood and harbor views"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-10 left-10 max-w-xl text-white">
            <h2 className="text-3xl font-bold mb-3 playfair">Taste the Ionian Islands</h2>
            <p className="text-white/90">Discover centuries-old recipes and the freshest Mediterranean ingredients in every bite</p>
          </div>
        </div>

        {/* Introduction with SEO-rich content */}
        <div className="prose max-w-none mb-12 text-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Discover Kefalonia Through Its Cuisine</h2>

          <p className="mb-4">
            The island of Kefalonia offers more than just stunning landscapes and crystal-clear waters—it's a true culinary paradise where centuries of diverse cultural influences have created a unique gastronomic identity. From the Venetians who ruled for nearly 300 years to more recent Greek traditions, the island's food tells a story of its rich history and agricultural abundance.
          </p>

          <p className="mb-4">
            What makes Kefalonian cuisine special is its emphasis on simple, high-quality local ingredients that transform humble dishes into memorable meals. The island's fertile soil produces exceptional olive oil, honey, fruits, and vegetables, while its waters provide an abundance of fresh seafood. Meanwhile, the mountainous interior is home to free-ranging livestock that contributes to distinctive cheeses and meat dishes.
          </p>

          <div className="bg-[var(--sand)]/10 p-6 rounded-lg border border-[var(--sand)]/20 mb-8">
            <h3 className="text-xl font-semibold mb-3 text-[var(--deep-blue)]">Kefalonian Culinary Highlights</h3>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center">
                <Utensils className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
                <p><strong>Fresh seafood:</strong> Caught daily and simply prepared to highlight natural flavors</p>
              </div>
              <div className="flex items-center">
                <Utensils className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
                <p><strong>Robola wine:</strong> The island's signature white wine with protected designation of origin</p>
              </div>
              <div className="flex items-center">
                <Utensils className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
                <p><strong>Kefalonian meat pie (Kreatopita):</strong> A savory pastry with centuries of tradition</p>
              </div>
              <div className="flex items-center">
                <Utensils className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
                <p><strong>Local cheeses:</strong> Including the unique soft cheese "Pretza" found only on the island</p>
              </div>
            </div>
          </div>
        </div>

        {/* Restaurants section */}
        <div className="space-y-16 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Exceptional Dining Near Villa Fiscardo</h2>

          {/* Tassia's Restaurant */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Tassia's Restaurant</h2>
              <div className="flex items-center mb-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>Fiskardo Harbor | 5 minutes drive from Villa Fiscardo</span>
              </div>

              <p className="mb-4 text-gray-700">
                Led by renowned chef Tassia Dendrinou, who has authored several cookbooks on Kefalonian cuisine, this harbor-front restaurant is an institution on the island. For over 30 years, Tassia has been serving authentic local recipes with creative modern touches, using ingredients from her own garden and the surrounding seas.
              </p>

              <p className="mb-4 text-gray-700">
                The restaurant's beautiful terrace overlooks Fiskardo's picturesque harbor, creating a magical setting for dinner as the lights of the village reflect on the water. Inside, the walls are adorned with photographs documenting the island's culinary history and Tassia's family heritage.
              </p>

              <div className="bg-[var(--primary-blue)]/5 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Signature Dishes</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li><strong>Octopus with Ouzo and Honey</strong> - A perfect balance of sweet and savory</li>
                  <li><strong>Kefalonian Meat Pie</strong> - An authentic recipe passed down through generations</li>
                  <li><strong>Bourdeto</strong> - Spicy fish stew with red peppers, a specialty of the Ionian islands</li>
                  <li><strong>Tsigaridia</strong> - Wild greens sautéed with local olive oil and lemon</li>
                </ul>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Star className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span className="font-medium">Price range:</span> <span className="ml-1">€€-€€€ (Moderate to High)</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Clock className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span><strong>Best time to visit:</strong> Early evening to catch the sunset over the harbor</span>
              </div>

              <a
                href="https://www.tassias.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
              >
                Visit Tassia's website
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>

            <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
              <img
                src="/images/tasia.webp"
                alt="Tassia's restaurant with harbor views in Fiskardo serving authentic Kefalonian cuisine"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Odysseas Taverna */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-xl overflow-hidden h-80">
              <img
                src="/images/odysseas.webp"
                alt="Odysseas Traditional Taverna with mountainside views and garden seating"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Odysseas Traditional Taverna</h2>
              <div className="flex items-center mb-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>Agia Efimia | 30 minutes drive from Villa Fiscardo</span>
              </div>

              <p className="mb-4 text-gray-700">
                For an authentic taste of rural Kefalonia, this family-run taverna tucked away in the hills above Agia Efimia offers a genuine farm-to-table experience. Most ingredients come directly from the family's farm, where they raise their own livestock and grow organic vegetables and herbs.
              </p>

              <p className="mb-4 text-gray-700">
                The rustic stone building features a spacious terrace with panoramic views of the surrounding mountains and valleys. In cooler months, guests can enjoy the cozy interior with its traditional fireplace where meats are often slow-roasted to perfection.
              </p>

              <div className="bg-[var(--primary-blue)]/5 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Signature Dishes</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li><strong>Rooster with Pasta</strong> - Slow-cooked in tomato sauce with local herbs</li>
                  <li><strong>Kleftiko</strong> - Lamb wrapped in parchment paper and roasted with potatoes</li>
                  <li><strong>Fresh Goat Cheese</strong> - Made daily from their own goats</li>
                  <li><strong>Seasonal Vegetable Medley</strong> - Whatever is freshly harvested that day</li>
                </ul>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Star className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span className="font-medium">Price range:</span> <span className="ml-1">€-€€ (Inexpensive to Moderate)</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Clock className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span><strong>Local tip:</strong> There's no printed menu - the owner will tell you what's fresh today</span>
              </div>

              <a
                href="https://www.tripadvisor.com/Restaurants-g776012-Agia_Efimia_Cephalonia_Ionian_Islands.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
              >
                Read reviews on TripAdvisor
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </motion.div>

          {/* Alati All Day Bar & Restaurant */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="order-2 md:order-1">
              <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Alati All Day Bar & Restaurant</h2>
              <div className="flex items-center mb-4 text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span>Alaties Beach | 15 minutes drive from Villa Fiscardo</span>
              </div>

              <p className="mb-4 text-gray-700">
                Perched on a cliff overlooking the turquoise waters of Alaties Beach, this seafood restaurant offers some of the most breathtaking sunset views on the island. The restaurant is owned by a local fishing family who bring in their catch each morning, ensuring the absolute freshest seafood possible.
              </p>

              <p className="mb-4 text-gray-700">
                The simple, whitewashed building with its blue accents epitomizes Greek island architecture, while the outdoor terrace seems to hang suspended between sea and sky. During peak season, it's advisable to book ahead to secure a table with prime sunset views.
              </p>

              <div className="bg-[var(--primary-blue)]/5 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Signature Dishes</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li><strong>Catch of the Day</strong> - Simply grilled with olive oil, lemon and herbs</li>
                  <li><strong>Lobster Pasta</strong> - A luxurious dish featuring locally caught lobster</li>
                  <li><strong>Seafood Risotto</strong> - Creamy rice with a medley of fresh seafood</li>
                  <li><strong>Octopus Carpaccio</strong> - Thinly sliced and drizzled with local olive oil</li>
                </ul>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Star className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span className="font-medium">Price range:</span> <span className="ml-1">€€-€€€ (Moderate to High)</span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Clock className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span><strong>Perfect for:</strong> Special occasions and romantic dinners with sunset views</span>
              </div>

              <a
                href="https://www.instagram.com/alati_all_day_bar_restaurant/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
              >
                Follow on Instagram
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>

            <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
              <img
                src="/images/alati.webp"
                alt="Alati All Day Bar & Restaurant at Alaties Beach with sunset views over the Ionian Sea"
                className="w-full h-full object-cover object-center object-position-y-30"
                style={{ objectPosition: '0 30%' }}
              />
            </div>
          </motion.div>
        </div>

        {/* Local specialties section */}
        <motion.div
          className="bg-white rounded-xl shadow-md p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Must-Try Kefalonian Specialties</h2>
          <p className="mb-6 text-gray-700">
            Kefalonia's unique geography and history have created a distinctive culinary tradition that differs from mainland Greek cuisine. These local specialties reflect the island's agricultural bounty and centuries of cultural influences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Kefalonian Meat Pie (Kreatopita)</h3>
              <p className="text-gray-700 mb-3">A savory pie with a distinctive spiral shape, filled with tender meat (usually veal or lamb), rice, and local herbs and spices. The pastry is made with olive oil rather than butter, giving it a unique texture and flavor.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span><strong>Best place to try it:</strong> Traditional tavernas in mountain villages</span>
              </div>
            </div>

            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Aliada</h3>
              <p className="text-gray-700 mb-3">A garlic dip that's a staple on Kefalonian tables, made by crushing garlic with olive oil and salt in a mortar and pestle until it becomes a smooth paste. It's served as a condiment with grilled meats and fish.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span><strong>Best place to try it:</strong> With seafood dishes in coastal tavernas</span>
              </div>
            </div>

            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Pretza Cheese</h3>
              <p className="text-gray-700 mb-3">A soft, white cheese unique to Kefalonia, similar to feta but with a milder flavor and creamier texture. It's made from a mixture of goat's and sheep's milk and stored in brine. Locals often serve it drizzled with olive oil and oregano.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span><strong>Best place to try it:</strong> Local markets or as part of a meze platter</span>
              </div>
            </div>

            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Riganada</h3>
              <p className="text-gray-700 mb-3">A simple yet flavorful appetizer of toasted bread rubbed with garlic, topped with fresh tomatoes, oregano (rigani), olive oil, and sometimes feta cheese. It's essentially Kefalonia's version of bruschetta.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span><strong>Best place to try it:</strong> Small cafés and wine bars in Fiskardo</span>
              </div>
            </div>

            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Bakaliaropitta</h3>
              <p className="text-gray-700 mb-3">A savory pie filled with salt cod (bakaliaro), potatoes, onions, garlic, and herbs. This dish shows the Venetian influence on Kefalonian cuisine and is traditionally served on Palm Sunday.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span><strong>Best place to try it:</strong> Family-run tavernas in springtime</span>
              </div>
            </div>

            <div className="border border-[var(--sand)]/20 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Mandoles</h3>
              <p className="text-gray-700 mb-3">Caramelized almonds with a hard sugar coating, often flavored with rosewater or orange blossom. These sweet treats are a legacy of Venetian rule and make perfect gifts to take home.</p>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
                <span><strong>Best place to try it:</strong> Specialty shops in Argostoli or at local festivals</span>
              </div>
            </div>
          </div>

          <div className="bg-[var(--olive)]/10 p-5 rounded-lg mt-6">
            <h3 className="font-semibold text-[var(--deep-blue)] mb-3">The Meze Tradition</h3>
            <p className="text-gray-700 mb-4">
              One of the best ways to experience the variety of Kefalonian cuisine is through "meze" - small plates of various dishes meant for sharing. Similar to Spanish tapas, this dining style allows you to sample many different flavors in one meal.
            </p>
            <p className="text-gray-700">
              When ordering meze at a taverna, you'll typically receive a succession of small dishes that might include dips like tzatziki and aliada, small portions of seafood, grilled vegetables, local cheeses, and savory pies. This tradition encourages a relaxed, social dining experience that can last for hours.
            </p>
            <a
              href="https://www.greece-is.com/the-complete-guide-to-greek-meze/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[var(--terracotta)] hover:underline mt-4 text-sm"
            >
              Learn more about the Greek meze tradition
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </motion.div>

        {/* Wine section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Kefalonian Wines: The Island's Liquid Treasure</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="col-span-2">
              <p className="mb-4 text-gray-700">
                Wine production in Kefalonia dates back over 3,000 years, with Ancient Greek texts mentioning the island's exceptional vineyards. The combination of limestone-rich soil, steep mountain slopes, and the unique microclimate creates ideal conditions for distinctive grape varieties found nowhere else in the world.
              </p>

              <p className="mb-4 text-gray-700">
                The jewel in Kefalonia's viticultural crown is undoubtedly Robola, a noble white grape variety that thrives in the island's mountainous terrain. Grown primarily in the Robola Zone around Mount Ainos at elevations of 800 meters and above, these grapes produce a dry, medium-bodied wine with citrus and mineral notes that perfectly complement the island's seafood dishes.
              </p>

              <div className="bg-[var(--primary-blue)]/5 p-5 rounded-lg mb-4">
                <h3 className="font-semibold text-[var(--primary-blue)] mb-3">Key Wine Varieties of Kefalonia</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Wine className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                    <div>
                      <span className="font-medium">Robola:</span> The flagship white variety with Protected Designation of Origin status. Offers crisp acidity with citrus and mineral notes. Perfect with seafood and light dishes.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Wine className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                    <div>
                      <span className="font-medium">Vostilidi:</span> An ancient white variety rescued from near extinction. Produces wines with rich texture and notes of ripe fruit and honey. Excellent with cheese and hearty vegetable dishes.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Wine className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                    <div>
                      <span className="font-medium">Mavrodaphne:</span> A red variety traditionally used for sweet wines but now also made into impressive dry reds with notes of dark fruits and spices. Pairs beautifully with meat dishes.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Wine className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                    <div>
                      <span className="font-medium">Tsaousi:</span> A white variety known for its aromatic profile with floral notes and moderate acidity. Often used in blends but also makes excellent single-variety wines.
                    </div>
                  </li>
                </ul>
              </div>
              <a
                href="https://www.robola.gr/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
              >
                Visit the Robola Wine Cooperative website
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <img
                src="/images/Robola.webp"
                alt="Robola vineyard in Kefalonia with Mount Ainos in the background"
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Wineries Worth Visiting</h3>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                  <li><strong>Robola Wine Cooperative</strong> - The largest producer, offering tours and tastings</li>
                  <li><strong>Gentilini Winery</strong> - Family-run boutique winery with award-winning wines</li>
                  <li><strong>Sclavos Wines</strong> - Pioneers in biodynamic viticulture on the island</li>
                  <li><strong>Haritatos Vineyard</strong> - Historic estate with some of the oldest vines</li>
                </ul>
                <p className="text-sm text-gray-600"><strong>Tip:</strong> Most wineries offer tastings May through October, but calling ahead is recommended</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cooking classes and food experiences */}
        <div className="bg-[var(--sand)]/10 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Hands-On Food Experiences in Kefalonia</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-[var(--olive)] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shrink-0">
                  <Utensils className="h-5 w-5" />
                </span>
                <h3 className="font-bold text-xl text-[var(--primary-blue)]">Cooking Classes</h3>
              </div>

              <p className="text-gray-700 mb-4">
                Take home more than just memories by learning to prepare authentic Kefalonian dishes under the guidance of local chefs. Several options are available across the island, from formal cooking schools to informal sessions in family tavernas.
              </p>

              <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Our Top Recommendations:</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                <li><strong>Tassia's Cooking Experience</strong> - Learn from the island's most famous chef</li>
                <li><strong>Kefalonia Cooking Studio</strong> - Hands-on classes in a purpose-built facility</li>
                <li><strong>Olive Press Cooking</strong> - Traditional recipes taught in a converted olive mill</li>
                <li><strong>Fish Taverna Workshops</strong> - Learn seafood preparation from fishing families</li>
              </ul>

              <p className="text-sm text-gray-600 mb-4">
                Most classes include a market visit to select ingredients, hands-on preparation of multiple dishes, and a meal with wine pairings to enjoy your creations.
              </p>

              <a
                href="https://tassias.com/cooking-classes/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
              >
                Book a cooking class with Tassia
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="bg-[var(--terracotta)] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shrink-0">
                  <Utensils className="h-5 w-5" />
                </span>
                <h3 className="font-bold text-xl text-[var(--primary-blue)]">Food Tours & Tastings</h3>
              </div>

              <p className="text-gray-700 mb-4">
                Explore the island's culinary landscape through guided tours that take you to producers, markets, and specialty food shops. These experiences offer insight into the island's food culture and the chance to taste a wide variety of local products.
              </p>

              <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Recommended Experiences:</h4>
              <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                <li><strong>Kefalonia Taste Tour</strong> - Visit producers of cheese, honey, olive oil, and wine</li>
                <li><strong>Argostoli Market Morning</strong> - Explore the bustling central market with a local guide</li>
                <li><strong>Olive Oil Experience</strong> - Tour an olive grove and mill with tasting session</li>
                <li><strong>Honey Farm Visit</strong> - Learn about traditional beekeeping and taste varieties of local honey</li>
              </ul>

              <p className="text-sm text-gray-600 mb-4">
                Food tours typically last 4-6 hours and include transportation from major towns. Some tours offer pickup service from Villa Fiscardo.
              </p>

              <a
                href="https://www.viator.com/Cephalonia-tours/Food-Tours/d4139-g6-c80"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
              >
                Browse food tours on Viator
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg mt-6 shadow-sm">
            <h3 className="font-bold text-lg mb-3 text-[var(--primary-blue)]">Villa Fiscardo's Culinary Services</h3>
            <p className="text-gray-700 mb-4">
              As a guest at Villa Fiscardo, you can enhance your culinary experience with these additional services:
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2 mb-4">
              <li><strong>Welcome basket</strong> with local products upon arrival</li>
              <li><strong>Private chef service</strong> for special meals prepared in the villa</li>
              <li><strong>Cooking demonstration</strong> with a local cook in the villa's kitchen</li>
              <li><strong>Restaurant reservations</strong> at the island's most sought-after establishments</li>
              <li><strong>Customized food tour arrangements</strong> based on your specific interests</li>
            </ul>
            <p className="text-sm text-gray-600">
              Please inquire about these services when booking your stay, as some options require advance arrangement.
            </p>
          </div>
        </div>

        {/* Seasonal food calendar */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Seasonal Food Calendar: When to Enjoy Kefalonia's Best</h2>

          <p className="mb-6 text-gray-700">
            Kefalonian cuisine is deeply connected to the rhythm of the seasons, with different ingredients and dishes taking center stage throughout the year. Planning your visit around these seasonal highlights can greatly enhance your culinary experience.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="bg-[var(--primary-blue)] text-white p-4">
                <h3 className="font-bold text-xl text-center">Spring (Mar-May)</h3>
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Seasonal Highlights:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                  <li>Wild greens (horta) at their peak freshness</li>
                  <li>Early artichokes and spring vegetables</li>
                  <li>Fresh dairy products as goats begin milking</li>
                  <li>Easter specialties like tsoureki bread and magiritsa soup</li>
                </ul>
                <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Don't Miss:</h4>
                <p className="text-gray-700">The Easter feast, when whole lambs are roasted on spits and traditional dishes are prepared in abundance.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="bg-[var(--terracotta)] text-white p-4">
                <h3 className="font-bold text-xl text-center">Summer (Jun-Aug)</h3>
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Seasonal Highlights:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                  <li>Abundant fresh fish and seafood</li>
                  <li>Ripe tomatoes, cucumbers, and peppers</li>
                  <li>Stone fruits like peaches and apricots</li>
                  <li>Fresh herbs from mountain slopes</li>
                </ul>
                <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Don't Miss:</h4>
                <p className="text-gray-700">Village festivals (panigiria) with traditional food stalls serving local specialties to the sound of live music.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="bg-[var(--olive)] text-white p-4">
                <h3 className="font-bold text-xl text-center">Autumn (Sep-Nov)</h3>
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Seasonal Highlights:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                  <li>Grape harvest and new wine production</li>
                  <li>Olive harvesting begins (late autumn)</li>
                  <li>Wild mushrooms in mountain forests</li>
                  <li>Quince, pomegranates, and fall fruits</li>
                </ul>
                <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Don't Miss:</h4>
                <p className="text-gray-700">Wine festivals celebrating the harvest, where you can sample new wines directly from producers.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="bg-[var(--deep-blue)] text-white p-4">
                <h3 className="font-bold text-xl text-center">Winter (Dec-Feb)</h3>
              </div>
              <div className="p-5">
                <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Seasonal Highlights:</h4>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                  <li>Fresh olive oil from recent harvest</li>
                  <li>Citrus fruits (oranges, lemons, mandarins)</li>
                  <li>Hearty meat dishes and stews</li>
                  <li>Christmas sweets like kourabiedes and melomakarona</li>
                </ul>
                <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Don't Miss:</h4>
                <p className="text-gray-700">Traditional olive oil pressing, where you can taste the freshest oil drizzled on warm bread.</p>
              </div>
            </div>
          </div>

          <div className="bg-[var(--primary-blue)]/5 p-6 rounded-lg mt-6">
            <h3 className="font-semibold text-[var(--deep-blue)] mb-3">Foodie's Tip</h3>
            <p className="text-gray-700">
              For the ultimate culinary experience, try to visit Kefalonia during the shoulder seasons of late May/early June or September/early October. During these periods, you'll find a perfect combination of summer produce still available, comfortable temperatures for dining outdoors, and restaurants that are less crowded with more attentive service.
            </p>
          </div>
        </motion.div>

        {/* Foodie itinerary */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair text-center">A Foodie's 3-Day Itinerary in Northern Kefalonia</h2>
          <p className="text-center text-gray-700 mb-8">Make the most of your culinary adventure with this curated itinerary</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[var(--primary-blue)] text-white p-4 text-center">
                <h3 className="font-bold text-xl">Day 1: Fiskardo Flavors</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">M</span>
                    <div>
                      <span className="font-medium">Morning:</span> Visit Fiskardo's small harbor market to see fishermen bringing in the day's catch
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">A</span>
                    <div>
                      <span className="font-medium">Afternoon:</span> Light lunch at a harbor-side taverna featuring fresh seafood meze
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">E</span>
                    <div>
                      <span className="font-medium">Evening:</span> Dinner at Tassia's Restaurant with its renowned Kefalonian specialties
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[var(--olive)] text-white p-4 text-center">
                <h3 className="font-bold text-xl">Day 2: Mountain Villages</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">M</span>
                    <div>
                      <span className="font-medium">Morning:</span> Visit a traditional bakery in Assos village for fresh bread and pastries
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">A</span>
                    <div>
                      <span className="font-medium">Afternoon:</span> Tour the Robola Wine Cooperative with a tasting of different varieties
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">E</span>
                    <div>
                      <span className="font-medium">Evening:</span> Dinner at a mountain taverna featuring roasted meats and local cheese
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-[var(--terracotta)] text-white p-4 text-center">
                <h3 className="font-bold text-xl">Day 3: Coastal Delights</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">M</span>
                    <div>
                      <span className="font-medium">Morning:</span> Cooking class to learn how to prepare traditional Kefalonian dishes
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">A</span>
                    <div>
                      <span className="font-medium">Afternoon:</span> Visit an olive oil producer for a tasting of different varieties
                    </div>
                  </li>
                  <li className="flex">
                    <span className="bg-[var(--sand)] text-[var(--deep-blue)] rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">E</span>
                    <div>
                      <span className="font-medium">Evening:</span> Sunset dinner at Alaties Beach with spectacular views and seafood specialties
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-[var(--deep-blue)] text-white rounded-xl p-8 text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 playfair">Ready to Taste Kefalonia's Culinary Treasures?</h2>
          <p className="mb-6 text-white/80 max-w-2xl mx-auto">
            Stay at Villa Fiscardo and embark on a gastronomic journey through Kefalonia's rich culinary landscape. Our traditional Kefalonian home puts you just minutes away from some of the island's finest restaurants and food experiences.
          </p>
          <a
            href="/booking"
            className="inline-block bg-white text-[var(--deep-blue)] font-semibold px-8 py-3 rounded-full hover:bg-[var(--sand)] transition-colors duration-300"
          >
            Book Your Culinary Getaway
          </a>
        </div>

        {/* FAQ section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Frequently Asked Questions About Kefalonian Cuisine</h2>

          <div className="space-y-4">
            <div className="border border-[var(--sand)]/30 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">What makes Kefalonian cuisine different from mainland Greek food?</h3>
              <p className="text-gray-700">
                Kefalonian cuisine has been significantly influenced by 400 years of Venetian rule, giving it a distinct character that sets it apart from mainland Greek food. You'll find unique dishes like Kefalonian meat pie (kreatopita) with its spiral shape and distinctive spice blend, and riganada (a local version of bruschetta). The island's cuisine features more complex spice combinations than is typical in other parts of Greece, with cloves, cinnamon, and allspice appearing in savory dishes. Kefalonian recipes also tend to use more wine in cooking, reflecting the island's strong viticultural tradition. Additionally, being an island with a strong fishing tradition, seafood plays a more prominent role than in many mainland regions, with specialties like bianco (fish cooked in a garlicky white sauce) that are distinctively Ionian.
              </p>
            </div>

            <div className="border border-[var(--sand)]/30 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Is Kefalonian food suitable for vegetarians?</h3>
              <p className="text-gray-700">
                Vegetarians will find plenty of delicious options in Kefalonian cuisine. The Greek Orthodox tradition includes many fasting periods throughout the year when animal products are avoided, resulting in a rich repertoire of vegetarian dishes. Look for briami (a Greek version of ratatouille), gemista (stuffed tomatoes and peppers with rice and herbs), and numerous ladera dishes (vegetables cooked in olive oil). The island's abundant produce means you'll find excellent salads featuring local ingredients like tomatoes, cucumbers, capers, and the island's famous soft cheese, pretza. Many tavernas offer a selection of vegetable-based meze including fava bean puree, tzatziki, and skordalia (garlic dip). When ordering, simply ask for "nistisima" dishes, which means fasting food and is guaranteed to be free from animal products. However, be aware that some traditional dishes may contain hidden animal ingredients, so it's always best to ask specifically about the preparation.
              </p>
            </div>

            <div className="border border-[var(--sand)]/30 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">What is the best time of year to visit Kefalonia for food experiences?</h3>
              <p className="text-gray-700">
                While Kefalonia offers excellent cuisine year-round, many food enthusiasts consider late September through mid-October to be the perfect time for culinary exploration. This period coincides with the grape and olive harvests, when food festivals and celebrations are common across the island. The sea is still warm enough for swimming, but the intense summer heat has subsided, making it more pleasant to enjoy long, leisurely meals outdoors. Many restaurants are less crowded than during the peak summer season, allowing for more personalized service and attention from chefs and staff. Spring (April-May) is another excellent time, when the island is lush with vegetation and wild herbs, perfect for those interested in foraged ingredients and seasonal specialties. If you visit during Orthodox Easter (date varies each year), you'll experience the most important food celebration in the Greek calendar, with special dishes and communal feasts that showcase traditional cooking techniques and recipes.
              </p>
            </div>

            <div className="border border-[var(--sand)]/30 rounded-lg p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">What food souvenirs should I bring home from Kefalonia?</h3>
              <p className="text-gray-700">
                Kefalonia offers many portable culinary treasures that make perfect souvenirs. Extra virgin olive oil is perhaps the most essential - look for small bottles from single-estate producers, especially those from the Fiskardo region known for their peppery finish. The island's thyme honey is exceptional, with a distinctive flavor derived from the wild herbs that grow on the mountain slopes. Robola wine travels well and makes a unique gift, as this variety is grown almost exclusively on Kefalonia. For sweet treats, mandoles (caramelized almonds) and pastokydono (quince paste) are traditional and pack easily. Herb enthusiasts should look for mountain tea, oregano, and other dried wild herbs, which are sold in markets and specialty shops. Many producers now offer beautifully packaged gifts combining several products. For those concerned about liquid restrictions when flying, many shops can arrange shipping, or you can purchase these items at the airport after security. Remember that certain food items may be subject to customs restrictions in your home country.
              </p>
            </div>
          </div>
        </div>


        {/* Related experiences */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair text-center">Explore More Kefalonia Experiences</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/blog/wine-tasting" className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src="/images/Robola.webp"
                    alt="Wine tasting at a local winery in Kefalonia"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Wine Tasting</h3>
                  <p className="text-gray-700 text-sm">Discover the famous Robola wine and local vineyards of the island</p>
                </div>
              </div>
            </Link>

            <Link href="/blog/beach-exploration" className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src="/images/emlysi1.webp"
                    alt="Beautiful beach in Kefalonia perfect for a post-meal swim"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Beach Exploration</h3>
                  <p className="text-gray-700 text-sm">Find the perfect secluded cove to relax after your culinary adventures</p>
                </div>
              </div>
            </Link>

            <Link href="/blog/nature-hikes" className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl">
                <div className="h-48 overflow-hidden">
                  <img
                    src="/images/hike.webp"
                    alt="Hiking trail in Kefalonia to walk off those delicious meals"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[var(--deep-blue)] mb-2 group-hover:text-[var(--terracotta)] transition-colors duration-300">Nature Hikes</h3>
                  <p className="text-gray-700 text-sm">Walk off those delicious meals with scenic hikes around the island</p>
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
          "headline": "Authentic Kefalonian Cuisine: A Food Lover's Guide",
          "image": "https://villafiscardo.com/images/fiskardo.jpeg",
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
          "datePublished": "2023-04-02",
          "dateModified": "2023-12-10",
          "description": "Savor the distinctive flavors of Kefalonia, from fresh seafood and local specialties to award-winning wines and traditional dishes.",          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://villafiscardo.com/blog/culinary-delights"
          }
        }
      `}} />
      </div>
    </>
  );
};

export default CulinaryDelights;