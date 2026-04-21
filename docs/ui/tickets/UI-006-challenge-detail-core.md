# UI-006 — Challenge detail — core read + subtasks

| Field | Value |
|-------|--------|
| **ID** | UI-006 |
| **Status** | Partial |
| **Workflow** | §1.1 |
| **Owner** | TBD |

## Summary

Single challenge view: load **`GET /api/challenges/{id}`**, show metadata, description, image, privacy badge, **Overview** tab with **subtasks** from **`GET /api/challenges/{id}/subtasks`**. Handle **404** as not found or hidden (no leak of private existence for unauthorized viewers per [`docs/ui/ui-description.md`](../ui-description.md)).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — Challenge detail §1.1, §1.4, §1.5

## Current implementation

| Item | Location |
|------|----------|
| Challenge fetch | `useChallenge` in `src/features/challenges/useChallenges.ts` |
| Page + tabs shell | `src/pages/ChallengeDetailPage.tsx` |
| Subtasks | `useSubtasks` in `src/features/subtasks/useSubtasks.ts` |

## Work remaining

1. **Participants** — move to **UI-007** or add section placeholder.
2. **Join / owner actions** — **UI-013**, **UI-015**, **UI-016**.
3. **404/403 UX:** Clear messaging; avoid assuming **403** for private (often **404**).

## Acceptance criteria

- [x] Challenge loads with title, dates, category, optional description and image.
- [x] Subtasks listed in sort order on Overview tab.
- [ ] Error states for 404 and network errors are user-friendly.
- [ ] Tabs for check-ins and comments remain coherent (**UI-008**, **UI-009**).
