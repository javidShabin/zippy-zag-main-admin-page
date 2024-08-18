import React from 'react'
import UnAuthSidebar from '../components/UnAuthSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div>
      <UnAuthSidebar />
      <Outlet />
    </div>
  )
}

export default AdminLayout
