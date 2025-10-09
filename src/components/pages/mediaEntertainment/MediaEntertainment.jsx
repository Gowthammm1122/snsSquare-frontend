import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/store';
import { agentCategories, getAllCategories } from '../../../data/agentCategories';
import AgentDetailsModal from './AgentDetailsModal';

const MediaEntertainment = () => {
  const [selectedCategory, setSelectedCategory] = useState('document-processing');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }
    setIsLoading(false);
  }, [isAuthenticated, navigate]);

  // Get user name from localStorage
  const userName = localStorage.getItem("name") || "User";

  // Hero Section
 const heroSection = (
  <div
    className="relative w-full h-[400px] md:h-[440px] bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: "url('/images/AgentFrame.png')",
    }}
  >
    {/* Overlay content */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-white text-3xl md:text-4xl font-bold text-center drop-shadow-lg"
      >
        Agentic Workbench
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-white text-xl md:text-1xl  text-center drop-shadow-lg pt-5"
      >
        Welcome back, {userName}! Explore our comprehensive suite of AI agents and choose the perfect one for your needs
      </motion.p>
    </div>
  </div>
);


  const getColorClasses = (color) => {
    const colorMap = {
      blue: { bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600' },
      purple: {bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600' },
      green: { bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600'  },
      indigo: { bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600'  },
      orange: { bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600'  },
      red: { bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600' },
      cyan: { bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600'  },
      slate: {bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600' },
      yellow: { bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600' },
      pink: { bg: 'bg-blue-100', icon: 'bg-blue-600', text: 'text-blue-600', button: 'bg-blue-600 hover:bg-blue-700', feature: 'bg-blue-50 text-blue-600' }
    };
    return colorMap[color] || colorMap.blue;
  };

  const categories = getAllCategories();
  const currentCategory = agentCategories[selectedCategory];
  const agents = currentCategory?.agents || [];
  const categoryColors = getColorClasses(currentCategory?.color);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTryAgent = (agentId) => {
    navigate(`/agent-playground/agent/${agentId}`);
  };

  const handleViewAgent = (agentId) => {
    const agent = agents.find(a => a.id === agentId);
    const category = categories.find(c => c.id === selectedCategory);
    
    if (agent && category) {
      setSelectedAgent(agent);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAgent(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
          <p className="mt-6 text-blue-600 font-medium text-lg">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {heroSection}
      <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-md mx-auto pt-10"
        >
          <input
            type="text"
            placeholder="Search Agents"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <div className="absolute mt-11 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </motion.div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar with Categories */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{category.icon}</span>
                      <div className="flex-1">
                        <div className="font-medium">{category.name}</div>
                        <div className={`text-xs ${
                          selectedCategory === category.id 
                            ? 'text-blue-100' 
                            : 'text-gray-500'
                        }`}>
                          {category.agents?.length || 0} agents
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Agents Section Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                    <span className="mr-3 text-3xl">{currentCategory?.icon}</span>
                    {currentCategory?.name}
                  </h2>
                  <p className="text-gray-600 mt-1">{currentCategory?.description}</p>
                </div>
                <span className="text-sm text-gray-500">{filteredAgents.length} agents</span>
              </div>
            </div>

            {/* Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.length > 0 ? (
                filteredAgents.map((agent, index) => (
                  <motion.div
                    key={agent.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200"
                  >
                    {/* Agent Status Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-16 h-16 ${categoryColors.bg} rounded-lg flex items-center justify-center`}>
                        <div className={`w-10 h-10 ${categoryColors.icon} rounded-lg flex items-center justify-center`}>
                          <span className="text-white text-lg font-bold">
                            {agent.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        agent.status === 'available' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {agent.status === 'available' ? 'Available' : 'Coming Soon'}
                      </span>
                    </div>

                    {/* Agent Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{agent.name}</h3>
                    
                    {/* Agent Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {agent.description}
                    </p>

                    {/* Features Preview */}
                    {agent.features && agent.features.length > 0 && (
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {agent.features.slice(0, 3).map((feature, idx) => (
                            <span 
                              key={idx}
                              className={`px-2 py-1 text-xs ${categoryColors.feature} rounded-md`}
                            >
                              {feature}
                            </span>
                          ))}
                          {agent.features.length > 3 && (
                            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded-md">
                              +{agent.features.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleTryAgent(agent.id)}
                        disabled={agent.status !== 'available'}
                        className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          agent.status === 'available'
                            ? `${categoryColors.button} text-white`
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {agent.status === 'available' ? 'Try Agent' : 'Coming Soon'}
                      </button>
                      <button
                        onClick={() => handleViewAgent(agent.id)}
                        className={`${categoryColors.text} hover:opacity-80 text-sm font-medium transition-colors`}
                      >
                        View Details
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No agents found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or browse different categories.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Agent Details Modal */}
      <AgentDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        agent={selectedAgent}
        category={categories.find(c => c.id === selectedCategory)}
      />
    </div>
  );
};

export default MediaEntertainment;