import { Heading } from "@/components/ui/heading";
import ExperienceCard from "@/components/ExperienceCard";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { experiences } from "@/lib/constants";

const ExperiencesSection = () => {
  return (
    <section id="experiences" className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <Heading
          title="Experiences"
          description="Create unforgettable memories with these exceptional experiences during your stay in Kefalonia."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard 
              key={index} 
              experience={experience}
            />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Button 
            asChild 
            variant="link" 
            className="text-[#3B83BD] hover:text-[#2C5F89] font-medium items-center"
          >
            <a href="#booking">
              <span>Ready to experience it all? Book your stay now</span>
              <MoveRight className="h-5 w-5 ml-2" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;
