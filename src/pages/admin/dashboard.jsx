import React from 'react'
import AdminDashboard from '../../components/Adminpages/AdminDashboard'
import { BlogProvider } from '../../contexts/BlogContext'

const dashboard = () => {
  return (
    <BlogProvider>
      <AdminDashboard />
    </BlogProvider>
  )
}

export default dashboard
