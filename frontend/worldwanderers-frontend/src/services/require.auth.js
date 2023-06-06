import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector((state) => state.authentication.authenticated);
  const userRole = useSelector((state) => state.authentication.role);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Redirect to appropriate page based on user role and requested page
    if (userRole === "ROLE_USER") {
      return <Navigate to="/feed" replace />;
    } else if (userRole === "ROLE_ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
