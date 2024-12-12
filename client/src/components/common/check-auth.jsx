import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Allow unauthenticated users to view the homepage (no redirect to login)
  if (location.pathname === "/") {
    return <>{children}</>; // Always render the homepage
  }

  // If the user is not authenticated and trying to access a protected page
  if (!isAuthenticated && ["/checkout", "/cart"].some(path => location.pathname.includes(path))) {
    return <Navigate to="/auth/login" />;
  }

  // If authenticated, prevent access to login/register pages
  if (isAuthenticated && ["/login", "/register"].some(path => location.pathname.includes(path))) {
    return user?.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/shop/home" />;
  }

  // For admin users trying to access shop routes
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // For non-admin users trying to access admin routes
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  // If no conditions matched, render children
  return <>{children}</>;
}


CheckAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string,
  }),
  children: PropTypes.node,
};

export default CheckAuth;
