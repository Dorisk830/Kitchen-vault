import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // If the user is not authenticated and the path is not login or register
  if (!isAuthenticated && !["/login", "/register"].some(path => location.pathname.includes(path))) {
    return <Navigate to="/auth/login" />;
  }

  // If the user is authenticated and trying to access login or register pages
  if (isAuthenticated && ["/login", "/register"].some(path => location.pathname.includes(path))) {
    return user?.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/shop/home" />;
  }

  // For authenticated non-admin users trying to access admin routes
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // For admin users trying to access shop routes
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // Handle redirection for the homepage route based on user role
  if (location.pathname === "/") {
    return isAuthenticated ? (user?.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/shop/home" />) : <Navigate to="/auth/login" />;
  }

  // If no conditions matched, render children
  return <>{children}</>;
}

// Prop Types
CheckAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default CheckAuth;
