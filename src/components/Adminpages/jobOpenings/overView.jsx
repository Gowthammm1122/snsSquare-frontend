import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Users, FileText, Briefcase, Search, Filter, Eye, Edit, Trash2, MoreVertical } from 'lucide-react'
import { jobAPI } from '../../../api/Service/job'

const OverView = () => {
  const navigate = useNavigate()
  const [allJobs, setAllJobs] = useState([]) // Store all jobs from API
  const [jobs, setJobs] = useState([]) // Displayed jobs (paginated)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, published: 0, draft: 0, closed: 0 })
  const [currentPage, setCurrentPage] = useState(1)
  const [jobsPerPage] = useState(10)
  const [searchTimeout, setSearchTimeout] = useState(null) // Debounced search timeout
  const [filters, setFilters] = useState({
    status: 'published',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  // Fetch ALL jobs (no filtering on backend)
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true)
      // Only send search and sort parameters, no status filtering
      const apiParams = {
        search: filters.search,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
      }
      const response = await jobAPI.getAllJobs(apiParams)
      
      if (response.success) {
        setAllJobs(response.data.jobs || [])
      } else {
        console.error('Failed to fetch jobs:', response.message)
      }
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }, [filters.search, filters.sortBy, filters.sortOrder])

  // Calculate stats from all jobs
  const calculateStats = (jobs) => {
    const stats = {
      total: jobs.length,
      published: jobs.filter(job => job.status === 'published').length,
      draft: jobs.filter(job => job.status === 'draft').length,
      closed: jobs.filter(job => job.status === 'closed').length,
      archived: jobs.filter(job => job.status === 'archived').length
    }
    return stats
  }

  // Filter jobs by status locally
  const filterJobsByStatus = (jobs, status) => {
    if (!status || status === '') return jobs
    return jobs.filter(job => job.status === status)
  }

  // Apply frontend filtering and pagination
  const applyFilteringAndPagination = () => {
    // First filter by status
    const filteredJobs = filterJobsByStatus(allJobs, filters.status)
    
    // Then apply pagination
    const startIndex = (currentPage - 1) * jobsPerPage
    const endIndex = startIndex + jobsPerPage
    const paginatedJobs = filteredJobs.slice(startIndex, endIndex)
    
    setJobs(paginatedJobs)
    
    // Update stats from all jobs (not filtered)
    const newStats = calculateStats(allJobs)
    setStats(newStats)
  }

  // Calculate pagination info based on filtered jobs
  const filteredJobs = filterJobsByStatus(allJobs, filters.status)
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  // Handle job actions
  const handleJobAction = async (action, jobId) => {
    try {
      let response;
      
      switch (action) {
        case 'view':
          // Navigate to job preview page
          navigate(`/admin/jobopenings/preview/${jobId}`);
          break;
        case 'edit':
          // Navigate to job edit page
          navigate(`/admin/jobopenings/edit/${jobId}`);
          break;
        case 'delete':
          if (window.confirm('Are you sure you want to delete this job?')) {
            response = await jobAPI.deleteJob(jobId);
            if (response.success) {
              // Refresh the jobs list
              fetchJobs();
            }
          }
          break;
        case 'publish':
          response = await jobAPI.publishJob(jobId);
          if (response.success) {
            fetchJobs(); // Refresh the list
          }
          break;
        case 'unpublish':
          response = await jobAPI.unpublishJob(jobId);
          if (response.success) {
            fetchJobs(); // Refresh the list
          }
          break;
        case 'archive':
          response = await jobAPI.archiveJob(jobId);
          if (response.success) {
            fetchJobs(); // Refresh the list
          }
          break;
        case 'close':
          response = await jobAPI.closeJob(jobId);
          if (response.success) {
            fetchJobs(); // Refresh the list
          }
          break;
        default:
          console.log('Unknown action:', action);
      }
    } catch (error) {
      console.error(`Error performing ${action} action:`, error);
    }
  }

  // Effect to fetch jobs on component mount and filter changes
  useEffect(() => {
    fetchJobs()
  }, [filters])

  // Effect to apply filtering and pagination when allJobs, filters, or currentPage changes
  useEffect(() => {
    applyFilteringAndPagination()
  }, [allJobs, filters.status, currentPage])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout)
      }
    }
  }, [searchTimeout])

  // Debounced search to prevent multiple API calls
  const handleSearch = (e) => {
    const value = e.target.value
    
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }
    
    // Set new timeout for debounced search
    const timeout = setTimeout(() => {
      setFilters(prev => ({
        ...prev,
        search: value
      }))
      setCurrentPage(1) // Reset to first page
    }, 500) // 500ms delay
    
    setSearchTimeout(timeout)
  }

  // Handle status filter change
  const handleStatusFilter = (status) => {
    setFilters(prev => ({
      ...prev,
      status
    }))
    setCurrentPage(1) // Reset to first page
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get status badge color
  const getStatusBadge = (status) => {
    const badges = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      closed: 'bg-red-100 text-red-800',
      archived: 'bg-gray-100 text-gray-800'
    }
    return badges[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Job Openings Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage job postings and applications</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Quick Actions */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/jobopenings/newJob"
            className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add New Job</h3>
                <p className="text-gray-600">Create a new job posting</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/jobopenings"
            className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Active Jobs</h3>
                <p className="text-gray-600">View and edit job listings</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/jobopenings/applications"
            className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Applications</h3>
                <p className="text-gray-600">Review job applications</p>
              </div>
            </div>
          </Link>
        </div> */}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published Jobs</p>
                <p className="text-3xl font-bold text-green-600">{stats.published}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft Jobs</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.draft}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <FileText className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Closed Jobs</p>
                <p className="text-3xl font-bold text-red-600">{stats.closed}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <Users className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Job Openings</h2>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    value={filters.search}
                    onChange={handleSearch}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* Status Filter */}
                <select
                  value={filters.status}
                  onChange={(e) => handleStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">All Status</option>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="closed">Closed</option>
                  <option value="archived">Archived</option>
                </select>
                
                <button
                  onClick={() => navigate("/admin/jobopenings/newJob")}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Job
                </button>
              </div>
            </div>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading jobs...</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="p-8 text-center">
              <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No jobs found</p>
              <p className="text-gray-400">Create your first job posting to get started</p>
              <button
                onClick={() => navigate("/admin/jobopenings/newJob")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add New Job
              </button>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Job Details
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type & Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created By
                      </th> */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {jobs.map((job) => (
                      <tr key={job._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{job.title}</div>
                            <div className="text-sm text-gray-500">
                              Experience: {job.experienceLevel}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{job.location}</div>
                          <div className="text-sm text-gray-500">
                            {job.workplaceType} • {job.employmentType}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(job.status)}`}>
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                        </td>
                        {/* <td className="px-6 py-4 text-sm text-gray-900">
                          {job.createdBy ? `${job.createdBy.firstName} ${job.createdBy.lastName}` : 'N/A'}
                        </td> */}
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {formatDate(job.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleJobAction('view', job._id)}
                              className="text-blue-600 hover:text-blue-900"
                              title="View Job"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleJobAction('edit', job._id)}
                              className="text-green-600 hover:text-green-900"
                              title="Edit Job"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            {job.status === 'draft' && (
                              <button 
                                onClick={() => handleJobAction('publish', job._id)}
                                className="text-green-600 hover:text-green-900"
                                title="Publish Job"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            )}
                            {job.status === 'published' && (
                              <button 
                                onClick={() => handleJobAction('unpublish', job._id)}
                                className="text-yellow-600 hover:text-yellow-900"
                                title="Unpublish Job"
                              >
                                <FileText className="h-4 w-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleJobAction('delete', job._id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete Job"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={!hasPrevPage}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={!hasNextPage}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing page {currentPage} of {totalPages} ({filteredJobs.length} filtered jobs)
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={!hasPrevPage}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={!hasNextPage}
                        className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default OverView
