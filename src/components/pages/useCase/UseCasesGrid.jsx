import React from "react";
import UseCaseCardNew from "../../common/UseCaseCardNew";
import Button from "../../common/Button2";

const UseCasesGrid = ({ 
  currentUseCases, 
  useCasesToDisplay, 
  showAllUseCases, 
  handleViewAllClick, 
  handleShowLessClick, 
  handleLearnMoreClick 
}) => {
  if (currentUseCases.length === 0) {
    // No Data State
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] w-full text-center">
        <div className="w-24 h-24 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-2">
          No Use Cases Available
        </h3>
        <p className="text-gray-500 max-w-md">
          There are currently no use cases available for the selected
          category. Please check back later or select a different
          category.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-[1300px] items-center justify-center gap-6 md:gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 w-full items-stretch">
        {useCasesToDisplay.map((useCase) => (
          <UseCaseCardNew
            key={useCase.id}
            title= {useCase.title.length > 23 ? useCase.title.slice(0, 40) + '...' : useCase.title}
            description={useCase.description}
            image={useCase.image}
            onClick={() => handleLearnMoreClick(useCase.id)}
            className="h-full"
          />
        ))}
      </div>

      {!showAllUseCases && currentUseCases.length > 6 && (
        <Button
          onClick={handleViewAllClick}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[80px] bg-[linear-gradient(90deg,rgba(6,78,227,1)_0%,rgba(61,118,236,1)_100%)] h-auto"
        >
          <div className="font-Manrope font-semibold text-white text-sm md:text-base text-center tracking-0 leading-6 whitespace-nowrap">
            View All Use Cases
          </div>
        </Button>
      )}

      {showAllUseCases && currentUseCases.length > 6 && (
        <Button
          onClick={handleShowLessClick}
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[80px] bg-[linear-gradient(90deg,rgba(6,78,227,1)_0%,rgba(61,118,236,1)_100%)] h-auto"
        >
          <div className="font-Manrope font-semibold text-white text-sm md:text-base text-center tracking-0 leading-6 whitespace-nowrap">
            Show Less
          </div>
        </Button>
      )}
    </div>
  );
};

export default UseCasesGrid;
