import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../services/auth.api";
import GlobalLoader from "./GlobalLoader";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useMeQuery({});

  if (isLoading) {
    return <GlobalLoader/>
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
