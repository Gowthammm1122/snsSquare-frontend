import React from "react";

const JobOpportunitiesSection = () => {
  const jobOpenings = [
    {
      id: 1,
      title: "Software Developers",
      description: "Build and maintain applications that solve real-world problems. Collaborate with teams to deliver high-quality software.",
      icon: "/icons/Career/SoftwareDeveloper.png"
    },
    {
      id: 2,
      title: "UI/UX Designers",
      description: "Design intuitive interfaces and seamless experiences for users. Focus on aesthetics and usability to enhance engagement.",
      icon: "/icons/Career/UIUX.png"
    },
    {
      id: 3,
      title: "Data Scientists",
      description: "Analyze data to uncover insights and drive business decisions. Build predictive models and visualize trends effectively.",
      icon: "/icons/Career/Data.png"
    },
    {
      id: 4,
      title: "DevOps Engineers",
      description: "Streamline software development and deployment processes. Ensure reliable infrastructure and continuous integration.",
      icon: "/icons/Career/Devops.png"
    }
  ];

  return (
    <div className="pb-16 pt-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <p className="  text-gray-900 text-center ">
          Opportunities that fuel your growth
        </p>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {jobOpenings.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-yellow-400 rounded-lg flex items-center justify-center mb-4">
                <img src={job.icon} alt={job.title} className="w-8 h-8 object-contain" />
              </div>

              {/* Job Title */}
              <h6 className="text-xl  text-gray-900 mb-3">
                {job.title}
              </h6>

              {/* Job Description */}
              <p className="text-gray-600 mb-6 leading-relaxed  mt-4">
                {job.description}
              </p>

              {/* Apply Link */}
              <a
                href={`../careers/JobDescription?id=${job.id}`}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobOpportunitiesSection;
