import { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  subject: z.string(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  privacy: z.boolean().refine(val => val === true, { message: "You must agree to the privacy policy" })
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "Booking Inquiry",
      message: "",
      privacy: false
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-[#F8F6F2] to-[#F8F6F2]">
      <div className="container mx-auto">
        <Heading
          title="Contact Us"
          description="Have questions about our villa or need assistance with your booking? We're here to help!"
          centered
        />
        
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-6">Get in Touch</h3>
            <p className="text-gray-700 mb-8">
              We pride ourselves on providing exceptional service to all our guests. Feel free to reach out with any questions, special requests, or for assistance planning your Kefalonian adventure.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-[#D17A46] flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-800">Email</h4>
                  <a href="mailto:info@villakefalonia.com" className="text-[#3B83BD] hover:text-[#2C5F89] transition duration-300">info@villakefalonia.com</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-[#D17A46] flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-800">Phone</h4>
                  <a href="tel:+306948201383" className="text-[#3B83BD] hover:text-[#2C5F89] transition duration-300">+30 694 820 1383</a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MessageSquare className="h-6 w-6 text-[#D17A46] flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-gray-800">Response Time</h4>
                  <p className="text-gray-700">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h4 className="text-xl font-bold text-[#2C5F89] mb-4 playfair">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/kefalonianvintagehome" className="text-[#3B83BD] hover:text-[#2C5F89] transition duration-300" aria-label="Follow us on Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.057 1.805.249 2.227.419.562.217.96.477 1.382.896.419.42.679.819.896 1.381.17.422.363 1.057.42 2.227.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.057 1.17-.249 1.805-.419 2.227-.217.562-.477.96-.896 1.382-.419.419-.819.679-1.381.896-.422.17-1.057.363-2.227.42-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.057-1.805-.249-2.227-.419-.562-.217-.96-.477-1.382-.896-.419-.419-.679-.819-.896-1.381-.17-.422-.363-1.057-.42-2.227-.058-1.266-.07-1.645-.07-4.85s.012-3.584.07-4.85c.057-1.17.249-1.805.419-2.227.217-.562.477-.96.896-1.382.419-.419.819-.679 1.381-.896.422-.17 1.057-.363 2.227-.42 1.266-.058 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.277.06-2.148.262-2.913.558-.789.306-1.459.717-2.126 1.384s-1.079 1.336-1.384 2.126c-.296.765-.499 1.636-.558 2.913-.058 1.28-.072 1.689-.072 4.948 0 3.259.014 3.668.072 4.948.06 1.277.262 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126-.667-.667-1.335-1.079-2.126-1.384-.765-.297-1.636-.499-2.913-.558-1.28-.058-1.689-.072-4.949-.072h.003z"></path>
                    <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4z"></path>
                    <circle cx="18.406" cy="5.594" r="1.44"></circle>
                  </svg>
                </a>
                <a href="https://www.facebook.com/kefalonianvintagehome" className="text-[#3B83BD] hover:text-[#2C5F89] transition duration-300" aria-label="Follow us on Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-[#FFFFFF] rounded-lg">
              <h4 className="text-xl font-bold text-[#2C5F89] mb-4 playfair">Your Host</h4>
              <div className="flex items-start">
                <img src="/images/alex.png" alt="Host photo" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h5 className="font-bold text-gray-800">Alex</h5>
                  <p className="text-gray-700 mt-1">
                    Having lived for decades in Kefalonia, I'm passionate about sharing the beauty of my island with visitors from around the world. I'll ensure your stay is comfortable, memorable, and authentic.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg p-8 shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold playfair text-[#2C5F89] mb-6">Send a Message</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Your Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#A65C32]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="your@email.com" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#A65C32]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Phone Number (optional)</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel" 
                          placeholder="+1 (123) 456-7890" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#A65C32]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Subject</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#A65C32]">
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Booking Inquiry">Booking Inquiry</SelectItem>
                          <SelectItem value="Availability Question">Availability Question</SelectItem>
                          <SelectItem value="Special Requests">Special Requests</SelectItem>
                          <SelectItem value="General Information">General Information</SelectItem>
                          <SelectItem value="Feedback">Feedback</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us how we can help you..." 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#A65C32]" 
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="privacy"
                  render={({ field }) => (
                    <FormItem className="mb-6 flex items-center space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="text-[#3B83BD]"
                        />
                      </FormControl>
                      <FormLabel className="text-sm text-gray-700 font-normal leading-none">
                        I agree to the <a href="#" className="text-[#3B83BD] hover:text-[#2C5F89] underline">Privacy Policy</a> and consent to being contacted regarding my inquiry.
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#D17A46] hover:bg-[#A65C32] text-white font-medium py-3 rounded-lg transition duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                
                <p className="text-sm text-gray-600 mt-4">
                  We respect your privacy and will never share your information with third parties. This contact form is GDPR compliant.
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
