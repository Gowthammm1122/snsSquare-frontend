import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Plus,
  Briefcase
} from 'lucide-react'

const jobOpenings = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Job Openings</h1>
            <p className="text-gray-600 mt-1">Create and manage job postings</p>
          </div>
          <Link
            to="/admin/jobopenings/newJob"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Job
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">Job Management</h3>
          <p className="text-gray-500 mb-6">
            Create new job postings using the "Add New Job" button above.
            <br />
            Job listing and management features are not available in this version.
          </p>
          <Link
            to="/admin/jobopenings/newJob"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Your First Job
          </Link>
        </div>
      </div>
    </div>
  )
}

export default jobOpenings
