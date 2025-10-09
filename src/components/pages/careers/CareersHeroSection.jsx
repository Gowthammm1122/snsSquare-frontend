import React from "react";
import BlackButton from "../../common/BlackButton";

const CareersHeroSection = () => {
  return (
    <div className="relative w-full py-20 mt-20 px-4">
      {/* Horizontal gradient with the same colors as HeroSection.jsx */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#d3e0fa] to-[#e1f4ff]" />

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-b from-transparent to-white" />

      <div className="relative max-w-6xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="font-bold text-gray-900 mb-8 leading-tight text-4xl md:text-5xl lg:text-6xl">
          We Don't Just Work together
          <br />
          <span className="text-blue-600">We Grow Together</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed ">
          We believe a great workplace sparks greatness in people. Here, innovation thrives, collaboration fuels creativity, and every voice shapes the future. Join a team where your growth matters as much as your impact.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 max-w-[1480px] mx-auto border-b border-gray-300" />
    </div>
  );
};

export default CareersHeroSection;
