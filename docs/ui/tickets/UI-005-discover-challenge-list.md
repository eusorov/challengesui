# UI-005 — Discover — public challenge list and filters

| Field | Value |
|-------|--------|
| **ID** | UI-005 |
| **Status** | Partial |
| **Workflow** | §1.1 |
| **Owner** | TBD |

## Summary

**Public catalog** of non-private challenges: **`GET /api/challenges`** with pagination and optional **`q`**, **`category`**, **`city`**. Category options from **`GET /api/categories`**. Cards link to **`/challenges/:id`**.

**Gap:** `ChallengesListPage` currently calls **`GET /api/challenges`** without filter params and uses copy implying “your” challenges. **`GET /api/challenges/mine`** is **UI-011**, not this ticket.

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §1.1 Discover
- [`docs/ui/ui-description.md`](../ui-description.md) — `GET /api/challenges` semantics

## Current implementation

| Item | Location |
|------|----------|
| Paginated list | `src/pages/ChallengesListPage.tsx` |
| Hook | `useChallenges` in `src/features/challenges/useChallenges.ts` |

## Work remaining

1. **Filters:** Text search **`q`**, **`category`** (dropdown or chips from `useCategories`), **`city`** field; debounce or Apply button.
2. **Routing:** Decide whether **`/challenges`** is Discover-only; move “mine” to **`/my-challenges`** (**UI-011**) and fix headings (“Discover” vs “My challenges”).
3. **Empty state:** When filters return no results vs truly empty catalog.
4. **Unauthenticated access (optional):** product may allow browsing Discover without login; today list is behind **`ProtectedRoute`** — confirm with product and adjust **UI-002** if Discover should be public.

## Acceptance criteria

- [ ] `GET /api/challenges` sends **`page`**, **`size`**, and optional **`q`**, **`category`**, **`city`** when user sets filters.
- [ ] Category filter options from **`GET /api/categories`**.
- [ ] Pagination works with filters.
- [ ] Page title and copy match **public Discover** behavior; no confusion with **mine** list.

## Dependencies

- **UI-006** for detail links (already).
- **UI-011** for owned list.
