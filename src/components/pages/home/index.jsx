import React from "react";
import SEO from "../../common/SEO";
import HeroSection from "./HeroSection";
import FeatureCardsSection from "./FeatureCardsSection";
import WhatWeExcelSection from "./WhatWeExcelSection";
import ExpertsTechSection from "./ExpertsTechSection";
import ScenarioSection from "./scenarioSection";

import IdeaSuiteSection from "./IdeaSuiteSection";
import CoreServiceSection from "./CoreServiceSection";

const Home = () => {
  return (
    <div className="w-full bg-white min-h-screen overflow-x-hidden">
      <SEO 
        title="SNS Square | Agentic AI for Smarter Business Automation"
        description="SNS Square builds powerful Agentic AI solutions that transform businesses. Automate operations, unlock data intelligence, and scale smarter with our AI agents."
        keywords="SNS Square, Agentic AI, AI Agents, Business Automation, Digital Transformation, Data Intelligence, Enterprise AI, AI Solutions"
        image="https://www.snssquare.com/images/og/home-og.jpg"
        url="https://www.snssquare.com/"
      />
      <style dangerouslySetInnerHTML={{__html: `
        /* Global overflow prevention */
        * {
          box-sizing: border-box;
        }
        
        body {
          overflow-x: hidden !important;
        }
        
        /* Responsive fixes for specific breakpoints */
        @media (min-width: 398px) and (max-width: 639px) {
          .responsive-container {
            max-width: 380px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .responsive-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .responsive-card {
            padding: 12px !important;
          }
        }
        
        @media (min-width: 640px) and (max-width: 767px) {
          .responsive-container {
            max-width: 600px !important;
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .responsive-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
          }
          .responsive-card {
            padding: 16px !important;
          }
        }
        
        @media (min-width: 770px) and (max-width: 1023px) {
          .responsive-container {
            max-width: 750px !important;
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .responsive-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
          .responsive-card {
            padding: 18px !important;
          }
        }
        
        @media (min-width: 1098px) and (max-width: 1279px) {
          .responsive-container {
            max-width: 1000px !important;
            padding-left: 32px !important;
            padding-right: 32px !important;
          }
          .responsive-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 24px !important;
          }
          .responsive-card {
            padding: 20px !important;
          }
        }
        
        @media (min-width: 1289px) and (max-width: 1945px) {
          .responsive-container {
            max-width: 1200px !important;
            padding-left: 40px !important;
            padding-right: 40px !important;
          }
          .responsive-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 28px !important;
          }
          .responsive-card {
            padding: 24px !important;
          }
        }

        /* Styles for larger screens */
        @media (min-width: 1946px) and (max-width: 2560px) {
          .responsive-container {
            max-width: 1400px !important;
            padding-left: 48px !important;
            padding-right: 48px !important;
          }
          .responsive-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 32px !important;
          }
          .responsive-card {
            padding: 28px !important;
          }
        }

        @media (min-width: 2561px) {
          .responsive-container {
            max-width: 1800px !important;
            padding-left: 56px !important;
            padding-right: 56px !important;
          }
          .responsive-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 36px !important;
          }
          .responsive-card {
            padding: 32px !important;
          }
        }
        
        /* Solutions section mobile alignment fixes - iPhone 6/7/8 style */
        @media (max-width: 414px) {
          .solutions-container {
            padding-left: 20px !important;
            padding-right: 20px !important;
            max-width: 375px !important;
          }
          .solutions-grid {
            gap: 20px !important;
          }
          .solutions-card {
            padding: 20px !important;
          }
        }
        
        @media (min-width: 415px) and (max-width: 767px) {
          .solutions-container {
            padding-left: 24px !important;
            padding-right: 24px !important;
            max-width: 400px !important;
          }
          .solutions-grid {
            gap: 24px !important;
          }
          .solutions-card {
            padding: 22px !important;
          }
        }
        
        /* Mobile image fill to corner */
        @media (max-width: 767px) {
          .mobile-image-fill {
            margin-right: -21px !important;
            margin-bottom: -21px !important;
            border-bottom-right-radius: 11px !important;
            border-top-right-radius: 0 !important;
          }
        }
        
        /* Additional mobile overflow fixes */
        @media (max-width: 768px) {
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Ensure all containers respect viewport width */
          .container, .max-w-\\[1480px\\] {
            max-width: 100vw !important;
            overflow-x: hidden !important;
          }
          
          /* Fix any elements that might cause horizontal overflow */
          * {
            max-width: 100% !important;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          .mobile-image-fill {
            max-width: 280px !important;
            border-bottom-right-radius: 11px !important;
            border-top-right-radius: 0 !important;
          }
        }

        /* Responsive alignment fixes for 1024px and up */
        @media (min-width: 1024px) and (max-width: 1279px) {
          .scenario-tabs {
            gap: 8px !important; /* Reduce gap between tabs */
          }
          .scenario-tab-button {
            padding: 8px 10px !important; /* Adjust tab padding */
            font-size: 13px !important;
          }
          .what-we-excel-section h3,
          .core-service-section h3,
          .idea-suite-section h3,
          .scenario-section h3 {
            font-size: 32px !important; /* Consistent heading size */
          }
        }

        @media (min-width: 1280px) {
          .what-we-excel-section h3,
          .core-service-section h3,
          .idea-suite-section h3,
          .scenario-section h3 {
            font-size: 36px !important; /* Restore larger heading size */
          }
        }
        
        /* Fix logo overlapping in ExpertsTechSection for tablet views */
        @media (min-width: 640px) and (max-width: 768px) {
          .experts-tech-section {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
          .experts-tech-section .logoloop-container {
            --logoloop-gap: 48px !important;
            --logoloop-logoHeight: 24px !important;
          }
          .experts-tech-section .logoloop-container img {
            max-width: 80px !important;
            height: 24px !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1023px) {
          .experts-tech-section {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
          .experts-tech-section .logoloop-container {
            --logoloop-gap: 40px !important;
            --logoloop-logoHeight: 26px !important;
          }
          .experts-tech-section .logoloop-container img {
            max-width: 100px !important;
            height: 26px !important;
          }
        }
      `}} />
      
      <HeroSection />
      <ExpertsTechSection />
      <WhatWeExcelSection />
      <FeatureCardsSection />
      <ScenarioSection />
      {/* The WhatWeExcelSection handles its own scroll interception and center snapping. */}
      {/* Lock Component */}
      {/* <div className='mx-auto py-0'>
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 1400px) and (max-width: 1700px) and (max-height: 950px) {
            .lock-container-1600x900 {
              padding-top: 0 !important;
              padding-bottom: 0 !important;
              margin-top: 0 !important;
              margin-bottom: 0 !important;
            }
          }
        `}} />
        <div className="lock-container-1600x900">
          <ScenarioSection/>
        </div>
      </div> */}
      
      <CoreServiceSection />
      <IdeaSuiteSection />
      {/* <CoreValueSection /> */}
    </div>
  );
};

export default Home;
