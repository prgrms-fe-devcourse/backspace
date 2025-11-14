import { Navigate, Outlet } from "react-router";

import { useAuthUser } from "@/hooks/useAuthUser";

export default function ProtectedRoute() {
  const { isLoggedIn, isLoading } = useAuthUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
