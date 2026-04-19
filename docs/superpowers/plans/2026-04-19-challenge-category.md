# Challenge category (string) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a mandatory string field `category` to challenges end-to-end in the API contract and UI: types, create form, list cards, and detail header, keeping `openapi.yaml` and `src/lib/types.ts` aligned.

**Architecture:** `category` is **required**: clients must send a non-empty string on create; the API returns it on every challenge. Extend OpenAPI with `category` in each schema’s `required` list (and `minLength: 1` on the request), mirror as `category: string` in TypeScript, enforce the field on `NewChallengePage` (HTML `required` + trim before submit), and always show it on list cards and detail. Extract the list card into a small presentational component with a Vitest test that assumes `category` is always present on `ChallengeResponse`. **The Spring backend must validate and persist `category` as non-null** on `POST/PUT /api/challenges` and always include it in responses; add a DB migration for existing rows (default or backfill) before enforcing NOT NULL.

**Tech Stack:** React 18, TypeScript, TanStack Query, Axios, OpenAPI 3 YAML, Vitest, Testing Library

---

## File map

| File | Change |
|------|--------|
| `../openapi.yaml` (repo root, sibling of `frontend/`) | Add required `category` (`minLength: 1` on request) to `ChallengeRequest` and `ChallengeResponse` |
| `src/lib/types.ts` | `category: string` on `ChallengeResponse` and `ChallengeRequest` |
| `src/features/challenges/ChallengeCard.tsx` | **Create:** presentational card; always show category pill |
| `src/pages/ChallengesListPage.tsx` | Import `ChallengeCard`; remove inline component |
| `src/features/challenges/ChallengeCard.test.tsx` | **Create:** render test for category label |
| `src/pages/NewChallengePage.tsx` | Required category field + validation; always send trimmed `category` in payload |
| `src/pages/ChallengeDetailPage.tsx` | Always show category in header (typed as `string`) |
| `src/features/challenges/useChallenges.ts` | No signature changes (types only) |

---

### Task 1: API contract and TypeScript types

**Files:**
- Modify: `openapi.yaml` (path from frontend: `../openapi.yaml` — adjust if monorepo layout differs)
- Modify: `src/lib/types.ts`

- [ ] **Step 1: Extend OpenAPI schemas**

In `ChallengeRequest.properties` add:

```yaml
        category:
          type: string
          minLength: 1
```

In `ChallengeResponse.properties` add (without `minLength` if you allow legacy reads, or use `minLength: 1` for strict symmetry):

```yaml
        category:
          type: string
```

Append `category` to **`ChallengeRequest.required`** alongside `ownerUserId` and `startDate`. Append `category` to **`ChallengeResponse.required`** (minimum set: `id`, `ownerUserId`, `title`, `startDate`, `createdAt`, `category` — match whatever your OpenAPI already marks required for responses).

- [ ] **Step 2: Mirror in `types.ts`**

In `ChallengeResponse`, add after `description?: string;`:

```ts
  category: string;
```

In `ChallengeRequest`, add after `description?: string;`:

```ts
  category: string;
```

- [ ] **Step 3: Commit**

```bash
git add openapi.yaml frontend/src/lib/types.ts
git commit -m "feat(api): add required challenge category string"
```

---

### Task 2: `ChallengeCard` component + tests

**Files:**
- Create: `src/features/challenges/ChallengeCard.tsx`
- Create: `src/features/challenges/ChallengeCard.test.tsx`
- Modify: `src/pages/ChallengesListPage.tsx`

- [ ] **Step 1: Write failing test**

Create `src/features/challenges/ChallengeCard.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChallengeCard } from "./ChallengeCard";
import type { ChallengeResponse } from "@/lib/types";

const base: ChallengeResponse = {
  id: 1,
  ownerUserId: 2,
  title: "Morning runs",
  category: "Fitness",
  startDate: "2026-01-01",
  createdAt: "2026-01-01T00:00:00Z",
};

function renderCard(c: ChallengeResponse) {
  render(
    <MemoryRouter>
      <ChallengeCard c={c} />
    </MemoryRouter>,
  );
}

describe("ChallengeCard", () => {
  it("shows category", () => {
    renderCard(base);
    expect(screen.getByText("Fitness")).toBeInTheDocument();
  });

  it("shows custom category text", () => {
    renderCard({ ...base, category: "Reading" });
    expect(screen.getByText("Reading")).toBeInTheDocument();
  });
});
```

Run: `yarn test`

Expected: **FAIL** — `ChallengeCard` not found or export missing.

- [ ] **Step 2: Implement `ChallengeCard`**

Create `src/features/challenges/ChallengeCard.tsx` — move the JSX from `ChallengesListPage` `ChallengeCard` function, and below the title (or above dates) always render:

```tsx
<span className="inline-block text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md bg-ink-100 border-2 border-ink-300 text-ink-900 mb-2">
  {c.category}
</span>
```

Use existing `Link` + `card` layout from the current list page.

- [ ] **Step 3: Wire list page**

In `ChallengesListPage.tsx`, delete the inline `ChallengeCard` function and add:

```ts
import { ChallengeCard } from "@/features/challenges/ChallengeCard";
```

- [ ] **Step 4: Run tests**

Run: `yarn test`

Expected: **PASS**

- [ ] **Step 5: Commit**

```bash
git add src/features/challenges/ChallengeCard.tsx src/features/challenges/ChallengeCard.test.tsx src/pages/ChallengesListPage.tsx
git commit -m "feat(challenges): show category on list cards"
```

---

### Task 3: New challenge form

**Files:**
- Modify: `src/pages/NewChallengePage.tsx`

- [ ] **Step 1: Add state and field**

After existing `useState` hooks, add:

```ts
const [category, setCategory] = useState("");
```

In the form, after the description block, add:

```tsx
<div>
  <label className="label" htmlFor="category">Category</label>
  <input
    id="category"
    required
    className="input"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
    placeholder="e.g. Fitness, Reading"
  />
</div>
```

- [ ] **Step 2: Include in mutation payload**

In `onSubmit`, after `e.preventDefault()`, guard with:

```ts
const cat = category.trim();
if (!cat) return;
```

Extend the object passed to `create.mutate`:

```ts
category: cat,
```

- [ ] **Step 3: Manual check**

Run `yarn dev`, confirm empty/whitespace category cannot submit, confirm JSON body includes non-empty `"category"`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/NewChallengePage.tsx
git commit -m "feat(challenges): required category on create"
```

---

### Task 4: Challenge detail header

**Files:**
- Modify: `src/pages/ChallengeDetailPage.tsx`

- [ ] **Step 1: Render category**

Inside `<header>`, after the title `h1` block (or next to the date line), always render the pill (`c.category` is `string`):

```tsx
<p className="mt-2">
  <span className="inline-block text-xs font-black uppercase tracking-wider px-2 py-1 rounded-md bg-ink-100 border-2 border-ink-300">
    {c.category}
  </span>
</p>
```

- [ ] **Step 2: Run build**

Run: `yarn build`

Expected: success.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ChallengeDetailPage.tsx
git commit -m "feat(challenges): show category on detail page"
```

---

## Backend checklist (outside this repo or follow-up)

- [ ] DB column `category` **NOT NULL** after backfill/migration for existing challenges.
- [ ] DTO validation: reject empty or missing `category` on create/update.
- [ ] `POST /api/challenges` and `PUT/PATCH` (if any) require `category`.
- [ ] Every `ChallengeResponse` includes non-null `category`.

Until the backend enforces this, the UI will send `category` but old APIs may still omit it — tighten types only when the server guarantees the field.

---

## Self-review (completed)

1. **Spec coverage:** OpenAPI + types + create + list + detail covered; hooks unchanged; no update-mutation in app today.
2. **Placeholder scan:** No TBD steps.
3. **Consistency:** `category` required in OpenAPI request + TS types; response required once the API guarantees it; UI validates non-empty before submit.

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-19-challenge-category.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — Fresh subagent per task, review between tasks.

**2. Inline execution** — Run tasks in this session with checkpoints.

**Which approach?**
