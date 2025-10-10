import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  fetchAllBlogsAdmin,
  fetchBlogByIdAdmin,
  createBlog as createBlogAPI,
  updateBlog as updateBlogAPI,
  deleteBlog as deleteBlogAPI,
  publishBlog as publishBlogAPI,
  unpublishBlog as unpublishBlogAPI,
  saveBlogAsDraft as saveBlogAsDraftAPI,
  uploadBlogImage as uploadBlogImageAPI,
  getBlogStats as getBlogStatsAPI,
} from '../api/Service/blog'

const BlogContext = createContext()

export const useBlogContext = () => {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlogContext must be used within a BlogProvider')
  }
  return context
}

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    draft: 0,
    unpublished: 0,
    recent: 0,
  })

  // Load blogs from backend on mount
  useEffect(() => {
    fetchBlogs()
    fetchStats()
  }, [])

  const fetchBlogs = async (params = {}) => {
    setLoading(true)
    try {
      // Set a high limit to fetch all blogs for frontend pagination
      // This ensures we get all blogs instead of the default 20
      const fetchParams = { limit: 1000, ...params }
      const response = await fetchAllBlogsAdmin(fetchParams)
      if (response.success) {
        setBlogs(response.data)
      }
    } catch (error) {
      console.error('Error fetching blogs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await getBlogStatsAPI()
      if (response.success) {
        setStats(response.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  const addBlog = async (formData) => {
    setLoading(true)
    try {
      const response = await createBlogAPI(formData)
      if (response.success) {
        await fetchBlogs()
        await fetchStats()
        return response.data
      }
    } catch (error) {
      console.error('Error creating blog:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateBlog = async (blogId, formData) => {
    setLoading(true)
    try {
      const response = await updateBlogAPI(blogId, formData)
      if (response.success) {
        await fetchBlogs()
        await fetchStats()
        return response.data
      }
    } catch (error) {
      console.error('Error updating blog:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const deleteBlog = async (blogId) => {
    setLoading(true)
    try {
      const response = await deleteBlogAPI(blogId)
      if (response.success) {
        await fetchBlogs()
        await fetchStats()
        return true
      }
    } catch (error) {
      console.error('Error deleting blog:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getBlogById = async (blogId) => {
    setLoading(true)
    try {
      const response = await fetchBlogByIdAdmin(blogId)
      if (response.success) {
        return response.data
      }
    } catch (error) {
      console.error('Error fetching blog:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getBlogBySlug = (slug) => {
    return blogs.find(blog => blog.slug === slug)
  }

  const publishBlog = async (blogId) => {
    setLoading(true)
    try {
      const response = await publishBlogAPI(blogId)
      if (response.success) {
        await fetchBlogs()
        await fetchStats()
        return response.data
      }
    } catch (error) {
      console.error('Error publishing blog:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const unpublishBlog = async (blogId) => {
    setLoading(true)
    try {
      const response = await unpublishBlogAPI(blogId)
      if (response.success) {
        await fetchBlogs()
        await fetchStats()
        return response.data
      }
    } catch (error) {
      console.error('Error unpublishing blog:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const draftBlog = async (blogId) => {
    setLoading(true)
    try {
      const response = await saveBlogAsDraftAPI(blogId)
      if (response.success) {
        await fetchBlogs()
        await fetchStats()
        return response.data
      }
    } catch (error) {
      console.error('Error saving draft:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const uploadBlogImage = async (imageFile) => {
    try {
      const response = await uploadBlogImageAPI(imageFile)
      if (response.success) {
        return response.data.url
      }
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const getStats = () => {
    return stats
  }

  const value = {
    blogs,
    loading,
    addBlog,
    updateBlog,
    deleteBlog,
    getBlogById,
    getBlogBySlug,
    publishBlog,
    unpublishBlog,
    draftBlog,
    uploadBlogImage,
    generateSlug,
    getStats,
    fetchBlogs,
    setLoading
  }

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  )
}

export default BlogContext
