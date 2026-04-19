import { NavLink, Outlet } from "react-router-dom";
import { useLogout, useCurrentUser } from "@/features/auth/useAuth";
import { Logo } from "./Logo";

export function AppShell() {
  const logout = useLogout();
  const me = useCurrentUser();

  return (
    <div className="min-h-screen flex flex-col bg-ink-100">
      <nav className="sticky top-0 z-10 bg-paper border-b-2 border-ink-300">
        <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between">
          <Logo />
          <div className="hidden sm:flex items-center gap-7 text-ink-700 font-extrabold text-sm">
            <NavLink
              to="/challenges"
              className={({ isActive }) =>
                isActive ? "text-green-600" : "hover:text-green-600"
              }
            >
              Challenges
            </NavLink>
          </div>
          <div className="flex items-center gap-3">
            {me.data?.email && (
              <span className="hidden sm:inline text-sm font-bold text-ink-700">
                {me.data.email}
              </span>
            )}
            <button
              onClick={() => logout.mutate()}
              className="btn btn-outline text-xs px-4 py-2 border-b-[4px]"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full">
        <Outlet />
      </main>
    </div>
  );
}
