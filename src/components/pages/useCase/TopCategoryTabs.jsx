import React from "react";
import Button from "../../common/BlackButton";

const TopCategoryTabs = ({ categoryFilters, handleCategoryClick }) => {
  return (
    <div className="w-full max-w-[1300px] mx-auto">
      {/* Section Title */}
      <p className="text-center mb-4 md:mb-8 ">
        Explore your business sector
      </p>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12 mt-10">
        {categoryFilters.map((filter) => (
          <Button
            key={filter.id}
            onClick={() => handleCategoryClick(filter.id)}
            variant={filter.isActive ? "black" : "black-outline"}
            size="medium"
            className="flex items-center gap-2 group"
          >
            <img
              className={`w-5 h-5 md:w-6 md:h-6 transition-all duration-200
                ${
                  filter.isActive
                    ? "invert brightness-0 saturate-100" // White when active
                    : "brightness-95 contrast-95 opacity-70 group-hover:invert-0 group-hover:brightness-95 group-hover:contrast-95"
                }`}
              alt="Category icon"
              src={filter.icon}
              style={{
                opacity: filter.isActive ? 1 : 0.7,
                transition: 'opacity 0.3s ease'
              }}
            />
            <span className="font-medium text-sm md:text-base whitespace-nowrap">
              {filter.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TopCategoryTabs;
