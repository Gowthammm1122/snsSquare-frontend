import React from "react";
import LogoLoop from "../../common/LogoLoop";

const logos = [
  { src: "/images/home/company logos/AWS.png", alt: "AWS" },
  { src: "/images/home/company logos/AZURE.png", alt: "Azure" },
  { src: "/images/home/company logos/Databricks.png", alt: "Databricks" },
  { src: "/images/home/company logos/SalesForce.png", alt: "Salesforce" },
  { src: "/images/home/company logos/ServiceNow.png", alt: "ServiceNow" },
  { src: "/images/home/company logos/Snowflake.png", alt: "Snowflake" },
];

const ExpertsTechSection = () => {
  return (
    <section className="experts-tech-section px-4 xs:px-5 sm:px-6 lg:px-8 py-10 md:py-14 lg:py-16">
      <div className="max-w-[1480px] mx-auto">
        {/* <h5 className="leading-tight text-black mb-6 text-center text-xl sm:text-2xl">
          Experts in Cutting-Edge Technologies
        </h5> */}
        
        {/* Static logo display for tablet views to prevent overlapping */}
        <div className="w-full mt-8 mb-4 overflow-hidden">
          <div className="hidden lg:block">
            <LogoLoop
              logos={logos}
              speed={120}
              direction="left"
              logoHeight={58}
              gap={60}
              pauseOnHover={true}
              fadeOut={true}
              scaleOnHover={false}
              ariaLabel="Technology partner logos"
              className="w-full logoloop-container"
            />
          </div>
          
          {/* Static logo grid for tablet and mobile */}
          <div className="lg:hidden">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
              {logos.map((logo, index) => (
                <div key={index} className="flex-shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-6 sm:h-7 md:h-8 w-auto max-w-[70px] sm:max-w-[80px] md:max-w-[90px] object-contain opacity-70 hover:opacity-100 transition-opacity duration-200"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertsTechSection;


