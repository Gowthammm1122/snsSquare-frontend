import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowOutward } from "react-icons/md";

const FeatureCardsSection = () => {
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });
  const navigate = useNavigate();

  const handleMouseMove = (e) => {
    setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }));
  };

  const showCursor = () => setCursor((c) => ({ ...c, visible: true }));
  const hideCursor = () => setCursor((c) => ({ ...c, visible: false }));

  return (
    <div
      className="relative z-30 py-12 md:py-16 lg:py-20 xl:py-24"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex justify-between items-start md:items-center">
          {/* Section Title - Desktop H3 */}
          <h3 className="font-bold leading-tight text-2xl md:text-3xl lg:text-4xl">
            End-to-end <br className="hidden md:block" /> AI Enablement Approach
          </h3>
          <button onClick={() => navigate('/agent-workbench')} className="border border-black rounded-[4px] px-8 py-3 text-black font-medium hidden md:block whitespace-nowrap">
            Explore
          </button>
        </div>
        {/* <p className="mt-3 text-[#606060]">
          Not just another AI platform. A complete Agentic AI suite engineered to adapt to your challenges, empower your teams, and unlock new possibilities.
        </p> */}
        {/* Three image-backed cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 mt-6 md:mt-8 lg:mt-10">
          {/* Card 1 */}
          <article
            className="relative rounded-[4px] overflow-hidden shadow-sm bg-white cursor-none"
            onMouseEnter={showCursor}
            onMouseLeave={hideCursor}
            onClick={() => navigate('/agent-workbench')}
            style={{
              backgroundImage: "url('/images/home/Link.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative p-6 sm:p-8 h-[480px] md:h-[560px] flex flex-col justify-between">
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
                   Strategy to Execution
                </h4>
                <p className="mt-3 text-[#606060]">
                  We don’t just advise; we architect. From identifying the right AI opportunities to designing a tailored roadmap, we align your business vision with transformative AI strategies that are practical, scalable, and future-ready.
                </p>
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article
            className="relative rounded-[4px] overflow-hidden shadow-sm bg-white cursor-none"
            onMouseEnter={showCursor}
            onMouseLeave={hideCursor}
            onClick={() => navigate('/agent-workbench')}
            style={{
              backgroundImage: "url('/images/home/Link (1).png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative p-6 sm:p-8 h-[480px] md:h-[560px] flex flex-col justify-between">
              <div>
                <h4 
                className="inline-block leading-normal"
                style={{
                  background: "linear-gradient(90deg, #805DFC 0%, #4C3796 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}>
                  Seamless Integration
                </h4>
                <p className="mt-3 text-[#606060]">
               AI delivers value only when it’s embedded into your core operations. We integrate intelligent systems into your existing workflows, ensuring interoperability, automation, and measurable efficiency without disrupting business continuity.
                </p>
              </div>
            </div>
          </article>

          {/* Card 3 */}
          <article
            className="relative rounded-[4px] overflow-hidden shadow-sm bg-white cursor-none"
            onMouseEnter={showCursor}
            onMouseLeave={hideCursor}
            onClick={() => navigate('/agent-workbench')}
            style={{
              backgroundImage: "url('/images/home/Link (2).png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-white/10" />
            <div className="relative p-6 sm:p-8 h-[480px] md:h-[560px] flex flex-col justify-between">
              <div>
                <h4 style={{
                  background: "linear-gradient(90deg, #1357E5 0%, #002E8E 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}>
                  Continuous Optimisation
                </h4>
                <p className="mt-3 text-[#606060]">
                  AI isn’t a one-time solution it evolves. Our approach includes ongoing monitoring, model retraining, and performance tuning, enabling your business to adapt quickly, stay competitive, and unlock sustained growth.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Custom Cursor */}
      {cursor.visible && (
        <div
          className="fixed z-[100] pointer-events-none"
          style={{ left: cursor.x, top: cursor.y, transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-lg transition-transform duration-150">
            <MdArrowOutward size={20} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FeatureCardsSection;
