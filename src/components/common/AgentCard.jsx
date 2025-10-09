import React from 'react';
import { useNavigate } from 'react-router-dom';

const AgentCard = ({ agent, isFeatured = false }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/agent-playground/agent/${agent.id}`);
  };

  return (
    <div
      className={`
        relative p-6 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105
        ${isFeatured 
          ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white border-transparent shadow-xl' 
          : 'bg-white border-gray-200 hover:border-blue-300'
        }
      `}
      onClick={handleClick}
    >
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
          Featured
        </div>
      )}

      {/* Agent Icon */}
      <div className="flex justify-center mb-4">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center
          ${isFeatured ? 'bg-white/20' : 'bg-blue-50'}
        `}>
          <img 
            src={agent.icon} 
            alt={agent.title}
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      {/* Agent Title */}
      <h3 className={`
        text-lg font-semibold text-center mb-2 leading-tight
        ${isFeatured ? 'text-white' : 'text-gray-800'}
      `}>
        {agent.title}
      </h3>

      {/* Agent Description */}
      <p className={`
        text-sm text-center line-clamp-3
        ${isFeatured ? 'text-white/90' : 'text-gray-600'}
      `}>
        {agent.description}
      </p>

      {/* Category Badge */}
      <div className="mt-4 flex justify-center">
        <span className={`
          px-3 py-1 rounded-full text-xs font-medium
          ${isFeatured 
            ? 'bg-white/20 text-white' 
            : 'bg-blue-100 text-blue-700'
          }
        `}>
          {agent.category}
        </span>
      </div>

      {/* Action Button */}
      <div className="mt-4 flex justify-center">
        <button className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${isFeatured 
            ? 'bg-white text-blue-600 hover:bg-gray-100' 
            : 'bg-blue-500 text-white hover:bg-blue-600'
          }
        `}>
          Try Agent
        </button>
      </div>
    </div>
  );
};

export default AgentCard;