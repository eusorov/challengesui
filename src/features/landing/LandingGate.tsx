import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/authStore";
import LandingPage from "@/pages/LandingPage";

export function LandingGate() {
  const token = useAuthStore((s) => s.token);
  if (token) {
    return <Navigate to="/challenges" replace />;
  }
  return <LandingPage />;
}
