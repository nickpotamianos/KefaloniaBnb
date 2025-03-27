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
  { src: "/images/master_bedroom/master.png", alt: "Master bedroom main view" },
  { src: "/images/master_bedroom/_83A0303.jpg", alt: "Master bedroom bed" },
  { src: "/images/master_bedroom/_MG_2453.jpg", alt: "Master bedroom details" },
  { src: "/images/master_bedroom/_83A0632.jpg", alt: "Master bedroom details" },
  { src: "/images/master_bedroom/_83A0638.jpg", alt: "Master bedroom closet" },

];

// Bedroom photos
const bedroomPhotos: Photo[] = [
  { src: "/images/room2/_83A0211.jpg", alt: "Second bedroom main view" },
  { src: "/images/room2/_83A0228.jpg", alt: "Second bedroom bed" },
  { src: "/images/room2/_83A0236.jpg", alt: "Second bedroom window" },
];

// Living room photos
const livingRoomPhotos: Photo[] = [
  { src: "/images/living_room/_83A0046.jpg", alt: "Living room view 1" },
  { src: "/images/living_room/_83A0113.jpg", alt: "Living room view 2" },
  { src: "/images/living_room/_83A0121.jpg", alt: "Living room view 3" },
  { src: "/images/living_room/_83A0128.jpg", alt: "Living room view 4" },
  { src: "/images/living_room/_83A0140.jpg", alt: "Living room view 5" },
  { src: "/images/living_room/_83A0148.jpg", alt: "Living room view 6" },
  { src: "/images/living_room/_83A0167.jpg", alt: "Living room view 7" },
  { src: "/images/living_room/_83A0193.jpg", alt: "Living room view 8" },
  { src: "/images/living_room/_83A0198.jpg", alt: "Living room view 9" },
  { src: "/images/living_room/_83A0316.jpg", alt: "Living room view 10" },
  { src: "/images/living_room/_83A0318.jpg", alt: "Living room view 11" },
  { src: "/images/living_room/_83A0332.jpg", alt: "Living room view 12" },
];

// Kitchen/dining photos
const kitchenDiningPhotos: Photo[] = [
  { src: "/images/dinning/_83A0646.jpg", alt: "Dining area view 1" },
  { src: "/images/dinning/_83A0651.jpg", alt: "Dining area view 2" },
  { src: "/images/dinning/_83A0656.jpg", alt: "Dining area view 3" },
  { src: "/images/dinning/_83A0666.jpg", alt: "Dining area view 4" },
  { src: "/images/dinning/_83A0681.jpg", alt: "Dining area view 5" },
  { src: "/images/dinning/_83A0691.jpg", alt: "Dining area view 6" },
  { src: "/images/dinning/_83A0756.jpg", alt: "Dining area view 7" },
  { src: "/images/dinning/_83A0766.jpg", alt: "Dining area view 8" },
  { src: "/images/dinning/_83A0771.jpg", alt: "Dining area view 9" },
  { src: "/images/dinning/_83A0781.jpg", alt: "Dining area view 10" },
  { src: "/images/dinning/_83A0786.jpg", alt: "Dining area view 11" },
  { src: "/images/dinning/_83A0843.jpg", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0693.jpg", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0703.jpg", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0713.jpg", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0721.jpg", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0736.jpg", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0738.jpg", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0743.jpg", alt: "Dining area view 12" },
  { src: "/images/kitchen/_83A0751.jpg", alt: "Dining area view 12" },
];

// Bathroom photos
const bathroomPhotos: Photo[] = [
  { src: "/images/bathroom/_83A0836.jpg", alt: "Bathroom main view" },
  { src: "/images/bathroom/_83A0816.jpg", alt: "Bathroom sink" },
  { src: "/images/bathroom/_83A0796.jpg", alt: "Bathroom shower" },
  { src: "/images/bathroom/_83A0818.jpg", alt: "Bathroom details" },
];

// Backyard photos
const backyardPhotos: Photo[] = [
  { src: "/images/backyard/_83A0458.jpg", alt: "Backyard view 1" },
  { src: "/images/backyard/_83A0448.jpg", alt: "Backyard view 2" },
  { src: "/images/backyard/_83A0040.jpg", alt: "Backyard view 3" },
  { src: "/images/backyard/_83A0468.jpg", alt: "Backyard view 4" },
  { src: "/images/backyard/_83A0473.jpg", alt: "Backyard view 5" },
  { src: "/images/backyard/_83A0483.jpg", alt: "Backyard view 6" },
  { src: "/images/backyard/_83A0493.jpg", alt: "Backyard view 7" },
  { src: "/images/backyard/_83A0498.jpg", alt: "Backyard view 8" },
  { src: "/images/backyard/_83A0515.jpg", alt: "Backyard view 9" },
  { src: "/images/backyard/_83A0518.jpg", alt: "Backyard view 10" },
  { src: "/images/backyard/_83A0523.jpg", alt: "Backyard view 11" },
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