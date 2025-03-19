import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    console.log("go to login");
    return <Navigate to="/login" replace />;
  }

  if (user.role != requiredRole) {
    return <Navigate to="/error/404" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
