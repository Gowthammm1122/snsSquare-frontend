import { Clock, Calendar, RefreshCw } from "lucide-react";
import { AiOutlineYoutube } from "react-icons/ai";
import { LuLinkedin } from "react-icons/lu";
import { FaInstagram } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import SEO from "../../common/SEO";
import useCaseData from "../../../data/usecase.json";
import { FaWhatsapp, FaLinkedinIn, FaInstagram as FaInsta, FaTimes } from 'react-icons/fa';

export default function ResponsiveUseCaseDetailPage() {
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Get current page URL and title for sharing
  const currentUrl = window.location.href;
  const pageTitle = document.title;

  const shareOptions = [
    {
      name: 'LinkedIn',
      icon: <FaLinkedinIn className="w-4 h-4" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      bgColor: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="w-4 h-4" />,
      url: `https://wa.me/?text=${encodeURIComponent(`${pageTitle} - ${currentUrl}`)}`,
      bgColor: 'bg-green-50 hover:bg-green-100'
    },
    {
      name: 'Instagram',
      icon: <FaInsta className="w-4 h-4" />,
      url: `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`,
      bgColor: 'bg-purple-50 hover:bg-purple-100'
    }
  ];

  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Category mapping for breadcrumb display and navigation
  const categoryMapping = {
    "Supply Chain": "supply-chain",
    "Technology": "technology",
    "Healthcare": "healthcare",
    "Human Resource": "human-resource",
    "Insurance": "insurance"
  };

  // Reverse mapping for breadcrumb display
  const breadcrumbCategoryNames = {
    "Supply Chain": "Supply Chain",
    "Technology": "Technology",
    "Healthcare": "Healthcare",
    "Human Resource": "Human Resource", 
    "Insurance": "Insurance"
  };
  
  // Handle both /usecase/:id and /usecase/:category/:id routes
  let useCaseId;
  if (params.id) {
    useCaseId = params.id;
  } else if (params.category) {
    useCaseId = params.category;
  } else {
    useCaseId = 'smart-inventory';
  }
  
  const useCase = useCaseData[useCaseId] || useCaseData['smart-inventory'];
  
  // Create dynamic progress state based on sections
  const sections = useCase.sections || [];
  const sectionIds = sections.map(section => section.id);
  
  const [scrollProgress, setScrollProgress] = useState(() => {
    const progress = {};
    sectionIds.forEach(id => {
      progress[id] = 0;
    });
    return progress;
  });
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');
  const sectionIdsRef = useRef(sectionIds);
  const scrollHandlerRef = useRef(null);
  
  // Update ref when sections change
  useEffect(() => {
    sectionIdsRef.current = sectionIds;
    if (sectionIds.length > 0 && !activeSection) {
      setActiveSection(sectionIds[0]);
    }
  }, [sectionIds, activeSection]);

  // Handle navigation when location changes
  useEffect(() => {
    const nonUseCasePaths = ['/', '/about-us', '/life-at-sns', '/careers', '/resources', '/agent-workbench'];
    
    const shouldNavigateAway = nonUseCasePaths.some(path => 
      location.pathname === path || 
      (path !== '/' && location.pathname.startsWith(path))
    );
    
    if (shouldNavigateAway) {
      setTimeout(() => {
        window.location.href = location.pathname;
      }, 0);
    }
  }, [location.pathname]);

  // Create the scroll handler function
  useEffect(() => {
    const handleScroll = () => {
      const currentSectionIds = sectionIdsRef.current;
      if (currentSectionIds.length === 0) return;

      let currentActiveSection = '';
      const navbarHeight = window.innerWidth < 1024 ? 80 : 160; // Responsive navbar height

      setScrollProgress(prevProgress => {
        const newProgress = {};
        
        currentSectionIds.forEach(sectionId => {
          newProgress[sectionId] = 0;
        });

        currentSectionIds.forEach((sectionId, index) => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const heading = element.querySelector('h2');
            const headingRect = heading ? heading.getBoundingClientRect() : rect;
            
            if (headingRect.top <= navbarHeight) {
              currentActiveSection = sectionId;
            }
            
            const sectionTop = rect.top;
            const sectionBottom = rect.bottom;
            const sectionHeight = rect.height;
            
            if (sectionBottom < navbarHeight) {
              newProgress[sectionId] = 100;
            } else if (sectionTop < navbarHeight && sectionBottom > navbarHeight) {
              const scrolledAmount = navbarHeight - sectionTop;
              const progress = (scrolledAmount / sectionHeight) * 100;
              newProgress[sectionId] = Math.min(100, Math.max(0, progress));
            } else {
              newProgress[sectionId] = 0;
            }
          }
        });

        return newProgress;
      });

      if (currentActiveSection) {
        setActiveSection(currentActiveSection);
      }
    };

    scrollHandlerRef.current = handleScroll;
  }, []);

  // Set up scroll listener when sections are available
  useEffect(() => {
    if (sectionIds.length === 0 || !scrollHandlerRef.current) return;

    const handleScroll = scrollHandlerRef.current;
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    setTimeout(() => {
      handleScroll();
    }, 100);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - (window.innerWidth < 1024 ? 80 : 160);
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 lg:pt-24">
      <SEO 
        title={`${useCase.title} | SNS Square Agentic AI Use Case`}
        description={useCase.description || `Discover how SNS Square's Agentic AI solutions transform ${useCase.category?.toLowerCase() || 'business operations'}. Learn about our innovative AI implementation and measurable business impact.`}
        keywords={`SNS Square, Agentic AI, ${useCase.category || 'AI Solutions'}, Business Automation, Digital Transformation, AI Use Case, ${useCase.title}, Enterprise AI Solutions`}
        image={useCase.image || "https://www.snssquare.com/images/og/usecase-detail-og.jpg"}
        url={`https://www.snssquare.com/usecase/${useCaseId}`}
        type="article"
        publishedTime="2024-08-18T00:00:00Z"
        modifiedTime="2024-09-02T00:00:00Z"
        section={useCase.category || "Use Cases"}
        tags={[useCase.category, "Agentic AI", "Business Automation", "Digital Transformation"]}
      />
      {/* Background gradient effects - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 lg:top-24 right-0 w-[400px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[450px] lg:h-[600px] bg-blue-300/20 rounded-full blur-3xl opacity-45"></div>
        <div className="absolute top-16 sm:top-20 lg:top-24 left-0 w-[400px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[450px] lg:h-[600px] bg-blue-600/20 rounded-full blur-3xl opacity-45"></div>
      </div>

      {/* Main container - Responsive */}
      <div className="max-w-[1480px] lg:w-[1000px] xl:w-[1120px] 2xl:w-[1480px] mx-auto">

        {/* Breadcrumb navigation - Responsive */}
        <nav className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 sm:py-6 lg:py-8 text-xs sm:text-sm text-gray-500 overflow-x-auto">
          <button 
            onClick={() => navigate('/usecase')}
            className="hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Use Cases
          </button>
          <svg className="w-1.5 h-2.5 text-gray-400 flex-shrink-0" viewBox="0 0 7 11" fill="none">
            <path d="M3.79335 5.40047L0.117188 1.7243L1.23602 0.605469L6.03102 5.40047L1.23602 10.1955L0.117188 9.07664L3.79335 5.40047Z" fill="currentColor"/>
          </svg>
          <button 
            onClick={() => navigate(`/usecase?category=${categoryMapping[useCase.category] || useCase.category?.toLowerCase().replace(/\s+/g, '-')}`)}
            className="hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            {breadcrumbCategoryNames[useCase.category] || useCase.category}
          </button>
          <svg className="w-1.5 h-2.5 text-gray-400 flex-shrink-0" viewBox="0 0 7 11" fill="none">
            <path d="M4.02382 5.40047L0.347656 1.7243L1.46649 0.605469L6.26149 5.40047L1.46649 10.1955L0.347656 9.07664L4.02382 5.40047Z" fill="currentColor"/>
          </svg>
          <span className="text-blue-600 truncate">{useCase.title}</span>
        </nav>

        {/* Main layout - Responsive Flex */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6">
          {/* Desktop Sticky Left sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-24 w-80 h-fit max-h-[calc(100vh-16rem)] pb-16 overflow-y-auto">
              <div className="border-r border-gray-200 pr-6">
                {/* Article metadata */}
                <div className="space-y-4 pb-6 border-b border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600 pt-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>7min reading</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Published on August 18, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Updated on September 2, 2025</span>
                    </div>
                  </div>
                </div>
                
                {/* Navigation anchors */}
                <div className="pt-6 space-y-2">
                  {sections.map((section) => (
                    <div 
                      key={section.id}
                      className="py-3 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg px-3"
                      onClick={() => scrollToSection(section.id)}
                    >
                      <h6 className={`transition-colors ${
                        activeSection === section.id ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {section.title}
                      </h6>
                      {scrollProgress[section.id] > 0 && scrollProgress[section.id] < 100 && (
                        <div className="mt-3 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                            style={{width: `${scrollProgress[section.id]}%`}}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 relative max-w-4xl">
            {/* Desktop Follow Us section - Hidden on mobile/tablet */}
            <div className="hidden xl:block absolute top-0 -right-28 2xl:-right-32">
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm text-gray-600">Share</span>
                <div className="flex flex-col gap-2 relative">
                  {/* Direct Social Links */}
                  <a 
                    href="https://www.linkedin.com/company/snssquare/posts/?feedView=all" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                  >
                    <LuLinkedin className="w-5 h-5 text-gray-900" />
                  </a>
                  
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                  >
                    <FaInstagram className="w-5 h-5 text-gray-900" />
                  </a>
                  
                  {/* <a 
                    href="https://www.youtube.com/@snssquare" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                  >
                    <AiOutlineYoutube className="w-5 h-5 text-gray-900" />
                  </a> */}

                  {/* Share Button with Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                    >
                      <RiShareForwardLine className="w-5 h-5 text-gray-900" />
                    </button>
                    
                    {showShareMenu && (
                      <div className="absolute left-12 top-0 bg-white rounded-lg shadow-lg border p-2 min-w-[140px] z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-600 font-medium">Share via</span>
                          <button 
                            onClick={() => setShowShareMenu(false)}
                            className="w-4 h-4 text-gray-400 hover:text-gray-600"
                          >
                            <FaTimes className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex flex-col gap-1">
                          {shareOptions.map((option, index) => (
                            <a
                              key={index}
                              href={option.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-2 p-2 rounded-md ${option.bgColor} transition-colors`}
                              onClick={() => setShowShareMenu(false)}
                            >
                              {option.icon}
                              <span className="text-sm text-gray-800">{option.name}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Social Links - Horizontal at bottom */}
            <div className="xl:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
              <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg">
                <a 
                  href="https://www.linkedin.com/company/snssquare/posts/?feedView=all" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                >
                  <LuLinkedin className="w-4 h-4 text-gray-900" />
                </a>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                >
                  <FaInstagram className="w-4 h-4 text-gray-900" />
                </a>
                
                {/* <a 
                  href="https://www.youtube.com/@snssquare" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                >
                  <AiOutlineYoutube className="w-4 h-4 text-gray-900" />
                </a> */}

                {/* Mobile Share Button */}
                <div className="relative">
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                  >
                    <RiShareForwardLine className="w-4 h-4 text-gray-900" />
                  </button>
                  
                  {showShareMenu && (
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg border p-2 min-w-[140px] z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600 font-medium">Share via</span>
                        <button 
                          onClick={() => setShowShareMenu(false)}
                          className="w-4 h-4 text-gray-400 hover:text-gray-600"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex flex-col gap-1">
                        {shareOptions.map((option, index) => (
                          <a
                            key={index}
                            href={option.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 p-2 rounded-md ${option.bgColor} transition-colors`}
                            onClick={() => setShowShareMenu(false)}
                          >
                            {option.icon}
                            <span className="text-sm text-gray-800">{option.name}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Article header - Responsive */}
            <div className="mb-8 sm:mb-10 lg:mb-12 pr-0 xl:pr-16">
              <h2 className="  text-gray-900 leading-tight mb-4 sm:mb-6">
                {useCase.heroTitle || useCase.title}
              </h2>
              <p className=" text-gray-600 leading-relaxed max-w-full  pt-2">
                {useCase.description}
              </p>
            </div>

            {/* Hero image - Responsive */}
            {useCase.image && (
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8 sm:mb-10 lg:mb-12">
                <img 
                  src={useCase.image} 
                  alt={useCase.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article sections - Responsive */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 pb-32 sm:pb-48 lg:pb-64">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="space-y-4 sm:space-y-6 progress-section scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-40">
                  <h4 className=" font-medium text-gray-900 leading-tight">
                    {section.title}
                  </h4>
                  <div className=" text-gray-600 leading-relaxed space-y-3 sm:space-y-4 pt-2 sm:pt-4">
                    {section.content && (
                      <p>{section.content}</p>
                    )}
                    
                    {/* Render challenges if they exist */}
                    {section.challenges && section.challenges.length > 0 && (
                      <>
                        <p>Key challenges include:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {section.challenges.map((challenge, index) => (
                            <li key={index}><strong>{challenge.split(':')[0]}:</strong> {challenge.split(':')[1]}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    {/* Render features if they exist */}
                    {section.features && section.features.length > 0 && (
                      <>
                        <p>Our platform provides:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                          {section.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </>
                    )}
                    
                    {/* Render benefits if they exist */}
                    {section.benefits && section.benefits.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        {section.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    )}
                    
                    {/* Render additional content if it exists */}
                    {section.additionalContent && (
                      <p>{section.additionalContent}</p>
                    )}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
