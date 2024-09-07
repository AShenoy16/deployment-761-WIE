import React from "react";
import { useAuthStore } from "../stores/AuthenticationStore";
import { Navigate } from "react-router-dom";

type AuthWrapperProps = {
  children: React.ReactNode;
};

/**
 * Checks if admin is logged in when navigating to specific route(s)
 */
const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const isAdminLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isAdminLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
