import React from "react";

const WhyWeAreHereSection = () => {
  return (
    <section
      className="py-8 sm:py-12 lg:py-16 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/backgroundgrids/gridBG.png')"
      }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-4">
        {/* Header Section - Left Aligned */}
        <div className="flex flex-col justify-start items-start gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-14  mx-auto">
          <h3 className="leading-tight">
            Why We're Here
          </h3>
          <p className="text-zinc-600 font-normal font-inter leading-snug">
            We’re not just solving today’s problems. We’re building tomorrow’s possibilities.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="relative  mx-auto">
          {/* White Card Background */}
          <div className="w-full min-h-[400px] sm:min-h-[500px] lg:h-[675px] bg-white rounded border border-stone-300 relative p-4 sm:p-6 lg:p-0">

            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-0 h-full">
              {/* Left Content Area */}
              <div className="lg:absolute lg:left-[35px] lg:top-[44px] xl:w-[540px] lg:w-[400px] flex flex-col justify-center lg:justify-start">
                {/* Main Heading - Uses h3 from index.css */}
                <h3 className="text-black font-bold font-manrope mb-4 sm:mb-6 lg:mb-[110px] leading-tight">
                  Accelerate growth at the new speed of business
                </h3>

                {/* First Paragraph */}
                <div className="flex flex-col flex-1 gap-6 mt-6">
                  {/* First Paragraph */}
                  <p className="text-neutral-500 leading-relaxed flex-1">
                    We believe the future belongs to those who move fast, adapt faster, and innovate without limits.
                    Businesses today don’t just need technology; they need intelligent, scalable solutions that keep
                    them ahead in an ever-changing world.
                  </p>

                  {/* Second Paragraph */}
                  <p className="text-neutral-600 font-medium font-manrope leading-relaxed flex-1">
                    That’s why we’re here: to bridge the gap between ambition and execution. We combine Agentic AI,
                    automation, and next-gen digital solutions to help organisations reimagine possibilities, unlock
                    efficiency, and create measurable impact.
                  </p>

                  {/* Third Paragraph */}
                  <p className="text-neutral-600 font-medium font-manrope leading-relaxed flex-1">
                    Our mission is simple empower businesses to grow at the speed of change. Whether it’s transforming industries with AI-driven use cases, building enterprise-grade platforms, or enabling custom solutions tailored to your needs, SNS Square is your partner in shaping a smarter, faster, more resilient future.
                  </p>
                </div>
              </div>

              {/* Right Image Placeholder */}
              <div className="lg:absolute lg:right-[35px] lg:top-[38px] w-full xl:w-[600px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[600px] lg:w-[500px] rounded overflow-hidden">
                <img
                  src="/images/About_us/About us.png" // replace with your image path
                  alt="Descriptive Alt Text"
                  className="w-full h-full object-fill"
                />
              </div>

            </div>

            {/* Contact Button */}
            <div className="lg:absolute lg:left-[35px] lg:bottom-[48px] mt-4 sm:mt-6 lg:mt-0">
              <button className="h-10 sm:h-12 lg:h-16 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-7 bg-neutral-800 rounded inline-flex justify-center items-center gap-3.5 hover:bg-neutral-700 transition-colors duration-300 w-full lg:w-auto">
                <span className="text-orange-50 font-medium font-manrope">
                  Contact Us
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeAreHereSection;
