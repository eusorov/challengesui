# UI-009 — Comments — thread list and post

| Field | Value |
|-------|--------|
| **ID** | UI-009 |
| **Status** | Partial |
| **Workflow** | §7 |
| **Owner** | TBD |

## Summary

**GET** paginated **`GET /api/challenges/{challengeId}/comments`** with optional **`subTaskId`**. **POST** **`POST /api/challenges/{challengeId}/comments`** with **`body`**, **`userId`** = current user, optional **`subTaskId`** per OpenAPI. **§7** server rules are only **partially** aligned — verify tickets before strict UX.

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §7 and ticket links
- `docs/tickets/*comments*` (if present in repo)

## Current implementation

| Item | Location |
|------|----------|
| List + pagination | `src/features/comments/useComments.ts` |
| Create (body only) | **Gap:** `userId` may be required — confirm OpenAPI and backend |
| Tab UI | `src/pages/ChallengeDetailPage.tsx` |

## Work remaining

1. **Request body:** Add **`userId`** from **`useCurrentUser`** if required by API.
2. **Edit/delete** — `GET /api/comments/{id}`, `PUT`, `DELETE` if product exposes single-comment view.
3. **Feature flag** — optional until participant-only access tickets close.
4. **Subtask filter** — optional dropdown for thread scope.

## Acceptance criteria

- [x] List and post comments in happy path.
- [ ] Payload matches OpenAPI (including **`userId`**).
- [ ] Error handling for unauthorized reads (per evolving API).
- [ ] Optional: feature flag documented in env/README.

## Dependencies

- **UI-006** for challenge context.
