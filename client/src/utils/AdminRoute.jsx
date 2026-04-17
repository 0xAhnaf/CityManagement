import React from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { user, loading } = useAuthContext();
  
  return user.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoute;
