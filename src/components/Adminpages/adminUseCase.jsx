// Adminpages/blogs/addNewPost.jsx
import React, { useState, useEffect, useRef } from 'react'
import FreeRichTextEditor from '../common/FreeRichTextEditor'
import BlogSEOAnalyzer from '../common/BlogSEOAnalyzer'
import BlogSidebar from '../common/BlogSidebar'
import MediaLibrary from '../common/MediaLibrary'
import { Upload, AlertCircle, CheckCircle, Image, FileText, Film } from 'lucide-react'

const AddNewPost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    seoData: {
      primaryKeyword: '',
      secondaryKeywords: [],
      metaTitle: '',
      metaDescription: '',
      metaUrl: ''
    },
    featuredImage: null,
    categories: ['Uncategorized'],
    tags: [],
    publishSettings: {
      visibility: 'public',
      publishDate: 'immediately',
      status: 'draft'
    },
    author: 'SNS (admin)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })

  const [notification, setNotification] = useState({ show: false, type: '', message: '' })
  const [showMediaLibrary, setShowMediaLibrary] = useState(false)
  const [mediaLibrary, setMediaLibrary] = useState([])
  const editorRef = useRef(null)

  // Load draft from session storage on component mount
  useEffect(() => {
    const savedDraft = sessionStorage.getItem('blog_draft')
    const savedMedia = sessionStorage.getItem('media_library')
    
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft)
        setFormData(parsedDraft)
        showNotification('info', 'Draft loaded from previous session')
      } catch (error) {
        console.error('Error loading draft:', error)
      }
    }

    if (savedMedia) {
      try {
        const parsedMedia = JSON.parse(savedMedia)
        setMediaLibrary(parsedMedia)
      } catch (error) {
        console.error('Error loading media library:', error)
      }
    }
  }, [])

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (formData.title || formData.content) {
        saveDraft(true) // Silent save
      }
    }, 30000)

    return () => clearInterval(autoSaveInterval)
  }, [formData])

  const updateFormData = (key, value) => {
    setFormData(prev => {
      const updated = { ...prev, [key]: value, updatedAt: new Date().toISOString() }
      
      // Auto-save to session storage
      sessionStorage.setItem('blog_draft', JSON.stringify(updated))
      
      return updated
    })
  }

  const updateSEOData = (seoUpdates) => {
    setFormData(prev => ({
      ...prev,
      seoData: { ...prev.seoData, ...seoUpdates },
      updatedAt: new Date().toISOString()
    }))
  }

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message })
    setTimeout(() => setNotification({ show: false, type: '', message: '' }), 3000)
  }

  const saveDraft = (silent = false) => {
    try {
      const draftData = {
        ...formData,
        publishSettings: { ...formData.publishSettings, status: 'draft' },
        updatedAt: new Date().toISOString()
      }
      
      sessionStorage.setItem('blog_draft', JSON.stringify(draftData))
      
      if (!silent) {
        showNotification('success', 'Draft saved successfully!')
      }
      
      console.log('Draft saved:', draftData)
    } catch (error) {
      console.error('Error saving draft:', error)
      if (!silent) {
        showNotification('error', 'Failed to save draft')
      }
    }
  }

  const previewPost = () => {
    if (!formData.title) {
      showNotification('error', 'Please add a title before previewing')
      return
    }
    
    const previewData = {
      ...formData,
      publishSettings: { ...formData.publishSettings, status: 'preview' },
      previewedAt: new Date().toISOString()
    }
    
    sessionStorage.setItem('blog_preview', JSON.stringify(previewData))
    showNotification('info', 'Preview generated! Opening preview window...')
    
    // Open preview in new tab/window
    window.open('/blog/preview', '_blank')
    
    console.log('Preview data:', previewData)
  }

  const publishPost = () => {
    // Validation
    const validationErrors = []
    
    if (!formData.title.trim()) validationErrors.push('Title is required')
    if (!formData.content.trim()) validationErrors.push('Content is required')
    if (formData.categories.length === 0) validationErrors.push('At least one category is required')
    if (!formData.seoData.primaryKeyword) validationErrors.push('Primary SEO keyword is recommended')
    
    if (validationErrors.length > 0) {
      showNotification('error', `Please fix: ${validationErrors.join(', ')}`)
      return
    }

    try {
      const publishData = {
        ...formData,
        publishSettings: {
          ...formData.publishSettings,
          status: 'published',
          publishedAt: new Date().toISOString()
        },
        slug: generateSlug(formData.title),
        id: generateId(),
        updatedAt: new Date().toISOString()
      }

      // Store in session storage for backend processing
      sessionStorage.setItem('blog_published', JSON.stringify(publishData))
      
      // Clear draft
      sessionStorage.removeItem('blog_draft')
      
      showNotification('success', 'Post published successfully!')
      
      console.log('Published post data:', publishData)
      
      // Reset form or redirect
      setTimeout(() => {
        if (confirm('Post published! Do you want to create another post?')) {
          setFormData({
            title: '',
            content: '',
            seoData: {
              primaryKeyword: '',
              secondaryKeywords: [],
              metaTitle: '',
              metaDescription: '',
              metaUrl: ''
            },
            featuredImage: null,
            categories: ['Uncategorized'],
            tags: [],
            publishSettings: {
              visibility: 'public',
              publishDate: 'immediately',
              status: 'draft'
            },
            author: 'SNS (admin)',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        }
      }, 2000)
      
    } catch (error) {
      console.error('Error publishing post:', error)
      showNotification('error', 'Failed to publish post')
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Enhanced Media Upload Function
  const handleMediaUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,video/*,.pdf,.doc,.docx,.txt'
    input.multiple = true
    
    input.onchange = async (e) => {
      const files = Array.from(e.target.files)
      
      if (files.length === 0) return
      
      showNotification('info', `Processing ${files.length} file(s)...`)
      
      const uploadPromises = files.map(file => processMediaFile(file))
      
      try {
        const processedFiles = await Promise.all(uploadPromises)
        const validFiles = processedFiles.filter(file => file !== null)
        
        if (validFiles.length > 0) {
          // Add to media library
          const updatedMediaLibrary = [...mediaLibrary, ...validFiles]
          setMediaLibrary(updatedMediaLibrary)
          sessionStorage.setItem('media_library', JSON.stringify(updatedMediaLibrary))
          
          showNotification('success', `${validFiles.length} file(s) uploaded successfully!`)
          
          // Auto-insert first image if it's an image
          if (validFiles[0]?.type.startsWith('image/')) {
            insertMediaIntoEditor(validFiles[0])
          }
        }
        
      } catch (error) {
        console.error('Error processing files:', error)
        showNotification('error', 'Error uploading files')
      }
    }
    
    input.click()
  }

  // Process individual media file
  const processMediaFile = (file) => {
    return new Promise((resolve, reject) => {
      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        showNotification('error', `${file.name} is too large (max 10MB)`)
        resolve(null)
        return
      }

      // Validate file type
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/webm',
        'application/pdf',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain'
      ]

      if (!allowedTypes.includes(file.type)) {
        showNotification('error', `${file.name} is not a supported file type`)
        resolve(null)
        return
      }

      const reader = new FileReader()
      
      reader.onload = (e) => {
        const mediaFile = {
          id: generateId(),
          name: file.name,
          type: file.type,
          size: file.size,
          url: e.target.result,
          uploadedAt: new Date().toISOString(),
          alt: '',
          caption: ''
        }
        
        resolve(mediaFile)
      }
      
      reader.onerror = () => {
        showNotification('error', `Error reading ${file.name}`)
        resolve(null)
      }
      
      reader.readAsDataURL(file)
    })
  }

  // Insert media into Tiptap editor
  const insertMediaIntoEditor = (mediaFile) => {
    if (!editorRef.current) return

    const editor = editorRef.current.getEditor()
    if (!editor) return

    if (mediaFile.type.startsWith('image/')) {
      // Insert image
      editor.chain().focus().setImage({ 
        src: mediaFile.url,
        alt: mediaFile.alt || mediaFile.name,
        title: mediaFile.caption || mediaFile.name
      }).run()
    } else if (mediaFile.type.startsWith('video/')) {
      // Insert video (as HTML)
      const videoHTML = `<video controls width="100%" style="max-width: 600px;">
        <source src="${mediaFile.url}" type="${mediaFile.type}">
        Your browser does not support the video tag.
      </video>`
      
      editor.chain().focus().insertContent(videoHTML).run()
    } else {
      // Insert as link for documents
      const linkHTML = `<p><a href="${mediaFile.url}" target="_blank" download="${mediaFile.name}">📁 ${mediaFile.name}</a></p>`
      editor.chain().focus().insertContent(linkHTML).run()
    }

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
      <div className="bg-white border-b border-gray-200 p-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add Use Case</h1>
            <p className="text-sm text-gray-500 mt-1">
              {formData.publishSettings.status === 'draft' ? 'Draft' : 'Published'} • 
              Last saved: {new Date(formData.updatedAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => saveDraft()}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            <button
              onClick={previewPost}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Preview
            </button>
            <button
              onClick={publishPost}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div>
              <input
                type="text"
                placeholder="Add title"
                className="w-full p-4 text-xl font-medium border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.title}
                onChange={(e) => updateFormData('title', e.target.value)}
                autoFocus
              />
              {formData.title && (
                <p className="mt-2 text-sm text-gray-500">
                  Slug: {generateSlug(formData.title)}
                </p>
              )}
            </div>

            {/* Enhanced Add Media Section */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleMediaUpload}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload size={16} />
                <span>Add Media</span>
              </button>
              
              <button 
                onClick={openMediaLibrary}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Image size={16} />
                <span>Media Library ({mediaLibrary.length})</span>
              </button>

              {mediaLibrary.length > 0 && (
                <div className="text-sm text-gray-500">
                  Recent uploads: {mediaLibrary.slice(-3).map(file => file.name).join(', ')}
                </div>
              )}
            </div>

            {/* Rich Text Editor with Ref */}
            <FreeRichTextEditor
              ref={editorRef}
              content={formData.content}
              onChange={(content) => updateFormData('content', content)}
              placeholder="Tell your story..."
            />

            {/* SEO Analyzer */}
            <BlogSEOAnalyzer
              content={formData.content}
              title={formData.title}
              onTitleChange={(title) => updateFormData('title', title)}
              onSEODataChange={updateSEOData}
            />
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
