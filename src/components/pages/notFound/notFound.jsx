import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 mb-4">404</h1>
          <div className="w-32 h-1 bg-indigo-600 mx-auto mb-8"></div>
        </div>
        
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Go to Homepage
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
          >
            Go Back
          </button>
        </div>
        
        <div className="mt-12 text-gray-500">
          <p>Need help? <button onClick={() => navigate("/contact-us")} className="text-indigo-600 hover:underline">Contact us</button></p>
        </div>
      </div>
    </div>
  );
}