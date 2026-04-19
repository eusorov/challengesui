import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLogin } from "@/features/auth/useAuth";
import { apiError } from "@/lib/api";
import { Logo } from "@/components/Logo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo =
    (location.state as { from?: string } | null)?.from || "/challenges";

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    login.mutate(
      { email, password },
      { onSuccess: () => navigate(redirectTo, { replace: true }) },
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-ink-100">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="card border-b-[4px] shadow-[6px_6px_0_theme(colors.green.500)]">
          <h1 className="text-3xl font-black tracking-tight mb-2">
            Welcome back
          </h1>
          <p className="text-ink-700 font-medium mb-6">
            Log in to keep your streak alive.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {login.isError && (
              <div className="rounded-md bg-red-50 border-2 border-red-500 text-red-800 p-3 text-sm font-bold">
                {apiError(login.error)}
              </div>
            )}

            <button
              type="submit"
              disabled={login.isPending}
              className="btn btn-primary btn-lg w-full disabled:opacity-60"
            >
              {login.isPending ? "Logging in…" : "Log in"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm font-bold text-ink-700">
            No account yet?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
