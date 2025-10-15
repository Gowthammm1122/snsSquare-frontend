import axiosInstance from './axiosInstance';

// Careers API functions for public job listings
export const careersAPI = {
  // Get all published jobs for careers page (public access)
  getPublishedJobs: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();

      // Add parameters to query string
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value);
        }
      });

      const queryString = queryParams.toString();
      const url = queryString ? `/jobs/public?${queryString}` : '/jobs/public';

      const response = await axiosInstance.get(url);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching published jobs:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch published jobs',
        data: { jobs: [] }
      };
    }
  },

  // Get single published job by ID (public access)
  getPublishedJobById: async (id) => {
    try {
      const response = await axiosInstance.get(`/jobs/public/${id}`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching published job:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch job details',
        data: null
      };
    }
  }
};

export default careersAPI;
