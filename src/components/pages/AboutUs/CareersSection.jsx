import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button2";
import { DraggableCardBody, DraggableCardContainer } from "../../ui/draggable-card";

// Careers data
const careers = [
  {
    id: 1,
    title: "Head of Digital Marketing",
    description: "Lead our digital marketing initiatives and drive growth through innovative strategies.",
    icon: "/images/icons/cube.png",
    responsibilities: [
      "Develop and execute digital marketing strategies",
      "Manage social media presence",
      "Analyze marketing metrics and ROI",
      "Lead marketing team"
    ]
  },
  {
    id: 2,
    title: "Business Development Manager",
    description: "Drive business growth through strategic partnerships and client relationships.",
    icon: "/images/icons/squares.png",
    responsibilities: [
      "Identify new business opportunities",
      "Build strategic partnerships",
      "Manage client relationships",
      "Develop growth strategies"
    ]
  }
];

// Life at SNS images for draggable cards
const lifeAtSnsImages = [
  {
    id: 1,
    title: "Office Collaboration",
    image: "/images/IMG_6488.png",
    className: "absolute top-10 left-1/2 -translate-x-[120%] sm:left-[20%] sm:translate-x-0 rotate-[-5deg]"
  },
  {
    id: 2,
    title: "Team Building",
    image: "/images/IMG_6534.png",
    className: "absolute top-32 left-1/2 -translate-x-[30%] sm:left-[55%] sm:translate-x-0 rotate-[10deg]"
  },
  {
    id: 3,
    title: "Growth Ecosystem",
    image: "/images/IMG_6676.png",
    className: "absolute top-24 left-1/2 -translate-x-1/2 sm:left-[45%] rotate-[-7deg]"
  },
  {
    id: 4,
    title: "Creative Discussions",
    image: "/images/IMG_6533.png",
    className: "absolute top-10 left-1/2 translate-x-[20%] sm:left-[70%] sm:translate-x-0 rotate-[5deg]"
  },
  {
    id: 5,
    title: "Team Outing",
    image: "/images/IMG_7778.png",
    className: "absolute top-32 left-1/2 translate-x-[120%] sm:left-[80%] sm:translate-x-0 rotate-[-3deg]"
  }
];

const CareersSection = () => {
  const navigate = useNavigate();

  return (
    <section className="pt-16 lg:pt-24 bg-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center lg:text-left mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-manrope font-bold text-global-1 mb-6">
            <span className="text-[#1E63FF]">Careers @</span> <br /> SNS Square
          </h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {careers.map((career) => (
            <div
              key={career.id}
              className="bg-[#E6EDFC] rounded-2xl lg:rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <img
                  src={career.icon}
                  alt={career.title}
                  className="w-12 h-12"
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-manrope font-bold text-global-1 mb-4">
                {career.title}
              </h3>
              <div className="w-full h-px bg-gray-300 mb-3"></div>
              <p className="text-base sm:text-lg font-inter text-gray-700 leading-relaxed mb-6">
                {career.description}
              </p>
              <ul className="space-y-2 mb-8">
                {career.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-[#525252] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm sm:text-base font-inter text-gray-700">
                      {responsibility}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                size="medium"
                className="rounded-xl px-6 py-3 text-base text-white font-semibold w-full sm:w-auto bg-[#1E63FF] hover:bg-[#1357E5]"
              >
                Apply Now
              </Button>
            </div>
          ))}
        </div>

        {/* Life at SNS - Draggable Cards */}
        <div className="relative overflow-hidden">
          <DraggableCardContainer className="relative flex min-h-[450px] w-full items-center justify-center">
            <p 
              className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800 z-0 cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => {navigate("/life-at-sns"); window.scrollTo(0, 0);}}
            >
              Life at SNS Square
            </p>
            {lifeAtSnsImages.map((item) => (
              <DraggableCardBody key={item.id} className={item.className}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="pointer-events-none relative z-10 h-80  object-cover rounded-lg bg-white"
                />
              </DraggableCardBody>
            ))}
          </DraggableCardContainer>
        </div>
      </div>
    </section>
  );
};

export default CareersSection;
