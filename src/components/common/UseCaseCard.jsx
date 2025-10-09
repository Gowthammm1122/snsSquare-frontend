import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// Button component
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// Card components
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const UseCaseCard = ({ useCase, onLearnMore }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [isActive, setIsActive] = useState(false); // for mobile tap visual effect

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Handle card click - navigate to detail page
  const handleCardClick = () => {
    onLearnMore(useCase.id);
  };

  return (
    <Card
      className={
        `group flex flex-col w-full max-w-none mx-auto items-start p-4 md:p-5 bg-white rounded-3xl overflow-hidden shadow-[0px_2px_16px_#10182814] border-0 h-full transition-all duration-300 relative group cursor-pointer ` +
        `md:hover:shadow-blue-100 md:hover:-translate-y-3 md:hover:scale-[1.02] md:hover:ring-blue-200 md:hover:ring-opacity-50 ` +
        (isActive ? 'shadow-blue-100 -translate-y-3 scale-[1.02] ring-blue-200 ring-opacity-50 ' : '')
      }
      onClick={handleCardClick}
    >
      <CardContent className="flex flex-col items-start gap-6 w-full p-0 h-full">
        {useCase.image ? (
          <div className="w-full aspect-video bg-[#e6edfc] rounded-3xl overflow-hidden relative">
            <img
              src={useCase.image}
              alt={useCase.title}
              className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 320px) 280px, (max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 2560px) 25vw, 20vw"
            />
          </div>
        ) : (
          <div className="w-full aspect-video bg-[#e6edfc] rounded-3xl flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        <div className="flex flex-col w-full items-start gap-4 md:gap-[18px] flex-grow">
          <div className="flex flex-col items-start gap-3 w-full">
            <h2 className=" font-semibold text-black text-[20px] tracking-0 leading-normal">
                {useCase.title.length > 23 ? useCase.title.slice(0, 23) + '...' : useCase.title}
            </h2>

            <div className="font-inter font-normal text-[#303030] text-[14px] tracking-0 leading-normal">
              <p className={`${isExpanded ? '' : 'line-clamp-3'} transition-all duration-300`}>
                {useCase.tagline}
              </p>
              {useCase.tagline && useCase.tagline.length > 120 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpanded();
                  }}
                  className="text-[#3E57DA] hover:underline mt-1 text-sm"
                >
                  {isExpanded ? 'Show less' : 'Show more...'}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Learn More Button - Now at bottom */}
        <div className="w-full mt-auto">
          <Button
            variant="link"
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore(useCase.id);
            }}
            className={
              `font-inter font-normal text-[#3e57da] text-base md:text-[16px] tracking-0 leading-normal p-0 h-auto justify-start transition-all duration-300 no-underline hover:no-underline cursor-pointer ` +
              `md:opacity-0 md:group-hover:opacity-100 md:transform md:translate-y-2 md:group-hover:translate-y-0 ` +
              `${showLearnMore ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} md:opacity-0`
            }
          >
            Learn More
            <img src="/images/img_solar_arrow_up_linear.svg" alt="Arrow" className="w-2 h-2 xs:w-3 xs:h-3 sm:w-5 sm:h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UseCaseCard;
