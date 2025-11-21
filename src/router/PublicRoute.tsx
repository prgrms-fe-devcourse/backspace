import { Navigate, Outlet } from "react-router";

import { useAuthUser } from "@/hooks/useAuthUser";

export default function PublicRoute() {
  const { isLoggedIn, isLoading } = useAuthUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
