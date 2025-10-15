// Adminpages/jobs/addNewJob.jsx
import React, { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, MapPin, Building, FileText } from 'lucide-react'
import FreeRichTextEditor from '../../common/FreeRichTextEditor'
import { jobAPI } from '../../../api/Service/job'

const AddNewJob = () => {
  const [formData, setFormData] = useState({
    // Basic Job Information
    title: '',
    location: '',
    employmentType: 'Full-Time',
    workplaceType: 'On-site',
    experienceLevel: '1-3 years',
    applicationDeadline: '',
    
    // Job Details
    description: '',
    
    // Metadata
    status: 'draft'
  })

  const [notification, setNotification] = useState({ show: false, type: '', message: '' })
  const [activeTab, setActiveTab] = useState('basic')
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Employment type options
  const employmentTypes = ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelance']
  const workplaceTypes = ['On-site', 'Remote', 'Hybrid']
  const experienceLevels = ['Entry Level', '1-3 years', '3-5 years', '5-10 years', '10+ years']

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }



  const showNotification = (type, message) => {
    setNotification({ show: true, type, message })
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000)
  }

  const saveDraft = async () => {
    if (!formData.title.trim()) {
      showNotification('error', 'Please enter a job title before saving')
      return
    }

    setIsSaving(true)
    try {
      const draftData = {
        ...formData,
        status: 'draft'
      }
      
      const result = await jobAPI.createJob(draftData)
      
      if (result.success) {
        showNotification('success', 'Draft saved successfully!')
        // Reset form or redirect to job list
        setTimeout(() => {
          if (confirm('Draft saved! Do you want to create another job or view all jobs?')) {
            window.location.href = '/admin/jobopenings'
          } else {
            // Reset form for new job
            setFormData({
              title: '',
              location: '',
              employmentType: 'Full-Time',
              workplaceType: 'On-site',
              experienceLevel: '1-3 years',
              applicationDeadline: '',
              description: '',
              status: 'draft'
            })
            setActiveTab('basic')
          }
        }, 1500)
      } else {
        showNotification('error', result.message || 'Failed to save draft')
      }
    } catch (error) {
      console.error('Error saving draft:', error)
      showNotification('error', 'Failed to save draft')
    } finally {
      setIsSaving(false)
    }
  }

  const validateForm = () => {
    const errors = []
    
    if (!formData.title.trim()) errors.push('Job title is required')
    if (!formData.location.trim()) errors.push('Location is required')
    if (!formData.description.trim()) errors.push('Job description is required')
    if (!formData.applicationDeadline) errors.push('Application deadline is required')
    
    return errors
  }

  const publishJob = async () => {
    const validationErrors = validateForm()
    
    if (validationErrors.length > 0) {
      showNotification('error', `Please fix: ${validationErrors.join(', ')}`)
      return
    }

    setIsLoading(true)
    try {
      const publishData = {
        ...formData,
        status: 'published'
      }

      const result = await jobAPI.createJob(publishData)
      
      if (result.success) {
        showNotification('success', 'Job published successfully!')
        
        // Reset form after delay and redirect
        setTimeout(() => {
          if (confirm('Job published! Do you want to create another job or view all jobs?')) {
            window.location.href = '/admin/jobopenings'
          } else {
            // Reset form for new job
            setFormData({
              title: '',
              location: '',
              employmentType: 'Full-Time',
              workplaceType: 'On-site',
              experienceLevel: '1-3 years',
              applicationDeadline: '',
              description: '',
              status: 'draft'
            })
            setActiveTab('basic')
          }
        }, 2000)
      } else {
        showNotification('error', result.message || 'Failed to publish job')
        if (result.errors && result.errors.length > 0) {
          console.error('Validation errors:', result.errors)
        }
      }
    } catch (error) {
      console.error('Error publishing job:', error)
      showNotification('error', 'Failed to publish job')
    } finally {
      setIsLoading(false)
    }
  }



  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Building },
    { id: 'details', label: 'Job Details', icon: FileText }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
          notification.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
          'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Job Opening</h1>
            <p className="text-sm text-gray-500 mt-1">
              Status: {formData.status} • Create and manage job postings
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={saveDraft}
              disabled={isSaving || isLoading}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              onClick={publishJob}
              disabled={isLoading || isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Publishing...' : 'Publish Job'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Basic Info Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Digital Marketing Head"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.title}
                      onChange={(e) => updateFormData('title', e.target.value)}
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="e.g. Coimbatore, Tamil Nadu, India"
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={formData.location}
                        onChange={(e) => updateFormData('location', e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Employment Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employment Type *
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.employmentType}
                      onChange={(e) => updateFormData('employmentType', e.target.value)}
                    >
                      {employmentTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience *
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.experienceLevel}
                      onChange={(e) => updateFormData('experienceLevel', e.target.value)}
                    >
                      {experienceLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  {/* Application Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Application Deadline *
                    </label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.applicationDeadline}
                      onChange={(e) => updateFormData('applicationDeadline', e.target.value)}
                    />
                  </div>

                  {/* Workplace Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Workplace Type *
                    </label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={formData.workplaceType}
                      onChange={(e) => updateFormData('workplaceType', e.target.value)}
                    >
                      {workplaceTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Job Details Tab */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Job Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <div className="border border-gray-300 rounded-lg">
                    <FreeRichTextEditor
                      content={formData.description}
                      onChange={(content) => updateFormData('description', content)}
                      placeholder="Provide a detailed description of the role, responsibilities, requirements, and qualifications..."
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Include role overview, key responsibilities, requirements, qualifications, and any other relevant details.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewJob
