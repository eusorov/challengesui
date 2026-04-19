import { FormEvent, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useChallenge } from "@/features/challenges/useChallenges";
import { useSubtasks } from "@/features/subtasks/useSubtasks";
import {
  useCheckIns,
  useCreateCheckIn,
} from "@/features/checkins/useCheckIns";
import {
  useComments,
  useCreateComment,
} from "@/features/comments/useComments";
import { useAuthStore } from "@/features/auth/authStore";
import { useCurrentUser } from "@/features/auth/useAuth";
import { Spinner } from "@/components/Spinner";
import { apiError } from "@/lib/api";

type Tab = "overview" | "check-ins" | "comments";

export default function ChallengeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const challengeId = id ? Number(id) : undefined;
  const [tab, setTab] = useState<Tab>("overview");

  const challenge = useChallenge(challengeId);
  const subtasks = useSubtasks(challengeId);

  if (challenge.isLoading) return <Spinner label="Loading challenge…" />;
  if (challenge.isError)
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="card border-red-500 text-red-800">
          Couldn't load this challenge: {apiError(challenge.error)}
        </div>
      </div>
    );

  const c = challenge.data;
  if (!c) return null;

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-10">
      <Link
        to="/challenges"
        className="text-sm font-bold text-ink-700 hover:text-green-600"
      >
        ← All challenges
      </Link>

      <header className="mt-4 mb-6">
        {c.imageUrl && (
          <div
            className="aspect-[3/1] rounded-lg bg-cover bg-center border-2 border-ink-300 mb-5"
            style={{ backgroundImage: `url(${c.imageUrl})` }}
          />
        )}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-2">
              {c.title}
            </h1>
            <p className="mb-2">
              <span className="inline-block text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md bg-ink-100 border-2 border-ink-300">
                {c.category}
              </span>
            </p>
            <p className="text-ink-700 font-bold">
              {c.startDate}
              {c.endDate ? ` → ${c.endDate}` : " — ongoing"}
            </p>
          </div>
          <CheckInButton challengeId={c.id} />
        </div>
        {c.description && (
          <p className="mt-4 text-ink-700 font-medium max-w-2xl">
            {c.description}
          </p>
        )}
      </header>

      <div className="flex gap-2 border-b-2 border-ink-300 mb-6">
        {(["overview", "check-ins", "comments"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={
              "px-4 py-2 font-black uppercase tracking-wider text-xs border-b-4 -mb-[2px] " +
              (tab === t
                ? "border-green-500 text-ink-900"
                : "border-transparent text-ink-700 hover:text-ink-900")
            }
          >
            {t.replace("-", " ")}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <section>
          <h2 className="text-xl font-black mb-3">Subtasks</h2>
          {subtasks.isLoading && <Spinner />}
          {subtasks.data && subtasks.data.length === 0 && (
            <p className="text-ink-700 font-medium">
              No subtasks yet. Add them from the API to split this challenge
              into steps.
            </p>
          )}
          {subtasks.data && subtasks.data.length > 0 && (
            <ul className="space-y-2">
              {subtasks.data
                .slice()
                .sort((a, b) => a.sortIndex - b.sortIndex)
                .map((st) => (
                  <li key={st.id} className="card flex items-center gap-3">
                    <span className="w-7 h-7 rounded-sm bg-green-50 border-2 border-green-400 flex items-center justify-center text-sm font-black">
                      {st.sortIndex + 1}
                    </span>
                    <span className="font-bold">{st.title}</span>
                  </li>
                ))}
            </ul>
          )}
        </section>
      )}

      {tab === "check-ins" && challengeId !== undefined && (
        <CheckInsSection challengeId={challengeId} />
      )}

      {tab === "comments" && challengeId !== undefined && (
        <CommentsSection challengeId={challengeId} />
      )}
    </div>
  );
}

function CheckInButton({ challengeId }: { challengeId: number }) {
  const me = useCurrentUser();
  const stored = useAuthStore((s) => s.user);
  const userId = me.data?.id ?? stored?.id;
  const create = useCreateCheckIn(challengeId);
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <button
      disabled={!userId || create.isPending}
      onClick={() =>
        userId &&
        create.mutate({
          userId,
          challengeId,
          checkDate: today,
        })
      }
      className="btn btn-primary btn-lg disabled:opacity-60"
    >
      {create.isSuccess ? "✓ Checked in" : create.isPending ? "Saving…" : "Check in today"}
    </button>
  );
}

function CheckInsSection({ challengeId }: { challengeId: number }) {
  const { data, isLoading, isError, error } = useCheckIns(challengeId);
  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <div className="card border-red-500 text-red-800">
        {apiError(error)}
      </div>
    );
  if (!data || data.content.length === 0)
    return (
      <p className="text-ink-700 font-medium">
        No check-ins yet. Be the first to check in.
      </p>
    );
  return (
    <ul className="space-y-2">
      {data.content.map((ci) => (
        <li key={ci.id} className="card flex items-center gap-3">
          <span className="text-xl">🔥</span>
          <div>
            <div className="font-black">{ci.checkDate}</div>
            <div className="text-xs font-bold text-ink-700">
              user #{ci.userId}
              {ci.subTaskId ? ` · subtask #${ci.subTaskId}` : ""}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CommentsSection({ challengeId }: { challengeId: number }) {
  const [body, setBody] = useState("");
  const { data, isLoading, isError, error } = useComments(challengeId);
  const create = useCreateComment(challengeId);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    create.mutate(body.trim(), { onSuccess: () => setBody("") });
  }

  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="card space-y-3">
        <label className="label" htmlFor="comment">Add a comment</label>
        <textarea
          id="comment"
          rows={3}
          className="input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!body.trim() || create.isPending}
            className="btn btn-primary disabled:opacity-60"
          >
            {create.isPending ? "Posting…" : "Post"}
          </button>
        </div>
      </form>

      {isLoading && <Spinner />}
      {isError && (
        <div className="card border-red-500 text-red-800">
          {apiError(error)}
        </div>
      )}
      {data && data.content.length === 0 && (
        <p className="text-ink-700 font-medium">
          No comments yet. Start the conversation.
        </p>
      )}
      {data && data.content.length > 0 && (
        <ul className="space-y-3">
          {data.content.map((cm) => (
            <li key={cm.id} className="card">
              <div className="text-xs font-bold text-ink-700 mb-1">
                user #{cm.userId} · {new Date(cm.createdAt).toLocaleString()}
              </div>
              <div className="font-medium whitespace-pre-wrap">{cm.body}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
