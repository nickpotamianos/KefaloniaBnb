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
    <section id="contact" className="py-20 px-4 bg-white">
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
                  <a href="tel:+3012345678" className="text-[#3B83BD] hover:text-[#2C5F89] transition duration-300">+30 123 456 7890</a>
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
                <a href="#" className="text-[#3B83BD] hover:text-[#2C5F89] transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.057 1.805.249 2.227.419.562.217.96.477 1.382.896.419.42.679.819.896 1.381.17.422.363 1.057.42 2.227.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.85c-.057 1.17-.249 1.805-.419 2.227-.217.562-.477.96-.896 1.382-.419.419-.819.679-1.381.896-.422.17-1.057.363-2.227.42-1.266.058-1.645.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.057-1.805-.249-2.227-.419-.562-.217-.96-.477-1.382-.896-.419-.419-.679-.819-.896-1.381-.17-.422-.363-1.057-.42-2.227-.058-1.266-.07-1.645-.07-4.85s.012-3.584.07-4.85c.057-1.17.249-1.805.419-2.227.217-.562.477-.96.896-1.382.419-.419.819-.679 1.381-.896.422-.17 1.057-.363 2.227-.42 1.266-.058 1.645-.07 4.85-.07zm0 2.163c-3.191 0-3.569.016-4.805.07-1.152.055-1.776.239-2.191.395-.522.217-.95.478-1.377.905-.427.427-.688.855-.905 1.376-.158.416-.34 1.04-.395 2.192-.055 1.237-.07 1.615-.07 4.806s.015 3.569.07 4.805c.055 1.152.239 1.776.395 2.191.216.522.478.95.905 1.377.427.427.855.688 1.376.905.416.158 1.04.34 2.192.395 1.237.055 1.615.07 4.806.07s3.569-.015 4.805-.07c1.152-.055 1.776-.239 2.191-.395.522-.216.95-.478 1.377-.905.427-.427.688-.855.905-1.376.158-.416.34-1.04.395-2.192.055-1.237.07-1.615.07-4.806s-.015-3.569-.07-4.805c-.055-1.152-.239-1.776-.395-2.191-.216-.522-.478-.95-.905-1.377-.427-.427-.855-.688-1.376-.905-.416-.158-1.04-.34-2.192-.395-1.237-.055-1.615-.07-4.806-.07z"/>
                    <path d="M12 6.865c-2.838 0-5.135 2.297-5.135 5.135s2.297 5.135 5.135 5.135 5.135-2.297 5.135-5.135-2.297-5.135-5.135-5.135zm0 8.468c-1.84 0-3.333-1.493-3.333-3.333s1.493-3.333 3.333-3.333 3.333 1.493 3.333 3.333-1.493 3.333-3.333 3.333z"/>
                    <circle cx="17.375" cy="6.625" r="1.205"/>
                  </svg>
                </a>
                <a href="#" className="text-[#3B83BD] hover:text-[#2C5F89] transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                  </svg>
                </a>
                <a href="#" className="text-[#3B83BD] hover:text-[#2C5F89] transition duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.059 10.059 0 01-3.12 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-[#F8F6F2] rounded-lg">
              <h4 className="text-xl font-bold text-[#2C5F89] mb-4 playfair">Your Host</h4>
              <div className="flex items-start">
                <img src="https://randomuser.me/api/portraits/women/23.jpg" alt="Host photo" className="w-16 h-16 rounded-full mr-4" />
                <div>
                  <h5 className="font-bold text-gray-800">Elena</h5>
                  <p className="text-gray-700 mt-1">
                    Born and raised in Kefalonia, I'm passionate about sharing the beauty of my island with visitors from around the world. I'll ensure your stay is comfortable, memorable, and authentic.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-[#F8F6F2] rounded-lg p-8 shadow-sm">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B83BD]" 
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B83BD]" 
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B83BD]" 
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
                          <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B83BD]">
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
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B83BD]" 
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
                    <FormItem className="mb-6 flex items-start space-x-2">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mr-2 text-[#3B83BD]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-700">
                          I agree to the <a href="#" className="text-[#3B83BD] hover:text-[#2C5F89] underline">Privacy Policy</a> and consent to being contacted regarding my inquiry.
                        </FormLabel>
                        <FormMessage />
                      </div>
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
