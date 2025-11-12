import { Routes, Route, Navigate } from "react-router";

import MockLoginPage from "@/pages/MockLoginPage";
import MockMainPage from "@/pages/MockMainPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<MockLoginPage />} />
      {/* TODO: Auth 유저만 / 진입할 수 있도록 Auth Gate 구현 */}
      <Route path="/" element={<MockMainPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
