import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const BookingCard = () => {
  return (
    <div className="sticky top-24">
      <Card className="bg-[#E6D9C0] p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-4">Book Your Stay</h3>
        <p className="text-gray-700 mb-4">Starting from €280 per night</p>
        <hr className="border-[#C5B69E] my-4" />
        <div className="mb-4">
          <p className="font-bold text-gray-700 mb-2">Availability:</p>
          <p className="text-gray-700">Check our calendar for available dates. Summer season books quickly!</p>
        </div>
        <Button asChild className="w-full bg-[#D17A46] hover:bg-[#A65C32] mb-4 py-6">
          <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer">Book on Airbnb</a>
        </Button>
        <Button asChild variant="outline" className="w-full bg-white text-[#3B83BD] border-[#3B83BD] py-6">
          <a href="#contact">Contact Us Directly</a>
        </Button>
        <div className="mt-6 text-sm text-gray-600">
          <p>Have questions before booking?</p>
          <p>Call us at: <span className="font-bold">+30 123 456 7890</span></p>
        </div>
      </Card>
    </div>
  );
};

export default BookingCard;
