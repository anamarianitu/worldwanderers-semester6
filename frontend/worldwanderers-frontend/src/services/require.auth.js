import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.authentication.authenticated);
  let location = useLocation();

  // if (!user.state.isAuthenticated) {
  //   return <Navigate to="/log-in" state={{ from: location }} replace />;
  // }
  return children;
};

export default ProtectedRoute;
