import React, { useState, useEffect } from "react";
import { CometCard } from "../../ui/comet-card";

// Leadership team data
const leadershipTeam = [
  {
    id: 1,
    name: "Deiva Thiru Dr. S.N. Subbramanian",
    title: "Founder",
    image: "/images/leadership/About-us-chairman.png",
    company: "SNS Square"
  },
  {
    id: 2,
    name: "Dr. S. Rajalakshmi",
    title: "Co-Founder & CFO",
    image: "/images/leadership/About-us-correspondent.png",
    company: "SNS Square"
  },
  {
    id: 3,
    name: "Nalin SNS",
    title: "Co-Founder & CEO",
    image: "/images/leadership/About-us-TD.png",
    company: "SNS Square"
  }
];

// Updated Laptop Certificate Section with SVG instead of text
const LaptopCertificateSection = () => (
  <div className="relative z-10 w-full px-4 lg:px-20 pb-16 lg:pb-24">
    <div className="w-full max-w-[1200px] h-[450px] relative bg-white rounded shadow-[0px_0px_46.20000076293945px_2px_rgba(0,0,0,0.25)] outline outline-[1.50px] outline-offset-[-1.50px] outline-sky-950/40 mx-auto overflow-hidden">
      
      {/* Left Content Area - Header and SVG */}
      <div className="absolute left-8 top-0 w-[48%] h-full py-12 px-6 flex flex-col justify-center">
        
        {/* Header - Properly aligned */}
        <div className="mb-6 text-center">
          <h2 className="text-neutral-800 text-2xl font-bold mb-4 leading-tight">
            Our Awards &<br />Achievements
          </h2>
          <div className="w-56 h-0.5 bg-blue-700 mx-auto"></div>
        </div>

        {/* SVG Content - Scaled down and centered */}
        <div className="w-full h-[200px] flex justify-center items-center">
          <img 
            src="/images/certificationsection/certificationtext.svg" 
            alt="CIO Tech Outlook Award - 10 Most Promising Agentic AI Startups 2025" 
            className="w-full h-full object-contain max-w-[320px]"
          />
        </div>

        {/* Description - Better positioned */}
        <div className="pt-4">
          <p className="text-neutral-600 text-sm leading-relaxed text-center max-w-[320px] mx-auto">
            Awarded by CIO Tech Outlook for having the 10 most promising Agentic AI Startups
          </p>
        </div>
      </div>

      {/* Right Certificate Image Area - Properly positioned */}
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 w-[44%] h-[75%]">
        <CometCard rotateDepth={10} translateDepth={10}>
          <div className="w-full h-full rounded-lg overflow-hidden cursor-pointer border border-black/20 shadow-xl">
            <img
              src="/images/certificate.webp"
              alt="SNS Square Certificate of Achievement - Top 10 Agentic AI Startups 2025"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </CometCard>
      </div>
    </div>
  </div>
);

// Medium Desktop Certificate Section (1280px-1440px)
const MediumDesktopCertificateSection = () => (
  <div className="relative z-10 w-full px-8 xl:px-16 pb-16 xl:pb-24">
    <div className="w-full max-w-[1300px] h-[480px] relative bg-white rounded shadow-[0px_0px_46.20000076293945px_2px_rgba(0,0,0,0.25)] outline outline-[1.50px] outline-offset-[-1.50px] outline-sky-950/40 mx-auto overflow-hidden">
      
      {/* Header Section */}
      <div className="absolute left-12 top-8 w-full max-w-[500px] flex flex-col items-center gap-3.5">
        <h2 className="w-full text-center text-neutral-800 text-3xl font-bold whitespace-nowrap">
          Our Awards & Achievements
        </h2>
        <div className="w-64 h-0.5 bg-blue-700 opacity-70"></div>
      </div>

      {/* SVG Content Section */}
      <div className="absolute left-12 top-24 w-[450px] h-[240px] flex justify-center items-center pt-8">
        <img 
          src="/images/certificationsection/certificationtext.svg" 
          alt="CIO Tech Outlook Award - 10 Most Promising Agentic AI Startups 2025" 
          className="w-full h-full object-contain max-w-[400px]"
        />
      </div>

      {/* Description Text */}
      <div className="absolute left-16 bottom-20 w-[400px]">
        <p className="w-full text-center text-neutral-800 font-inter text-base leading-relaxed">
          Awarded by CIO Tech Outlook for having the 10 most promising Agentic AI Startups
        </p>
      </div>

      {/* Certificate Image - Balanced positioning */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-[420px] h-[360px]">
        <CometCard rotateDepth={12} translateDepth={12}>
          <div className="w-full h-full rounded-lg overflow-hidden cursor-pointer border border-black/30 shadow-xl">
            <img
              src="/images/certificate.webp"
              alt="SNS Square Certificate of Achievement - Top 10 Agentic AI Startups 2025"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </CometCard>
      </div>
    </div>
  </div>
);

const LeadershipAndCertificate = () => {
  const [screenSize, setScreenSize] = useState('desktop');

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setScreenSize('mobile');
      } else if (width >= 1024 && width <= 1279) {
        setScreenSize('laptop');
      } else if (width >= 1280 && width <= 1440) {
        setScreenSize('medium-desktop');
      } else {
        setScreenSize('desktop');
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Mobile Layout (unchanged)
  const MobileLayout = () => (
    <div className="w-full min-h-screen relative overflow-hidden">
      
      {/* Mobile Grid Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-50"
        style={{
          backgroundImage: "url('/images/backgroundgrids/wholebg.svg')",
          backgroundSize: 'cover'
        }}
      />

      {/* Mobile Leadership Section */}
      <div className="relative z-10 w-full mx-auto py-12">
        
        {/* Mobile Leadership Header */}
        <div className="px-4 mb-8">
          <h2 className="text-neutral-800 text-center">
            Meet Our<br />
            Leadership Team
          </h2>
        </div>

        {/* Mobile Leadership Cards */}
        <div className="px-4 mb-12">
          <div className="flex flex-col gap-8">
            {leadershipTeam.map((member) => (
              <div key={member.id} className="w-full flex flex-col items-center gap-4">
                
                {/* Mobile Member Image - Square */}
                <div className="w-64 h-64 sm:w-72 sm:h-72 relative rounded-lg overflow-hidden shadow-lg">
                  <img 
                    className="w-full h-full object-cover object-top" 
                    src={member.image} 
                    alt={member.name}
                  />
                </div>

                {/* Mobile Member Info */}
                <div className="w-full max-w-sm flex flex-col items-center gap-3 text-center px-4">
                  <h4 className="text-black text-lg sm:text-xl">
                    {member.name}
                  </h4>
                  <h6 className="text-black text-base sm:text-lg">
                    {member.title}
                  </h6>
                  <div className="w-24 h-1 bg-blue-700 rounded-full" />
                  <p className="text-black font-inter text-sm sm:text-base">
                    {member.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Certificate Section */}
      <div className="relative z-10 w-full px-4 pb-12">
        
        {/* Mobile Certificate Container */}
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          
          {/* Mobile Certificate Header */}
          <div className="text-center mb-6">
            <h2 className="text-neutral-800 mb-4 text-xl sm:text-2xl">
              Our Awards & Achievements
            </h2>
            <div className="w-32 h-0.5 bg-blue-700 mx-auto"></div>
          </div>

          {/* Mobile Certificate Image */}
          <div className="w-full aspect-[4/3] mb-4 rounded overflow-hidden">
            <img
              src="/images/certificate.webp"
              alt="SNS Square Certificate of Achievement"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mobile Award Text */}
          <div className="text-center">
            <h5 className="text-red-600 mb-2 text-base sm:text-lg">
              CIO Tech Outlook
            </h5>
            <h6 className="text-neutral-800 mb-3 text-sm sm:text-base">
              10 Most Promising Agentic AI Startups 2025
            </h6>
            <p className="text-neutral-600 font-inter text-xs sm:text-sm">
              Awarded by CIO Tech Outlook for having the 10 most promising Agentic AI Startups
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="w-full min-h-screen relative overflow-hidden">
      
      {/* Unified Grid Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/backgroundgrids/wholebg.svg')",
          backgroundSize: 'cover'
        }}
      />

      {/* Leadership Section */}
      <div className="relative z-10 w-full max-w-[1441px] mx-auto h-auto py-16 lg:py-24">
        
        {/* Leadership Header */}
        <div className="px-4 lg:px-[108px]">
          <h2 className="leading-tight text-neutral-800 mb-8 lg:mb-16">
            Meet Our<br />
            Leadership team
          </h2>
        </div>

        {/* Leadership Cards */}
        <div className="px-4 lg:px-[108px] mb-16 lg:mb-24">
          <div className="flex flex-col lg:flex-row justify-center lg:justify-start items-center lg:items-start gap-8 lg:gap-9">
            
            {leadershipTeam.map((member) => (
              <div key={member.id} className="w-full max-w-sm lg:w-96 flex flex-col justify-start items-center lg:items-start gap-4 lg:gap-3.5">
                
                {/* Image Container - Square for all screen sizes */}
                <div className="w-80 h-80 sm:w-96 sm:h-96 lg:w-full lg:h-[400px] xl:h-[478.27px] relative rounded-lg overflow-hidden shadow-lg">
                  {/* Member Image with proper positioning */}
                  <img 
                    className="w-full h-full object-cover object-top" 
                    src={member.image} 
                    alt={member.name}
                  />
                </div>

                {/* Member Info */}
                <div className="w-full max-w-sm lg:max-w-none flex flex-col justify-start items-center lg:items-start gap-2 lg:gap-2.5 text-center lg:text-left px-4 lg:px-0">
                  <h5 className="w-full text-black text-lg sm:text-xl lg:text-xl">
                    {member.name}
                  </h5>
                  <h6 className="w-full text-black text-base sm:text-lg lg:text-lg">
                    {member.title}
                  </h6>
                  <div className="w-32 lg:w-48 h-1 bg-blue-700 rounded-[87.85px]" />
                  <p className="w-full text-black font-inter text-sm sm:text-base lg:text-base">
                    {member.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Section - Conditional Rendering for different screen sizes */}
      {screenSize === 'laptop' ? (
        <LaptopCertificateSection />
      ) : screenSize === 'medium-desktop' ? (
        <MediumDesktopCertificateSection />
      ) : (
        <div className="relative z-10 w-full px-4 lg:px-28 pb-16 lg:pb-24">
          
          {/* Certificate Container */}
          <div className="w-full max-w-[1225px] min-h-[400px] lg:h-[518px] relative bg-white rounded shadow-[0px_0px_46.20000076293945px_2px_rgba(0,0,0,0.25)] outline outline-[1.50px] outline-offset-[-1.50px] outline-sky-950/40 mx-auto">
            
            {/* Certificate Header */}
            <div className="absolute left-4 lg:left-[85px] top-8 lg:top-[59px] w-full lg:w-[487px] flex flex-col items-center gap-3.5 px-4 lg:px-0">
              <h2 className="w-full text-center text-neutral-800 whitespace-nowrap">
                Our Awards & Achievements
              </h2>
              <div className="w-48 lg:w-72 h-0 opacity-70 outline outline-1 outline-offset-[-0.50px] outline-blue-700 mt-4"></div>
            </div>

            {/* Decorated Text Section as SVG */}
            <div className="absolute left-4 lg:left-[100px] top-32 lg:top-[150px] w-full lg:w-[450px] h-[180px] lg:h-[200px] px-4 lg:px-0 z-20">
              <img 
                src="/images/certificationsection/certificationtext.svg" 
                alt="CIO Tech Outlook Award - 10 Most Promising Agentic AI Startups 2025" 
                className="w-full h-full object-contain"
              />
            </div>

            {/* Award Description Text */}
            <div className="absolute left-4 lg:left-[140px] top-[320px] lg:top-[360px] w-full lg:w-[380px] px-4 lg:px-0 z-20">
              <p className="w-full text-center text-neutral-800 font-inter">
                Awarded by CIO Tech Outlook for having the 10 most promising Agentic AI Startups
              </p>
            </div>

            {/* Certificate Image */}
            <div className="absolute right-4 lg:left-[664px] top-80 lg:top-[59px] w-full lg:w-[501px] h-48 lg:h-96 px-4 lg:px-0 z-30">
              <CometCard rotateDepth={15} translateDepth={15}>
                <div className="w-full h-full rounded overflow-hidden cursor-pointer border border-black/40">
                  <img
                    src="/images/certificate.webp"
                    alt="SNS Square Certificate of Achievement - Top 10 Agentic AI Startups 2025"
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              </CometCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Conditional Rendering based on screen size */}
      {screenSize === 'mobile' ? <MobileLayout /> : <DesktopLayout />}
    </>
  );
};

export default LeadershipAndCertificate;
