# UI-017 — Reminders and push notifications (deferred)

| Field | Value |
|-------|--------|
| **ID** | UI-017 |
| **Status** | Deferred |
| **Workflow** | §6 |
| **Owner** | TBD |

## Summary

**No React implementation in v1** unless purely client-side reminders without server truth. Server-side reminders, opt-out, and “due today” widgets depend on API work tracked in backend tickets.

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §6
- When available: `docs/tickets/2026-04-21-user-reminders-opt-out.md`, `docs/tickets/2026-04-21-reminder-scheduler-push-notification.md` (paths relative to repo root)

## Acceptance criteria (deferred)

- [ ] Blocked on API: user notification preferences.
- [ ] Blocked on API: scheduler / push pipeline.
- [ ] Revisit when OpenAPI documents endpoints.

## Notes

- Do not block **UI-001**–**UI-016** on this ticket.
