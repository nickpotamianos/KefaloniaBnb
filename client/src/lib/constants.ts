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
  "WiFi",
  "Fully equipped kitchen",
  "Dedicated workspace for remote working",
  "Air conditioning throughout",
  "Free parking on premises"
];

// Nearby Locations
export const nearbyBeaches: Location[] = [
  { name: "Myrtos Beach", distance: "20 min drive" },
  { name: "Antisamos Beach", distance: "38 min drive" },
  { name: "Foki Beach", distance: "6 min drive" },
  { name: "Emblisi Beach", distance: "6 min drive" },
];

export const localAttractions: Location[] = [
  { name: "Fiskardo Village", distance: "7 min drive" },
  { name: "Assos Village", distance: "25 min drive" },
  { name: "Melissani Cave", distance: "32 min drive" }
];

export const diningOptions: Location[] = [
  { name: "Local Tavernas", distance: "1-2 min walk" },
  { name: "Minimarket", distance: "1 min walk" },
  { name: "Supermarket", distance: "5 min drive" },
];

export const cafeShoppingOptions: Location[] = [
  { name: "Picnic Café", distance: "2 min walk", type: "cafe", description: "Traditional Greek coffee house" },
  { name: "Tasia's", distance: "7 min drive", type: "cafe - restaurant", description: "Fresh pastries and local treats" },
];

// Experiences
export const experiences: Experience[] = [
  {
    title: "Beach Exploration",
    description: "Discover Kefalonia’s breathtaking coastline—from the world-renowned Myrtos Beach with its turquoise waters and dramatic cliffs, to secluded Petani and Antisamos.",
    image: "/images/myrtos2.jpg"
  },
  {
    title: "Culinary Delights",
    description: "Savor authentic Kefalonian flavors in family-run tavernas. Try fresh-caught seafood in Fiscardo, traditional meat pies in mountain villages, and local meze with a view of the Ionian.",
    image: "/images/fiskardo.jpeg"
  },
  {
    title: "Island Cruising",
    description: "Sail along Kefalonia’s coast to explore hidden sea caves, swim in crystal-clear coves, and spot dolphins. Don’t miss a day trip to nearby Ithaca, the mythical home of Odysseus.",
    image: "/images/foki.jpeg"
  },
  {
    title: "Nature Hikes",
    description: "Scenic trails from Foki to Dafnoudi lead through pine forests and sea views, with stops near Fiskardo and hidden coves along the way.",
    image: "/images/hikepng.png"
  },
  {
    title: "Wine Tasting",
    description: "Visit local wineries to sample the island's distinctive Robola wine and learn about Kefalonia's winemaking traditions.",
    image: "/images/Robola.jpg"
  },
  {
    title: "Sunset Magic",
    description: " Catch unforgettable sunsets at Alaties Beach or nearby spots, with sweeping views of the Ionian Sea.",
    image: "/images/alaties.jpg"
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
    answer: "Our home is conveniently located near several beautiful beaches including Foki, Emblisi, Kimilia, and Dafnoudi. Most of these beaches are a short drive away and offer crystal clear waters perfect for swimming and snorkeling. Fiskardo village is also just a 7-minute drive, where you can find even more coastal beauty."
  },
  {
    question: "What amenities are provided in the house?",
    answer: "Our home includes WiFi, air conditioning, a fully equipped kitchen, dedicated workspace, free parking on premises, mountain views, garden views, and beach access. We provide all essential items including bed linens, towels, basic toiletries, and kitchen essentials. As a historic property with modern updates, you'll have all the comforts needed for a pleasant stay."
  },
  {
    question: "Is the house suitable for remote working?",
    answer: "Absolutely! We've set up a dedicated workspace with reliable WiFi, making it perfect for digital nomads or those needing to mix work with pleasure. The quiet surroundings and beautiful views provide an inspiring environment that many of our guests have found ideal for productive remote work."
  }
];
