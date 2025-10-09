import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Clock, Calendar, RefreshCw } from 'lucide-react';
import { AiOutlineYoutube } from 'react-icons/ai';
import { LuLinkedin } from 'react-icons/lu';
import { FaInstagram } from 'react-icons/fa6';
import { RiShareForwardLine } from "react-icons/ri";
import { FaWhatsapp, FaLinkedinIn, FaInstagram as FaInsta, FaTimes } from 'react-icons/fa';
import { SiOpenai, SiClaude, SiPerplexity, SiGooglegemini } from 'react-icons/si';
import { TbSparkles, TbRobot } from 'react-icons/tb';
import SEO from '../../components/common/SEO';

// Import blog data
import { fetchBlogBySlug } from '../../api/Service/blog';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [blog, setBlog] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState({});
  const [navigationAnchors, setNavigationAnchors] = useState([]);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const sectionIdsRef = useRef([]);
  const scrollHandlerRef = useRef(null);

  // Share functionality
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

  // AI Summary Options
  const promptText = `Summarize this article in 100 words. Include 3–5 key takeaways that capture the main insights or actionable points. Keep the tone concise, clear, and informative.: ${currentUrl}`;
  
  const aiSummaryOptions = [
    {
      name: 'ChatGPT',
      icon: <SiOpenai className="w-5 h-5" />,
      url: `https://chatgpt.com/?q=${encodeURIComponent(promptText)}`,
      bgColor: 'bg-green-100 hover:bg-green-100',
      textColor: 'text-green-600',
      supportsUrlPrefill: true
    },
      {
      name: 'Perplexity',
      icon: <SiPerplexity className="w-5 h-5" />,
      url: `https://www.perplexity.ai/?q=${encodeURIComponent(promptText)}`,
      bgColor: 'bg-blue-100 hover:bg-blue-100',
      textColor: 'text-blue-600',
      supportsUrlPrefill: true
    },
    {
      name: 'Claude',
      icon: <SiClaude className="w-5 h-5" />,
      url: `https://claude.ai/chat`,
      bgColor: 'bg-orange-50 hover:bg-orange-100',
      textColor: 'text-orange-600',
      supportsUrlPrefill: false,
      fallbackAction: () => {
        navigator.clipboard.writeText(promptText).then(() => {
          window.open('https://claude.ai/chat', '_blank');
          // Show a toast notification instead of alert
          showToast('Prompt copied! Paste it in Claude and press Enter.');
        });
      }
    },
    {
      name: 'Grok',
      icon: <TbSparkles className="w-5 h-5" />,
      url: `https://x.com/i/grok`,
      bgColor: 'bg-gray-50 hover:bg-gray-100',
      textColor: 'text-gray-600',
      supportsUrlPrefill: false,
      fallbackAction: () => {
        navigator.clipboard.writeText(promptText).then(() => {
          window.open('https://x.com/i/grok', '_blank');
          showToast('Prompt copied! Paste it in Grok and press Enter.');
        });
      }
    },
  
    {
      name: 'Gemini',
      icon: <SiGooglegemini className="w-5 h-5" />,
      url: `https://gemini.google.com/`,
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      textColor: 'text-purple-600',
      supportsUrlPrefill: false,
      fallbackAction: () => {
        navigator.clipboard.writeText(promptText).then(() => {
          window.open('https://gemini.google.com/', '_blank');
          showToast('Prompt copied! Paste it in Gemini and press Enter.');
        });
      }
    }
  ];

  // Toast notification function
  const showToast = (message) => {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300';
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <span class="text-sm font-medium">${message}</span>
      </div>
    `;
    
    document.body.appendChild(toast);
    
    // Remove toast after 4 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translate(-50%, 20px)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 4000);
  };

  // ... (keep all existing useEffect and functions as they are) ...

  useEffect(() => {
    const load = async () => {
      try {
        if (!id) return;
        const res = await fetchBlogBySlug(id);
        const b = res?.data;
        if (b) {
          setBlog({
            id: b.slug,
            title: b.title,
            content: b,
            date: new Date(b.published_at || b.publishedAt || Date.now()).toLocaleDateString(),
            updatedDate: new Date(b.updatedAt || b.published_at || b.publishedAt || Date.now()).toLocaleDateString(),
            readTime: '7min reading',
          });
        } else {
          setBlog(null);
        }
      } catch (e) {
        setBlog(null);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    const nonBlogPaths = ['/', '/about-us', '/life-at-sns', '/careers', '/agent-workbench', '/usecase'];

    const shouldNavigateAway = nonBlogPaths.some(path =>
      location.pathname === path ||
      (path !== '/' && location.pathname.startsWith(path))
    );

    if (shouldNavigateAway) {
      setTimeout(() => {
        window.location.href = location.pathname;
      }, 0);
    }
  }, [location.pathname]);

  const getNavigationAnchors = useCallback((content) => {
    if (!content) return [];

    const anchors = [];

    if (content.challenge) {
      anchors.push({ id: 'challenge', title: 'Challenge' });
    }
    if (content.smart_supply_chain || content.what_is_agentic_ai || content.how_ai_transforms_risk_assessment) {
      anchors.push({ id: 'solution', title: 'Solution' });
    }
    if (content.benefits || content.benefits_for_organizations) {
      anchors.push({ id: 'benefits', title: 'Benefits' });
    }
    if (content.industry_examples || content.key_applications) {
      anchors.push({ id: 'examples', title: 'Examples' });
    }
    if (content.road_ahead || content.the_road_ahead) {
      anchors.push({ id: 'future', title: 'Future' });
    }

    return anchors;
  }, []);

  useEffect(() => {
    if (blog && blog.content) {
      const anchors = getNavigationAnchors(blog.content);
      setNavigationAnchors(anchors);

      if (anchors.length > 0) {
        const progress = {};
        anchors.forEach(anchor => {
          progress[anchor.id] = 0;
        });
        setScrollProgress(progress);
        setActiveSection(anchors[0].id);
        sectionIdsRef.current = anchors.map(anchor => anchor.id);
      }
    }
  }, [blog, getNavigationAnchors]);

  useEffect(() => {
    const handleScroll = () => {
      const currentSectionIds = sectionIdsRef.current;
      if (currentSectionIds.length === 0) return;

      let currentActiveSection = '';
      const navbarHeight = window.innerWidth < 1024 ? 80 : 160;

      setScrollProgress(prevProgress => {
        const newProgress = {};

        currentSectionIds.forEach(sectionId => {
          newProgress[sectionId] = 0;
        });

        currentSectionIds.forEach((sectionId) => {
          const element = document.getElementById(sectionId);
          if (element) {
            const rect = element.getBoundingClientRect();
            const heading = element.querySelector('h4');
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

  useEffect(() => {
    if (blog && scrollHandlerRef.current) {
      const handleScroll = scrollHandlerRef.current;
      window.addEventListener('scroll', handleScroll, { passive: true });

      setTimeout(() => {
        handleScroll();
      }, 100);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [blog]);

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

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Blog not found</h2>
          <p className="text-gray-600 mb-4">ID: {id}</p>
          <button
            onClick={() => navigate('/resources/blog')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  const { title, content, date, updatedDate, readTime } = blog;

  // ... (keep all existing renderContent function as it is) ...

  const renderContent = () => {
    // For new format blogs with HTML content (check if content contains HTML tags)
    if (content.content && typeof content.content === 'string' && 
        content.originalFormat === 'new' && 
        content.content.includes('<')) {
      return (
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      );
    }

    // For new format blogs with plain text content or old format blogs
    if (content.content && typeof content.content === 'string' && 
        content.originalFormat === 'new' && 
        !content.content.includes('<')) {
      return (
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            {content.content}
          </p>
        </div>
      );
    }

    // For old format blogs or blogs with structured content
    const sections = [];

    if (content.introduction) {
      sections.push(
        <div key="introduction" className="mb-8">
          <p className="text-gray-700 leading-relaxed text-sm md:text-base">
            {content.introduction.context || content.introduction.overview}
          </p>
          {content.introduction.impact && (
            <p className="text-gray-700 leading-relaxed mt-4 text-sm md:text-base">
              <strong>Impact:</strong> {content.introduction.impact}
            </p>
          )}
          {content.introduction.shift && (
            <p className="text-gray-700 leading-relaxed mt-4 text-sm md:text-base">
              <strong>Shift:</strong> {content.introduction.shift}
            </p>
          )}
        </div>
      );
    }

    if (content.challenge) {
      sections.push(
        <section key="challenge" id="challenge" className="space-y-4 sm:space-y-6 progress-section scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-40">
          <h4 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">The Challenge</h4>
          <div className="text-gray-600 leading-relaxed space-y-3 sm:space-y-4 pt-2 sm:pt-4 text-sm sm:text-base">
            <p>{content.challenge.description}</p>
            {content.challenge.risks && (
              <ul className="list-disc list-inside space-y-2 ml-4">
                {content.challenge.risks.map((risk, index) => (
                  <li key={index}>{risk}</li>
                ))}
              </ul>
            )}
            {content.challenge.problem && (
              <p className="">{content.challenge.problem}</p>
            )}
          </div>
        </section>
      );
    }

    if (content.smart_supply_chain) {
      sections.push(
        <section key="solution" id="solution" className="space-y-4 sm:space-y-6 progress-section scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-40">
          <h4 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">Smart Supply Chain Solution</h4>
          <div className="text-gray-600 leading-relaxed space-y-3 sm:space-y-4 pt-2 sm:pt-4 text-sm sm:text-base">
            <p>{content.smart_supply_chain.definition}</p>
            {content.smart_supply_chain.capabilities && (
              <div className="space-y-3 sm:space-y-4">
                {content.smart_supply_chain.capabilities.map((capability, index) => (
                  <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{capability.name}</h5>
                    <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
                      {capability.functions.map((func, funcIndex) => (
                        <li key={funcIndex}>{func}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );
    }

    if (content.what_is_agentic_ai) {
      sections.push(
        <section key="solution" id="solution" className="space-y-4 sm:space-y-6 progress-section scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-40">
          <h4 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">What is Agentic AI?</h4>
          <div className="text-gray-600 leading-relaxed space-y-3 sm:space-y-4 pt-2 sm:pt-4 text-sm sm:text-base">
            <p>{content.what_is_agentic_ai.definition}</p>
            <p>{content.what_is_agentic_ai.differences_from_traditional_ai}</p>
            {content.what_is_agentic_ai.capabilities && (
              <ul className="list-disc list-inside space-y-2 ml-4">
                {content.what_is_agentic_ai.capabilities.map((capability, index) => (
                  <li key={index}>{capability}</li>
                ))}
              </ul>
            )}
            <p className="font-medium">{content.what_is_agentic_ai.impact}</p>
          </div>
        </section>
      );
    }

    if (content.how_ai_transforms_risk_assessment) {
      sections.push(
        <section key="solution" id="solution" className="space-y-4 sm:space-y-6 progress-section scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-40">
          <h4 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">How AI Transforms Risk Assessment</h4>
          <div className="text-gray-600 leading-relaxed space-y-3 sm:space-y-4 pt-2 sm:pt-4 text-sm sm:text-base">
            <div className="space-y-3 sm:space-y-4">
              {content.how_ai_transforms_risk_assessment.map((section, index) => (
                <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <h5 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{section.section}</h5>
                  <p className="leading-relaxed mb-2">{section.description}</p>
                  {section.example && (
                    <p className="text-sm mb-2"><em>Example: {section.example}</em></p>
                  )}
                  <p className="font-medium">{section.benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (content.benefits || content.benefits_for_organizations) {
      const benefits = content.benefits || content.benefits_for_organizations;
      sections.push(
        <section key="benefits" id="benefits" className="space-y-4 sm:space-y-6 progress-section scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-40">
          <h4 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">Benefits</h4>
          <div className="text-gray-600 leading-relaxed space-y-3 sm:space-y-4 pt-2 sm:pt-4 text-sm sm:text-base">
            <ul className="list-disc list-inside space-y-2 ml-4">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </section>
      );
    }

    if (content.industry_examples || content.key_applications) {
      sections.push(
        <section key="examples" id="examples" className="space-y-4 sm:space-y-6 progress-section scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-40">
          <h4 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">
            {content.industry_examples ? 'Industry Examples' : 'Key Applications'}
          </h4>
          <div className="text-gray-600 leading-relaxed space-y-3 sm:space-y-4 pt-2 sm:pt-4 text-sm sm:text-base">
            {content.industry_examples && (
              <div className="space-y-3 sm:space-y-4">
                {Object.entries(content.industry_examples).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h6 className="text-gray-900 mb-3 capitalize text-base sm:text-lg">
                      {key.replace(/_/g, ' ')}
                    </h6>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            )}
            {content.key_applications && (
              <div className="space-y-3 sm:space-y-4">
                {content.key_applications.map((app, index) => (
                  <div key={index} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h5 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">{app.application}</h5>
                    <p>{app.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      );

      if (content.image2) {
        sections.push(
          <div key="image2" className="mb-8 sm:mb-12 rounded-lg overflow-hidden">
            <img
              src={content.image2}
              alt={`${title} - Additional Content`}
              className="w-full h-auto object-cover"
            />
          </div>
        );
      }
    }

    if (content.road_ahead || content.the_road_ahead) {
      const roadAhead = content.road_ahead || content.the_road_ahead;
      sections.push(
        <section key="future" id="future" className="space-y-4 sm:space-y-6 progress-section scroll-mt-20 sm:scroll-mt-24 lg:scroll-mt-40">
          <h4 className="text-lg sm:text-xl font-medium text-gray-900 leading-tight">The Road Ahead</h4>
          <div className="text-gray-600 leading-relaxed space-y-3 sm:space-y-4 pt-2 sm:pt-4 text-sm sm:text-base">
            {roadAhead.vision && (
              <p>
                <strong>Vision:</strong> {roadAhead.vision}
              </p>
            )}
            {roadAhead.warning && (
              <p>
                <strong>Warning:</strong> {roadAhead.warning}
              </p>
            )}
            {roadAhead.future_focus && (
              <p>
                <strong>Future Focus:</strong> {roadAhead.future_focus}
              </p>
            )}
            {roadAhead.closing_statement && (
              <p className="font-medium">
                {roadAhead.closing_statement}
              </p>
            )}
          </div>
        </section>
      );
      if (content.image3) {
        sections.push(
          <div key="image3" className="mb-8 sm:mb-12 rounded-lg overflow-hidden">
            <img
              src={content.image3}
              alt={`${title} - Additional Content`}
              className="w-full h-auto object-cover"
            />
          </div>
        );
      }
    }

    return sections;
  };

  return (
    <div className="min-h-screen bg-white pt-16 sm:pt-20 lg:pt-24">
      <SEO 
        title={blog ? `${blog.title} - SNS Square Blog` : "Blog Post - SNS Square"}
        description={blog ? blog.description : "Read the latest insights and articles from SNS Square on AI, technology, and digital transformation."}
        keywords={blog ? blog.tags?.join(', ') : "AI blog, technology insights, digital transformation"}
        url={`/resources/blog/${id}`}
        type="article"
        publishedTime={blog?.date}
        modifiedTime={blog?.lastModified}
        section={blog?.category}
        tags={blog?.tags || []}
      />
      
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 sm:top-20 lg:top-24 right-0 w-[400px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[450px] lg:h-[600px] bg-blue-300/20 rounded-full blur-3xl opacity-45"></div>
        <div className="absolute top-16 sm:top-20 lg:top-24 left-0 w-[400px] sm:w-[600px] lg:w-[800px] h-[300px] sm:h-[450px] lg:h-[600px] bg-blue-600/20 rounded-full blur-3xl opacity-45"></div>
      </div>

      {/* Main container */}
      <div className="max-w-[1480px] lg:w-[1000px] xl:w-[1120px] 2xl:w-[1480px] mx-auto">

        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-4 sm:py-6 lg:py-8 text-xs sm:text-sm text-gray-500 overflow-x-auto">
          <button
            onClick={() => navigate('/resources')}
            className="hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Resources
          </button>
          <svg className="w-1.5 h-2.5 text-gray-400 flex-shrink-0" viewBox="0 0 7 11" fill="none">
            <path d="M3.79335 5.40047L0.117188 1.7243L1.23602 0.605469L6.03102 5.40047L1.23602 10.1955L0.117188 9.07664L3.79335 5.40047Z" fill="currentColor" />
          </svg>
          <button
            onClick={() => navigate('/resources/blog')}
            className="hover:text-blue-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            Blog
          </button>
          <svg className="w-1.5 h-2.5 text-gray-400 flex-shrink-0" viewBox="0 0 7 11" fill="none">
            <path d="M4.02382 5.40047L0.347656 1.7243L1.46649 0.605469L6.26149 5.40047L1.46649 10.1955L0.347656 9.07664M4.02382 5.40047Z" fill="currentColor" />
          </svg>
          <span className="text-blue-600 truncate">{title}</span>
        </nav>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6">
          {/* Desktop Sticky Left sidebar */}
          <div className="hidden lg:block lg:w-50 xl:w-60 flex-shrink-0">
            <div className="sticky top-24 h-fit max-h-[calc(100vh-16rem)] pb-16 overflow-y-auto">
              <div className="border-r border-gray-200 pr-6">
                {/* Article metadata */}
                <div className="space-y-4 pb-6 border-b border-gray-200">
                  <div className="space-y-3 text-sm text-gray-600 pt-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{readTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Published on {date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4" />
                      <span>Updated on {updatedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Navigation anchors */}
                {navigationAnchors.length > 0 && (
                  <div className="pt-6 space-y-2">
                    {navigationAnchors.map((anchor) => (
                      <div
                        key={anchor.id}
                        className="py-3 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg px-3"
                        onClick={() => scrollToSection(anchor.id)}
                      >
                        <h6 className={`transition-colors text-sm ${activeSection === anchor.id ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                          {anchor.title}
                        </h6>
                        {scrollProgress[anchor.id] > 0 && scrollProgress[anchor.id] < 100 && (
                          <div className="mt-3 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-out"
                              style={{ width: `${scrollProgress[anchor.id]}%` }}
                            ></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0 relative max-w-4xl">
            {/* Desktop Follow Us section - Fixed positioning for 1280px to 1390px */}
            <div className="hidden xl:block absolute top-0 -right-28 2xl:-right-32 3xl:-right-40">
              <div className="flex flex-col items-center gap-3">
                <span className="text-sm text-gray-600">Follow Us</span>
                <div className="flex flex-col gap-2 relative">
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

                  <a
                    href="https://www.youtube.com/@snssquare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                  >
                    <AiOutlineYoutube className="w-5 h-5 text-gray-900" />
                  </a>

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

                <a
                  href="https://www.youtube.com/@snssquare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center hover:bg-pink-100 transition-colors"
                >
                  <AiOutlineYoutube className="w-4 h-4 text-gray-900" />
                </a>

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

            {/* Article header */}
            <div className="mb-8 sm:mb-10 lg:mb-12 pr-0 xl:pr-16 2xl:pr-24">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                {title}
              </h2>

              {/* AI Summarize Feature - Below Title */}
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mb-8 mt-10 mb-10">
                <div className="mb-4">
                  <h4 className="font-normal text-gray-900">Summarize this article with AI</h4>
                  <p className="text-sm text-gray-600 pt-2">Get a quick summary using your preferred AI assistant</p>
                </div>

                {/* AI Platform Options - Horizontal Layout */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {aiSummaryOptions.map((option, index) => (
                    option.supportsUrlPrefill ? (
                      <a
                        key={index}
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-sm group flex-1 sm:flex-none min-w-0"
                      >
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
                          <div className={option.textColor}>
                            {React.cloneElement(option.icon, { className: "w-3 h-3 sm:w-5 sm:h-5" })}
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">{option.name}</span>
                      </a>
                    ) : (
                      <button
                        key={index}
                        onClick={option.fallbackAction}
                        className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl transition-all duration-200 hover:shadow-sm group flex-1 sm:flex-none min-w-0"
                      >
                        <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0`}>
                          <div className={option.textColor}>
                            {React.cloneElement(option.icon, { className: "w-3 h-3 sm:w-5 sm:h-5" })}
                          </div>
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-800 truncate">{option.name}</span>
                      </button>
                    )
                  ))}
                </div>
                
                <div className="mt-4 p-3 rounded-lg border border-blue-100">
                  <div className="text-gray-700">
                    {/* <TbSparkles className="w-3 h-3" /> */}
                    <h4 className='text-small'>How it works: ChatGPT & Perplexity will open with the prompt pre-filled. For Claude, Grok & Gemini, the prompt will be copied to your clipboard - just paste and press Enter!</h4>
                </div>
                </div>
              </div>
            </div>

            {/* Blog Image - Responsive */}
            {(content.feature_image || content.image) && (
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden mb-8 sm:mb-10 lg:mb-12">
                <img
                  src={content.feature_image || content.image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Article sections */}
            <div className="space-y-8 sm:space-y-10 lg:space-y-12 pb-32 sm:pb-48 lg:pb-64">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
