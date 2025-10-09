import React from "react";
import Button from "../../common/Button2";

const DesktopCategoryFilters = ({ categoryFilters, handleCategoryClick }) => {
  return (
    <div className="hidden lg:flex flex-col w-full lg:w-95 items-start gap-4 mb-10 ">
      {categoryFilters.map((filter) => (
        <Button
          key={filter.id}
          variant="ghost"
          onClick={() => handleCategoryClick(filter.id)}
          className={`flex items-center justify-start gap-2.5 pl-4 pr-6 py-5 md:py-7 w-full rounded-2xl overflow-hidden focus:outline-none focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0 active:outline-none active:ring-0 border-none outline-none ${
            filter.isActive ? "bg-[#e6edfc]" : "bg-transparent"
          }`}
          style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
        >
          <img
            className="w-6 h-6 md:w-8 md:h-8"
            alt="Category icon"
            src={filter.icon}
            style={{
              opacity: filter.isActive ? 1 : 0.6,
              transition: 'opacity 0.3s ease'
            }}
          />

          <div
            className={`font-Manrope font-semibold text-base md:text-lg tracking-[-0.60px] leading-6 whitespace-nowrap text-left ${
              filter.isActive ? "text-[#064EE3]" : "text-[#04040469]"
            }`}
          >
            {filter.label}
          </div>
        </Button>
      ))}
    </div>
  );
};

export default DesktopCategoryFilters;
