import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { careersAPI } from "../../../api/Service/careers";

const JobOpportunitiesSection = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default job categories for fallback
  const defaultJobCategories = [
    {
      id: 1,
      title: "Software Developers",
      description: "Build and maintain applications that solve real-world problems. Collaborate with teams to deliver high-quality software."
    },
    {
      id: 2,
      title: "UI/UX Designers",
      description: "Design intuitive interfaces and seamless experiences for users. Focus on aesthetics and usability to enhance engagement."
    },
    {
      id: 3,
      title: "Data Scientists",
      description: "Analyze data to uncover insights and drive business decisions. Build predictive models and visualize trends effectively."
    },
    {
      id: 4,
      title: "DevOps Engineers",
      description: "Streamline software development and deployment processes. Ensure reliable infrastructure and continuous integration."
    }
  ];

  // Fetch published jobs from API
  useEffect(() => {
    const fetchPublishedJobs = async () => {
      try {
        setLoading(true);
        const response = await careersAPI.getPublishedJobs();
        
        if (response.success) {
          setJobs(response.data.jobs || []);
        } else {
          console.error('Failed to fetch published jobs:', response.message);
          setError(response.message);
          // Fallback to default categories if API fails
          setJobs(defaultJobCategories);
        }
      } catch (error) {
        console.error('Error fetching published jobs:', error);
        setError('Failed to load job opportunities');
        // Fallback to default categories if API fails
        setJobs(defaultJobCategories);
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedJobs();
  }, []);


  // Function to truncate description for display
  const truncateDescription = (description, maxLength = 120) => {
    if (!description) return "Join our team and make a difference.";
    
    // Remove HTML tags for truncation
    const plainText = description.replace(/<[^>]*>/g, '');
    
    if (plainText.length <= maxLength) {
      return plainText;
    }
    
    return plainText.substring(0, maxLength) + '...';
  };

  const displayJobs = jobs.length > 0 ? jobs : defaultJobCategories;

  if (loading) {
    return (
      <div className="pb-16 pt-8 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-900 text-center">
            Opportunities that fuel your growth
          </p>
          <div className="flex justify-center items-center mt-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16 pt-8 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <p className="text-gray-900 text-center">
          Opportunities that fuel your growth
        </p>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm text-center">
              {error}. Showing default job categories.
            </p>
          </div>
        )}

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {displayJobs.map((job) => (
            <div
              key={job._id || job.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-100"
            >
              {/* Job Title */}
              <h5>
                {job.title}
              </h5>

              {/* Job Description */}
              <p className="text-gray-600 mb-6 leading-relaxed mt-4">
                {truncateDescription(job.description)}
              </p>

              {/* Job Details */}
              {job.location && (
                <div className="mb-4">
                  <span className="text-sm text-gray-500">📍 {job.location}</span>
                </div>
              )}

              {/* Apply Link */}
              <button
                onClick={() => {
                  navigate(`/careers/job/${job._id || job.id}`);
                }}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 cursor-pointer"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>

        {/* No Jobs Message */}
        {!loading && jobs.length === 0 && !error && (
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">No job openings available at the moment.</p>
            <p className="text-sm text-gray-400">Check back later for new opportunities!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobOpportunitiesSection;
