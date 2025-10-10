import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search,
  Bell,
  Mail,
  ChevronDown,
  Plus,
  FileText,
  Briefcase,
  Target,
  Calendar,
  Activity,
  TrendingUp,
  Edit,
  Eye,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowUp,
  MessageSquare,
  Download,
  Share2,
  Filter,
  Zap
} from 'lucide-react'
import { useBlogContext } from '../../contexts/BlogContext'


const AdminDashboard = () => {
  const navigate = useNavigate()
  // Get real blog stats from context
  const { getStats } = useBlogContext()
  const blogStats = getStats()


  // State for filters
  const [selectedPeriod, setSelectedPeriod] = useState('latest')
  const [activityFilter, setActivityFilter] = useState('all')


  // CMS Statistics - focused on your main needs
  const cmsStats = {
    blogs: {
      total: blogStats.total,
      published: blogStats.published,
      drafts: blogStats.draft,
      unpublished: blogStats.unpublished,
      recent: blogStats.recent,
      views: 12500,
      growth: 23.5
    },
    jobs: {
      total: 8,
      active: 6,
      closed: 2,
      applications: 156,
      newThisWeek: 3,
      growth: 12.8
    },
    useCases: {
      total: 15,
      published: 12,
      drafts: 3,
      views: 8930,
      downloads: 245,
      growth: 18.7
    }
  }


  // Enhanced Recent activities for CMS with more details
  const recentActivities = [
    {
      type: 'blog',
      action: 'Published new blog',
      title: 'AI in Modern Web Development',
      time: '2 hours ago',
      status: 'published',
      
      details: '156 views, 12 comments',
      priority: 'high'
    },
    {
      type: 'job',
      action: 'Job opening created',
      title: 'Senior React Developer',
      time: '4 hours ago',
      status: 'active',

      details: '23 applications received',
      priority: 'medium'
    },
    {
      type: 'usecase',
      action: 'Use case updated',
      title: 'E-commerce Platform Solution',
      time: '1 day ago',
      status: 'published',

      details: '89 downloads this week',
      priority: 'low'
    },
    {
      type: 'blog',
      action: 'Draft saved',
      title: 'Future of Frontend Development',
      time: '2 days ago',
      status: 'draft',

      details: 'Ready for review',
      priority: 'medium'
    },
    {
      type: 'job',
      action: 'Job application received',
      title: 'Frontend Developer Position',
      time: '3 days ago',
      status: 'active',
      user: 'System',
      details: 'New candidate: John Doe',
      priority: 'high'
    },
    {
      type: 'usecase',
      action: 'Use case published',
      title: 'Mobile App Development',
      time: '1 week ago',
      status: 'published',

      details: '245 views, 34 shares',
      priority: 'low'
    },
    {
      type: 'blog',
      action: 'Comment received',
      title: 'React Best Practices Guide',
      time: '1 week ago',
      status: 'published',
      user: 'Visitor',
      details: 'New comment from Sarah',
      priority: 'low'
    },
    {
      type: 'job',
      action: 'Application deadline approaching',
      title: 'UI/UX Designer Role',
      time: '1 week ago',
      status: 'active',
      user: 'System',
      details: 'Closes in 3 days',
      priority: 'medium'
    }
  ]

  // Activity summary stats
  const activityStats = {
    today: recentActivities.filter(a => a.time.includes('hours')).length,
    thisWeek: recentActivities.length,
    pending: recentActivities.filter(a => a.status === 'draft').length,
    highPriority: recentActivities.filter(a => a.priority === 'high').length
  }

  // Performance metrics for the bottom section
  const performanceMetrics = [
    {
      label: 'Avg. Engagement',
      value: '8.2%',
      trend: 'up',
      color: 'text-green-600'
    },
    {
      label: 'Response Time',
      value: '2.3h',
      trend: 'down',
      color: 'text-blue-600'
    },
    {
      label: 'Completion Rate',
      value: '94%',
      trend: 'up',
      color: 'text-purple-600'
    }
  ]


  // Quick stats for overview
  const quickStats = [
    {
      title: 'Total Content',
      value: cmsStats.blogs.total + cmsStats.jobs.total + cmsStats.useCases.total,
      change: '+8',
      changeType: 'positive',
      period: 'this week'
    },
    {
      title: 'Published Items',
      value: cmsStats.blogs.published + cmsStats.jobs.active + cmsStats.useCases.published,
      change: '+12%',
      changeType: 'positive',
      period: 'vs last month'
    },
    {
      title: 'Draft Items',
      value: cmsStats.blogs.drafts + cmsStats.useCases.drafts,
      change: '-3',
      changeType: 'negative',
      period: 'pending review'
    },
    {
      title: 'Total Views',
      value: (cmsStats.blogs.views + cmsStats.useCases.views).toLocaleString(),
      change: '+15%',
      changeType: 'positive',
      period: 'this month'
    }
  ]


  const getActivityIcon = (type) => {
    switch (type) {
      case 'blog': return <FileText className="w-4 h-4" />
      case 'job': return <Briefcase className="w-4 h-4" />
      case 'usecase': return <Target className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }


  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
      case 'active':
        return 'text-green-600 bg-green-50'
      case 'draft':
        return 'text-yellow-600 bg-yellow-50'
      case 'unpublished':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-400'
      case 'medium':
        return 'border-l-yellow-400'
      case 'low':
        return 'border-l-green-400'
      default:
        return 'border-l-gray-400'
    }
  }

  const filteredActivities = activityFilter === 'all' 
    ? recentActivities 
    : recentActivities.filter(activity => activity.type === activityFilter)


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">

            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-500">
                <span>Dashboard</span>
                <span className="mx-2">/</span>
                <span className="text-gray-900 font-medium">CMS Overview</span>
              </div>
            </div>

            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search content, jobs, use cases..."
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>


            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">2</span>
              </div>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-xs rounded-full w-4 h-4 flex items-center justify-center text-white">5</span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">

                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div> */}


      {/* Main Content */}
      <div className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Content Management Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor and manage your blogs, job openings, and use cases from one central location
          </p>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Showing:</span>
                <select 
                  className="bg-white border border-gray-300 rounded-lg px-3 py-1 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="all">All Time</option>
                </select>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/admin/blog/new")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>New Blog</span>
              </button>
              <button
                onClick={() => navigate("/admin/jobopenings/newJob")}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Post Job</span>
              </button>
            </div>
          </div>
        </div>


        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="font-medium">{stat.change}</span>
                  <p className="text-xs text-gray-500 mt-1">{stat.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Main Content Section - Content Management (Left) + Recent Activity (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Content Management Cards - Left Side (Stacked Vertically) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Content Management</h3>
                <p className="text-sm text-gray-500">Manage all your content from here</p>
              </div>

              <div className="space-y-3">
                {/* Blog Management Card */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Blog Content</h4>
                        <p className="text-sm text-gray-500">Manage your blog posts</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate("/admin/blogs")}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Total Blogs</span>
                      <span className="text-lg font-bold text-gray-900">{cmsStats.blogs.total}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-sm font-bold text-green-600">{cmsStats.blogs.published}</span>
                        </div>
                        <p className="text-xs text-gray-500">Published</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="w-3 h-3 text-yellow-600 mr-1" />
                          <span className="text-sm font-bold text-yellow-600">{cmsStats.blogs.drafts}</span>
                        </div>
                        <p className="text-xs text-gray-500">Drafts</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Eye className="w-3 h-3 text-blue-600 mr-1" />
                          <span className="text-sm font-bold text-blue-600">{cmsStats.blogs.views.toLocaleString()}</span>
                        </div>
                        <p className="text-xs text-gray-500">Views</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate("/admin/blog/new")}
                    className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-4 rounded-lg text-sm font-medium text-center block transition-colors"
                  >
                    Create New Blog
                  </button>
                </div>

                {/* Job Openings Card */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Job Openings</h4>
                        <p className="text-sm text-gray-500">Manage job postings</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate("/admin/jobs")}
                      className="text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Total Jobs</span>
                      <span className="text-lg font-bold text-gray-900">{cmsStats.jobs.total}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-sm font-bold text-green-600">{cmsStats.jobs.active}</span>
                        </div>
                        <p className="text-xs text-gray-500">Active</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <XCircle className="w-3 h-3 text-gray-600 mr-1" />
                          <span className="text-sm font-bold text-gray-600">{cmsStats.jobs.closed}</span>
                        </div>
                        <p className="text-xs text-gray-500">Closed</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Users className="w-3 h-3 text-blue-600 mr-1" />
                          <span className="text-sm font-bold text-blue-600">{cmsStats.jobs.applications}</span>
                        </div>
                        <p className="text-xs text-gray-500">Applications</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate("/admin/jobopenings/newJob")}
                    className="w-full bg-green-50 text-green-600 hover:bg-green-100 py-2 px-4 rounded-lg text-sm font-medium text-center block transition-colors"
                  >
                    Post New Job
                  </button>
                </div>

                {/* Use Cases Card */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Target className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">Use Cases</h4>
                        <p className="text-sm text-gray-500">Showcase solutions</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate("/admin/usecases")}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Total Cases</span>
                      <span className="text-lg font-bold text-gray-900">{cmsStats.useCases.total}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-sm font-bold text-green-600">{cmsStats.useCases.published}</span>
                        </div>
                        <p className="text-xs text-gray-500">Published</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Clock className="w-3 h-3 text-yellow-600 mr-1" />
                          <span className="text-sm font-bold text-yellow-600">{cmsStats.useCases.drafts}</span>
                        </div>
                        <p className="text-xs text-gray-500">Drafts</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <BarChart3 className="w-3 h-3 text-blue-600 mr-1" />
                          <span className="text-sm font-bold text-blue-600">{cmsStats.useCases.downloads}</span>
                        </div>
                        <p className="text-xs text-gray-500">Downloads</p>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate("/admin/usecase")}
                    className="w-full bg-purple-50 text-purple-600 hover:bg-purple-100 py-2 px-4 rounded-lg text-sm font-medium text-center block transition-colors"
                  >
                    Add Use Case
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Recent Activity - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                <button 
                  onClick={() => navigate("/admin/activity")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>

              {/* Activity Stats Summary */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-blue-600 font-medium">Today</p>
                      <p className="text-sm font-bold text-blue-700">{activityStats.today}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs text-green-600 font-medium">This Week</p>
                      <p className="text-sm font-bold text-green-700">{activityStats.thisWeek}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity Filter */}
              <div className="mb-4">
                <select 
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={activityFilter}
                  onChange={(e) => setActivityFilter(e.target.value)}
                >
                  <option value="all">All Activities</option>
                  <option value="blog">Blog Posts</option>
                  <option value="job">Job Openings</option>
                  <option value="usecase">Use Cases</option>
                </select>
              </div>
              
              <div className="space-y-3 mb-6" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {filteredActivities.map((activity, index) => (
                  <div key={index} className={`border-l-4 ${getPriorityColor(activity.priority)} bg-gray-50 p-3 rounded-r-lg hover:bg-gray-100 transition-colors cursor-pointer`}>
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getStatusColor(activity.status)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-gray-900 truncate">{activity.action}</p>
                          {activity.priority === 'high' && (
                            <AlertCircle className="w-3 h-3 text-red-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-600 truncate mb-1">{activity.title}</p>
                        <p className="text-xs text-gray-500">{activity.details}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">{activity.time}</span>

                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Performance Insights */}
              <div className="mb-1 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Performance Insights</p>
                <div className="space-y-3">
                  {performanceMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-600">{metric.label}</span>
                      <div className="flex items-center space-x-1">
                        <span className={`text-sm font-bold ${metric.color}`}>{metric.value}</span>
                        {metric.trend === 'up' ? (
                          <ArrowUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <ArrowUp className="w-3 h-3 text-blue-600 rotate-180" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              {/* <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions</p>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/admin/blogs/new"
                    className="flex items-center justify-center space-x-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 px-3 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>New Post</span>
                  </Link>
                  <Link
                    to="/admin/activity"
                    className="flex items-center justify-center space-x-1 bg-gray-50 text-gray-600 hover:bg-gray-100 py-2 px-3 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View All</span>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AdminDashboard
