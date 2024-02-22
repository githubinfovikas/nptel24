import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getToken } from './common';
import { isUserLoggedIn } from './isUserLoggedIn';
const PrivateComponent = () => {
    return isUserLoggedIn()? <Outlet/> : <Navigate to="/" />
}

export default PrivateComponent

