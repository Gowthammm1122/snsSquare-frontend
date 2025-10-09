import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowOutward } from "react-icons/md";
import { RevealOnScroll } from "../../gsap/reveal-on-scroll";

const FeatureCardsSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const navigate = useNavigate();

  const updateCursorPosition = useCallback(() => {
    if (cursorRef.current && isHovering) {
      cursorRef.current.style.left = `${mousePos.current.x}px`;
      cursorRef.current.style.top = `${mousePos.current.y}px`;
    }
  }, [isHovering]);

  const handleMouseMove = useCallback((e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    
    if (isHovering) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(updateCursorPosition);
    }
  }, [isHovering, updateCursorPosition]);

  const showCursor = useCallback((e) => {
    mousePos.current = { x: e.clientX, y: e.clientY };
    setIsHovering(true);
  }, []);
  
  const hideCursor = useCallback(() => {
    setIsHovering(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative z-30 py-12 md:py-16 lg:py-20 xl:py-24 overflow-x-hidden">
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-4">
        <RevealOnScroll direction="up" duration={0.8} delay={0}>
          <div className="flex justify-between items-start md:items-center">
            {/* Section Title - Desktop H3 */}
            <h3 className="font-bold leading-tight text-2xl md:text-3xl lg:text-4xl">
              A Next-Generation Agentic AI Suite, <br className="hidden md:block" /> Built Around You
            </h3>
            <button onClick={() => navigate('/agent-workbench')} className="border border-black rounded-md px-8 py-3 text-black font-medium hidden md:block whitespace-nowrap">
              Explore
            </button>
          </div>
        </RevealOnScroll>
        
        <RevealOnScroll direction="up" duration={0.8} delay={0.2}>
          <p className="mt-3 text-[#606060]">
            Not just another AI platform. A complete Agentic AI suite engineered to adapt to your challenges, empower your teams, and unlock new possibilities.
          </p>
        </RevealOnScroll>
        
        {/* Three image-backed cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-8 mt-6 md:mt-8 lg:mt-10">
          {/* Card 1 */}
          <RevealOnScroll direction="up" duration={0.8} delay={0.3}>
            <article
              className="relative rounded-md overflow-hidden shadow-sm bg-white cursor-none transition-transform duration-300 hover:scale-[1.02]"
              onMouseEnter={showCursor}
              onMouseLeave={hideCursor}
              onMouseMove={handleMouseMove}
              onClick={() => navigate('/agent-workbench')}
              style={{
                backgroundImage: "url('/images/home/Link.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-white/10" />
              <div className="relative p-4 sm:p-6 md:p-8 h-[480px] md:h-[560px] flex flex-col justify-between">
                <div>
                  <h4
                    className="inline-block leading-normal"
                    style={{
                      background: "linear-gradient(90deg, #FA0800 0%, #FF8A0E 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Foundational Agents
                  </h4>
                  <p className="mt-3 text-[#606060]">
                    Foundational Agents are core AI building blocks, flexible, scalable, and ready to power your business with Agentic intelligence, automation and innovation.
                  </p>
                </div>
              </div>
            </article>
          </RevealOnScroll>

          {/* Card 2 */}
          <RevealOnScroll direction="up" duration={0.8} delay={0.4}>
            <article
              className="relative rounded-md overflow-hidden shadow-sm bg-white cursor-none transition-transform duration-300 hover:scale-[1.02]"
              onMouseEnter={showCursor}
              onMouseLeave={hideCursor}
              onMouseMove={handleMouseMove}
              onClick={() => navigate('/agent-workbench')}
              style={{
                backgroundImage: "url('/images/home/Link (1).png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-white/10" />
              <div className="relative p-4 sm:p-6 md:p-8 h-[480px] md:h-[560px] flex flex-col justify-between">
                <div>
                  <h4 
                  className="inline-block leading-normal"
                  style={{
                    background: "linear-gradient(90deg, #805DFC 0%, #4C3796 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}>
                    Industry Solutions
                  </h4>
                  <p className="mt-3 text-[#606060]">
                    AI Agents crafted for your industry, delivering precise insights, efficiency and growth tailored to your business needs.
                  </p>
                </div>
              </div>
            </article>
          </RevealOnScroll>

          {/* Card 3 */}
          <RevealOnScroll direction="up" duration={0.8} delay={0.5}>
            <article
              className="relative rounded-md overflow-hidden shadow-sm bg-white cursor-none transition-transform duration-300 hover:scale-[1.02]"
              onMouseEnter={showCursor}
              onMouseLeave={hideCursor}
              onMouseMove={handleMouseMove}
              onClick={() => navigate('/agent-workbench')}
              style={{
                backgroundImage: "url('/images/home/Link (2).png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-white/10" />
              <div className="relative p-4 sm:p-6 md:p-8 h-[480px] md:h-[560px] flex flex-col justify-between">
                <div>
                  <h4 style={{
                    background: "linear-gradient(90deg, #1357E5 0%, #002E8E 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}>
                    Customer Solutions
                  </h4>
                  <p className="mt-3 text-[#606060]">
                    Personalised Agentic AI solutions crafted to meet your business needs with unique solutions.
                  </p>
                </div>
              </div>
            </article>
          </RevealOnScroll>
        </div>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed z-[100] pointer-events-none transition-opacity duration-200 ease-out transform -translate-x-1/2 -translate-y-1/2 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          left: mousePos.current.x,
          top: mousePos.current.y,
        }}
      >
        <div className="w-10 h-10 rounded-md bg-black text-white flex items-center justify-center shadow-lg">
          <MdArrowOutward size={20} />
        </div>
      </div>
    </div>
  );
};

export default FeatureCardsSection;
