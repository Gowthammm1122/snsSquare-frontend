import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Search, Building2 } from "lucide-react";
import agentsData from "../../../public/data/agentsData";
import { CategoryContext } from "../../contexts/CategoryContext";

// Custom scrollbar styles
const scrollbarStyles = `
  .scrollbar-custom {
    scrollbar-width: thin;
    scrollbar-color: #3b82f6 transparent;
    padding-right: 10px;
  }
  
  .scrollbar-custom::-webkit-scrollbar {
    width: 60px;
  }
  
  .scrollbar-custom::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0px;
    margin: 10px 0;
  }
  
  .scrollbar-custom::-webkit-scrollbar-thumb {
    background: #3b82f6;
    border-radius: 30px;
    border: 5px solid #ffffff;
    opacity: 1;
    min-height: 50px;
    height: 50px;
  }
  
  .scrollbar-custom::-webkit-scrollbar-thumb:hover {
    background: #2563eb;
  }
`;

// Custom scrollbar styles are defined above

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState(
    "Document & Knowledge Management"
  );
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Generate categories and subtopics from agentsData
  const categories = agentsData.foundational.map(category => ({
    id: category.id,
    name: category.name,
    subtopics: category.subCategories.map(subCat => ({
      id: subCat.id,
      name: subCat.name
    }))
  }));

  const toggleCategory = (category, categoryId) => {
    setActiveCategory(activeCategory === category ? "" : category);
    if (activeCategory !== category) {
      setSelectedSubtopic(null); // Reset subtopic when changing category
      
      // Navigate to the category when clicked
      navigate(`/agent-workbench/foundation-agents/${categoryId}`);
    }
  };

  const handleSubtopicClick = (subtopic, categoryId) => {
    setSelectedSubtopic(subtopic.name);
    // Navigate to the subcategory when clicked
    navigate(`/agent-workbench/foundation-agents/${categoryId}/${subtopic.id}/agents`);
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <CategoryContext.Provider value={{ selectedSubtopic, activeCategory, setActiveCategory, setSelectedSubtopic }}>
        <div className="flex h-screen w-full bg-white">

          {/* Sidebar */}
          <aside className="w-96 bg-white p-6 flex flex-col border-r border-gray-100">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Categories
              </h2>
              <p className="text-sm text-gray-500">Browse relevant agents</p>
            </div>

            {/* Search */}
            <div className="relative mb-6">
              <Search
                className="absolute left-6 top-6 text-gray-400 w-5 h-5"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-14 pr-4 py-5 rounded-lg bg-gray-100 h-16 text-gray-900 placeholder-gray-400 border-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Scrollable Category List */}
            <div className="flex-1 overflow-y-auto scrollbar-custom">
              <ul className="space-y-2">
                {categories
                  .filter((cat) =>
                    cat.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((cat, idx) => (
                    <li
                      key={idx}
                      className={`rounded-lg transition-colors ${activeCategory === cat.name ? "bg-blue-50" : ""
                        }`}
                    >
                      {/* Category Header */}
                      <div
                        onClick={() => toggleCategory(cat.name, cat.id)}
                        className={`flex justify-between items-center cursor-pointer px-4 py-6 h-24 text-sm rounded-lg ${activeCategory === cat.name
                            ? "text-blue-700 font-medium"
                            : "text-gray-700 hover:bg-gray-50"
                          }`}
                      >
                        <span className="leading-tight">{cat.name}</span>
                        {activeCategory === cat.name ? (
                          <ChevronUp
                            size={16}
                            className="text-blue-600 flex-shrink-0 ml-2"
                          />
                        ) : (
                          <ChevronDown
                            size={16}
                            className="text-gray-400 flex-shrink-0 ml-2"
                          />
                        )}
                      </div>

                      {/* Subtopics */}
                      {activeCategory === cat.name && (
                        <ul className="space-y-1 pb-3 px-6">
                          {cat.subtopics.map((sub, i) => (
                            <li
                              key={i}
                              onClick={() => handleSubtopicClick(sub, cat.id)}
                              className={`h-12 w-full rounded-lg cursor-pointer transition-colors flex items-center px-6 text-sm ${selectedSubtopic === sub.name
                                  ? "bg-white font-medium  shadow-sm"
                                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                }`}
                            >
                              {sub.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1  overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </CategoryContext.Provider>
    </>
  );
};

export default Sidebar;