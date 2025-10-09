import React from "react";

const MobileCategoryAccordion = ({ 
  isDropdownOpen, 
  toggleDropdown, 
  getActiveFilter, 
  categoryFilters, 
  handleCategoryClick 
}) => {
  return (
    <div className="block lg:hidden w-full mb-6">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full px-4 py-4 hover:bg-gray-50 transition-colors duration-200"
        >
          <div className="flex items-center gap-3">
            <img
              className="w-6 h-6"
              alt="Category icon"
              src={getActiveFilter()?.icon}
              style={{
                opacity: 1,
                transition: 'opacity 0.3s ease'
              }}
            />
            <span className="font-Manrope font-semibold text-base text-[#064EE3]">
              {getActiveFilter()?.label}
            </span>
          </div>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="border-t border-gray-100">
            {categoryFilters.filter(filter => !filter.isActive).map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleCategoryClick(filter.id)}
                className="flex items-center gap-3 w-full px-4 py-5 text-left hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0"
              >
                <img
                  className="w-6 h-6"
                  alt="Category icon"
                  src={filter.icon}
                  style={{
                    opacity: 0.6,
                    transition: 'opacity 0.3s ease'
                  }}
                />
                <span className="font-Manrope font-semibold text-base text-[#04040469]">
                  {filter.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCategoryAccordion;
