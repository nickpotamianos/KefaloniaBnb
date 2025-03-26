import { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/constants";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 focus:outline-none"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-bold text-gray-800 text-left">{question}</h3>
        <ChevronDown 
          className={cn(
            "h-6 w-6 text-[#3B83BD] transition-transform duration-200",
            isOpen && "transform rotate-180"
          )} 
        />
      </button>
      <div 
        className={cn(
          "px-6 pb-6 transition-all duration-200 overflow-hidden",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <p className="text-gray-700">{answer}</p>
      </div>
    </div>
  );
};

const FaqSection = () => {
  return (
    <section className="py-20 px-4 bg-[#F8F6F2]">
      <div className="container mx-auto max-w-4xl">
        <Heading
          title="Frequently Asked Questions"
          description="Find answers to common questions about our villa and your stay in Kefalonia."
          centered
        />
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <FaqItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-700 mb-4">Can't find the answer you're looking for?</p>
          <a 
            href="#contact" 
            className="inline-block text-[#3B83BD] hover:text-[#2C5F89] font-medium"
          >
            Contact us with your question
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
