import { Experience, Review, FAQ, Location } from "./types";

// Gallery Images
export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1615529162924-f8605388461d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Villa exterior with sea view"
  },
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Elegant living room with sea view"
  },
  {
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Infinity pool overlooking the sea"
  },
  {
    src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Luxurious bedroom with balcony"
  },
  {
    src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Modern bathroom with walk-in shower"
  },
  {
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    alt: "Outdoor dining area with stunning views"
  }
];

// House Highlights
export const houseHighlights = [
  "Private infinity pool with panoramic sea views",
  "Multiple terraces for outdoor dining and relaxation",
  "Just 10 minutes walk to a beautiful secluded beach",
  "Fully air-conditioned throughout",
  "High-speed WiFi and smart TV entertainment",
  "Fully equipped modern kitchen",
  "Barbecue area and outdoor kitchen",
  "Private parking for up to 3 cars"
];

// Nearby Locations
export const nearbyBeaches: Location[] = [
  { name: "Agia Efimia Beach", distance: "5 min drive" },
  { name: "Myrtos Beach", distance: "20 min drive" },
  { name: "Antisamos Beach", distance: "25 min drive" }
];

export const localAttractions: Location[] = [
  { name: "Melissani Cave", distance: "15 min drive" },
  { name: "Assos Village", distance: "30 min drive" },
  { name: "Fiskardo Town", distance: "45 min drive" }
];

export const diningOptions: Location[] = [
  { name: "Local Tavernas", distance: "5-10 min walk" },
  { name: "Supermarket", distance: "5 min drive" },
  { name: "Agia Efimia Marina", distance: "10 min drive" }
];

// Experiences
export const experiences: Experience[] = [
  {
    title: "Beach Exploration",
    description: "Discover the island's world-famous beaches, from the iconic Myrtos Beach to hidden coves accessible only by boat.",
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Culinary Delights",
    description: "Sample authentic Greek cuisine at local tavernas, taste fresh-caught seafood, and enjoy traditional Kefalonian specialties.",
    image: "https://images.unsplash.com/photo-1474447976065-67d23accb1e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Island Cruising",
    description: "Explore Kefalonia's coastline on a boat trip, visiting sea caves, snorkeling in crystal-clear waters, and spotting dolphins.",
    image: "https://images.unsplash.com/photo-1566822937863-b0007f5e3733?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Nature Hikes",
    description: "Trek through lush forests, discover hidden waterfalls, and enjoy breathtaking views from Mount Ainos National Park.",
    image: "https://images.unsplash.com/photo-1560256342-0d1eb9adabd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Wine Tasting",
    description: "Visit local wineries to sample the island's distinctive Robola wine and learn about Kefalonia's winemaking traditions.",
    image: "https://images.unsplash.com/photo-1599912239434-80920ec51b23?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Sunset Magic",
    description: "Enjoy spectacular sunsets directly from our villa's terraces, with panoramic views of the Ionian Sea.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

// Reviews
export const reviews: Review[] = [
  {
    name: "Sarah M.",
    avatarUrl: "https://randomuser.me/api/portraits/women/42.jpg",
    text: "\"Absolutely breathtaking! The views from the villa are even better than the photos. We spent every evening on the terrace watching the sunset. The house is beautiful, clean, and has everything you need. The hosts are incredibly helpful and gave us great recommendations for restaurants and activities.\"",
    date: "July 2023",
    rating: 5
  },
  {
    name: "Michael R.",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "\"This place exceeded all expectations. The infinity pool overlooking the sea is magical. We enjoyed cooking in the well-equipped kitchen with fresh local ingredients. The location is perfect - secluded enough for privacy but close to all the amenities. Can't wait to return next summer!\"",
    date: "August 2023",
    rating: 5
  },
  {
    name: "Emma L.",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "\"Perfect in every way. We stayed for two weeks and didn't want to leave. Impeccably clean, comfortable beds, and all the amenities you could need. The nearby beaches are stunning. The hosts arranged a boat trip for us which was the highlight of our trip. Already planning our return!\"",
    date: "June 2023",
    rating: 5
  },
  {
    name: "David K.",
    avatarUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    text: "\"If you're considering booking this villa, do it now! The photos don't do it justice. It's absolutely stunning inside and out. The location is ideal for exploring the island, and the hosts provided a comprehensive guide with recommendations that made our trip unforgettable. Perfect for our family holiday.\"",
    date: "September 2023",
    rating: 5
  }
];

// FAQs
export const faqs: FAQ[] = [
  {
    question: "What's the best time of year to visit Kefalonia?",
    answer: "The peak tourist season in Kefalonia is from June to September when the weather is warmest and perfect for swimming and sunbathing. May and October offer pleasant temperatures, fewer crowds, and lower prices. The island is quieter in winter months, with many businesses closed and cooler, sometimes rainy weather."
  },
  {
    question: "Is a car necessary during our stay?",
    answer: "While not absolutely necessary, we highly recommend renting a car to fully experience Kefalonia. The island has limited public transportation, and many of the most beautiful beaches and attractions are spread out. Having a car gives you the freedom to explore at your own pace. We can help arrange car rental for you through our trusted local partners."
  },
  {
    question: "What's included in the villa rental?",
    answer: "Our villa rental includes all utilities, WiFi, air conditioning, weekly cleaning service, welcome basket, bed linens, bath and pool towels, basic toiletries, and kitchen essentials. We also provide a comprehensive guidebook with local recommendations. Additional services such as extra cleaning, private chef, grocery delivery, or babysitting can be arranged for an additional fee."
  },
  {
    question: "How do we get from the airport to the villa?",
    answer: "Kefalonia International Airport (EFL) is approximately 40 minutes drive from our villa. We recommend either renting a car at the airport or arranging a private transfer. We're happy to help arrange airport transfers with our trusted local drivers who know the location well. Just let us know your flight details in advance, and we'll take care of the rest."
  },
  {
    question: "Is the villa suitable for children?",
    answer: "Yes, our villa is family-friendly and suitable for children of all ages. We provide a crib and high chair upon request. The pool area is gated for safety. However, please note that the property has multiple levels and terraces, so young children should be supervised outdoors. We're happy to provide specific information about the property's layout if you have concerns about its suitability for your family."
  }
];
