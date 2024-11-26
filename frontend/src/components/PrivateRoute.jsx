import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {

   // takes the userInfo property from state.auth in the Redux store and assigns it to the userInfo variable in the component.

    const { userInfo } = useSelector(state => state.auth)
    

    // if userInfo exists (meaning the user is logged in) ? then output the Outlet if not : navigate to login 

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />

// <Outlet /> renders child routes, This allows PrivateRoute to act as a wrapper for protected routes, displaying them if the user is logged in.

{/* <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
      </Route> */}
}

export default PrivateRoute