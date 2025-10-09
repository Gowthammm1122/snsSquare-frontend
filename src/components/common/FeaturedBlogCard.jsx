import React from "react";

const FeaturedBlogCard = ({
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
      className={`group w-full  rounded-lg border border-gray-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full ${className}`}
      onClick={onClick}
    >
      {/* Upper section: show image if provided, otherwise fallback to decorative design */}
      {image ? (
        <div className="relative w-full bg-[#e6edfc] overflow-hidden aspect-[16/9]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          {/* Badge overlay for image */}
          {badge && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                {badge}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-full bg-[#e6edfc] overflow-hidden aspect-[16/9]">
          {/* Circular elements positioned in top-left quadrant */}
          <div className="absolute -left-8 -top-8 w-32 h-32 border-4 border-[#c7d2fe] rounded-full opacity-60"></div>
          <div className="absolute -left-4 -top-4 w-16 h-16 bg-[#c7d2fe] rounded-full opacity-80"></div>

          {/* Badge overlay for decorative background */}
          {badge && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                {badge}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Lower section with white background and text */}
      <div className="p-6 bg-white flex flex-col flex-1 justify-between">
      <div className="flex-1">
  <div className="pb-6">
    <h3 className="text-gray-900 leading-tight m-0">{title}</h3>
  </div>
  <div 
    className="text-gray-600 leading-relaxed m-0" 
    dangerouslySetInnerHTML={{ __html: description }}
  />
</div>


        {/* Blog metadata */}
        {(date || readTime) && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            {date && (
              <span className="text-sm text-gray-500">{date}</span>
            )}
            {readTime && (
              <span className="text-sm text-gray-500">{readTime}</span>
            )}
          </div>
        )}
      </div>
    </div >
  );
};

export default FeaturedBlogCard;
