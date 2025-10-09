import React from "react";
import MobileCategoryAccordion from "./MobileCategoryAccordion";
import DesktopCategoryFilters from "./DesktopCategoryFilters";

const CategoryFilters = ({ 
  isDropdownOpen, 
  toggleDropdown, 
  getActiveFilter, 
  categoryFilters, 
  handleCategoryClick 
}) => {
  return (
    <>
      {/* Mobile Accordion */}
      <MobileCategoryAccordion
        isDropdownOpen={isDropdownOpen}
        toggleDropdown={toggleDropdown}
        getActiveFilter={getActiveFilter}
        categoryFilters={categoryFilters}
        handleCategoryClick={handleCategoryClick}
      />

      {/* Desktop Category Filters */}
      <DesktopCategoryFilters
        categoryFilters={categoryFilters}
        handleCategoryClick={handleCategoryClick}
      />
    </>
  );
};

export default CategoryFilters;
