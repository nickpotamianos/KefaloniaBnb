#!/usr/bin/env node

/**
 * Villa Content Generator
 * Creates additional villa-focused landing pages for better keyword coverage
 */

import fs from 'fs';
import path from 'path';

console.log('🏠 Villa Fiscardo Content Generator');
console.log('=' .repeat(40));

const CLIENT_PUBLIC_DIR = './client/public';

// Additional villa-focused pages to create
const VILLA_PAGES = [
  {
    filename: 'luxury-villa-fiscardo.html',
    title: 'Luxury Villa Fiscardo | Premium Accommodation in Kefalonia',
    description: 'Experience luxury at our premium villa in Fiscardo, Kefalonia. Stunning sea views, modern amenities, and authentic Greek island charm.',
    keywords: 'luxury villa fiscardo, premium villa kefalonia, luxury accommodation fiscardo',
    h1: 'Luxury Villa Fiscardo - Premium Kefalonia Experience',
    content: `
    <section class="max-w-4xl mx-auto p-8">
      <h2 class="text-3xl font-bold mb-6 text-blue-900">Your Luxury Villa Awaits in Fiscardo</h2>
      
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="text-2xl font-semibold mb-4">Premium Amenities</h3>
          <ul class="space-y-2 text-gray-700">
            <li>✨ Luxury furnishings and decor</li>
            <li>🌊 Stunning sea views from every room</li>
            <li>🏊 Private access to crystal-clear waters</li>
            <li>🍽️ Fully equipped gourmet kitchen</li>
            <li>🛏️ Comfortable bedrooms with premium linens</li>
            <li>🚿 Modern bathrooms with luxury amenities</li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-2xl font-semibold mb-4">Fiscardo Location Benefits</h3>
          <ul class="space-y-2 text-gray-700">
            <li>🏘️ Heart of charming Fiscardo village</li>
            <li>🍴 Walking distance to finest restaurants</li>
            <li>⛵ Easy access to boat rentals and sailing</li>
            <li>🏛️ Near historical sites and attractions</li>
            <li>🛍️ Close to boutique shops and markets</li>
            <li>🌅 Perfect sunset viewing location</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-blue-50 p-6 rounded-lg mb-8">
        <h3 class="text-2xl font-semibold mb-4">Why Choose Our Luxury Villa Fiscardo?</h3>
        <p class="text-gray-700 mb-4">
          Our luxury villa in Fiscardo represents the pinnacle of Kefalonia accommodation. 
          Nestled in the most picturesque village on the island, this premium villa offers 
          an unparalleled Greek island experience.
        </p>
        <p class="text-gray-700">
          From the moment you arrive, you'll understand why Fiscardo is considered the 
          jewel of Kefalonia. Our luxury villa provides the perfect base to explore this 
          magical island while enjoying world-class comfort and amenities.
        </p>
      </div>
    </section>`
  },
  
  {
    filename: 'villa-fiscardo-booking.html',
    title: 'Book Villa Fiscardo | Direct Booking - Best Rates Guaranteed',
    description: 'Book your villa in Fiscardo directly with us. Best rates guaranteed, instant confirmation, and personalized service for your Kefalonia vacation.',
    keywords: 'book villa fiscardo, villa fiscardo booking, reserve villa kefalonia',
    h1: 'Book Your Villa Fiscardo Experience',
    content: `
    <section class="max-w-4xl mx-auto p-8">
      <h2 class="text-3xl font-bold mb-6 text-blue-900">Reserve Your Fiscardo Villa Today</h2>
      
      <div class="bg-green-50 border border-green-200 p-6 rounded-lg mb-8">
        <h3 class="text-2xl font-semibold mb-4 text-green-800">Best Rate Guarantee</h3>
        <p class="text-green-700 mb-4">
          Book directly with us and enjoy the lowest rates available. We guarantee you won't 
          find a better price for our villa Fiscardo anywhere else.
        </p>
        <ul class="space-y-2 text-green-700">
          <li>✅ No booking fees</li>
          <li>✅ Instant confirmation</li>
          <li>✅ Flexible cancellation</li>
          <li>✅ Personal concierge service</li>
        </ul>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="text-2xl font-semibold mb-4">Booking Benefits</h3>
          <ul class="space-y-3 text-gray-700">
            <li>
              <strong>Direct Communication:</strong> Speak directly with villa owners for 
              personalized recommendations and local insights.
            </li>
            <li>
              <strong>Custom Services:</strong> Arrange airport transfers, boat rentals, 
              and restaurant reservations before arrival.
            </li>
            <li>
              <strong>Local Support:</strong> 24/7 support from our Kefalonia-based team 
              throughout your stay.
            </li>
            <li>
              <strong>Authentic Experience:</strong> Insider tips and recommendations for 
              the best Fiscardo and Kefalonia experiences.
            </li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-2xl font-semibold mb-4">What's Included</h3>
          <ul class="space-y-2 text-gray-700">
            <li>🏠 Full villa access and amenities</li>
            <li>🧹 Professional cleaning service</li>
            <li>🛏️ Fresh linens and towels</li>
            <li>🍯 Welcome basket with local products</li>
            <li>📋 Comprehensive local guide</li>
            <li>📞 Emergency contact support</li>
            <li>🚗 Parking space</li>
            <li>🌐 High-speed WiFi</li>
          </ul>
        </div>
      </div>
      
      <div class="text-center bg-blue-50 p-8 rounded-lg">
        <h3 class="text-2xl font-semibold mb-4">Ready to Book Your Villa Fiscardo?</h3>
        <p class="text-gray-700 mb-6">
          Experience the magic of Fiscardo from your own private villa. Contact us today 
          for availability and special offers.
        </p>
        <div class="space-y-4">
          <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Check Availability
          </button>
          <p class="text-sm text-gray-600">Best Rate Guarantee • Instant Confirmation</p>
        </div>
      </div>
    </section>`
  },
  
  {
    filename: 'fiscardo-villa-amenities.html',
    title: 'Villa Fiscardo Amenities | Complete Facilities Guide',
    description: 'Discover all amenities at our Fiscardo villa. From luxury bedrooms to gourmet kitchen, every detail designed for your perfect Kefalonia vacation.',
    keywords: 'villa fiscardo amenities, fiscardo villa facilities, villa features kefalonia',
    h1: 'Complete Villa Fiscardo Amenities Guide',
    content: `
    <section class="max-w-4xl mx-auto p-8">
      <h2 class="text-3xl font-bold mb-6 text-blue-900">Every Comfort at Your Villa Fiscardo</h2>
      
      <div class="grid md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-semibold mb-4 text-blue-800">🛏️ Bedroom Amenities</h3>
          <ul class="space-y-2 text-gray-700 text-sm">
            <li>• Premium memory foam mattresses</li>
            <li>• Egyptian cotton bedding</li>
            <li>• Blackout curtains for restful sleep</li>
            <li>• Air conditioning in all bedrooms</li>
            <li>• Built-in wardrobes with hangers</li>
            <li>• Bedside reading lights</li>
            <li>• Sea view from master bedroom</li>
          </ul>
        </div>
        
        <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-semibold mb-4 text-blue-800">🍳 Kitchen Facilities</h3>
          <ul class="space-y-2 text-gray-700 text-sm">
            <li>• Full-size refrigerator with freezer</li>
            <li>• Electric oven and ceramic hob</li>
            <li>• Microwave and coffee machine</li>
            <li>• Dishwasher for easy cleanup</li>
            <li>• Complete cookware and utensils</li>
            <li>• Dining table seating for 6</li>
            <li>• Kitchen island with bar stools</li>
          </ul>
        </div>
        
        <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
          <h3 class="text-xl font-semibold mb-4 text-blue-800">🛁 Bathroom Features</h3>
          <ul class="space-y-2 text-gray-700 text-sm">
            <li>• Walk-in rainfall shower</li>
            <li>• Premium toiletries provided</li>
            <li>• Heated towel rails</li>
            <li>• Hairdryer and bathroom amenities</li>
            <li>• Large vanity with storage</li>
            <li>• Non-slip shower mats</li>
            <li>• Fresh towels daily</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-blue-50 to-teal-50 p-8 rounded-lg mb-8">
        <h3 class="text-2xl font-semibold mb-6 text-center">🌊 Outdoor Villa Amenities</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <ul class="space-y-3 text-gray-700">
            <li><strong>Private Terrace:</strong> Spacious outdoor dining area with sea views</li>
            <li><strong>Garden Area:</strong> Landscaped Mediterranean garden with local plants</li>
            <li><strong>Outdoor Shower:</strong> Refreshing outdoor shower after beach days</li>
            <li><strong>BBQ Facilities:</strong> Gas barbecue for outdoor cooking</li>
          </ul>
          <ul class="space-y-3 text-gray-700">
            <li><strong>Sun Loungers:</strong> Premium loungers for relaxing in the sun</li>
            <li><strong>Outdoor Dining:</strong> Al fresco dining table and chairs</li>
            <li><strong>Shade Areas:</strong> Pergola and umbrella for comfort</li>
            <li><strong>Direct Beach Access:</strong> Private path to secluded beach</li>
          </ul>
        </div>
      </div>
      
      <div class="grid md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-2xl font-semibold mb-4">🔧 Technical Amenities</h3>
          <ul class="space-y-2 text-gray-700">
            <li>🌐 High-speed fiber WiFi throughout</li>
            <li>📺 Smart TV with international channels</li>
            <li>🔌 USB charging stations in all rooms</li>
            <li>❄️ Air conditioning in every room</li>
            <li>🔥 Central heating for cooler months</li>
            <li>🔒 Safe for valuables</li>
            <li>🚗 Private parking space</li>
            <li>🔑 Keyless entry system</li>
          </ul>
        </div>
        
        <div>
          <h3 class="text-2xl font-semibold mb-4">🎁 Complimentary Services</h3>
          <ul class="space-y-2 text-gray-700">
            <li>🧹 Daily housekeeping available</li>
            <li>🛏️ Linen change twice weekly</li>
            <li>🍯 Welcome basket with local treats</li>
            <li>📋 Detailed local area guide</li>
            <li>📞 24/7 concierge support</li>
            <li>🚗 Airport transfer assistance</li>
            <li>⛵ Boat rental recommendations</li>
            <li>🍽️ Restaurant reservation service</li>
          </ul>
        </div>
      </div>
    </section>`
  }
];

function generateVillaPage(pageData) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageData.title}</title>
    <meta name="description" content="${pageData.description}">
    <meta name="keywords" content="${pageData.keywords}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://villafiscardo.com/${pageData.filename}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${pageData.title}">
    <meta property="og:description" content="${pageData.description}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://villafiscardo.com/${pageData.filename}">
    <meta property="og:image" content="https://villafiscardo.com/images/fiscardo.jpg">
    <meta property="og:site_name" content="Villa Fiscardo">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageData.title}">
    <meta name="twitter:description" content="${pageData.description}">
    <meta name="twitter:image" content="https://villafiscardo.com/images/fiscardo.jpg">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "VacationRental",
      "name": "${pageData.h1}",
      "description": "${pageData.description}",
      "url": "https://villafiscardo.com/${pageData.filename}",
      "image": "https://villafiscardo.com/images/fiscardo.jpg",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Fiscardo",
        "addressRegion": "Kefalonia",
        "addressCountry": "Greece"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "38.4567",
        "longitude": "20.5678"
      },
      "amenityFeature": [
        { "@type": "LocationFeatureSpecification", "name": "Sea View" },
        { "@type": "LocationFeatureSpecification", "name": "WiFi" },
        { "@type": "LocationFeatureSpecification", "name": "Air Conditioning" },
        { "@type": "LocationFeatureSpecification", "name": "Kitchen" },
        { "@type": "LocationFeatureSpecification", "name": "Parking" }
      ]
    }
    </script>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b">
        <div class="max-w-6xl mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <a href="/" class="text-2xl font-bold text-blue-900">Villa Fiscardo</a>
                <div class="space-x-6">
                    <a href="/" class="text-gray-700 hover:text-blue-900">Home</a>
                    <a href="/fiscardo-villa.html" class="text-gray-700 hover:text-blue-900">Villa</a>
                    <a href="/fiscardo-villas.html" class="text-gray-700 hover:text-blue-900">Villas</a>
                    <a href="/villa-fiscardo-guide.html" class="text-gray-700 hover:text-blue-900">Guide</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Header -->
    <header class="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div class="max-w-6xl mx-auto px-4 py-16 text-center">
            <h1 class="text-4xl md:text-6xl font-bold mb-6">${pageData.h1}</h1>
            <p class="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                ${pageData.description}
            </p>
        </div>
    </header>

    <!-- Main Content -->
    <main>
        ${pageData.content}
        
        <!-- CTA Section -->
        <section class="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
            <div class="max-w-4xl mx-auto text-center px-4">
                <h2 class="text-3xl font-bold mb-6">Ready to Experience Villa Fiscardo?</h2>
                <p class="text-xl mb-8 opacity-90">
                    Book your perfect villa in Fiscardo today and create unforgettable memories in Kefalonia.
                </p>
                <div class="space-x-4">
                    <button class="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                        Check Availability
                    </button>
                    <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                        Contact Us
                    </button>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-6xl mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8">
                <div>
                    <h3 class="text-xl font-bold mb-4">Villa Fiscardo</h3>
                    <p class="text-gray-300">Your perfect villa rental in the heart of Fiscardo, Kefalonia.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2 text-gray-300">
                        <li><a href="/" class="hover:text-white">Home</a></li>
                        <li><a href="/fiscardo-villa.html" class="hover:text-white">Villa</a></li>
                        <li><a href="/fiscardo-villas.html" class="hover:text-white">Villas</a></li>
                        <li><a href="/villa-fiscardo-guide.html" class="hover:text-white">Local Guide</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Contact</h4>
                    <p class="text-gray-300">Fiscardo, Kefalonia, Greece</p>
                    <p class="text-gray-300">info@villafiscardo.com</p>
                </div>
            </div>
            <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Villa Fiscardo. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
}

// Create the pages
console.log('📝 Creating additional villa content pages...\n');

let createdPages = [];

for (const pageData of VILLA_PAGES) {
  const filePath = path.join(CLIENT_PUBLIC_DIR, pageData.filename);
  const content = generateVillaPage(pageData);
  
  try {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Created: ${pageData.filename}`);
    console.log(`   🎯 Target: ${pageData.keywords.split(',')[0]}`);
    console.log(`   📄 URL: https://villafiscardo.com/${pageData.filename}\n`);
    createdPages.push(pageData.filename);
  } catch (error) {
    console.log(`❌ Failed to create ${pageData.filename}: ${error.message}\n`);
  }
}

// Update sitemap.xml
console.log('🗺️ Updating sitemap.xml...');

const sitemapPath = path.join(CLIENT_PUBLIC_DIR, 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf8');

// Add new pages to sitemap
const newUrlEntries = createdPages.map(filename => `
  <url>
    <loc>https://villafiscardo.com/${filename}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');

// Insert before closing </urlset>
sitemap = sitemap.replace('</urlset>', newUrlEntries + '\n</urlset>');

fs.writeFileSync(sitemapPath, sitemap);
console.log('✅ Sitemap updated with new villa pages');

// Summary
console.log('\n' + '='.repeat(40));
console.log('✅ VILLA CONTENT GENERATION COMPLETE');
console.log('='.repeat(40));
console.log(`📄 Created ${createdPages.length} new villa-focused pages`);
console.log('🗺️ Updated sitemap.xml');
console.log('\n🚀 Next steps:');
console.log('1. Run: npm run seo:submit (submit new sitemap)');
console.log('2. Run: npm run seo:accelerate (force indexing)'); 
console.log('3. Monitor: npm run seo:track (track progress)');
console.log('\n📈 This will significantly boost your villa fiscardo keyword coverage!');
