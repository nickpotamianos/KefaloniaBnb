import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const BookingCard = () => {
  return (
    <div className="sticky top-24">
      <Card className="bg-[#E6D9C0] p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-4">Book Your Stay at Kefalonian Vintage Home</h3>
        <div className="space-y-2 mb-4" aria-label="Accommodation details">
          <p className="font-medium text-gray-700"><span className="font-bold">Host:</span> Alex (Superhost, 4.67★)</p>
          <p className="font-medium text-gray-700"><span className="font-bold">Capacity:</span> 5 guests</p>
          <p className="font-medium text-gray-700"><span className="font-bold">Bedrooms:</span> 2 (1 master, 1 guest)</p>
          <p className="font-medium text-gray-700"><span className="font-bold">Beds:</span> 5 (2 double, 1 single, 2 sofa beds)</p>
          <p className="font-medium text-gray-700"><span className="font-bold">Bathrooms:</span> 1 </p>
          <p className="font-medium text-gray-700"><span className="font-bold">Languages:</span> English, Greek</p>
          <p className="font-medium text-gray-700"><span className="font-bold">Location:</span> Fiscardo, Kefalonia, Greece</p>
        </div>
        <hr className="border-[#C5B69E] my-4" aria-hidden="true" />
        <div className="mb-4">
          <h4 className="font-bold text-gray-700 mb-2">Availability for 2025:</h4>
          <p className="text-gray-700">Check our calendar for available dates. Summer season (June-September) books quickly!</p>
        </div>
        <Button asChild className="w-full bg-[#D17A46] hover:bg-[#A65C32] mb-4 py-6" aria-label="Book on Airbnb">
          <a href="https://airbnb.com/h/kefalonianvintagehome" target="_blank" rel="noopener noreferrer">
            Book on Airbnb - Kefalonian Vintage Home
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full bg-white text-[#3B83BD] border-[#3B83BD] py-6" aria-label="Contact for direct booking">
          <a href="#contact">Contact Us for Direct Booking Options</a>
        </Button>
        <div className="mt-6 text-sm text-gray-600">
          <p>Have questions about our traditional Kefalonian house?</p>
          <p>Call us at: <a href="tel:+306948201383" className="font-bold hover:text-[#3B83BD] transition-colors">+30 694 820 1383</a></p>
        </div>
      </Card>
    </div>
  );
};

export default BookingCard;
