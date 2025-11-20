import { useState } from "react";
import { Routes, Route, Navigate } from "react-router";

import AuthInitializer from "@/hooks/AuthListener";
import AuthLayout from "@/layouts/AuthLayout";
import SignInPage from "@/pages/auth/sign-in/SignInPage";
import SignUpPage from "@/pages/auth/sign-up/SignUpPage";
import BootScreen from "@/pages/os/BootScreen";
import OsMain from "@/pages/os/OsMain";
import ProtectedRoute from "@/router/ProtectedRoute";
import PublicRoute from "@/router/PublicRoute";

export default function App() {
  const [isBooting, setIsBooting] = useState(false);
  const USE_ENTER_MODE = true;

  return (
    <>
      <AuthInitializer />
      {!isBooting ? (
        <BootScreen onComplete={() => setIsBooting(true)} useEnterMode={USE_ENTER_MODE} />
      ) : (
        <Routes>
          <Route element={<PublicRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<OsMain />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  );
}
