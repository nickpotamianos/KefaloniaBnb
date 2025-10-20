// filepath: c:\Users\Nick\Desktop\KefaloniaBnb\client\src\components\blogs\WineTasting.tsx
import { MapPin, Wine, Star, Clock, ExternalLink, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { Heading } from "../ui/heading";

const WineTasting = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* SEO-optimized heading structure */}
      <div className="mb-10 text-center">
        <span className="inline-block mb-3 px-4 py-2 bg-[var(--terracotta)]/10 rounded-full text-[var(--terracotta)] text-sm font-medium flex items-center justify-center mx-auto">
          <Wine className="mr-1.5 h-4 w-4" />
          Kefalonian Wines
        </span>
        
        <Heading
          title="Kefalonia's Wine Heritage: Island Vineyards & Tasting Experiences"
          description="Explore the unique terroir of Kefalonia's ancient vineyards, rare indigenous grape varieties, and unforgettable wine tasting experiences."
          centered
        />
      </div>

      {/* Hero image with overlay */}
      <div className="relative h-[60vh] mb-10 rounded-xl overflow-hidden">
        <img 
          src="/images/Robola.webp" 
          alt="Scenic Robola vineyards on the slopes of Mount Ainos in Kefalonia" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-10 left-10 max-w-xl text-white">
          <h2 className="text-3xl font-bold mb-3 playfair">Ancient Vines, Modern Wines</h2>
          <p className="text-white/90">Discover why Kefalonia's unique terroir produces some of Greece's most distinctive wines</p>
        </div>
      </div>

      {/* Introduction with SEO-rich content */}
      <div className="prose max-w-none mb-12 text-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Kefalonia's Unique Wine Heritage</h2>
        
        <p className="mb-4">
          Kefalonia's winemaking tradition stretches back over 3,000 years, with references to the island's wines appearing in texts from Ancient Greece. What makes Kefalonian wines truly special is the island's distinctive terroir — a combination of limestone-rich soil, high altitude vineyards, and a microclimate influenced by both the Mediterranean Sea and the mountainous terrain of Mount Ainos.
        </p>
        
        <p className="mb-4">
          The phylloxera epidemic that devastated European vineyards in the late 19th century largely spared Kefalonia, allowing some indigenous grape varieties to survive that were lost elsewhere. Today, the island is experiencing a wine renaissance, with both traditional wineries and innovative newcomers producing wines that are gaining international recognition.
        </p>
        
        <div className="bg-[var(--sand)]/10 p-6 rounded-lg border border-[var(--sand)]/20 mb-8">
          <h3 className="text-xl font-semibold mb-3 text-[var(--deep-blue)]">What Makes Kefalonian Wines Special</h3>
          <div className="flex flex-col space-y-3">
            <div className="flex items-center">
              <Wine className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Indigenous varieties:</strong> Unique grape varieties found almost exclusively on the island</p>
            </div>
            <div className="flex items-center">
              <Wine className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>High-altitude vineyards:</strong> Cool mountain air produces wines with excellent acidity and structure</p>
            </div>
            <div className="flex items-center">
              <Wine className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>Limestone soil:</strong> Imparts distinctive mineral qualities to the wines</p>
            </div>
            <div className="flex items-center">
              <Wine className="h-5 w-5 mr-3 text-[var(--terracotta)]" />
              <p><strong>PDO status:</strong> Robola wines have Protected Designation of Origin certification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wineries section */}
      <div className="space-y-16 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Must-Visit Wineries Near Villa Fiscardo</h2>
        
        {/* Gentilini Winery */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Gentilini Winery</h2>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span>Minies, near Argostoli | 50 minutes drive from Villa Fiscardo</span>
            </div>
            
            <p className="mb-4 text-gray-700">
              Founded in 1984 by the Cosmetatos family, Gentilini has been at the forefront of Kefalonia's wine revolution. This boutique winery combines traditional methods with modern winemaking technology to produce some of the island's most acclaimed wines, consistently winning international awards.
            </p>
            
            <p className="mb-4 text-gray-700">
              The winery itself is set among vineyards and olive groves just outside Argostoli. Their tasting room features a spacious terrace where visitors can sample wines while enjoying views of the surrounding countryside. The winery is known for both single-variety bottlings and innovative blends.
            </p>
            
            <div className="bg-[var(--primary-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Signature Wines</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Gentilini Robola Wild Ferment</strong> - Their flagship white, fermented with wild yeasts</li>
                <li><strong>Notes Rosé</strong> - A delicate, dry rosé made from Syrah and Moschofilero</li>
                <li><strong>Eclipse</strong> - A premium red blend of Mavrodaphne and international varieties</li>
                <li><strong>Gentilini White</strong> - A refreshing blend of Tsaousi and Sauvignon Blanc</li>
              </ul>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Star className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span className="font-medium">Tasting experience:</span> <span className="ml-1">€€ (Moderate, €15-25 per person)</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Clock className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Open:</strong> Monday-Saturday, 10am-4pm (May-October)</span>
            </div>
            
            <a 
              href="https://www.gentilini.gr" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Visit Gentilini website
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          
          <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
            <img 
              src="/images/Robola.webp" 
              alt="Gentilini Winery with rows of vines and modern tasting facility" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
        {/* Robola Wine Cooperative */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-xl overflow-hidden h-80">
            <img 
              src="/images/Robola.webp" 
              alt="Robola Wine Cooperative with Mount Ainos in the background showcasing mountain vineyards" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Robola Wine Cooperative</h2>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span>Omala Valley | 40 minutes drive from Villa Fiscardo</span>
            </div>
            
            <p className="mb-4 text-gray-700">
              Founded in 1982, the Robola Cooperative represents over 300 small growers and is the largest producer of Robola wine on the island. It plays a crucial role in preserving Kefalonia's winemaking heritage by helping small vineyard owners maintain their ancient plots on the slopes of Mount Ainos.
            </p>
            
            <p className="mb-4 text-gray-700">
              Located in the picturesque Omala Valley near the monastery of Saint Gerasimos, the cooperative offers a more rustic but authentic wine tasting experience. Their facility includes a small museum showcasing traditional winemaking tools and a spacious tasting room where visitors can sample their complete range of wines.
            </p>
            
            <div className="bg-[var(--primary-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Signature Wines</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>San Gerasimo Robola PDO</strong> - Their flagship wine, showcasing classic Robola character</li>
                <li><strong>Robola Gold Selection</strong> - Premium Robola from high-altitude vineyards</li>
                <li><strong>Orpheus</strong> - A blend of Vostilidi and other local white varieties</li>
                <li><strong>MNHΣTΗΡΕΣ</strong> - A red wine blend featuring Mavrodaphne</li>
              </ul>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Star className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span className="font-medium">Tasting experience:</span> <span className="ml-1">€ (Inexpensive, often complimentary with purchase)</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Clock className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Open:</strong> Monday-Saturday, 9am-3pm year-round (extended hours in summer)</span>
            </div>
            
            <a 
              href="https://www.robola.gr/en/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Visit Robola Cooperative website
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </motion.div>
        
        {/* Sclavos Wines */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="order-2 md:order-1">
            <h2 className="text-2xl font-bold mb-4 text-[var(--deep-blue)] playfair">Sclavos Wines</h2>
            <div className="flex items-center mb-4 text-sm text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span>Paliki Peninsula | 1 hour drive from Villa Fiscardo</span>
            </div>
            
            <p className="mb-4 text-gray-700">
              The Sclavos family has been producing wine in the Paliki peninsula since the 1860s, and today they are pioneers of biodynamic and natural winemaking in Greece. Their vineyards, some containing vines over 100 years old, are cultivated using traditional methods without chemical interventions.
            </p>
            
            <p className="mb-4 text-gray-700">
              This small, family-run winery offers visitors a glimpse into a more artisanal approach to winemaking. Their tasting sessions often include a tour of their historic cellar, which survived the 1953 earthquake, and a chance to see their amphora vessels used for fermenting some of their wines according to ancient methods.
            </p>
            
            <div className="bg-[var(--primary-blue)]/5 p-4 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-2">Signature Wines</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li><strong>Vino di Sasso</strong> - A natural expression of Robola with minimal intervention</li>
                <li><strong>Orgion</strong> - An orange wine made from the Vostilidi grape</li>
                <li><strong>Synodos</strong> - A field blend of rare indigenous varieties</li>
                <li><strong>Metageitnion</strong> - A complex red made from the Mavrodaphne grape</li>
              </ul>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Star className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span className="font-medium">Tasting experience:</span> <span className="ml-1">€€ (Moderate, by appointment only)</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <Clock className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Open:</strong> By appointment only, year-round</span>
            </div>
            
            <a 
              href="https://www.sclavoswines.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Visit Sclavos Wines website
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          
          <div className="order-1 md:order-2 rounded-xl overflow-hidden h-80">
            <img 
              src="/images/summer.webp" 
              alt="Sclavos Wines biodynamic vineyard with traditional stone winery building" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Grape varieties section */}
      <motion.div 
        className="bg-white rounded-xl shadow-md p-8 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Kefalonia's Indigenous Grape Varieties</h2>
        <p className="mb-6 text-gray-700">
          Kefalonia is home to several grape varieties that are either endemic to the island or found in very few other places. These varieties have adapted to the island's unique growing conditions over centuries and produce wines with distinctive character that truly capture the essence of Kefalonian terroir.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Robola</h3>
            <p className="text-gray-700 mb-3">The island's flagship white grape, genetically distinct from other Greek varieties. It produces medium-bodied wines with pronounced citrus and mineral notes, crisp acidity, and saline qualities that reflect the limestone soils and maritime influence.</p>
            <div className="flex items-center text-sm text-gray-600">
              <Wine className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Flavor profile:</strong> Lemon, green apple, white flowers, with pronounced minerality</span>
            </div>
          </div>
          
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Vostilidi</h3>
            <p className="text-gray-700 mb-3">An ancient white variety that was nearly extinct until recent revival efforts. It produces full-bodied wines with complex aromatics and a slightly oxidative character. It's often used in both dry and sweet wine styles, showing remarkable aging potential.</p>
            <div className="flex items-center text-sm text-gray-600">
              <Wine className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Flavor profile:</strong> Apricot, honeysuckle, orange peel, with nutty undertones</span>
            </div>
          </div>
          
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Mavrodaphne</h3>
            <p className="text-gray-700 mb-3">A red grape traditionally used for sweet fortified wines, but increasingly made into dry reds in Kefalonia. These wines are deeply colored with moderate tannins and can develop complex secondary aromas with bottle age. Unlike the sweet versions made elsewhere, Kefalonian Mavrodaphne often has a fresher, more structured character.</p>
            <div className="flex items-center text-sm text-gray-600">
              <Wine className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Flavor profile:</strong> Black cherry, plum, licorice, with herbal notes</span>
            </div>
          </div>
          
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Tsaousi</h3>
            <p className="text-gray-700 mb-3">A white variety native to the Ionian Islands with a long history on Kefalonia. It produces light to medium-bodied wines with delicate aromatics and moderate acidity. Often used in blends to add aromatic complexity, it's increasingly being bottled as a single-variety wine by innovative producers.</p>
            <div className="flex items-center text-sm text-gray-600">
              <Wine className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Flavor profile:</strong> White peach, jasmine, citrus blossom, with a soft texture</span>
            </div>
          </div>
          
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Zakynthino</h3>
            <p className="text-gray-700 mb-3">Named after the neighboring island of Zakynthos but found in old vineyards throughout Kefalonia. This white variety produces wines with pronounced aromatics and good structure. It's often blended with Robola or Tsaousi to create complex white wines unique to the region.</p>
            <div className="flex items-center text-sm text-gray-600">
              <Wine className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Flavor profile:</strong> Lime, pear, almond, with floral undertones</span>
            </div>
          </div>
          
          <div className="border border-[var(--sand)]/20 rounded-lg p-5">
            <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Muscat</h3>
            <p className="text-gray-700 mb-3">While not indigenous to Kefalonia, Muscat has been grown on the island for centuries and has developed unique local expressions. It's used primarily for dessert wines, particularly the sweet Muscat wines from the Mavrata region, which have a distinctive aromatic profile influenced by the island's terroir.</p>
            <div className="flex items-center text-sm text-gray-600">
              <Wine className="h-4 w-4 mr-1.5 text-[var(--terracotta)]" />
              <span><strong>Flavor profile:</strong> Orange blossom, tropical fruits, honey, with balanced sweetness</span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--olive)]/10 p-5 rounded-lg mt-6">
          <h3 className="font-semibold text-[var(--deep-blue)] mb-3">The Robola Zone: Kefalonia's Grand Cru</h3>
          <p className="text-gray-700 mb-4">
            The heartland for Kefalonia's most prestigious wines is the Robola Zone, a designated area on the slopes of Mount Ainos at elevations between 600 and 800 meters. This mountainous region features poor, limestone-rich soils that stress the vines, resulting in lower yields but more concentrated flavors.
          </p>
          <p className="text-gray-700">
            Wines labeled as "Robola of Kefalonia PDO" must be made from at least 85% Robola grapes grown within this designated zone and meet strict production criteria. These high-altitude vineyards benefit from dramatic day-night temperature variations that help preserve acidity while allowing full flavor development - a key factor in the exceptional quality of these wines.
          </p>
          <a 
            href="https://winesofgreece.org/regions/ionian-islands/kefalonia/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-[var(--terracotta)] hover:underline mt-4 text-sm"
          >
            Learn more about Greek wine appellations
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
      </motion.div>
      
      {/* Wine experiences section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Wine Experiences Not to Miss</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="col-span-2">
            <p className="mb-4 text-gray-700">
              Beyond simple winery visits, Kefalonia offers a range of immersive wine experiences that allow visitors to more deeply connect with the island's viticultural heritage. From guided tastings to hands-on activities in the vineyards, these experiences provide memorable ways to appreciate Kefalonian wines in their natural context.
            </p>
            
            <p className="mb-4 text-gray-700">
              Many of these experiences are seasonal, coinciding with key moments in the winemaking calendar. The harvest period (late August through September) is particularly vibrant, with special events at most wineries and the opportunity to witness or even participate in traditional harvest activities. 
            </p>
            
            <div className="bg-[var(--primary-blue)]/5 p-5 rounded-lg mb-4">
              <h3 className="font-semibold text-[var(--primary-blue)] mb-3">Recommended Wine Experiences</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Wine className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Guided Wine Tours:</span> Several companies offer guided tours that visit multiple wineries in a single day, with transportation included. These tours often include stops at scenic viewpoints and cultural sites related to wine production.
                  </div>
                </li>
                <li className="flex items-start">
                  <Wine className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Wine and Food Pairings:</span> Experience how Kefalonian wines complement local cuisine through specialized tastings that pair wines with traditional dishes or artisanal products like cheese and olive oil.
                  </div>
                </li>
                <li className="flex items-start">
                  <Wine className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Vineyard Hiking:</span> Several marked trails wind through the Robola Zone vineyards on Mount Ainos, offering stunning views and the chance to observe different vineyard sites up close.
                  </div>
                </li>
                <li className="flex items-start">
                  <Wine className="h-5 w-5 mr-2 text-[var(--primary-blue)] mt-0.5" />
                  <div>
                    <span className="font-medium">Harvest Participation:</span> During September, some wineries offer visitors the chance to participate in grape picking and traditional foot stomping of grapes, followed by a celebratory meal.
                  </div>
                </li>
              </ul>
            </div>
            <a 
              href="https://www.kefaloniawine.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Book a guided wine experience
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-xl overflow-hidden shadow-md">
            <img 
              src="/images/Robola.webp" 
              alt="Wine tasting experience with mountain vineyard views in Kefalonia" 
              className="w-full h-48 object-cover"
            />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Upcoming Wine Events</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <Calendar className="h-4 w-4 mr-2 text-[var(--terracotta)] mt-0.5" />
                  <div>
                    <span className="font-medium">Robola Wine Festival</span> - August 14-16, Fragata Village
                  </div>
                </li>
                <li className="flex items-start">
                  <Calendar className="h-4 w-4 mr-2 text-[var(--terracotta)] mt-0.5" />
                  <div>
                    <span className="font-medium">Harvest Celebration</span> - September 8-10, Various Wineries 
                  </div>
                </li>
                <li className="flex items-start">
                  <Calendar className="h-4 w-4 mr-2 text-[var(--terracotta)] mt-0.5" />
                  <div>
                    <span className="font-medium">Wine & Cheese Pairing</span> - Every Friday (June-Sept), Gentilini Winery
                  </div>
                </li>
              </ul>
              <p className="text-sm text-gray-600 mt-4"><strong>Tip:</strong> Book wine events at least 2-3 days in advance during high season</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wine buying and bringing home section */}
      <div className="bg-[var(--sand)]/10 rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-[var(--deep-blue)] playfair">Bringing Kefalonian Wines Home</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="bg-[var(--olive)] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shrink-0">
                <Wine className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-xl text-[var(--primary-blue)]">Where to Buy</h3>
            </div>
            
            <p className="text-gray-700 mb-4">
              If you've fallen in love with Kefalonian wines during your stay, you'll want to know where to purchase bottles to enjoy at Villa Fiscardo or to take home as souvenirs. Fortunately, there are several options for buying quality local wines.
            </p>
            
            <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Best Places to Purchase:</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
              <li><strong>Directly from wineries</strong> - Often the best prices and selection, especially for limited releases</li>
              <li><strong>Wine shops in Argostoli</strong> - Several specialized stores with knowledgeable staff</li>
              <li><strong>Fiskardo Grocery</strong> - Surprisingly good selection of local wines near Villa Fiscardo</li>
              <li><strong>Larger supermarkets</strong> - Carry reliable bottlings from the Robola Cooperative</li>
            </ul>
            
            <p className="text-sm text-gray-600 mb-4">
              Many wineries offer shipping services to EU countries, and some can arrange international shipping for larger orders. Ask about these options during your winery visit.
            </p>
            
            <a 
              href="https://www.greece-is.com/how-to-ship-wine-from-greece/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Tips for shipping wine internationally
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center mb-4">
              <span className="bg-[var(--terracotta)] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 shrink-0">
                <Wine className="h-5 w-5" />
              </span>
              <h3 className="font-bold text-xl text-[var(--primary-blue)]">Recommended Bottles</h3>
            </div>
            
            <p className="text-gray-700 mb-4">
              With so many wineries and bottles to choose from, selecting which Kefalonian wines to buy can be overwhelming. Here are our recommendations for wines that truly represent the island's unique terroir and offer excellent quality.
            </p>
            
            <h4 className="font-semibold text-[var(--deep-blue)] mb-2">Bottles Worth the Suitcase Space:</h4>
            <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
              <li><strong>Gentilini Notes Robola</strong> - A benchmark example of the variety (€15-18)</li>
              <li><strong>Sclavos Vino di Sasso</strong> - Natural Robola with distinctive character (€18-22)</li>
              <li><strong>Robola Cooperative Gold Label</strong> - Great value, classic style (€12-15)</li>
              <li><strong>Petrakopoulos Vostilidi</strong> - Rare indigenous variety, limited production (€25-30)</li>
              <li><strong>Haritatos Estate Mavrodaphne</strong> - Elegant dry red from historic winery (€20-24)</li>
            </ul>
            
            <p className="text-sm text-gray-600 mb-4">
              Remember that white wines like Robola are best enjoyed young (within 2-3 years of vintage), while some reds and specialty wines can age longer.
            </p>
            
            <a 
              href="https://www.decanter.com/premium/regional-profile-kefalonia-456408/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-[var(--terracotta)] hover:underline text-sm"
            >
              Read expert reviews of Kefalonian wines
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg mt-6 shadow-sm">
          <h3 className="font-semibold text-[var(--deep-blue)] mb-4">Wine Travel Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-[var(--primary-blue)] mb-2">Packing Wine in Luggage</h4>
              <p className="text-gray-700 mb-3">
                If you plan to bring bottles home in your checked luggage, proper packing is essential to prevent breakage. Many wineries sell specialized wine travel sleeves, or you can use clothing items to securely wrap bottles. Place them in the center of your suitcase surrounded by soft items.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tip:</strong> Remember that most airlines limit liquids in carry-on luggage, so wine bottles must be packed in checked baggage.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-[var(--primary-blue)] mb-2">Customs Regulations</h4>
              <p className="text-gray-700 mb-3">
                If traveling to the EU, you can bring an unlimited quantity of wine for personal consumption. For other countries, limits vary - the UK allows 4 liters duty-free, the US allows 1 liter, and Australia allows 2.25 liters. Check your destination country's regulations before purchasing.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Recommendation:</strong> Keep purchase receipts to show the value of wine if questioned by customs officials.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wine and food pairing section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-8 text-[var(--deep-blue)] playfair text-center">Perfect Pairings: Kefalonian Wine & Local Cuisine</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/images/fiskardo.webp" 
                alt="Fresh seafood platter with grilled fish, octopus and prawns" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Seafood & Robola</h3>
              <p className="text-gray-700 mb-4">
                The crisp acidity and citrus notes of Robola make it the perfect companion for the island's fresh seafood. The wine's mineral character particularly enhances grilled fish, while its zesty profile complements octopus dishes and seafood risotto.
              </p>
              <div className="bg-[var(--sand)]/10 rounded-lg p-3">
                <h4 className="font-medium text-sm text-[var(--deep-blue)] mb-1">Perfect Match</h4>
                <p className="text-sm text-gray-600">Grilled sea bass with lemon and herbs + Gentilini Robola</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/images/fiskardo.webp" 
                alt="Traditional Kefalonian meat pie with spiral shape" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Meat Dishes & Mavrodaphne</h3>
              <p className="text-gray-700 mb-4">
                The dry Mavrodaphne wines of Kefalonia offer dark fruit flavors and moderate tannins that pair beautifully with the island's meat specialties. The wine's structure stands up to rich dishes like Kefalonian meat pie, while its herbal notes complement roasted lamb.
              </p>
              <div className="bg-[var(--sand)]/10 rounded-lg p-3">
                <h4 className="font-medium text-sm text-[var(--deep-blue)] mb-1">Perfect Match</h4>
                <p className="text-sm text-gray-600">Slow-roasted lamb with mountain herbs + Sclavos Metageitnion</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img 
                src="/images/fiskardo.webp" 
                alt="Greek meze selection with dips, cheese and olives" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2 text-[var(--primary-blue)]">Meze & Vostilidi</h3>
              <p className="text-gray-700 mb-4">
                The aromatic complexity and fuller body of Vostilidi wines make them versatile partners for Greek meze spreads. Their honeyed notes complement soft cheeses like Pretza, while their structure allows them to stand up to more intensely flavored dips.
              </p>
              <div className="bg-[var(--sand)]/10 rounded-lg p-3">
                <h4 className="font-medium text-sm text-[var(--deep-blue)] mb-1">Perfect Match</h4>
                <p className="text-sm text-gray-600">Kefalonian cheese platter with local honey + Petrakopoulos Vostilidi</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-10 text-center">
          <a 
            href="https://www.visitgreece.gr/islands/ionian-islands/kefalonia/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center justify-center bg-[var(--terracotta)] text-white py-3 px-6 rounded-lg hover:bg-[var(--terracotta)]/90 transition-colors"
          >
            Explore More Kefalonian Experiences
            <ExternalLink className="h-4 w-4 ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default WineTasting;