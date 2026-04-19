import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 no-underline text-green-500 font-black text-2xl tracking-tight"
    >
      <span className="w-9 h-9 rounded-full bg-green-500 border-2 border-b-[4px] border-green-700 flex items-center justify-center text-xl">
        🦉
      </span>
      Streak
    </Link>
  );
}
