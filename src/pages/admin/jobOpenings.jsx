import React from 'react'
import { useLocation } from 'react-router-dom'
import AdminJobOpenings from '../../components/Adminpages/jobOpenings/jobOpenings'
import NewJob from '../../components/Adminpages/jobOpenings/newJob'
import Applications from '../../components/Adminpages/jobOpenings/applications'
import OverView from '../../components/Adminpages/jobOpenings/overView'

const JobOpenings = () => {
  const location = useLocation()
  
  const renderComponent = () => {
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
