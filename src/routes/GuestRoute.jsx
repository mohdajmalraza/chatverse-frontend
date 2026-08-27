import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GuestRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (user) {
    return <Navigate to="/chat" replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
