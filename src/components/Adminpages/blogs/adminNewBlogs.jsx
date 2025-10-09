// Adminpages/blogs/addNewPost.jsx
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FreeRichTextEditor from '../../common/FreeRichTextEditor'
import BlogSEOAnalyzer from '../../common/BlogSEOAnalyzer'
import BlogSidebar from '../../common/BlogSidebar'
import MediaLibrary from '../../common/MediaLibrary'
import { Upload, AlertCircle, CheckCircle, Image, FileText, Film, ArrowLeft } from 'lucide-react'
import { useBlogContext } from '../../../contexts/BlogContext'

const AddNewPost = () => {
  const { addBlog, updateBlog, getBlogById, uploadBlogImage, generateSlug } = useBlogContext()
  const navigate = useNavigate()
  const { blogId } = useParams() // For edit mode
  const isEditMode = !!blogId
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Uncategorized',
    tags: [],
    status: 'draft',
    featuredImage: null,
    featuredImageFile: null
  })

  const [notification, setNotification] = useState({ show: false, type: '', message: '' })
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [mediaLibrary, setMediaLibrary] = useState([])
  const editorRef = useRef(null)

  // Load existing blog for edit mode
  useEffect(() => {
    if (isEditMode && blogId) {
      const loadBlog = async () => {
        try {
          const existingBlog = await getBlogById(blogId)
          if (existingBlog) {
            setFormData({
              title: existingBlog.title || existingBlog.slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') || '',
              content: existingBlog.content || '',
              category: existingBlog.category || 'Uncategorized',
              tags: existingBlog.tags || [],
              status: existingBlog.status || 'draft',
              featuredImage: existingBlog.feature_image || null,
              featuredImageFile: null
            })
            showNotification('info', 'Blog loaded for editing')
          } else {
            showNotification('error', 'Blog not found')
            navigate('/admin/blog/all')
          }
        } catch (error) {
          showNotification('error', 'Failed to load blog')
          navigate('/admin/blog/all')
        }
      }
      loadBlog()
    }
  }, [isEditMode, blogId])

  // Remove auto-save functionality since we're not using session storage

  const updateFormData = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const updateSEOData = (seoUpdates) => {
    // For now, we'll just update the form data with SEO info
    // This can be extended later if needed
    setFormData(prev => ({
      ...prev,
      ...seoUpdates
    }))
  }

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message })
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000)
  }

  const saveDraft = async (silent = false) => {
    try {
      // Validation
      if (!formData.title.trim()) {
        showNotification('error', 'Title is required')
        return
      }
      if (!formData.content.trim()) {
        showNotification('error', 'Content is required')
        return
      }

      // Prepare FormData
      const apiFormData = new FormData()
      apiFormData.append('title', formData.title)
      apiFormData.append('content', formData.content)
      apiFormData.append('category', formData.category)
      apiFormData.append('status', 'draft')
      
      // Add tags
      if (formData.tags && formData.tags.length > 0) {
        apiFormData.append('tags', formData.tags.join(','))
      }

      // Add feature image if new file selected
      if (formData.featuredImageFile) {
        apiFormData.append('feature_image', formData.featuredImageFile)
      }
      
      if (isEditMode) {
        // Update existing blog
        await updateBlog(blogId, apiFormData)
        if (!silent) {
          showNotification('success', 'Draft updated successfully!')
        }
      } else {
        // Create new blog as draft
        const newBlog = await addBlog(apiFormData)
        if (!silent) {
          showNotification('success', 'Draft saved successfully!')
          // Navigate to edit mode after creating
          setTimeout(() => {
            navigate(`/admin/blog/edit/${newBlog._id}`)
          }, 1500)
        }
      }
    } catch (error) {
      console.error('Error saving draft:', error)
      if (!silent) {
        showNotification('error', error.response?.data?.message || 'Failed to save draft')
      }
    }
  }

  const previewPost = () => {
    if (!formData.title) {
      showNotification('error', 'Please add a title before previewing')
      return
    }
    
    if (!formData.content) {
      showNotification('error', 'Please add content before previewing')
      return
    }
    
    // Store the blog data in sessionStorage for preview
    const previewData = {
      ...formData,
      slug: generateSlug(formData.title),
      status: 'preview',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    sessionStorage.setItem('blog_preview_data', JSON.stringify(previewData))
    
    // Open preview in new tab with a special preview route
    window.open(`/admin/blog/preview`, '_blank')
  }

  const publishPost = async () => {
    // Validation
    const validationErrors = []
    
    if (!formData.title.trim()) validationErrors.push('Title is required')
    if (!formData.content.trim()) validationErrors.push('Content is required')
    if (!formData.category) validationErrors.push('Category is required')
    
    if (validationErrors.length > 0) {
      showNotification('error', `Please fix: ${validationErrors.join(', ')}`)
      return
    }

    try {
      // Prepare FormData
      const apiFormData = new FormData()
      apiFormData.append('title', formData.title)
      apiFormData.append('content', formData.content)
      apiFormData.append('category', formData.category)
      apiFormData.append('status', 'published')
      
      // Add tags
      if (formData.tags && formData.tags.length > 0) {
        apiFormData.append('tags', formData.tags.join(','))
      }

      // Add feature image if new file selected
      if (formData.featuredImageFile) {
        apiFormData.append('feature_image', formData.featuredImageFile)
      }

      if (isEditMode) {
        // Update existing blog
        await updateBlog(blogId, apiFormData)
        showNotification('success', 'Blog updated and published successfully!')
      } else {
        // Create new blog
        await addBlog(apiFormData)
        showNotification('success', 'Blog published successfully!')
      }
      
      // Navigate back to all blogs after a delay
      setTimeout(() => {
        navigate('/admin/blog/all')
      }, 2000)
      
    } catch (error) {
      console.error('Error publishing blog:', error)
      showNotification('error', error.response?.data?.message || 'Failed to publish blog')
    }
  }

  // Enhanced Media Upload Function - Upload images to backend
  const handleMediaUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = true
    
    input.onchange = async (e) => {
      const files = Array.from(e.target.files)
      
      if (files.length === 0) return
      
      showNotification('info', `Uploading ${files.length} image(s)...`)
      
      try {
        const uploadPromises = files.map(async (file) => {
          try {
            const imageUrl = await uploadBlogImage(file)
            return {
              name: file.name,
              url: imageUrl,
              type: file.type
            }
          } catch (error) {
            console.error(`Failed to upload ${file.name}:`, error)
            return null
          }
        })
        
        const uploadedFiles = await Promise.all(uploadPromises)
        const validFiles = uploadedFiles.filter(file => file !== null)
        
        if (validFiles.length > 0) {
          // Add to media library
          const updatedMediaLibrary = [...mediaLibrary, ...validFiles]
          setMediaLibrary(updatedMediaLibrary)
          
          showNotification('success', `${validFiles.length} image(s) uploaded successfully!`)
          
          // Auto-insert first image
          if (validFiles[0]) {
            insertMediaIntoEditor(validFiles[0])
          }
        }
        
      } catch (error) {
        console.error('Error uploading files:', error)
        showNotification('error', 'Error uploading images')
      }
    }
    
    input.click()
  }

  // Insert media into Tiptap editor
  const insertMediaIntoEditor = (mediaFile) => {
    if (!editorRef.current) return

    const editor = editorRef.current.getEditor()
    if (!editor) return

    // Insert image
    editor.chain().focus().setImage({ 
      src: mediaFile.url,
      alt: mediaFile.name
    }).run()

    showNotification('success', `${mediaFile.name} inserted into content`)
  }

  // Open media library
  const openMediaLibrary = () => {
    setShowMediaLibrary(true)
  }

  // Handle media selection from library
  const handleMediaSelect = (mediaFile) => {
    insertMediaIntoEditor(mediaFile)
    setShowMediaLibrary(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 flex items-center space-x-2 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' :
          notification.type === 'error' ? 'bg-red-100 text-red-800 border border-red-200' :
          'bg-blue-100 text-blue-800 border border-blue-200'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : 
           notification.type === 'error' ? <AlertCircle size={20} /> : 
           <AlertCircle size={20} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {/* Media Library Modal */}
      {showMediaLibrary && (
        <MediaLibrary
          mediaLibrary={mediaLibrary}
          onMediaSelect={handleMediaSelect}
          onClose={() => setShowMediaLibrary(false)}
          onMediaUpdate={setMediaLibrary}
          onNotification={showNotification}
        />
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Breadcrumb Navigation */}
          {/* <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>Admin</span>
            <span className="mx-2">/</span>
            <span>Blog Management</span>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">
              {isEditMode ? 'Edit Blog Post' : 'Add New Blog Post'}
            </span>
          </div> */}
          
          {/* Header Content */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <button
                onClick={() => navigate('/admin/blog/all')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to All Blogs
              </button> */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditMode ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Status: <span className="font-medium capitalize">{formData.status}</span>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => saveDraft()}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {isEditMode ? 'Save Changes' : 'Save Draft'}
              </button>
              <button
                onClick={previewPost}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Preview
              </button>
              <button
                onClick={publishPost}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
              >
                {isEditMode ? 'Update & Publish' : 'Publish'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title 
              </h4>
              <input
                type="text"
                placeholder="Enter your blog title here..."
                className="w-full p-4 mt-1 text-xl font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                autoFocus
              />
              {formData.title && (
                <p className="mt-3 text-sm text-gray-500 bg-gray-50 p-2 rounded">
                  <span className="font-medium">URL Slug:</span> /{generateSlug(formData.title)}
                </p>
              )}
            </div>

            {/* Media Upload Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-4">Media & Assets</h4>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                <button 
                  onClick={handleMediaUpload}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Upload size={16} />
                  <span>Upload Media</span>
                </button>
                
                <button 
                  onClick={openMediaLibrary}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
                >
                  <Image size={16} />
                  <span>Media Library ({mediaLibrary.length})</span>
                </button>

                {mediaLibrary.length > 0 && (
                  <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                    <FileText size={14} className="inline mr-1" />
                    Latest: {mediaLibrary.slice(-3).map(file => file.name.split('.')[0]).join(', ')}
                  </div>
                )}
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-700">Blog Content </h4>
                <p className="text-sm text-gray-500 mt-1">Write your blog content using the rich text editor below</p>
              </div>
              <div className="p-6">
                <FreeRichTextEditor
                  ref={editorRef}
                  content={formData.content}
                  onChange={(content) => updateFormData('content', content)}
                  placeholder="Start writing your blog content here..."
                />
              </div>
            </div>

            {/* SEO Analyzer */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h4 className="text-sm font-medium text-gray-700">SEO Optimization</h4>
                <p className="text-sm text-gray-500 mt-1">Optimize your blog for search engines</p>
              </div>
              <div className="p-6">
                <BlogSEOAnalyzer
                  content={formData.content}
                  title={formData.title}
                  onTitleChange={(title) => updateFormData('title', title)}
                  onSEODataChange={updateSEOData}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <BlogSidebar
            formData={formData}
            onPublish={publishPost}
            onSaveDraft={saveDraft}
            onPreview={previewPost}
            onFormDataChange={updateFormData}
            onNotification={showNotification}
          />
        </div>
      </div>
    </div>
  )
}

export default AddNewPost

