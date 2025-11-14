import { Routes, Route, Navigate } from "react-router";

import SignInPage from "@/pages/auth/sign-in/SignInPage";
import SignUpPage from "@/pages/auth/sign-up/SignUpPage";
import OsMain from "@/pages/os/OsMain";

import AuthInitializer from "./components/auth/AuthListener";

export default function App() {
  return (
    <>
      <AuthInitializer />
      <Routes>
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* TODO: Auth 유저만 / 진입할 수 있도록 Auth Gate 구현 */}
        <Route path="/" element={<OsMain />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
