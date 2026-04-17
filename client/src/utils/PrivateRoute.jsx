import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user, loading } = useAuthContext();
  if (loading) {
    return <div>Loading...</div>;
  }

  return (user && user.role !== "admin") ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
