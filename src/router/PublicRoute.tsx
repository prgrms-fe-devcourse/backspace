import { Navigate, Outlet } from "react-router";

import { useAuthUser } from "@/hooks/useAuthUser";

export default function PublicRoute() {
  const { isLoggedIn } = useAuthUser();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
