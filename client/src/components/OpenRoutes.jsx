import React from 'react'
import { getCookie } from '../utils/utils';
import { Navigate, Outlet } from 'react-router-dom';
function OpenRoutes() {
      const isAuthenticated = getCookie('isAuthenticated');

       if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default OpenRoutes
