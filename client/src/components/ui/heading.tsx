import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
  centered?: boolean;
}

export const Heading = ({
  title,
  description,
  className,
  descriptionClassName,
  centered = false,
}: HeadingProps) => {
  return (
    <div className={cn(
      "mb-16",
      centered && "text-center",
      className
    )}>
      <h2 className="text-4xl font-bold playfair text-[#2C5F89] mb-4">{title}</h2>
      <div className={cn("w-24 h-1 bg-[#D17A46]", centered && "mx-auto")}></div>
      {description && (
        <p className={cn(
          "text-lg mt-6 text-gray-600 max-w-2xl",
          centered && "mx-auto",
          descriptionClassName
        )}>
          {description}
        </p>
      )}
    </div>
  );
};
