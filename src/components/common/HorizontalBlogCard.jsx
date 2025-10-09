import React from "react";

const HorizontalBlogCard = ({ 
  title = "Blog Title", 
  description = "Blog description",
  image,
  onClick,
  className = "",
  badge = null,
  date = "",
}) => {
  return (
    <div 
      className={`group w-full bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex h-full relative ${className}`}
      onClick={onClick}
    >
      {/* Badge overlay in top right corner */}
      {badge && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
            {badge}
          </span>
        </div>
      )}
      
      {/* Left side: Responsive image */}
      <div className="flex-shrink-0 w-40 h-42 sm:w-60 sm:h-60 bg-[#e6edfc] rounded-lg overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#e6edfc] to-[#c7d2fe] flex items-center justify-center">
            {/* Small decorative elements - responsive size */}
            <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#c7d2fe] rounded-full opacity-60"></div>
          </div>
        )}
      </div>
      
      {/* Right side: Text content */}
      <div className="flex-1 p-3 sm:p-4 bg-white flex flex-col justify-between min-w-0 pt-8 sm:py-8">
        <div className="flex-1">
          <div className="pb-2 sm:pb-4">
          <h5 className="text-sm sm:text-base text-gray-900 mb-1 leading-tight line-clamp-2 font-medium">
            {title}
          </h5>
          </div>
          <div 
            className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1 line-clamp-2" 
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        
        {/* Blog metadata */}
        {date && (
          <div className="flex items-center mt-2 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500 flex items-center">
              <span className="w-1 h-1 bg-gray-500 rounded-full mr-2"></span>
              {date}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalBlogCard;