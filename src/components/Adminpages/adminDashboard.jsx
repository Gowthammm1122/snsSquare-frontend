import React from 'react'
import { Link } from 'react-router-dom'
import { 
  FileText, 
  Users, 
  Briefcase, 
  Settings, 
  TrendingUp, 
  Eye, 
  Edit3, 
  Plus, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Activity,
  Globe,
  MessageSquare,
  UserPlus,
  Target
} from 'lucide-react'

const AdminDashboard = () => {
  // Mock data - replace with actual data from your context/API
  const dashboardStats = {
    blogs: {
      total: 24,
      published: 18,
      draft: 4,
      pending: 2,
      views: 15420,
      growth: 12.5
    },
    jobs: {
      total: 8,
      active: 6,
      applications: 156,
      newApplications: 23,
      growth: 8.3
    },
    useCases: {
      total: 12,
      published: 10,
      views: 8930,
      growth: 15.2
    },
    analytics: {
      totalViews: 0,
      monthlyViews: 8940,
      engagementRate: 68.5,
      bounceRate: 31.2
    }
  }

  const quickActions = [
    {
      title: 'Create New Blog',
      description: 'Write and publish a new blog post',
      icon: <Plus className="w-5 h-5" />,
      link: '/admin/blog/new',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      title: 'Add Job Opening',
      description: 'Post a new job opportunity',
      icon: <Briefcase className="w-5 h-5" />,
      link: '/admin/jobs/new',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    },
    {
      title: 'Manage Use Cases',
      description: 'Update use cases content',
      icon: <Target className="w-5 h-5" />,
      link: '/admin/usecases',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      title: 'View Analytics',
      description: 'Check website performance',
      icon: <BarChart3 className="w-5 h-5" />,
      link: '/admin/analytics',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600'
    }
  ]

  const recentActivities = [
    {
      action: 'New blog published',
      title: 'AI in Supply Chain Management',
      time: '2 hours ago',
      icon: <FileText className="w-4 h-4 text-blue-500" />
    },
    {
      action: 'Job application received',
      title: 'Senior Developer Position',
      time: '4 hours ago',
      icon: <UserPlus className="w-4 h-4 text-green-500" />
    },
    {
      action: 'Blog updated',
      title: 'Machine Learning Trends',
      time: '1 day ago',
      icon: <Edit3 className="w-4 h-4 text-yellow-500" />
    },
    {
      action: 'Use case published',
      title: 'Healthcare AI Solutions',
      time: '2 days ago',
      icon: <Target className="w-4 h-4 text-purple-500" />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your content.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Blog Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Blogs</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.blogs.total}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{dashboardStats.blogs.growth}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Published: {dashboardStats.blogs.published}</span>
              <span>Draft: {dashboardStats.blogs.draft}</span>
            </div>
          </div>

          {/* Job Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Job Openings</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.jobs.total}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{dashboardStats.jobs.growth}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Active: {dashboardStats.jobs.active}</span>
              <span>Applications: {dashboardStats.jobs.applications}</span>
            </div>
          </div>

          {/* Analytics Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.analytics.totalViews.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Eye className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-sm text-blue-600">This month: {dashboardStats.analytics.monthlyViews.toLocaleString()}</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Engagement: {dashboardStats.analytics.engagementRate}%</span>
              <span>Bounce: {dashboardStats.analytics.bounceRate}%</span>
            </div>
          </div>

          {/* Use Cases Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Use Cases</p>
                <p className="text-3xl font-bold text-gray-900">{dashboardStats.useCases.total}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{dashboardStats.useCases.growth}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex justify-between text-sm text-gray-600">
              <span>Published: {dashboardStats.useCases.published}</span>
              <span>Views: {dashboardStats.useCases.views.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="group p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${action.color} ${action.hoverColor} rounded-lg flex items-center justify-center text-white transition-colors`}>
                        {action.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                          {action.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all activities
            </button>
          </div>
        </div>

        {/* Content Management Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Blog Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Blog Management</h3>
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Published</span>
                <span className="text-sm font-medium text-gray-900">{dashboardStats.blogs.published}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Drafts</span>
                <span className="text-sm font-medium text-gray-900">{dashboardStats.blogs.draft}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Review</span>
                <span className="text-sm font-medium text-gray-900">{dashboardStats.blogs.pending}</span>
              </div>
            </div>
            <Link
              to="/admin/blogs"
              className="block w-full mt-4 text-center py-2 px-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
            >
              Manage Blogs
            </Link>
          </div>

          {/* Job Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Job Openings</h3>
              <Briefcase className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Jobs</span>
                <span className="text-sm font-medium text-gray-900">{dashboardStats.jobs.active}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Applications</span>
                <span className="text-sm font-medium text-gray-900">{dashboardStats.jobs.applications}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Today</span>
                <span className="text-sm font-medium text-gray-900">{dashboardStats.jobs.newApplications}</span>
              </div>
            </div>
            <Link
              to="/admin/jobs"
              className="block w-full mt-4 text-center py-2 px-4 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-medium"
            >
              Manage Jobs
            </Link>
          </div>

          {/* Use Cases Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Use Cases</h3>
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Cases</span>
                <span className="text-sm font-medium text-gray-900">{dashboardStats.useCases.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Published</span>
                <span className="text-sm font-medium text-gray-900">{dashboardStats.useCases.published}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Views</span>
                <span className="text-sm font-medium text-gray-900">{dashboardStats.useCases.views.toLocaleString()}</span>
              </div>
            </div>
            <Link
              to="/admin/usecases"
              className="block w-full mt-4 text-center py-2 px-4 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-sm font-medium"
            >
              Manage Use Cases
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
