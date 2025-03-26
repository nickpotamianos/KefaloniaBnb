import { useState } from "react";
import { Heading } from "@/components/ui/heading";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { faqs } from "@/lib/constants";

interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

const FaqItem = ({ question, answer, defaultOpen = false }: FaqItemProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div 
      className={cn(
        "border border-gray-200 rounded-xl overflow-hidden transition-all duration-300",
        isOpen ? "bg-gradient-to-r from-[#f0f7ff] to-white shadow-md" : "bg-white hover:shadow-sm"
      )}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-6 focus:outline-none gap-4"
        aria-expanded={isOpen}
      >
        <h3 className={cn(
          "text-lg font-medium text-left transition-colors duration-200",
          isOpen ? "text-[#2C5F89] font-semibold" : "text-gray-800"
        )}>
          {question}
        </h3>
        <div className={cn(
          "flex items-center justify-center rounded-full w-8 h-8 flex-shrink-0 transition-all duration-300",
          isOpen ? "bg-[#3B83BD] text-white" : "bg-gray-100 text-[#3B83BD]"
        )}>
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </div>
      </button>
      <div 
        className={cn(
          "px-6 transition-all duration-300 overflow-hidden",
          isOpen ? "pb-6 max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="text-gray-700 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

const FaqSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-[#F8F6F2] to-[#F2F7FC]">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12">
          <Heading
            title="Frequently Asked Questions"
            description="Find answers to common questions about our vintage Kefalonian home and your stay in Greece."
            centered
          />
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            // First FAQ is open by default for better UX
            const defaultOpen = index === 0;
            return (
              <FaqItem 
                key={index} 
                question={faq.question} 
                answer={faq.answer}
                defaultOpen={defaultOpen}
              />
            );
          })}
        </div>
        
        <div className="mt-14 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <p className="text-gray-700 mb-4 font-medium">Can't find the answer you're looking for?</p>
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 bg-[#3B83BD] text-white rounded-full hover:bg-[#2C5F89] transition-colors duration-300 font-medium"
          >
            Contact us with your question
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
