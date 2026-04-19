import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateChallenge } from "@/features/challenges/useChallenges";
import { useAuthStore } from "@/features/auth/authStore";
import { useCurrentUser } from "@/features/auth/useAuth";
import { apiError } from "@/lib/api";

export default function NewChallengePage() {
  const navigate = useNavigate();
  const create = useCreateChallenge();
  const me = useCurrentUser();
  const storedUser = useAuthStore((s) => s.user);
  const ownerUserId = me.data?.id ?? storedUser?.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(
    () => new Date().toISOString().slice(0, 10),
  );
  const [endDate, setEndDate] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!ownerUserId) return;
    create.mutate(
      {
        ownerUserId,
        title,
        description: description || undefined,
        startDate,
        endDate: endDate || undefined,
      },
      { onSuccess: (c) => navigate(`/challenges/${c.id}`) },
    );
  }

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
            disabled={create.isPending || !ownerUserId}
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
