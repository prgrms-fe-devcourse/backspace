import { Navigate, Outlet } from "react-router";

import { useAuthUser } from "@/hooks/useAuthUser";

export default function ProtectedRoute() {
  const { isLoggedIn } = useAuthUser();

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
