# UI-013 — Join challenge and accept invite

| Field | Value |
|-------|--------|
| **ID** | UI-013 |
| **Status** | Not started |
| **Workflow** | §2 |
| **Owner** | TBD |

## Summary

**Join:** **`POST /api/challenges/{id}/join`** (**201** first time, **200** already member). Show button when product rules allow (public + private with usable pending invite). **Accept invite:** **`PUT /api/invites/{id}`** with **`status: ACCEPTED`** (and optional decline/cancel per API). Refresh challenge/participant state after success.

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §2
- [`docs/superpowers/specs/2026-04-21-challenge-join-design.md`](../../superpowers/specs/2026-04-21-challenge-join-design.md) (if present)

## Proposed implementation

### Challenge detail

- `useJoinChallenge` mutation; show/hide Join from challenge + participant + invite state (**UI-007** helps).
- Map **403** to clear copy (private without invite, etc.).

### Invites

- Accept/Decline on **`/invites`** rows or **`/invites/:id`** (**UI-012**).

## Acceptance criteria

- [ ] Join works for allowed cases; hides when already challenge-wide participant.
- [ ] Accept invite updates UI and participant visibility.
- [ ] Error messages for 403/404 per API behavior.

## Dependencies

- **UI-006** detail page; **UI-007** optional; **UI-012** for inbox.
