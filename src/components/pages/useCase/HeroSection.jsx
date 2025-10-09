import React from "react";
import BlackButton from "../../common/BlackButton";

const HeroSection = () => {
  return (
    <div className="relative w-full py-20 mt-20 px-4">
      {/* Horizontal gradient with your exact colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d3e0fa] to-[#e1f4ff]" />

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white" />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className=" text-gray-900 mb-8 leading-tight">
          Partnered Progress: <span className="text-blue-600">Agentic AI</span>
          <br />
          Solutions for Every Sector
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Our Agentic AI use cases empower every industry to accelerate progress, unlock innovation, and create measurable impact.
        </p>

        {/* CTA Button */}
        <BlackButton>
          Work With Us
        </BlackButton>
      </div>

      <div className="absolute bottom-0 left-0 right-0 max-w-[1480px] mx-auto border-b border-gray-300" />
    </div>
  );
};

export default HeroSection;
