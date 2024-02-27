import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import MasterLayout from "../components/MasterLayout";

export const ProtectedRoute = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <MasterLayout>
      <Outlet />
    </MasterLayout>
  );
};
