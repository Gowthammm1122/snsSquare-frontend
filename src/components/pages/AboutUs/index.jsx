import React from "react";
import SEO from "../../common/SEO";
import HeroSection from "./HeroSection";
import ValuesSection from "./ValuesSection";
import MissionVisionSection from "./MissionVisionSection";
import LeadershipSection from "./LeadershipSection";
import Certificate from "./Certificate";
import CareersSection from "./CareersSection";
import EndToEndCards from "./endtoendCards";

const AboutUs = () => {
  return (
    <div className="bg-white">
      <SEO
        title="About Us | SNS Square Agentic AI"
        description="SNS Square delivers world-class Agentic AI solutions to accelerate growth, transform industries, and enable intelligent, scalable business operations."
        keywords="SNS Square, About Us, Agentic AI, Business Automation, AI Solutions, Enterprise AI, Digital Transformation, AI Enablement"
        image="/images/square_logo_black.png"
        url="/about-us" // Updated to relative URL
      />
      <HeroSection />
      <ValuesSection />
      <MissionVisionSection />
      <EndToEndCards />
      <LeadershipSection />
    </div>
  );
};

export default AboutUs;