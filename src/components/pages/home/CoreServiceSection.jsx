import React, { useState } from 'react';
import { RevealOnScroll } from '../../gsap/reveal-on-scroll';

const TABS = [
  { 
    key: 'marketplace', 
    label: 'Agentic AI Marketplace', 
    desc: 'SNS Square offers a next-generation Agentic AI marketplace with pre-built foundation agents designed to deliver speed, scale, and real-world impact. We empower enterprises with ready-to-deploy intelligence tailored to their industry needs.', 
    icon: 'icons/newicons/agentic_market.svg',
    image: '/images/home/coreservice/agentic_marketplace.png', // Add your specific image for marketplace
  },
  { 
    key: 'digital', 
    label: 'Digital Transformation', 
    desc: 'SNS Square drives end-to-end digital transformation by blending AI, automation, and modern technologies. We help organisations reimagine processes, unlock efficiencies, and stay future-ready in a fast-evolving digital economy.', 
    icon: 'icons/newicons/digitaltrans.svg',
    image: '/images/home/coreservice/transformation.png', // Add your specific image for digital transformation
  },
  { 
    key: 'data', 
    label: 'AI & Data Solutions', 
    desc: 'With deep expertise in AI and data, SNS Square turns raw information into actionable intelligence. From predictive analytics to advanced machine learning, we craft solutions that fuel smarter decisions and measurable business growth.', 
    icon: 'icons/newicons/aidatasol.svg',
    image: '/images/home/coreservice/AI & Data Solutions.png', // Add your specific image for AI & data

  },
  { 
    key: 'platform', 
    label: 'Enterprise Platform Services', 
    desc: 'SNS Square strengthens enterprises with scalable platform services that integrate seamlessly into existing ecosystems. From cloud to automation, we deliver robust, secure, and future-ready platforms built to accelerate performance.', 
    icon: 'icons/newicons/enterpriseplat.svg',
    image: '/images/home/coreservice/platformsrvc.png', // Add your specific image for platform services
  },
  { 
    key: 'custom', 
    label: 'Custom Development', 
    desc: 'SNS Square specialises in building tailor-made digital solutions that align perfectly with business goals. Whether it’s applications, platforms, or AI-driven tools, our custom development ensures precision, innovation, and competitive advantage.', 
    icon: 'icons/newicons/custdev.svg',
    image: '/images/home/coreservice/custom_dev.png', // Add your specific image for custom development
  },
];

const CoreServiceSection = () => {
  const [active, setActive] = useState(TABS[0]);

  return (
    <div className="px-4 xs:px-5 sm:px-6 lg:px-8 py-6 md:py-10 lg:py-14 overflow-x-hidden">
      <div className="max-w-[1480px] mx-auto">
        {/* Row 1: heading + paragraph */}
        <RevealOnScroll direction="up" duration={0.8} delay={0}>
          <div className="mb-4 md:mb-6 lg:mb-8">
            <h3 className="font-manrope font-bold text-[24px] md:text-[30px] lg:text-[36px] leading-tight text-black">
            Our Expertise Areas
            </h3>
            <p className="font-inter text-black/70 mt-2 md:mt-3 text-[15px] md:text-base">
             Our expertise goes beyond services, we deliver transformation. From harnessing the power of agentic AI to driving digital transformation, unlocking data intelligence, building enterprise-ready platforms, and crafting custom solutions, we empower businesses to scale smarter, faster, and stronger in the digital era.
            </p>
          </div>
        </RevealOnScroll>

        {/* Row 2: two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[35%_65%] gap-4 md:gap-6 lg:gap-10 items-start">
          {/* Left column: 5 rows (H6) */}
          <RevealOnScroll direction="left" duration={0.8} delay={0.2}>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible -mx-4 px-4 lg:mx-0 lg:px-0 gap-3 lg:gap-4 pb-4 lg:pb-0 scrollbar-hide">
              {TABS.map((t, index) => (
                <RevealOnScroll key={t.key} direction="up" duration={0.6} delay={0.3 + (index * 0.1)}>
                  <button
                    onClick={() => setActive(t)}
                    className={
                      (active.key === t.key
                        ? 'bg-[#1357E5] text-white'
                        : 'bg-[#F8F8F8] text-black hover:bg-[#F0F0F0]') +
                      ' flex-shrink-0 lg:flex-shrink text-left rounded-md px-4 py-3 md:py-4 lg:py-6 transition-colors flex items-center gap-3 lg:gap-4 w-auto lg:w-full whitespace-nowrap'
                    }
                  >
                    <img src={t.icon} alt={t.label} className="w-5 h-5 md:w-6 md:h-6" />
                    <h6 className="font-manrope font-medium text-[13px] sm:text-[14px] md:text-[16px] lg:text-[18px]">
                      {t.label}
                    </h6>
                  </button>
                </RevealOnScroll>
              ))}
            </div>
          </RevealOnScroll>

          {/* Right column: background image card with title + description */}
          <RevealOnScroll direction="right" duration={0.8} delay={0.4}>
            <div className="relative rounded-md overflow-hidden min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[300px] group">
              <div className="relative h-full w-full transition-transform duration-300 ease-out group-hover:-translate-y-2">
                <img
                  src={active.image}
                  alt={active.label}
                  className="w-full h-full object-cover"
                />
                {/* bottom banner */}
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="font-manrope font-semibold text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] leading-tight sm:leading-snug text-white group-hover:text-white transform transition-all duration-500 ease-out group-hover:-translate-y-1 md:group-hover:-translate-y-2">
                    {active.label}
                  </h4>
                  <div className="translate-y-2 md:translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-75">
                    <p className="font-inter text-[12px] sm:text-sm md:text-base text-white/90 mt-1.5 sm:mt-2 md:mt-3 line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                      {active.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </div>
  );
};

export default CoreServiceSection;
