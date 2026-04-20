import { FormEvent, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateChallenge } from "@/features/challenges/useChallenges";
import { useCategories } from "@/features/challenges/useCategories";
import { useAuthStore } from "@/features/auth/authStore";
import { useCurrentUser } from "@/features/auth/useAuth";
import { apiError } from "@/lib/api";

export default function NewChallengePage() {
  const navigate = useNavigate();
  const create = useCreateChallenge();
  const categoriesQ = useCategories();
  const me = useCurrentUser();
  const storedUser = useAuthStore((s) => s.user);
  const ownerUserId = me.data?.id ?? storedUser?.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState(
    () => new Date().toISOString().slice(0, 10),
  );
  const [endDate, setEndDate] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const sortedCategories = useMemo(() => {
    const list = categoriesQ.data ?? [];
    return [...list].sort((a, b) =>
      a.localeCompare(b, undefined, { sensitivity: "base" }),
    );
  }, [categoriesQ.data]);

  useEffect(() => {
    if (!category && sortedCategories.length === 1) {
      setCategory(sortedCategories[0]);
    }
  }, [sortedCategories, category]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ownerUserId) return;
    const cat = category.trim();
    if (!cat || sortedCategories.length === 0) return;
    create.mutate(
      {
        ownerUserId,
        title,
        description: description || undefined,
        category: cat,
        startDate,
        endDate: endDate || undefined,
        "private": isPrivate,
      },
      { onSuccess: (c) => navigate(`/challenges/${c.id}`) },
    );
  }

  const canSubmit =
    !!ownerUserId &&
    sortedCategories.length > 0 &&
    category.trim().length > 0 &&
    sortedCategories.includes(category.trim());

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-black tracking-tight mb-6">
        New challenge
      </h1>

      <form onSubmit={onSubmit} className="card space-y-4">
        <div>
          <label className="label" htmlFor="title">Title</label>
          <input
            id="title"
            required
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. 30 days of push-ups"
          />
        </div>
        <div>
          <label className="label" htmlFor="desc">Description</label>
          <textarea
            id="desc"
            rows={3}
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <span className="label">Category</span>
          <p className="text-sm font-medium text-ink-700 mb-2">
            Pick one of the categories returned by{" "}
            <code className="text-xs bg-ink-100 px-1 rounded">GET /api/categories</code>
            .
          </p>
          {categoriesQ.isLoading && (
            <div className="flex items-center gap-2 text-ink-700 font-bold text-sm py-2">
              <span className="inline-block w-4 h-4 shrink-0 rounded-full border-2 border-ink-300 border-t-green-500 animate-spin" />
              Loading categories…
            </div>
          )}
          {categoriesQ.isError && (
            <div className="rounded-md bg-red-50 border-2 border-red-500 text-red-800 p-3 text-sm font-bold">
              Couldn&apos;t load categories: {apiError(categoriesQ.error)}
            </div>
          )}
          {categoriesQ.isSuccess && sortedCategories.length === 0 && (
            <div className="rounded-md bg-gold-50 border-2 border-gold-400 text-gold-800 p-3 text-sm font-bold">
              No categories are available yet. Configure them on the backend,
              then refresh this page.
            </div>
          )}
          {categoriesQ.isSuccess && sortedCategories.length > 0 && (
            <>
              <select
                id="category"
                required
                className="input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select a category…
                </option>
                {sortedCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs font-bold text-ink-500 uppercase tracking-wider">
                {sortedCategories.length} available
                {sortedCategories.length > 0
                  ? `: ${sortedCategories.join(", ")}`
                  : ""}
              </p>
            </>
          )}
        </div>

        <div className="flex items-start gap-3 rounded-md border-2 border-ink-300 bg-ink-100 px-4 py-3">
          <input
            id="private"
            type="checkbox"
            checked={isPrivate}
            onChange={(e) => setIsPrivate(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded-sm border-2 border-ink-300 accent-green-600"
          />
          <div>
            <label
              htmlFor="private"
              className="font-black text-sm uppercase tracking-wider text-ink-900 cursor-pointer"
            >
              Private challenge
            </label>
            <p className="text-sm font-medium text-ink-700 mt-1">
              When enabled, only you and people you invite can see this challenge.
              Leave off for a normal, visible challenge.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label" htmlFor="start">Start</label>
            <input
              id="start"
              type="date"
              required
              className="input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label className="label" htmlFor="end">End (optional)</label>
            <input
              id="end"
              type="date"
              className="input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {create.isError && (
          <div className="rounded-md bg-red-50 border-2 border-red-500 text-red-800 p-3 text-sm font-bold">
            {apiError(create.error)}
          </div>
        )}

        {!ownerUserId && (
          <div className="rounded-md bg-gold-50 border-2 border-gold-400 text-gold-800 p-3 text-sm font-bold">
            Loading your profile…
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={create.isPending || !ownerUserId || !canSubmit}
            className="btn btn-primary disabled:opacity-60"
          >
            {create.isPending ? "Creating…" : "Create challenge"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
