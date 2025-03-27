import { Heading } from "@/components/ui/heading";
import ExperienceCard from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";
import { MoveRight, Compass } from "lucide-react";
import { experiences } from "@/lib/constants";
import { motion } from "framer-motion";

const ExperiencesSection = () => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="experiences" className="py-24 px-4 bg-gradient-to-b from-white to-[var(--off-white)]">
      <div className="container mx-auto">
        <div className="mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <span className="inline-block mb-3 px-4 py-2 bg-[var(--sea-blue)]/10 rounded-full text-[var(--primary-blue)] text-sm font-medium flex items-center">
              <Compass className="mr-1.5 h-4 w-4" />
              Unforgettable Island Adventures
            </span>
            
            <Heading
              title="Experiences in Kefalonia"
              description="Dive into the authentic Greek way of life with these handpicked experiences that will make your stay truly memorable."
              centered
            />
          </motion.div>
          
          {/* Decorative elements */}
          <div className="hidden md:block absolute -top-6 right-16 w-24 h-24 bg-[var(--sand)]/20 rounded-full blur-3xl"></div>
          <div className="hidden md:block absolute -bottom-8 left-20 w-32 h-32 bg-[var(--sea-blue)]/10 rounded-full blur-3xl"></div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {experiences.map((experience, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-block bg-white px-8 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <Button 
              asChild 
              variant="link" 
              className="text-[var(--deep-blue)] hover:text-[var(--primary-blue)] font-medium items-center text-lg"
            >
              <a href="#booking" className="flex items-center">
                <span>Ready to experience the magic of Kefalonia?</span>
                <span className="ml-2 relative group">
                  <span className="absolute -inset-1 rounded-full bg-[var(--sea-blue)]/10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                  <MoveRight className="h-5 w-5 relative z-10" />
                </span>
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
