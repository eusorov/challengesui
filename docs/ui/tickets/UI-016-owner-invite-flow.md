# UI-016 — Owner invite — create, list sent, detail, revoke

| Field | Value |
|-------|--------|
| **ID** | UI-016 |
| **Status** | Not started |
| **Workflow** | §4 |
| **Owner** | TBD |

## Summary

**POST** **`/api/invites`** (**Bearer**, owner-only): **`inviteeEmail`**, **`challengeId`**, optional **`subTaskId`**, **`expiresAt`**. **GET** sent invites filtered by **`challengeId`** optional. **GET** **`/api/invites/{id}`** for detail. **DELETE** **`/api/invites/{id}`** if product needs revoke.

**Note:** Replace-on-resend behavior — see [`docs/tickets/2026-04-21-invite-replace-on-resend.md`](../../../tickets/2026-04-21-invite-replace-on-resend.md) if that file exists in the repo; else track in backend.

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §4

## Proposed implementation

### Challenge detail

- “Invite someone” button (owner only) → modal with form.

### Optional

- Sent list via **`GET /api/invites?role=SENT&challengeId=`**.

### Invite detail page

- Shared with invitee flow (**UI-012**); **UI-013** for accept.

## Acceptance criteria

- [ ] Owner can send invite; **404** unknown email, **403** self-invite or not owner surfaced clearly.
- [ ] Invite detail loads and links to challenge.
- [ ] Optional revoke/delete.

## Dependencies

- **UI-006**; **UI-012** for navigation.
