import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = (props) => {
  if (!props.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (props.userRole != props.requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleBasedRoute;
