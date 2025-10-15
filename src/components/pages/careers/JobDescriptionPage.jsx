import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import JodDecriptionHero from './JodDecriptionHero'
import SEO from "../../common/SEO";
import { careersAPI } from "../../../api/Service/careers";

const JobDescriptionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch job data from API
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await careersAPI.getPublishedJobById(id);
        
        if (response.success) {
          setJob(response.data);
        } else {
          console.error('Failed to fetch job:', response.message);
          setError(response.message);
        }
      } catch (error) {
        console.error('Error fetching job:', error);
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    } else {
      setError('No job ID provided');
      setLoading(false);
    }
  }, [id]);

  const handleApplyClick = () => {
    navigate('/careers/JobApplicationPage');
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-full bg-white">
        <SEO 
          title="Loading Job Description | SNS Square"
          description="Loading job description..."
          keywords="SNS Square, Job Description, Loading"
          image="https://www.snssquare.com/images/og/job-description-og.jpg"
          url="https://www.snssquare.com/careers/job-description"
        />
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-4 lg:px-8 py-20">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full bg-white">
        <SEO 
          title="Job Not Found | SNS Square"
          description="The requested job could not be found."
          keywords="SNS Square, Job Not Found"
          image="https://www.snssquare.com/images/og/job-description-og.jpg"
          url="https://www.snssquare.com/careers/job-description"
        />
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-4 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <button 
              onClick={() => navigate('/careers')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Careers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No job data
  if (!job) {
    return (
      <div className="w-full bg-white">
        <SEO 
          title="Job Not Found | SNS Square"
          description="The requested job could not be found."
          keywords="SNS Square, Job Not Found"
          image="https://www.snssquare.com/images/og/job-description-og.jpg"
          url="https://www.snssquare.com/careers/job-description"
        />
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-4 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
            <p className="text-gray-600 mb-8">The requested job could not be found.</p>
            <button 
              onClick={() => navigate('/careers')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Careers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <SEO 
        title={`${job.title} | SNS Square`}
        description={`Learn about the ${job.title} position at SNS Square. ${job.location ? `Location: ${job.location}.` : ''} ${job.employmentType ? `Employment Type: ${job.employmentType}.` : ''}`}
        keywords={`SNS Square, ${job.title}, Job Description, ${job.location || ''}, ${job.employmentType || ''}`}
        image="https://www.snssquare.com/images/og/job-description-og.jpg"
        url={`https://www.snssquare.com/careers/job/${job._id}`}
      />
      <JodDecriptionHero jobTitle={job.title} jobLocation={job.location} />

      <div className="w-full max-w-[1440px] mx-auto pt-6 sm:pt-8 px-4 sm:px-4 lg:px-8">
        <div className="w-full h-px bg-black opacity-10 mb-8 sm:mb-12" />
      </div>

      {/* Job Details Content */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-4 lg:px-8 py-4 sm:py-6 pb-20 sm:pb-40">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 relative">
          {/* Job Description Section - Left Column (8/12 width) */}
          <div className="lg:col-span-8 lg:pr-8">
            <h4 className="text-black mb-4 sm:mb-6 ">
              Job Description
            </h4>

            {/* Line spacing below title */}
            <div className="mb-4 sm:mb-6"></div>

            {/* Job Description Content - Render HTML directly */}
            <div 
              className="job-description-content prose max-w-none text-black leading-relaxed"
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
            
            {/* Custom styles for job description */}
            <style jsx>{`
              .job-description-content {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                line-height: 1.7;
                color: #1f2937;
              }
              
              .job-description-content p {
                margin: 0 0 1.25em 0;
                color: #374151;
              }
              
              .job-description-content strong {
                font-weight: 600;
                color: #111827;
              }
              
              .job-description-content h1,
              .job-description-content h2,
              .job-description-content h3,
              .job-description-content h4,
              .job-description-content h5,
              .job-description-content h6 {
                font-weight: 600;
                color: #111827;
                margin: 1.5em 0 0.75em 0;
              }
              
              .job-description-content ul,
              .job-description-content ol {
                margin: 1.25em 0;
                padding-left: 1.625em;
              }
              
              .job-description-content li {
                margin: 0.5em 0;
                color: #374151;
              }
              
              .job-description-content a {
                color: #2563eb;
                text-decoration: underline;
                text-underline-offset: 2px;
              }
              
              .job-description-content a:hover {
                color: #1d4ed8;
              }
            `}</style>

            {/* Apply Button */}
            <button 
              onClick={handleApplyClick}
              className="mt-6 sm:mt-8 bg-gray-900 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded text-sm font-medium hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto cursor-pointer" 
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              Apply
            </button>
          </div>

          {/* Vertical Divider Line */}
          <div className="hidden lg:block absolute left-[66.666%] top-0 bottom-0 w-px bg-gray-200 opacity-50"></div>

          {/* Job Information Section - Right Column (4/12 width) */}
          <div className="lg:col-span-4 lg:pl-8 mt-8 lg:mt-0">
            <h4 className="text-black mb-4 sm:mb-6 ">
              Job Information
            </h4>

            {/* Line spacing below title */}
            <div className="mb-4 sm:mb-6"></div>

            <div className="space-y-3 sm:space-y-4">
              {/* Experience */}
              {job.experienceLevel && (
                <div className='flex flex-col gap-2'>
                  <h7 className="text-black mb-2 ">Experience</h7>
                  <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#D1DFFA] rounded">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-800 text-xs sm:text-sm font-medium">{job.experienceLevel}</span>
                  </div>
                </div>
              )}

              {/* Type */}
              {job.employmentType && (
                <div className='flex flex-col gap-2'>
                  <h7 className="text-black mb-2 ">Type</h7>
                  <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#D1DFFA] rounded">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-800 text-xs sm:text-sm font-medium">{job.employmentType}</span>
                  </div>
                </div>
              )}

              {/* Workplace Type */}
              {job.workplaceType && (
                <div className='flex flex-col gap-2'>
                  <h7 className="text-black mb-2 ">Workplace Type</h7>
                  <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#D1DFFA] rounded">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-800 text-xs sm:text-sm font-medium">{job.workplaceType}</span>
                  </div>
                </div>
              )}

              {/* Application Deadline */}
              {job.applicationDeadline && (
                <div className='flex flex-col gap-2'>
                  <h7 className="text-black mb-2 ">Application Deadline</h7>
                  <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#D1DFFA] rounded">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-blue-800 text-xs sm:text-sm font-medium">
                      {new Date(job.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDescriptionPage
