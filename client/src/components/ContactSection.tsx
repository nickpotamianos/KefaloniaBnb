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
import { Mail, Phone, MessageSquare, Clock, Instagram, Facebook, Globe, Calendar, Languages } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";

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
    <section id="contact" className="py-24 px-4 bg-gradient-to-b from-white to-[var(--off-white)]">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block mb-3 px-4 py-2 bg-[var(--terracotta)]/10 rounded-full text-[var(--terracotta)] text-sm font-medium flex items-center justify-center mx-auto">
            <MessageSquare className="mr-1.5 h-4 w-4" />
            We're Here For You
          </span>
          
          <Heading
            title="Contact Us"
            description="Have questions about our villa or need assistance with your booking? We're here to help you plan your perfect Kefalonian getaway!"
            centered
          />
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-12 mt-16">
          {/* Contact Information */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold playfair text-[var(--deep-blue)] mb-6 relative">
                  <span className="relative">
                    Get in Touch
                    <span className="absolute -bottom-1 left-0 h-1 w-12 bg-[var(--terracotta)] rounded-full"></span>
                  </span>
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We pride ourselves on providing exceptional service to all our guests. Feel free to reach out with any questions, special requests, or for assistance planning your Kefalonian adventure. We're always happy to share local insights and recommendations!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-t border-l border-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg flex-shrink-0">
                      <Mail className="h-6 w-6 text-[var(--primary-blue)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                      <a 
                        href="mailto:info@villakefalonia.com" 
                        className="text-[var(--primary-blue)] hover:text-[var(--deep-blue)] transition duration-300 flex items-center"
                      >
                        info@villakefalonia.com
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-t border-l border-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg flex-shrink-0">
                      <Phone className="h-6 w-6 text-[var(--primary-blue)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                      <a 
                        href="tel:+306948201383" 
                        className="text-[var(--primary-blue)] hover:text-[var(--deep-blue)] transition duration-300"
                      >
                        +30 694 820 1383
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-t border-l border-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg flex-shrink-0">
                      <Clock className="h-6 w-6 text-[var(--primary-blue)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Response Time</h4>
                      <p className="text-gray-700">We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border-t border-l border-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[var(--sea-blue)]/10 p-3 rounded-lg flex-shrink-0">
                      <Languages className="h-6 w-6 text-[var(--primary-blue)]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Languages</h4>
                      <p className="text-gray-700">English, Greek</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-[var(--sand)]/20 p-6 rounded-xl border border-[var(--sand)]/30">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-5 w-5 text-[var(--terracotta)]" />
                  <h4 className="font-bold text-gray-800">Booking Questions</h4>
                </div>
                <p className="text-gray-700 mb-4">
                  Planning a stay at our Kefalonian villa? We're happy to answer any questions about availability, rates, and special requests.
                </p>
                <Button 
                  asChild
                  variant="outline" 
                  className="bg-white text-[var(--deep-blue)] border-[var(--deep-blue)] hover:bg-[var(--deep-blue)]/5 rounded-full"
                >
                  <a href="#booking">Check Availability</a>
                </Button>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold playfair text-[var(--deep-blue)] mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/kefalonianvintagehome" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] text-[var(--primary-blue)]" 
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.facebook.com/kefalonianvintagehome" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] text-[var(--primary-blue)]" 
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a 
                    href="https://www.airbnb.com/h/kefalonianvintagehome" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] text-[var(--primary-blue)]" 
                    aria-label="View our Airbnb listing"
                  >
                    <Globe className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="glass-card p-6 rounded-xl">
                <h4 className="text-xl font-semibold playfair text-[var(--deep-blue)] mb-4">Your Host</h4>
                <div className="flex items-start gap-4">
                  <img src="/images/alex.png" alt="Host photo" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md" />
                  <div>
                    <h5 className="font-bold text-gray-800 text-lg mb-1">Alex</h5>
                    <div className="flex items-center text-sm text-[var(--terracotta)] mb-3">
                      <span className="font-medium">Superhost</span>
                      <span className="mx-2">•</span>
                      <span>4.67★</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">
                      Having lived for decades in Kefalonia, I'm passionate about sharing the beauty of my island with visitors from around the world. I'll ensure your stay is comfortable, memorable, and authentic.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="glass-card rounded-xl p-8 shadow-md border-t border-l border-white/20">
                <h3 className="text-2xl font-semibold playfair text-[var(--deep-blue)] mb-6 relative">
                  <span className="relative">
                    Send a Message
                    <span className="absolute -bottom-1 left-0 h-1 w-12 bg-[var(--terracotta)] rounded-full"></span>
                  </span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Your Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--terracotta)]" 
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
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--terracotta)]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Phone Number (optional)</FormLabel>
                        <FormControl>
                          <Input 
                            type="tel" 
                            placeholder="+1 (123) 456-7890" 
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--terracotta)]" 
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
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--terracotta)]">
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Booking Inquiry">Booking Inquiry</SelectItem>
                            <SelectItem value="Availability Question">Availability Question</SelectItem>
                            <SelectItem value="Special Requests">Special Requests</SelectItem>
                            <SelectItem value="Transportation Help">Transportation Help</SelectItem>
                            <SelectItem value="Local Recommendations">Local Recommendations</SelectItem>
                            <SelectItem value="General Information">General Information</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us how we can help you plan your perfect Kefalonian vacation..." 
                          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[var(--terracotta)]" 
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
                    <FormItem className="mb-6 flex items-start space-x-3">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1 text-[var(--terracotta)]"
                        />
                      </FormControl>
                      <div className="space-y-1">
                        <FormLabel className="text-sm text-gray-700 font-normal leading-relaxed">
                          I agree to the <a href="#" className="text-[var(--primary-blue)] hover:text-[var(--deep-blue)] underline">Privacy Policy</a> and consent to being contacted regarding my inquiry.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[var(--terracotta)] hover:bg-[var(--terracotta)]/90 text-white font-medium py-6 rounded-lg transition duration-300 shadow-sm hover:shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                
                <p className="text-sm text-gray-600 mt-4 text-center">
                  We respect your privacy and will never share your information with third parties.
                </p>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
