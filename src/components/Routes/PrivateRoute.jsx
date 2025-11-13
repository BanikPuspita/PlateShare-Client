import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-6">Loading...</div>;
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
