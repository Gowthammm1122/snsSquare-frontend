import React, { useEffect } from "react";
import { Building2 } from "lucide-react";
import { useCategoryContext } from "../../../contexts/CategoryContext";
import { useNavigate, useParams } from "react-router-dom";
import agentsData from "../../../../public/data/agentsData.js";

const CategoriesView = () => {
  const { selectedSubtopic, activeCategory, setActiveCategory, setSelectedSubtopic } = useCategoryContext();
  const navigate = useNavigate();
  const { category, categoryId, subcategoryId } = useParams();

  useEffect(() => {
    if (categoryId && agentsData.foundational) {
      const categoryFromUrl = agentsData.foundational.find(
        cat => cat.id === categoryId
      );
      if (categoryFromUrl) {
        setActiveCategory(categoryFromUrl.name);
        if (subcategoryId) {
          const subcategoryFromUrl = categoryFromUrl.subCategories.find(
            subCat => subCat.id === subcategoryId
          );
          if (subcategoryFromUrl) {
            setSelectedSubtopic(subcategoryFromUrl.name);
          }
        } else {
          setSelectedSubtopic(null);
        }
      }
    }
  }, [categoryId, subcategoryId, setActiveCategory, setSelectedSubtopic]);

  // Category selection logic removed as it was unused

  const currentCategory = agentsData.foundational.find(
    cat => cat.name === activeCategory
  );

  const getSubcategoryData = () => {
    if (!currentCategory || !selectedSubtopic) return null;
    return currentCategory.subCategories.find(
      subCat => subCat.name === selectedSubtopic
    );
  };

  const handleLearnMore = (item) => {
    if (selectedSubtopic && currentCategory) {
      navigate(`/agent-workbench/${category}/${currentCategory.id}/${getSubcategoryData().id}/agents`);
    } else if (currentCategory && !selectedSubtopic) {
      const subcategory = currentCategory.subCategories.find(
        sub => sub.name === item.title
      );
      if (subcategory) {
        navigate(`/agent-workbench/${category}/${currentCategory.id}/${subcategory.id}/agents`);
      }
    } else {
      const categoryItem = agentsData.foundational.find(
        cat => cat.name === item.title
      );
      if (categoryItem) {
        navigate(`/agent-workbench/${category}/${categoryItem.id}`);
      }
    }
  };

  const getDisplayData = () => {
    const subcategory = getSubcategoryData();
    if (subcategory) {
      return subcategory.agents.map(agent => ({
        id: agent.id,
        title: agent.name,
        description: agent.description,
        count: agent.count || 0
      }));
    }
    if (currentCategory && !selectedSubtopic) {
      return currentCategory.subCategories.map(subCat => ({
        id: subCat.id,
        title: subCat.name,
        description: subCat.description,
        count: subCat.agents ? subCat.agents.length : 0
      }));
    }
    return agentsData.foundational.map(category => ({
      id: category.id,
      title: category.name,
      description: category.description,
      count: category.subCategories.reduce((total, sub) => total + (sub.agents ? sub.agents.length : 0), 0)
    }));
  };

  const displayData = getDisplayData();
  const isSubtopicSelected = selectedSubtopic && getSubcategoryData();
  const isCategorySelected = activeCategory && currentCategory;

  return (
    <div className="p-8 h-[842px] w-[1226px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {isSubtopicSelected 
            ? `${selectedSubtopic} Agents` 
            : isCategorySelected
            ? `${activeCategory}`
            : "Categories"}
        </h2>
        <p className="text-sm text-gray-500">
          {isSubtopicSelected 
            ? `Browse ${selectedSubtopic.toLowerCase()} specific agents` 
            : isCategorySelected
            ? `Browse ${activeCategory.toLowerCase()} agents`
            : "Browse relevant agents"}
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {displayData.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-sm transition-shadow"
          >
            <div className="h-40 w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl mb-5 relative">
              <span className="absolute top-5 right-0 bg-blue-600 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                {item.count}
              </span>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description}
              </p>
              <button
                onClick={() => handleLearnMore(item)}
                className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
      {displayData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Building2 className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No agents available yet
          </h3>
          <p className="text-gray-600">
            {isSubtopicSelected 
              ? `Agents for ${selectedSubtopic} are coming soon. Check back later!`
              : isCategorySelected
              ? `Agents for ${activeCategory} are coming soon. Check back later!`
              : "No agents available at this time."}
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoriesView;
