import React from "react";
import { CometCard } from "../../ui/comet-card";

const Certificate = () => {
  return (
    <section className="w-full min-h-screen bg-slate-900 py-8 lg:py-24 px-4 lg:px-28">
      <div className="w-full max-w-[1225px] min-h-[400px] lg:h-[518px] relative bg-white rounded-md overflow-hidden mx-auto">
        
        {/* Header Section */}
        <div className="absolute left-4 lg:left-[85px] top-8 lg:top-[59px] w-full lg:w-[487px] flex flex-col justify-start items-center gap-3.5 px-4 lg:px-0">
          <h2 className="w-full text-center text-neutral-800 text-2xl lg:text-4xl font-bold font-manrope">
            Our Awards & Achievements
          </h2>
          <div className="w-48 lg:w-72 h-0 opacity-70 border-t border-blue-700"></div>
        </div>

        {/* Decorative Elements - Hidden on mobile for cleaner look */}
        <div className="hidden lg:block">
          {/* Left Wheat Decoration */}
          <div className="absolute left-[98px] top-[195px]">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 rounded-full opacity-80"></div>
            <div className="absolute top-0 left-1 w-4 h-4 bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 rounded-full"></div>
            <div className="absolute top-0 left-4 w-4 h-4 bg-gradient-to-r from-orange-400 via-yellow-200 to-orange-400 rounded-full"></div>
          </div>

          {/* Right Wheat Decoration */}
          <div className="absolute left-[441px] top-[209px]">
            <div className="w-24 h-24 bg-gradient-to-l from-orange-400 via-yellow-200 to-orange-400 rounded-full opacity-80"></div>
            <div className="absolute top-[-15px] right-1 w-4 h-4 bg-gradient-to-l from-orange-400 via-yellow-200 to-orange-400 rounded-full"></div>
            <div className="absolute top-[-15px] right-4 w-4 h-4 bg-gradient-to-l from-orange-400 via-yellow-200 to-orange-400 rounded-full"></div>
          </div>
        </div>

        {/* Center Content - Award Description */}
        <div className="absolute left-4 lg:left-[178px] top-24 lg:top-[165px] w-full lg:w-72 px-4 lg:px-0 flex flex-col justify-center items-center gap-3.5">
          <div className="flex justify-center lg:justify-start items-end gap-1.5">
            <img className="w-12 lg:w-16 h-6 lg:h-9" src="/images/cio-tech-logo.png" alt="CIO Tech Outlook" />
            <div className="text-neutral-800 text-sm lg:text-base font-normal font-inter leading-snug">
              10 Most Promising
            </div>
          </div>
          <div className="w-full text-center text-neutral-800 text-2xl lg:text-4xl font-bold font-manrope">
            AGENTIC AI STARTUPS
          </div>
          <div className="text-neutral-800 text-xl lg:text-3xl font-semibold font-manrope">
            2025
          </div>
          <div className="w-full text-center text-neutral-800 text-sm lg:text-base font-normal font-inter leading-snug">
            Awarded by CIO Tech Outlook for having the 10 most promising Agentic AI Startups
          </div>
        </div>

        {/* Certificate Image */}
        <div className="absolute right-4 lg:left-[664px] top-80 lg:top-[59px] w-full lg:w-[501px] h-48 lg:h-96 px-4 lg:px-0">
          <CometCard rotateDepth={15} translateDepth={15}>
            <div className="w-full h-full rounded overflow-hidden cursor-pointer">
              <img
                src="/images/certificate.webp"
                alt="SNS Square Certificate of Achievement - Top 10 Agentic AI Startups 2025"
                className="w-full h-full object-cover rounded"
              />
            </div>
          </CometCard>
        </div>
      </div>
    </section>
  );
};

export default Certificate;
