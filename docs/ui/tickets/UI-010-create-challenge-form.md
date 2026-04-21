# UI-010 — Create challenge — form and categories

| Field | Value |
|-------|--------|
| **ID** | UI-010 |
| **Status** | Partial |
| **Workflow** | §3.1 |
| **Owner** | TBD |

## Summary

**POST /api/challenges** with **`ownerUserId`** from **`GET /api/user`**, category from **`GET /api/categories`**, dates, description, **`private`** flag. After success, navigate to **challenge detail**. **Schedules** are **UI-014** (not in this ticket).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §3.1, §3.2
- [`docs/ui/ui-description.md`](../ui-description.md) — Challenge create

## Current implementation

| Item | Location |
|------|----------|
| Form + validation | `src/pages/NewChallengePage.tsx` |
| Create mutation | `useCreateChallenge` in `src/features/challenges/useChallenges.ts` |
| Categories | `useCategories` in `src/features/challenges/useCategories.ts` |

## Work remaining

1. **Schedules** — after create, **`POST /api/schedules`** with **`challengeId`** or multi-step wizard (**UI-014**).
2. **Validation** — `startDate` / `endDate` vs OpenAPI constraints.
3. **Private** help text already present; ensure Discover exclusion is communicated.

## Acceptance criteria

- [x] Create challenge with required fields; redirect to detail.
- [x] Category dropdown populated from API.
- [ ] Optional: inline schedule creation in same flow or follow-up screen.

## Dependencies

- **UI-004** for `ownerUserId`.
