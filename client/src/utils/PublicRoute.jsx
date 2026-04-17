import React from 'react'
import { useAuthContext } from '../contexts/AuthContext'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PublicRoute = () => {
    const { user } = useAuthContext();

  return user ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
}

export default PublicRoute