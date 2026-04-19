export function Spinner({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center py-10 text-ink-700 font-bold">
      <span className="inline-block w-4 h-4 rounded-full border-2 border-ink-300 border-t-green-500 animate-spin mr-3" />
      {label}
    </div>
  );
}
