import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit, Calendar, MapPin, Briefcase, Clock, User } from 'lucide-react'
import { jobAPI } from '../../../api/Service/job'

const PreviewJob = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState(null)

  // Fetch job data
  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true)
        const response = await jobAPI.getJobById(id)
        
        if (response.success) {
          setJob(response.data)
        } else {
          console.error('Failed to fetch job:', response.message)
          navigate('/admin/jobopenings')
        }
      } catch (error) {
        console.error('Error fetching job:', error)
        navigate('/admin/jobopenings')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchJob()
    }
  }, [id, navigate])

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

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h2>
          <p className="text-gray-600 mb-4">The job you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/admin/jobopenings')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/jobopenings')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Preview</h1>
                <p className="text-gray-600 mt-1">Preview job posting details</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate(`/admin/jobopenings/edit/${id}`)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Job Preview */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Job Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                <div className="flex items-center space-x-6 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    {job.employmentType}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.workplaceType}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(job.status)}`}>
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Apply by {formatDate(job.applicationDeadline)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Experience Level</span>
                    <p className="text-gray-900">{job.experienceLevel}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Employment Type</span>
                    <p className="text-gray-900">{job.employmentType}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Workplace Type</span>
                    <p className="text-gray-900">{job.workplaceType}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Application Deadline</span>
                    <p className="text-gray-900">{formatDate(job.applicationDeadline)}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Status</span>
                    <p className="text-gray-900">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(job.status)}`}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Created</span>
                    <p className="text-gray-900">{formatDate(job.createdAt)}</p>
                  </div>
                  {job.publishedAt && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Published</span>
                      <p className="text-gray-900">{formatDate(job.publishedAt)}</p>
                    </div>
                  )}
                  {job.createdBy && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Created By</span>
                      <p className="text-gray-900">{job.createdBy.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Job Description</h3>
                <div className="prose max-w-none">
                  <div 
                    className="text-gray-700"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Last updated: {formatDate(job.updatedAt)}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => navigate('/admin/jobopenings')}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Jobs
                </button>
                <button
                  onClick={() => navigate(`/admin/jobopenings/edit/${id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Job
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreviewJob
