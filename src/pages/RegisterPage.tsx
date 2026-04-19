import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "@/features/auth/useAuth";
import { apiError } from "@/lib/api";
import { Logo } from "@/components/Logo";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const register = useRegister();
  const navigate = useNavigate();
  const [localError, setLocalError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLocalError(null);
    if (password !== confirm) {
      setLocalError("Passwords do not match.");
      return;
    }
    register.mutate(
      {
        name,
        email,
        password,
        password_confirmation: confirm,
      },
      {
        onSuccess: () =>
          navigate("/login", {
            replace: true,
            state: { message: "Account created — check your email to verify." },
          }),
      },
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-ink-100">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>

        <div className="card border-b-[4px] shadow-[6px_6px_0_theme(colors.gold.400)]">
          <h1 className="text-3xl font-black tracking-tight mb-2">
            Start your streak
          </h1>
          <p className="text-ink-700 font-medium mb-6">
            Create an account to join challenges with your people.
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="label" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>
            <div>
              <label className="label" htmlFor="email">Email</label>
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
              <label className="label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                required
                minLength={8}
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label className="label" htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                type="password"
                required
                minLength={8}
                className="input"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            {(localError || register.isError) && (
              <div className="rounded-md bg-red-50 border-2 border-red-500 text-red-800 p-3 text-sm font-bold">
                {localError || apiError(register.error)}
              </div>
            )}

            <button
              type="submit"
              disabled={register.isPending}
              className="btn btn-primary btn-lg w-full disabled:opacity-60"
            >
              {register.isPending ? "Creating…" : "Create account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm font-bold text-ink-700">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
