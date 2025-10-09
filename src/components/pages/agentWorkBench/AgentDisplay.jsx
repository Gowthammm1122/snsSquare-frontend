import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../common/card";
import agentsData from "../../../data/agents.json";
import { useNavigate, useSearchParams } from "react-router-dom";

function AgentDisplay() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("foundation-agents");
  const [filteredAgents, setFilteredAgents] = useState([]);
  const [featuredAgent, setFeaturedAgent] = useState(null);

  useEffect(() => {
    // Get category from URL params or default to foundation-agents
    const categoryFromParams = searchParams.get('category') || 'foundation-agents';
    setSelectedCategory(categoryFromParams);
    filterAgents(categoryFromParams);
  }, [searchParams]);

  const filterAgents = (category) => {
    let filtered;
    let featured = null;
    
    switch (category) {
      case "foundation-agents":
        filtered = agentsData.foundationAgents;
        featured = agentsData.foundationAgents.find(agent => agent.featured);
        break;
      case "industry-agents":
        filtered = agentsData.industrySolutions;
        featured = agentsData.industrySolutions.find(agent => agent.featured);
        break;
      case "consumer-agents":
        filtered = agentsData.customerSolutions;
        featured = agentsData.customerSolutions.find(agent => agent.featured);
        break;
      default:
        filtered = agentsData.foundationAgents;
        featured = agentsData.foundationAgents.find(agent => agent.featured);
    }
    
    setFilteredAgents(filtered);
    setFeaturedAgent(featured);
  };

  const handleAgentClick = (agent) => {
    if (agent.path) {
      navigate(agent.path);
    } else {
      navigate("/agent-playground/agent/" + agent.id);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterAgents(category);
    // Update URL params
    navigate(`/agent-playground/agent?category=${category}`);
  };

  const getCategoryTitle = (category) => {
    switch (category) {
      case "foundation-agents":
        return "Foundation Agents";
      case "industry-agents":
        return "Industry Solutions";
      case "consumer-agents":
        return "Customer Solutions";
      default:
        return "Foundation Agents";
    }
  };

  const getCategoryDescription = (category) => {
    switch (category) {
      case "foundation-agents":
        return "Task-focused building blocks for automation, summarization, routing, and orchestration.";
      case "industry-agents":
        return "Specialized AI solutions designed for specific industries and business domains.";
      case "consumer-agents":
        return "Personal AI assistants and tools designed for individual users and consumers.";
      default:
        return "Task-focused building blocks for automation, summarization, routing, and orchestration.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 py-12">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {getCategoryTitle(selectedCategory)}
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            {getCategoryDescription(selectedCategory)}
          </p>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => handleCategoryChange("foundation-agents")}
              className={
                "px-6 py-3 rounded-full font-medium transition-all duration-200 " +
                (selectedCategory === "foundation-agents"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50")
              }
            >
              Foundation Agents
            </button>
            <button
              onClick={() => handleCategoryChange("industry-agents")}
              className={
                "px-6 py-3 rounded-full font-medium transition-all duration-200 " +
                (selectedCategory === "industry-agents"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50")
              }
            >
              Industry Solutions
            </button>
            <button
              onClick={() => handleCategoryChange("consumer-agents")}
              className={
                "px-6 py-3 rounded-full font-medium transition-all duration-200 " +
                (selectedCategory === "consumer-agents"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50")
              }
            >
              Customer Solutions
            </button>
          </div>
        </div>

        {/* Featured Agent Section */}
        {featuredAgent && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Agent</h2>
              <p className="text-gray-600">Highlighted agent from this category</p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Card 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200"
                onClick={() => handleAgentClick(featuredAgent)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="relative">
                    <div className="absolute top-0 right-0 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ Featured
                    </div>
                    
                    <div className="w-full h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-6 flex items-center justify-center">
                      <img 
                        src={featuredAgent.icon} 
                        alt={featuredAgent.title}
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="text-center pt-0">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-4">
                    {featuredAgent.title}
                  </CardTitle>
                  <CardDescription className="text-gray-700 text-base leading-relaxed mb-6">
                    {featuredAgent.description}
                  </CardDescription>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                    Try {featuredAgent.title}
                  </button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* All Agents Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">All {getCategoryTitle(selectedCategory)}</h2>
          <p className="text-gray-600 mb-8">Explore all available agents in this category</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <Card 
              key={agent.id} 
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                agent.featured 
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200' 
                  : 'bg-white'
              }`}
              onClick={() => handleAgentClick(agent)}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  {agent.featured && (
                    <div className="absolute top-0 right-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      ⭐
                    </div>
                  )}
                  
                  <div className="w-full h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-4 flex items-center justify-center">
                    <img 
                      src={agent.icon} 
                      alt={agent.title}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="text-center pt-0">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-3">
                  {agent.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm leading-relaxed mb-4">
                  {agent.description}
                </CardDescription>
                <button className={`text-sm font-medium transition-colors ${
                  agent.featured 
                    ? 'text-blue-700 hover:text-blue-800' 
                    : 'text-blue-600 hover:text-blue-700'
                }`}>
                  Learn More
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back to Playground Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/agent-playground')}
            className="bg-gray-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            ← Back to Playground
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgentDisplay;
