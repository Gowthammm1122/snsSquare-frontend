import React from 'react'
import AdminBlogs from '../../components/Adminpages/blogs/adminNewBlogs'
import { BlogProvider } from '../../contexts/BlogContext'

const BlogsPage = () => {
  return (
    <BlogProvider>
      <AdminBlogs />
    </BlogProvider>
  )
}

export default BlogsPage
