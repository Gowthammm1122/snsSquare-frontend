import React from 'react';
import { RiFlashlightLine } from "react-icons/ri";

const coreValues = [
  {
    title: "Future-First Innovation",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
    description: "At SNS Square, we challenge limits and design solutions that keep businesses ahead in the Agentic AI era."
  },
  {
    title: "Integrity as Our Core",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 12l2 2 4-4"></path>
      </svg>
    ),
    description: "We operate with transparency and responsibility, building lasting trust with our clients, partners, and teams."
  },
  {
    title: "Collaboration that Scales",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M6 9l6 6 6-6"></path>
      </svg>
    ),
    description: "Together, we bring diverse expertise and ideas, transforming them into scalable solutions for real-world impact."
  },
  {
    title: "Purpose-Driven Impact",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    description: "Every innovation we create is focused on solving real challenges and shaping a smarter, sustainable future."
  }
];

const CoreValuesSection = () => {
  return (
    <div className="bg-white py-16">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto lg:px-6 px-4 sm:px-6 mb-8">
        <div className="mb-16">
          <h3 className="text-gray-900 mb-2 lg:text-left">
            Our core values define who we are
          </h3>
        </div>

        {/* Values Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 lg:h-80 min-h-[320px] sm:min-h-[280px] mb-12">
          {coreValues.map((value, index) => (
            <div
              key={index}
              className="bg-blue-50 rounded-md  lg:p-6 p-4 sm:p-6 border border-blue-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex flex-col h-full">
                {/* Title + Icon container */}
                <div className="flex justify-between items-start lg:mb-8 mb-6 sm:mb-8">
                  <p className="text-gray-900 highlight lg:text-lg text-base sm:text-lg font-semibold lg:leading-normal leading-tight pr-2">
                    {value.title}
                  </p>
                  <div className="w-10 h-10 bg-white flex items-center justify-center rounded">
                    <RiFlashlightLine className="text-gray-900 text-xl text-bold" />
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 leading-relaxed mt-auto lg:text-base text-sm sm:text-base">
                  {value.description}
                </p>
              </div>


            </div>
          ))}
        </div>
      </div>

      {/* CTA Section (GlassCube background) */}
      <div className="relative overflow-hidden max-w-7xl mx-auto lg:mt-0 mt-8 md:mt-12 rounded-md bg-gradient-to-r from-[#d3e0fa] to-[#e1f4ff] lg:mx-auto mx-4 sm:mx-6">
        {/* Background Image positioned on the left side - Hidden on mobile, visible on tablet+ */}
        <div
          className="absolute left-0 top-0 lg:w-1/2 w-0 md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/GlassCube.png')" }}
        ></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto lg:px-4 px-4 sm:px-6 lg:py-16 md:py-24 py-12 sm:py-16">
          <div className="mx-auto max-w-4xl text-center rounded-md border border-white/40 bg-white/20 backdrop-blur-sm shadow-xl lg:p-8 md:p-12 p-6 sm:p-8">
            <h3 className="text-gray-900 leading-tight mb-4 lg:text-2xl text-lg sm:text-xl md:text-2xl font-semibold lg:px-0 px-2 sm:px-4">
              Discover what truly defines SNS Square in a detailed letter from
            </h3>
            <button className="lg:mt-8 mt-6 sm:mt-8 lg:px-8 px-6 sm:px-8 lg:py-3 py-2.5 sm:py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors duration-300 lg:text-base text-sm sm:text-base">
              Read our Story
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoreValuesSection;