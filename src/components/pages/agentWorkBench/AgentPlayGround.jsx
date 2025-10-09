import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../common/card";
import agentsData from "../../../data/agents.json";
import { useNavigate } from "react-router-dom";

function AgentPlayGround() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("foundation-agents");
  const [filteredAgents, setFilteredAgents] = useState([]);

  useEffect(() => {
    filterAgents(selectedCategory);
  }, [selectedCategory]);

  const filterAgents = (category) => {
    let filtered;
    switch (category) {
      case "foundation-agents":
        filtered = agentsData.foundationAgents;
        break;
      case "industry-agents":
        filtered = agentsData.industrySolutions;
        break;
      case "consumer-agents":
        filtered = agentsData.customerSolutions;
        break;
      default:
        filtered = agentsData.foundationAgents;
    }
    setFilteredAgents(filtered);
  };

  const handleAgentClick = (agent) => {
    if (agent.path) {
      navigate("/agent-playground/agent/" + agent.id);
    } else {
      // Fallback to default route if no path is specified
      navigate("/agent-playground/agent/" + agent.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-44 py-12">
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Agentic AI Marketplace
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-gray-800 mb-8">
            Explore <span className="text-blue-600 font-bold">1500+</span>{" "}
            Ready-to-Use AI Agents
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setSelectedCategory("foundation-agents")}
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
              onClick={() => setSelectedCategory("industry-agents")}
              className={
                "px-6 py-3 rounded-full font-medium transition-all duration-200 " +
                (selectedCategory === "industry-agents"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50")
              }
            >
              Industry Agents
            </button>
            <button
              onClick={() => setSelectedCategory("consumer-agents")}
              className={
                "px-6 py-3 rounded-full font-medium transition-all duration-200 " +
                (selectedCategory === "consumer-agents"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50")
              }
            >
              Consumer Agents
            </button>
          </div>
        </div>

        {selectedCategory === "foundation-agents" && (
          <div className="mb-12">
            <div className="flex items-start space-x-4 max-w-2xl">
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Foundational Categories
                </h3>
                <p className="text-gray-600">
                  Task-focused building blocks for automation, summarization,
                  routing, and orchestration.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAgents.slice(0, 6).map((agent) => (
            <Card
              key={agent.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white"
              onClick={() => handleAgentClick(agent)}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  <div className="absolute top-0 right-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    ?
                  </div>

                  <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg mb-4 flex items-center justify-center">
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
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                  Learn More
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Agents Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate(`/agent-playground/agent?category=${selectedCategory}`)}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
          >
            View All {selectedCategory === 'foundation-agents' ? 'Foundation Agents' : 
                     selectedCategory === 'industry-agents' ? 'Industry Solutions' : 
                     'Customer Solutions'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgentPlayGround;
