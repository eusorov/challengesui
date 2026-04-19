import { useState } from "react";
import { Link } from "react-router-dom";
import { useChallenges } from "@/features/challenges/useChallenges";
import { Spinner } from "@/components/Spinner";
import { apiError } from "@/lib/api";
import type { ChallengeResponse } from "@/lib/types";

function ChallengeCard({ c }: { c: ChallengeResponse }) {
  return (
    <Link
      to={`/challenges/${c.id}`}
      className="card card-hover block no-underline text-ink-900 hover:text-ink-900"
    >
      {c.imageUrl ? (
        <div
          className="aspect-[16/9] rounded-md bg-cover bg-center mb-3"
          style={{ backgroundImage: `url(${c.imageUrl})` }}
        />
      ) : (
        <div className="aspect-[16/9] rounded-md bg-gradient-to-br from-green-100 to-gold-50 mb-3 flex items-center justify-center text-5xl">
          🔥
        </div>
      )}
      <h3 className="text-lg font-black leading-tight mb-1">{c.title}</h3>
      <p className="text-sm font-bold text-ink-700 mb-3">
        {c.startDate}
        {c.endDate ? ` → ${c.endDate}` : " — ongoing"}
      </p>
      {c.description && (
        <p className="text-sm font-medium text-ink-700 line-clamp-2">
          {c.description}
        </p>
      )}
    </Link>
  );
}

export default function ChallengesListPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, error } = useChallenges(page, 20);

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      <div className="flex items-end justify-between mb-8">
        <div>
          <div className="eyebrow mb-2">Your challenges</div>
          <h1 className="text-4xl font-black tracking-tight">Keep it going</h1>
        </div>
        <Link to="/challenges/new" className="btn btn-primary">
          + New challenge
        </Link>
      </div>

      {isLoading && <Spinner />}

      {isError && (
        <div className="card border-red-500 text-red-800">
          Couldn't load challenges: {apiError(error)}
        </div>
      )}

      {data && data.content.length === 0 && (
        <div className="card text-center py-12">
          <div className="text-5xl mb-4">🌱</div>
          <h2 className="text-2xl font-black mb-2">No challenges yet</h2>
          <p className="text-ink-700 font-medium mb-6">
            Create your first challenge and invite your people.
          </p>
          <Link to="/challenges/new" className="btn btn-primary">
            Start a challenge
          </Link>
        </div>
      )}

      {data && data.content.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.content.map((c) => (
              <ChallengeCard key={c.id} c={c} />
            ))}
          </div>

          {data.totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                disabled={data.first}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="btn btn-outline disabled:opacity-40"
              >
                ← Prev
              </button>
              <span className="font-bold text-ink-700">
                Page {data.number + 1} / {data.totalPages}
              </span>
              <button
                disabled={data.last}
                onClick={() => setPage((p) => p + 1)}
                className="btn btn-outline disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
