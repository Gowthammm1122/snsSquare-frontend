import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/store';
import { getAgentById, getCategoryById } from '../../../data/agentCategories';

const AgentDetailsPage = () => {
  const { categoryId, agentId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [agent, setAgent] = useState(null);
  const [category, setCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/', { replace: true });
      return;
    }

    const agentData = getAgentById(categoryId, agentId);
    const categoryData = getCategoryById(categoryId);

    if (!agentData || !categoryData) {
      navigate('/media-entertainment', { replace: true });
      return;
    }

    setAgent(agentData);
    setCategory(categoryData);
    setIsLoading(false);
  }, [categoryId, agentId, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading agent details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/media-entertainment')}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{agent.name}</h1>
                <p className="text-sm text-gray-500">{category.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/agent-workbench/try/${categoryId}/${agentId}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Try This Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Overview */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              <div className="flex items-start space-x-6 mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
                  {agent.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-800">{agent.name}</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      agent.status === 'available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">{agent.description}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Overview</h2>
                <p className="text-gray-600 leading-relaxed">
                  This advanced AI agent is designed to handle complex tasks with high accuracy and efficiency. 
                  It leverages state-of-the-art machine learning models to provide reliable results for your specific use cases.
                </p>
              </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-lg p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {agent.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{feature}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Advanced capability that enhances the agent's performance and reliability.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Use Cases Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Use Cases</h2>
              <div className="space-y-4">
                {agent.useCases.map((useCase, idx) => (
                  <div key={idx} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">{idx + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{useCase}</h3>
                      <p className="text-sm text-gray-600">
                        Perfect for handling this specific scenario with high accuracy and efficiency.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 sticky top-8"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              
              <div className="space-y-3 mb-6">
                <button
                  onClick={() => navigate(`/agent-workbench/try/${categoryId}/${agentId}`)}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Try This Agent
                </button>
                <button
                  onClick={() => navigate('/media-entertainment')}
                  className="w-full border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Back to Agents
                </button>
              </div>

              <div className="border-t pt-6">
                <h4 className="font-semibold text-gray-700 mb-3">Agent Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-800">{category.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${
                      agent.status === 'available' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {agent.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Features:</span>
                    <span className="font-medium text-gray-800">{agent.features.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Use Cases:</span>
                    <span className="font-medium text-gray-800">{agent.useCases.length}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6 mt-6">
                <h4 className="font-semibold text-gray-700 mb-3">Need Help?</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Contact our support team for assistance with this agent.
                </p>
                <button className="w-full text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Contact Support
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetailsPage;
