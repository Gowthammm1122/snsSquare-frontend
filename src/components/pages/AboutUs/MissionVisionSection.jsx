import React from "react";

const MissionVisionSection = () => {
  return (
    <section className="py-6 sm:py-8 lg:py-12">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-4 lg:px-4">
        <div className="w-full">
          {/* Main Container with Gradient Background */}
          <div className="relative overflow-hidden max-w-[1440px] mx-auto lg:mt-0 mt-8 md:mt-12 rounded-md bg-gradient-to-r from-[#d3e0fa] to-[#e1f4ff] lg:mx-auto mx-4 sm:mx-6">
            
            {/* Background Image positioned on the left side - Hidden on mobile, visible on tablet+ */}
            <div
              className="absolute left-0 top-0 lg:w-1/2 w-0 md:w-1/2 h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/images/GlassCube.png')" }}
            ></div>

            {/* Content Cards Container */}
            <div className="relative z-10 max-w-[1440px] mx-auto lg:px-4 px-4 sm:px-4 lg:py-10 md:py-6 py-10 sm:py-4">
              <div className="flex flex-col lg:flex-row justify-center items-stretch gap-4 sm:gap-6 lg:gap-12">
                
                {/* Vision Card */}
                <div className="flex-1 lg:max-w-[650px] rounded-md border border-white/40 bg-white/20 backdrop-blur-sm shadow-xl p-6 sm:p-8 lg:p-8">
                  <div className="w-full flex flex-col justify-start items-start gap-4 sm:gap-5 lg:gap-6">
                    <div className="flex justify-start items-center gap-3 sm:gap-4 lg:gap-5">
                      <img
                        src="/images/About_us/vision (1).png"
                        alt="Vision icon"
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded flex-shrink-0 object-cover"
                      />
                      <h3 className="text-black leading-tight text-lg sm:text-xl lg:text-2xl font-semibold">
                        Vision
                      </h3>
                    </div>
                    <p className="w-full text-zinc-700 font-inter leading-snug text-sm sm:text-base lg:text-lg">
                      To redefine the future of business by empowering people and organisations with intelligent, agentic technologies that accelerate growth, innovation, and impact
                    </p>
                  </div>
                </div>

                {/* Mission Card */}
                <div className="flex-1 lg:max-w-[650px] rounded-md border border-white/40 bg-white/20 backdrop-blur-sm shadow-xl p-6 sm:p-8 lg:p-8">
                  <div className="w-full flex flex-col justify-start items-start gap-4 sm:gap-5 lg:gap-6">
                    <div className="flex justify-start items-center gap-3 sm:gap-4 lg:gap-5">
                      <img
                        src="/images/About_us/target.png"
                        alt="Mission icon"
                        className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded flex-shrink-0 object-cover"
                      />
                      <h3 className="text-black leading-tight text-lg sm:text-xl lg:text-2xl font-semibold">
                        Mission
                      </h3>
                    </div>
                    <p className="w-full text-zinc-700 font-inter leading-snug text-sm sm:text-base lg:text-lg">
                      Our mission is to build transformative solutions that blend AI, automation, and human ingenuity, helping businesses adapt faster, scale smarter, and unlock opportunities for a better tomorrow
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;