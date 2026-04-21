# UI-007 — Participants roster

| Field | Value |
|-------|--------|
| **ID** | UI-007 |
| **Status** | Not started |
| **Workflow** | §1.4 |
| **Owner** | TBD |

## Summary

On challenge detail, show **paginated participants** via **`GET /api/challenges/{challengeId}/participants`**. Visibility matches **`GET /api/challenges/{id}`** (including private rules). Use for roster display and to help **UI-008** / **UI-013** (whether user is already a participant).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — Challenge detail participants
- [`docs/ui/ui-description.md`](../ui-description.md) — Participants endpoint

## Proposed implementation

### API

- `GET /api/challenges/{challengeId}/participants` with `page`, `size` (Spring `Pageable`).

### UI

- Section on **Overview** (or dedicated tab) on `ChallengeDetailPage`: list users (and scope if subtask participants — per API DTO).
- Loading/empty states; pagination controls.

### Code

- New hook e.g. `src/features/participants/useParticipants.ts`.
- Render in `pages/ChallengeDetailPage.tsx` or subcomponents.

## Acceptance criteria

- [ ] Roster loads when API allows; hidden or empty when not.
- [ ] Pagination works.
- [ ] Does not break when user is logged out but challenge is public (per API rules).

## Dependencies

- **UI-006** for detail shell.
