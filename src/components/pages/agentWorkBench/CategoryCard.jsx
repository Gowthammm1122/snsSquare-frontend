import React from "react";

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-xl border bg-white shadow-sm", className)}
    {...props}
  />
));

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props} />
));

const CategoryCard = ({ category, onLearnMore, showCount = true }) => {
  const getTotalAgentCount = () => {
    if (!category?.subCategories) return 0;
    return category.subCategories.reduce((total, subCat) => {
      return total + (subCat.agents ? subCat.agents.length : 0);
    }, 0);
  };

  const getIndustryAgentCount = () => {
    return category?.agents ? category.agents.length : 0;
  };

  const agentCount = category?.subCategories ? getTotalAgentCount() : getIndustryAgentCount();

  return (
    <div className="relative group0">
      <div className="relative p-3">
        <Card className="flex flex-col h-full min-h-[420px] w-[110%] border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 rounded-2xl overflow-hidden">
          <div className="h-40 sm:h-48 m-6 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center relative overflow-hidden">
            {category?.image && category.image !== "/placeholder.jpg" ? (
              <img
                src={category.image}
                alt={category?.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-400 rounded"></div>
              </div>
            )}
          </div>

          <CardContent className="flex-1 flex flex-col -mt-6 justify-between p-4 sm:p-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 text-lg sm:text-xl leading-tight">
                {category?.name}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed leading-relaxed line-clamp-3">
                {category?.description}
              </p>
            </div>

            <div className=" -ml-4">
              <button
                onClick={() => onLearnMore?.(category?.id)}
                className="text-blue-600 hover:text-blue-800 p-0 h-auto font-medium text-sm sm:text-base underline-offset-4 hover:underline"
              >
                Learn More
              </button>
            </div>
          </CardContent>
        </Card>

        {showCount && agentCount > 0 && (
          <div className="absolute top-5 right-0 z-20">
            <div className="bg-blue-600 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-base font-bold shadow-lg border-2 border-white">
              {agentCount}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
