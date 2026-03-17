interface Photo {
  src: string;
  alt: string;
}

interface RoomPhotos {
  title: string;
  folderPath: string;
  photos: Photo[];
}

// Master bedroom photos
const masterBedroomPhotos: Photo[] = [
  { src: "/images/master_bedroom/master.webp", alt: "Master bedroom main view" },
  { src: "/images/master_bedroom/_83A0303.webp", alt: "Master bedroom bed" },
  { src: "/images/master_bedroom/_MG_2453.webp", alt: "Master bedroom details" },
  { src: "/images/master_bedroom/_83A0632.webp", alt: "Master bedroom details" },
  { src: "/images/master_bedroom/_83A0638.webp", alt: "Master bedroom closet" },

];

// Bedroom photos
const bedroomPhotos: Photo[] = [
  { src: "/images/room2/_83A0211.webp", alt: "Second bedroom main view" },
  { src: "/images/room2/_83A0228.webp", alt: "Second bedroom bed" },
  { src: "/images/room2/_83A0236.webp", alt: "Second bedroom window" },
];

// Living room photos
const livingRoomPhotos: Photo[] = [
  { src: "/images/living_room/_83A0046.webp", alt: "Living room view 1" },
  { src: "/images/living_room/_83A0113.webp", alt: "Living room view 2" },
  { src: "/images/living_room/_83A0121.webp", alt: "Living room view 3" },
  { src: "/images/living_room/_83A0128.webp", alt: "Living room view 4" },
  { src: "/images/living_room/_83A0140.webp", alt: "Living room view 5" },
  { src: "/images/living_room/_83A0148.webp", alt: "Living room view 6" },
  { src: "/images/living_room/_83A0167.webp", alt: "Living room view 7" },
  { src: "/images/living_room/_83A0193.webp", alt: "Living room view 8" },
  { src: "/images/living_room/_83A0198.webp", alt: "Living room view 9" },
  { src: "/images/living_room/_83A0316.webp", alt: "Living room view 10" },
  { src: "/images/living_room/_83A0318.webp", alt: "Living room view 11" },
  { src: "/images/living_room/_83A0332.webp", alt: "Living room view 12" },
];

// Kitchen/dining photos
const kitchenDiningPhotos: Photo[] = [
  { src: "/images/dinning/_83A0646.webp", alt: "Dining area view 1" },
  { src: "/images/dinning/_83A0651.webp", alt: "Dining area view 2" },
  { src: "/images/dinning/_83A0656.webp", alt: "Dining area view 3" },
  { src: "/images/dinning/_83A0666.webp", alt: "Dining area view 4" },
  { src: "/images/dinning/_83A0681.webp", alt: "Dining area view 5" },
  { src: "/images/dinning/_83A0691.webp", alt: "Dining area view 6" },
  { src: "/images/dinning/_83A0756.webp", alt: "Dining area view 7" },
  { src: "/images/dinning/_83A0766.webp", alt: "Dining area view 8" },
  { src: "/images/dinning/_83A0771.webp", alt: "Dining area view 9" },
  { src: "/images/dinning/_83A0781.webp", alt: "Dining area view 10" },
  { src: "/images/dinning/_83A0786.webp", alt: "Dining area view 11" },
  { src: "/images/dinning/_83A0843.webp", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0693.webp", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0703.webp", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0713.webp", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0721.webp", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0736.webp", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0738.webp", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0743.webp", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0751.webp", alt: "Dining area view 12" },
];

// Bathroom photos
const bathroomPhotos: Photo[] = [
  { src: "/images/bathroom/_83A0836.webp", alt: "Bathroom main view" },
  { src: "/images/bathroom/_83A0816.webp", alt: "Bathroom sink" },
  { src: "/images/bathroom/_83A0796.webp", alt: "Bathroom shower" },
  { src: "/images/bathroom/_83A0818.webp", alt: "Bathroom details" },
];

// Backyard photos
const backyardPhotos: Photo[] = [
  { src: "/images/backyard/_83A0458.webp", alt: "Backyard view 1" },
  { src: "/images/backyard/_83A0448.webp", alt: "Backyard view 2" },
  { src: "/images/backyard/_83A0040.webp", alt: "Backyard view 3" },
  { src: "/images/backyard/_83A0468.webp", alt: "Backyard view 4" },
  { src: "/images/backyard/_83A0473.webp", alt: "Backyard view 5" },
  { src: "/images/backyard/_83A0483.webp", alt: "Backyard view 6" },
  { src: "/images/backyard/_83A0493.webp", alt: "Backyard view 7" },
  { src: "/images/backyard/_83A0498.webp", alt: "Backyard view 8" },
  { src: "/images/backyard/_83A0515.webp", alt: "Backyard view 9" },
  { src: "/images/backyard/_83A0518.webp", alt: "Backyard view 10" },
  { src: "/images/backyard/_83A0523.webp", alt: "Backyard view 11" },
];

// All room photos in one array
export const roomPhotos: RoomPhotos[] = [
  {
    title: "Master Bedroom",
    folderPath: "/images/master_bedroom/",
    photos: masterBedroomPhotos
  },
  {
    title: "Bedroom",
    folderPath: "/images/room2/",
    photos: bedroomPhotos
  },
  {
    title: "Living Room",
    folderPath: "/images/living_room/",
    photos: livingRoomPhotos
  },
  {
    title: "Kitchen/Dining",
    folderPath: "/images/dinning/",
    photos: kitchenDiningPhotos
  },
  {
    title: "Bathroom",
    folderPath: "/images/bathroom/",
    photos: bathroomPhotos
  },
  {
    title: "Backyard",
    folderPath: "/images/backyard/",
    photos: backyardPhotos
  }
];