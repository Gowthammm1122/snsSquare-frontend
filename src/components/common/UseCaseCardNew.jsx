import React from "react";

const UseCaseCardNew = ({ 
  title = "Demand Forecasting", 
  description = "Lorem ipsum dolor sit amet consectetur. In a posuere elit in in congue mi.",
  image,
  onClick,
  className = ""
}) => {
  return (
    <div 
      className={`group w-full max-w-full bg-white rounded-[4px] border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col ${className}`}
      onClick={onClick}
    >
      {/* Upper section: show image if provided, otherwise fallback to decorative design */}
      {image ? (
        <div className="relative w-full bg-[#e6edfc] overflow-hidden aspect-[16/9] sm:aspect-[16/9]  sm:p-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain sm:object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            sizes="(max-width: 320px) 280px, (max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, (max-width: 2560px) 25vw, 20vw"
          />
        </div>
      ) : (
        <div className="relative w-full bg-[#e6edfc] overflow-hidden aspect-[16/9] sm:aspect-[16/9]">
          {/* Circular elements positioned in top-left quadrant */}
          <div className="absolute -left-8 -top-8 w-32 h-32 border-4 border-[#c7d2fe] rounded-full opacity-60"></div>
          <div className="absolute -left-4 -top-4 w-16 h-16 bg-[#c7d2fe] rounded-full opacity-80"></div>
          
          {/* Optional: Add an icon or image in the center-right area */}
          <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {/* Lower section with white background and text */}
      <div className="p-4 sm:p-5 md:p-6 bg-white flex flex-col flex-1">
        <h5 className="text-gray-900 mb-2  leading-tight">
          {title}
        </h5>
        <p className="text-gray-600 leading-relaxed mt-4 w-full">
  {description.length > 50 ? description.slice(0, 50) + "..." : description}
</p>
      </div>
    </div>
  );
};

export default UseCaseCardNew;
