import React from 'react'
import { useLocation } from 'react-router-dom'
import AdminJobOpenings from '../../components/Adminpages/jobOpenings/jobOpenings'
import NewJob from '../../components/Adminpages/jobOpenings/newJob'
import Applications from '../../components/Adminpages/jobOpenings/applications'
import OverView from '../../components/Adminpages/jobOpenings/overView'
import EditJob from '../../components/Adminpages/jobOpenings/editJob'
import PreviewJob from '../../components/Adminpages/jobOpenings/previewJob'

const JobOpenings = () => {
  const location = useLocation()
  
  const renderComponent = () => {
    // Handle dynamic routes with parameters
    if (location.pathname.startsWith('/admin/jobopenings/edit/')) {
      return <EditJob />
    }
    
    if (location.pathname.startsWith('/admin/jobopenings/preview/')) {
      return <PreviewJob />
    }
    
    // Handle static routes
    switch (location.pathname) {
      case '/admin/jobopenings/newJob':
        return <NewJob />
      case '/admin/jobopenings/applications':
        return <Applications />
      case '/admin/jobopenings':
      default:
        return <OverView />
    }
  }

  return (
    <div>
      {renderComponent()}
    </div>
  )
}

export default JobOpenings
