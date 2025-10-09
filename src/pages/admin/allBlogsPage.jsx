import React from 'react'
import AllBlogs from '../../components/Adminpages/blogs/allBlogs'
import { BlogProvider } from '../../contexts/BlogContext'

const AllBlogsPage = () => {
  return (
    <BlogProvider>
      <AllBlogs />
    </BlogProvider>
  )
}

export default AllBlogsPage
