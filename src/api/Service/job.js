import axiosInstance from './axiosInstance';

// Job API functions
export const jobAPI = {
  // Get job statistics
  getJobStats: async () => {
    try {
      const response = await axiosInstance.get('/jobs/stats');
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching job stats:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch job statistics',
        data: { total: 0, published: 0, draft: 0, closed: 0, archived: 0 }
      };
    }
  },

  // Get all jobs (no status filtering, no pagination)
  getAllJobs: async (params = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add parameters to query string (excluding page, limit, and status)
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '' && 
            key !== 'page' && key !== 'limit' && key !== 'status') {
          queryParams.append(key, value);
        }
      });

      const queryString = queryParams.toString();
      const url = queryString ? `/jobs?${queryString}` : '/jobs';
      
      const response = await axiosInstance.get(url);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch jobs',
        data: { jobs: [] }
      };
    }
  },

  // Get single job by ID
  getJobById: async (id) => {
    try {
      const response = await axiosInstance.get(`/jobs/${id}`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error fetching job:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch job',
        data: null
      };
    }
  },

  // Create a new job
  createJob: async (jobData) => {
    try {
      const response = await axiosInstance.post('/jobs', jobData);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error creating job:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create job',
        errors: error.response?.data?.errors || []
      };
    }
  },

  // Update job
  updateJob: async (id, jobData) => {
    try {
      const response = await axiosInstance.put(`/jobs/${id}`, jobData);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error updating job:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update job',
        errors: error.response?.data?.errors || []
      };
    }
  },

  // Delete job
  deleteJob: async (id) => {
    try {
      const response = await axiosInstance.delete(`/jobs/${id}`);
      return {
        success: true,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error deleting job:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete job'
      };
    }
  },

  // Publish job
  publishJob: async (id) => {
    try {
      const response = await axiosInstance.patch(`/jobs/${id}/publish`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error publishing job:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to publish job'
      };
    }
  },

  // Unpublish job
  unpublishJob: async (id) => {
    try {
      const response = await axiosInstance.patch(`/jobs/${id}/unpublish`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error unpublishing job:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to unpublish job'
      };
    }
  },

  // Archive job
  archiveJob: async (id) => {
    try {
      const response = await axiosInstance.patch(`/jobs/${id}/archive`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error archiving job:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to archive job'
      };
    }
  },

  // Close job
  closeJob: async (id) => {
    try {
      const response = await axiosInstance.patch(`/jobs/${id}/close`);
      return {
        success: true,
        data: response.data.data,
        message: response.data.message
      };
    } catch (error) {
      console.error('Error closing job:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to close job'
      };
    }
  }
};

export default jobAPI;
