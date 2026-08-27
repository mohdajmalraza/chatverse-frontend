import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "./LoadingScreen";

const HomeRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen message="Checking authentication..." />;
  }

  if (user) {
    return <Navigate to="/chat" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default HomeRedirect;
