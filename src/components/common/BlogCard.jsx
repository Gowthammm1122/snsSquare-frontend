import React from "react";

const BlogCard = ({ 
  title = "Blog Title", 
  description = "Blog description",
  image,
  onClick,
  className = "",
  badge = null,
  date = "",
  readTime = ""
}) => {
  return (
    <div 
      className={`group w-full bg-white rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full ${className}`}
      onClick={onClick}
    >
      {/* Upper section: show image if provided, otherwise fallback to decorative design */}
      {image ? (
        <div className="relative w-full bg-[#e6edfc] overflow-hidden aspect-[16/8]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badge overlay for image */}
          {badge && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                {badge}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full bg-[#e6edfc] overflow-hidden aspect-[16/8]">
          {/* Circular elements positioned in top-left quadrant */}
          <div className="absolute -left-6 -top-6 w-24 h-24 border-3 border-[#c7d2fe] rounded-full opacity-60"></div>
          <div className="absolute -left-3 -top-3 w-12 h-12 bg-[#c7d2fe] rounded-full opacity-80"></div>
          
          {/* Badge overlay for decorative background */}
          {badge && (
            <div className="absolute top-3 right-3 z-10">
              <span className="bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Lower section with white background and text */}
      <div className="p-4 bg-white flex flex-col flex-1 justify-between">
        <div className="flex-1">
          <h5 className="text-gray-900 mb-2 leading-tight">
            {title}
          </h5>
          <div 
            className="text-gray-600 leading-relaxed mt-6" 
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
        
        {/* Blog metadata */}
        {(date || readTime) && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            {date && (
              <span className="text-xs text-gray-500">{date}</span>
            )}
            {readTime && (
              <span className="text-xs text-gray-500">{readTime}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
