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
  "Over 100 years old, restored traditional Kefalonian home",
  "Pet-friendly accommodation",
  "Self check-in with lockbox",
  "Mountain and garden views",
  "Beach access nearby",
  "High-speed WiFi and TV",
  "Fully equipped kitchen",
  "Dedicated workspace for remote working",
  "Air conditioning throughout",
  "Free parking on premises"
];

// Nearby Locations
export const nearbyBeaches: Location[] = [
  { name: "Foki Beach", distance: "nearby" },
  { name: "Emblisi Beach", distance: "nearby" },
  { name: "Kimilia Beach", distance: "nearby" },
  { name: "Dafnoudi Beach", distance: "nearby" }
];

export const localAttractions: Location[] = [
  { name: "Fiskardo Village", distance: "30 min drive" },
  { name: "Assos Village", distance: "30 min drive" },
  { name: "Melissani Cave", distance: "15 min drive" }
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
    text: "\"Absolutely charming! This traditional Kefalonian home is full of character and history. Alex was a wonderful host who responded quickly to all our questions. The mountain views are breathtaking, and the beaches nearby are some of the best on the island.\"",
    date: "July 2023",
    rating: 5
  },
  {
    name: "Michael R.",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "\"This place exceeded all expectations. We loved the blend of traditional architecture with modern comforts. The kitchen was well-equipped for cooking, and the dedicated workspace was perfect as I needed to work remotely for a few days. Great for pet owners too!\"",
    date: "August 2023",
    rating: 5
  },
  {
    name: "Emma L.",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "\"Perfect in every way. We stayed for two weeks and didn't want to leave. The self check-in process was simple, and the house was impeccably clean. All the beaches mentioned are stunning and just a short drive away. Already planning our return!\"",
    date: "June 2023",
    rating: 4
  }
];

// FAQs
export const faqs: FAQ[] = [
  {
    question: "What's the best time of year to visit Kefalonia?",
    answer: "The peak tourist season in Kefalonia is from June to September when the weather is warmest and perfect for swimming and sunbathing. May and October offer pleasant temperatures, fewer crowds, and lower prices. The island is quieter in winter months, with many businesses closed and cooler, sometimes rainy weather."
  },
  {
    question: "Is the home pet-friendly?",
    answer: "Yes, our vintage Kefalonian home is pet-friendly! We understand that pets are part of the family, so you're welcome to bring your furry friends along. We just ask that you clean up after them and ensure they don't damage any of the historic features of the home."
  },
  {
    question: "How does the self check-in work?",
    answer: "We offer convenient self check-in with a lockbox, so you can arrive at your leisure. Once your booking is confirmed, we'll send detailed instructions on how to access the lockbox and get settled in. If you have any questions during check-in, Alex is just a phone call away and will respond within a few hours."
  },
  {
    question: "How far are the nearby beaches?",
    answer: "Our home is conveniently located near several beautiful beaches including Foki, Emblisi, Kimilia, and Dafnoudi. Most of these beaches are a short drive away and offer crystal clear waters perfect for swimming and snorkeling. Fiskardo village is also just a 30-minute drive, where you can find even more coastal beauty."
  },
  {
    question: "What amenities are provided in the house?",
    answer: "Our home includes WiFi, TV, air conditioning, a fully equipped kitchen, dedicated workspace, free parking on premises, mountain views, garden views, and beach access. We provide all essential items including bed linens, towels, basic toiletries, and kitchen essentials. As a historic property with modern updates, you'll have all the comforts needed for a pleasant stay."
  },
  {
    question: "Is the house suitable for remote working?",
    answer: "Absolutely! We've set up a dedicated workspace with reliable WiFi, making it perfect for digital nomads or those needing to mix work with pleasure. The quiet surroundings and beautiful views provide an inspiring environment that many of our guests have found ideal for productive remote work."
  }
];
