import React, { useEffect, useState } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";

const WorkbenchLayout = () => {
  const { category } = useParams();
  const [selected, setSelected] = useState("Foundation Agents");
  const navigate = useNavigate();

  const handleClick = (option) => {
    let slug;
    if(option==="Foundation Agents") {
      slug="foundation-agents"
    } else if(option==="Industry-Specific Agents") {
      slug="industry-specific-agents"
    }
    setSelected(option);
    navigate(`/agent-workbench/${slug}`, { state: { type: option?.label } });
  };

  useEffect(() => {
    if(category==="foundation-agents") {
      setSelected("Foundation Agents")
    }
    else if(category==="industry-specific-agents") {
      setSelected("Industry-Specific Agents")
    }
  }, [category]);

  const options = ["Foundation Agents", "Industry", "Customer Agents"];

  return (
    <div className="min-h-screen w-full items-center flex flex-col">
      <section className="w-full mb-20 bg-[linear-gradient(359deg,#ffffff_0%,_#e3ebff_100%)] h-[550px] relative">
        <div
          className="w-full h-[300px] sm:h-[350px] md:h-[450px] lg:h-[560px] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/usecase_hero_frame.png')" }}
        >
          <div className="w-full max-w-[1224px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center">
            <div className="flex flex-col gap-[10px] sm:gap-[40px] md:gap-[54px] mt-40 justify-start items-center w-full text-center">
              <h1 className="text-[32px] sm:text-[48px] md:text-[50px] lg:text-[60px] font-sora font-semibold leading-[40px] sm:leading-[56px] md:leading-[72px] lg:leading-[80px] text-center text-global-1 w-full">
                <span className="text-global-1 font-manrope font-semi-bold mb-4"><span className="text-[#000000]">Agentic AI Marketplace</span></span><br />
                <span className="text-global-1 font-manrope font-semi-bold">Explore <span className="text-[#1E63FF]">1500+ </span>Ready-to-Use AI Agents</span>
              </h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center  mt-10 space-x-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleClick(option)}
              className={`rounded-[26px] px-6 py-[14px] text-base font-semibold border transition-all ${selected === option
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>
      <main className="p-6 mt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default WorkbenchLayout;
