"use client"

import React, { useState, useEffect } from 'react';
import BlackButton from '../../common/BlackButton';
import { useNavigate as Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import Spline from '@splinetool/react-spline';
import { FlipWords } from '../../ui/FlipWords.jsx';

const phrases = [
  "To The Vibrant Life At SNS",
  "To 1500+ Foundation Agents",
  "To Use Cases That Matters"
];

// Navigation mapping for each phrase
const phraseNavigation = [
  {
    phrase: "To The Vibrant Life At SNS",
    route: "/life-at-sns",
    buttonText: "Explore Our Culture"
  },
  {
    phrase: "To 1500+ Foundation Agents",
    route: "/agent-workbench",
    buttonText: "Explore Agent Workbench"
  },
  {
    phrase: "To Use Cases That Matters",
    route: "/usecase",
    buttonText: "Explore Use Cases"
  }
];

const HeroSection = () => {
  const navigate = Navigate();
  const [index, setIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPhraseIndex(prevIndex => prevIndex + 1);
    }, 4000); // Change phrase every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  // Get current navigation info based on the phrase
  const getCurrentNavigation = () => {
    const currentPhraseIndex = phraseIndex % phrases.length;
    return phraseNavigation[currentPhraseIndex];
  };

  // Handle navigation based on current phrase
  const handleNavigation = () => {
    const currentNav = getCurrentNavigation();
    navigate(currentNav.route);
  };

  // Handle phrase click navigation
  const handlePhraseClick = () => {
    handleNavigation();
  };

  return (
    <div className="relative w-full h-auto min-h-[750px] xs:min-h-[800px] sm:min-h-[850px] md:min-h-[650px] lg:min-h-[700px] xl:min-h-[750px] 2xl:min-h-[800px] overflow-hidden pt-20 xs:pt-22 sm:pt-24 md:pt-8 lg:pt-2 xl:pt-3 2xl:pt-4">
      {/* Hero Content */}
      <section className="w-full bg-[linear-gradient(359deg,rgba(255,255,255,0.7)_0%,_rgba(227,235,255,0.7)_100%)] relative z-10">
        <div
          className="w-full h-[750px] xs:h-[800px] sm:h-[850px] md:h-[650px] lg:h-[700px] xl:h-[750px] 2xl:h-[802px] bg-cover bg-center bg-no-repeat relative overflow-hidden"
          style={{
            backgroundImage: 'url(/images/home/Bg.png)'
          }}
        >
          {/* Gradient Overlay - matches the image gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#a8c5ff]/20 via-[#c8d9ff]/10 to-transparent pointer-events-none z-[2]" />
          <div className="w-full max-w-[500px] xs:max-w-[350px] sm:max-w-[500px] md:max-w-[768px] lg:max-w-[900px] xl:max-w-[1330px] 2xl:max-w-[1450px] mx-auto px-4 md:px-6 lg:px-8 xl:px-8 2xl:px-0 h-full relative z-10 overflow-x-hidden">

            {/* Mobile Layout (< 768px) - Stacked Vertically with Spline Background */}
            <div className="md:hidden flex flex-col justify-center h-full gap-8 xs:gap-10 sm:gap-10 text-center py-6 relative z-10">
              {/* Text Content - Better Mobile Spacing */}
              <div className="flex flex-col gap-6 xs:gap-8 sm:gap-10 w-full px-2 xs:px-4 sm:px-6 relative z-10">
                {/* Small Header */}
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-manrope font-medium text-global-1 text-center leading-tight px-2">
                  Agentic AI Breakthroughs
                </h2>

                {/* Main Heading with Slide Animation */}
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-manrope font-extrabold leading-tight text-global-1 min-h-[32px] sm:min-h-[32px] md:min-h-[36px] lg:min-h-[40px] text-center px-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phrases[phraseIndex % phrases.length]}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: "0%", opacity: 1 }}
                      exit={{ y: "-25%", opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="block text-[#064EE3] cursor-pointer hover:opacity-80 transition-opacity leading-tight"
                      onClick={handlePhraseClick}
                    >
                      {phrases[phraseIndex % phrases.length]}
                    </motion.span>
                  </AnimatePresence>
                </h1>

                {/* Subtitle */}
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-manrope font-medium leading-tight text-global-1 text-center px-2">
                  Everything Unfolds Here
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-manrope font-light leading-relaxed text-global-1 text-center px-2 max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[600px] mx-auto">
                  Access 1500+ Foundation Models, Ready for you
                </p>

                {/* CTA Button */}
                <div className="mt-6 sm:mt-6 md:mt-8">
                  <BlackButton
                    size="medium"
                    variant="black"
                    className="rounded-md px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg font-medium font-manrope text-white w-fit mx-auto leading-relaxed"
                    onClick={() => {
                      const footerSection = document.getElementById('footer');
                      if (footerSection) {
                        footerSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    Start Your Agentic Journey
                  </BlackButton>
                </div>
              </div>

              {/* Spline Container - Mobile */}
              <div className="flex justify-center w-full mt-4 relative z-10 px-2">
                <div className="relative w-full h-full z-10">
                
                   <div className="relative w-full bg-transparent overflow-hidden mx-auto">
                     <div className="w-full" style={{ aspectRatio: '1.2' }}>
                       <Spline 
                         scene="https://prod.spline.design/Ha8IoMVEpIiSJCbV/scene.splinecode"
                         className="w-full h-full"
                       />
                     </div>
                   </div>
                </div>
              </div>

            </div>

            {/* Desktop and Large Tablet Layout (>= 768px) - Side by Side */}
            <div className="hidden md:grid md:grid-cols-10 items-center h-full gap-6 lg:gap-7 xl:gap-8 relative z-10">

              {/* Left Content Container - 60% */}
              <div className="md:col-span-5 flex flex-col gap-[16px] lg:gap-[16px] justify-center text-center lg:text-left relative z-10">
                {/* Small Header */}
                <h2 className="text-[24px] md:text-[26px] lg:text-[28px] xl:text-[36px] 2xl:text-[40px] font-manrope font-medium text-global-1 md:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-nowrap">
                  Agentic AI Breakthroughs
                </h2>

                {/* Main Heading with Slide Animation */}
                <h2 className="text-[20px] md:text-[24px] lg:text-[26px] xl:text-[36px] 2xl:text-[48px] font-manrope font-extrabold leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[34px] 2xl:leading-[44px] text-global-1 md:whitespace-normal lg:whitespace-normal xl:whitespace-nowrap lg:text-center xl:text-left">
                  <FlipWords words={phrases} duration={4000} className="text-[#064EE3]" onClick={handlePhraseClick} />
                </h2>

                {/* Subtitle */}
                <h2 className="text-[24px] md:text-[24px] lg:text-[26px] xl:text-[36px] 2xl:text-[40px] font-manrope font-medium leading-[24px] md:leading-[28px] lg:leading-[30px] xl:leading-[36px] 2xl:leading-[40px] text-global-1 md:whitespace-nowrap lg:whitespace-nowrap xl:whitespace-nowrap">
                  Everything Unfolds Here
                </h2>

                {/* Description */}
                <p className="text-[14px] md:text-[15px] lg:text-[16px] xl:text-[18px] font-manrope font-light leading-[16px] md:leading-[17px] lg:leading-[18px] xl:leading-[20px] text-global-1 mt-[12px] lg:mt-[16px] md:whitespace-normal lg:whitespace-normal xl:whitespace-nowrap">
                  Access 1500+ Foundation Models, Ready for you
                </p>

                {/* CTA Button */}
                <BlackButton
                  size="medium"
                  variant="black"
                  className="rounded-md px-6 py-[12px] lg:py-[14px] xl:py-[16px] text-lg font-medium font-manrope text-white w-fit mx-auto lg:mx-0 mt-[16px] lg:mt-[20px]"
                  onClick={() => {
                    const footerSection = document.getElementById('footer');
                    if (footerSection) {
                      footerSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Start Your Agentic Journey
                </BlackButton>
              </div>

              {/* Right Spline Container - 40% Desktop */}
              <div className="md:col-span-5 flex justify-center lg:justify-end relative z-10">
                <div className="relative w-full h-full z-10">
                  
                   <div className="relative w-full max-w-[450px] md:max-w-[500px] lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[650px] bg-transparent rounded-md mx-auto">
                     <div className="w-full" style={{ aspectRatio: '631/374' }}>
                       <div className="transform origin-center md:scale-100 lg:scale-[0.88] xl:scale-100 2xl:scale-100">
                         <Spline 
                           scene="https://prod.spline.design/Ha8IoMVEpIiSJCbV/scene.splinecode"
                           className="w-full h-full"
                         />
                       </div>
                     </div>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
