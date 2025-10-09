import React from "react";
import SEO from "../../common/SEO";
import CareersHeroSection from "./CareersHeroSection";
import JobOpportunitiesSection from "./JobOpportunitiesSection";

const CareersPage = () => {
  return (
    <main className="bg-white overflow-x-hidden">
      <SEO 
        title="Careers | Join SNS Square"
        description="Join SNS Square and grow with us. Be part of a culture where innovation thrives, collaboration fuels creativity, and your impact shapes the future."
        keywords="SNS Square Careers, Join SNS Square, Work at SNS Square, Company Culture, Innovation, Collaboration, Employee Growth, Agentic AI Jobs"
        image="https://www.snssquare.com/images/og/careers-og.jpg"
        url="https://www.snssquare.com/careers"
      />
      <CareersHeroSection />
      <JobOpportunitiesSection />
    </main>
  );
};

export default CareersPage;
