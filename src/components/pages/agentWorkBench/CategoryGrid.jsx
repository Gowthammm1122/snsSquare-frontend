import React from "react";
import CategoryCard from "./CategoryCard";

const CategoryGrid = ({ data, onLearnMore, showCounts = true, showExploreMore = true, initialShowCount = 6 }) => {
  const [showAll, setShowAll] = React.useState(false);

  const allCategories = [
    ...(data?.foundational || []),
    ...(data?.industry || [])
  ];

  const categoriesToShow = showAll ? allCategories : allCategories.slice(0, initialShowCount);
  const hasMoreCategories = allCategories.length > initialShowCount;

  const handleExploreMore = () => {
    setShowAll(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
        {categoriesToShow.map((category) => (
          <CategoryCard
            key={category?.id}
            category={category}
            onLearnMore={onLearnMore}
            showCount={showCounts}
          />
        ))}
      </div>

      {showExploreMore && hasMoreCategories && !showAll && (
        <div className="flex justify-center">
          <button
            onClick={handleExploreMore}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explore More
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
