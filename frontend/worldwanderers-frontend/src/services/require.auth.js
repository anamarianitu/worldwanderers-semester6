import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.authentication.authenticated);
  // console.log(user);
  let location = useLocation();

  if (!user) {
    return <Navigate to="/log-in" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
