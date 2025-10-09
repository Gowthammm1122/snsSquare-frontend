import React from "react";
import BlackButton from "../../common/BlackButton";
import { useNavigate } from "react-router-dom";



const HeroSection = ({ showButton = true }) => {

   const navigate = useNavigate();
  return (
    <div className="bg-white  mt-20 px-8 pt-12 rounded-b-md">
      <div className="relative w-full bg-[#D6F0FE]">
        {/* Header section with logo and content */}
        <div className="container mx-auto px-4 pt-12 ">
          {/* SNS Square Logo */}
          <div className="mb-12 text-center">
            <img
              src="/images/square_logo_black.png"
              alt="SNS Square Logo"
              className="h-24 mx-auto mb-4"
            />
          </div>

          <div className="relative max-w-5xl mx-auto text-center">
            {/* Main Heading */}
            <h1 className=" leading-tight mb-6">
              A Culture that Erupts into <span className="text-blue-600">Brilliance</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-700  max-w-4xl mx-auto leading-relaxed mt-6">
              We are a culture of bold thinkers and fearless doers. Here, boundaries fade, routines transform into freedom, and creativity flows without limits.
            </p>

            {/* CTA Button */}
            {showButton && (
              <BlackButton className="px-8 py-4 text-lg font-semibold mt-8" onClick={() => navigate("/careers")}>
                Work With Us
              </BlackButton>
            )}
          </div>

          {/* Team Image section */}
          <div className="relative mt-16 mx-auto ">
            <div className="relative">
              {/* Team image */}
              <img
                src="/images/team1.png"
                alt="SNS Square Team"
                className="w-full rounded-md "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

