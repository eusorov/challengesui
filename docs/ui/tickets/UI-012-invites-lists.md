# UI-012 — Invites — received and sent lists

| Field | Value |
|-------|--------|
| **ID** | UI-012 |
| **Status** | Not started |
| **Workflow** | §1.3 |
| **Owner** | TBD |

## Summary

**GET /api/invites** with **`role=RECEIVED`** (default) or **`role=SENT`**, optional **`challengeId`**, pagination. Rows link to **`/challenges/:id`** when openable and to **`/invites/:id`** for invite detail (**UI-016** / **UI-013** actions).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §1.3
- [`docs/ui/ui-description.md`](../ui-description.md) — Invites

## Proposed implementation

### Routes

- **`/invites`** with tabs or sub-routes Inbox / Sent.
- **`/invites/:id`** for detail (shared with **UI-016**).

### API

- Hook `useInvites({ role, challengeId, page, size })`.

### UI

- Table or card list: status, challenge title (from embedded DTO or fetch), inviter/invitee, dates.
- Empty states per tab.

## Acceptance criteria

- [ ] Toggle RECEIVED vs SENT; query refetches.
- [ ] Pagination.
- [ ] Navigation to challenge and invite detail.
- [ ] Handles **401** (redirect to login via **UI-001**).

## Dependencies

- **UI-002**, **UI-003** nav.
