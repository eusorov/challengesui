import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { AppShell } from "@/components/AppShell";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ChallengesListPage from "@/pages/ChallengesListPage";
import ChallengeDetailPage from "@/pages/ChallengeDetailPage";
import NewChallengePage from "@/pages/NewChallengePage";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/challenges" replace /> },
      { path: "challenges", element: <ChallengesListPage /> },
      { path: "challenges/new", element: <NewChallengePage /> },
      { path: "challenges/:id", element: <ChallengeDetailPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
