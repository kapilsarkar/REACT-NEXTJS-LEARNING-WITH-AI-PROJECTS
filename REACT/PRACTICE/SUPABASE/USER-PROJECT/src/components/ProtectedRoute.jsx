import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ session, loading, children }) => {
  if (loading) {
    return <p>Checking authentication...</p>;
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;