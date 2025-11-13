import { Routes, Route, Navigate } from "react-router";

import MockMainPage from "@/pages/MockMainPage";

import SignInPage from "./pages/auth/sign-in/SignInPage";
import SignUpPage from "./pages/auth/sign-up/SignUpPage";

export default function App() {
  return (
    <Routes>
      <Route path="/signIn" element={<SignInPage />} />
      <Route path="/signUp" element={<SignUpPage />} />
      {/* TODO: Auth 유저만 / 진입할 수 있도록 Auth Gate 구현 */}
      <Route path="/" element={<MockMainPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
