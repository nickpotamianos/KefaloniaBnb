import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      
      toast({
        title: "Subscribed successfully!",
        description: "Thank you for subscribing to our newsletter.",
        variant: "default",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Failed to subscribe",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#2C5F89] py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between bg-[#3B83BD] p-8 rounded-lg shadow-md">
          <div className="md:w-2/3 mb-6 md:mb-0">
            <h3 className="text-2xl text-white font-bold playfair mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-white opacity-90">Get exclusive offers, availability updates, and local tips for your Kefalonian vacation.</p>
          </div>
          <div className="md:w-1/3">
            <form className="flex" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-l-lg w-full focus:outline-none border-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
                aria-label="Email address for newsletter"
              />
              <Button 
                type="submit" 
                className="bg-[#D17A46] hover:bg-[#A65C32] text-white px-4 py-3 rounded-r-lg transition duration-300"
                disabled={isSubmitting}
              >
                <span className="hidden sm:inline">Subscribe</span>
                <span className="sm:hidden">→</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
