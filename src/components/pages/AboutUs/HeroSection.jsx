import React from "react";

const HeroSection = () => {
  return (
       <div className="relative w-full py-20 mt-20 px-4">
      {/* Horizontal gradient with the same colors as HeroSection.jsx */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d3e0fa] to-[#e1f4ff]" />

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white" />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <header className="text-center">
          <h1
            id="hero-heading"
            className="text-[32px] sm:text-[48px] md:text-[56px] lg:text-[64px] xl:text-7xl font-sora font-semibold leading-tight sm:leading-snug md:leading-tight lg:leading-snug text-center text-global-1 w-full mt-12 sm:mt-16 md:mt-20"
          >
            We give you <span className="text-[#1E63FF]">world-class agentic AI,</span>
          </h1><br />
          <h1>designed for limitless possibilities.</h1>
          
        </header>

        {/* Subtitle */}
        <p className="mt-14 text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed ">
          We believe the next era of business will be driven by intelligent, autonomous systems. We’re not just building technology, we’re building the future of work, processes, and innovation through Agentic AI.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 max-w-[1480px] mx-auto border-b border-gray-300 mb-8" />
    </div>
  );
};

export default HeroSection;
