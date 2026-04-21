# UI-014 — Schedules and subtasks — owner CRUD

| Field | Value |
|-------|--------|
| **ID** | UI-014 |
| **Status** | Not started |
| **Workflow** | §3.2–§3.3 |
| **Owner** | TBD |

## Summary

**Schedules:** **`POST /api/schedules`** with **`challengeId`** or **`subTaskId`**, **`kind`** (e.g. `DAILY`, `WEEKLY_ON_SELECTED_DAYS`), **`weekDays`** as required. **PUT/DELETE** schedules by id. **Subtasks:** **`POST /api/subtasks`**, **`PUT`/`DELETE /api/subtasks/{id}`** (owner-only). **GET** list stays **`GET /api/challenges/{id}/subtasks`** (read-only for detail).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §3.2, §3.3
- [`docs/ui/ui-description.md`](../ui-description.md) — `ScheduleKind`, subtasks

## Proposed implementation

### UX

- Owner “Manage” mode on challenge detail or dedicated **`/challenges/:id/edit`** sub-routes for subtasks/schedules.
- Forms for **subtask** title + order; **schedule** attached to challenge or subtask.

### Code

- Hooks: `useCreateSubtask`, `useUpdateSubtask`, `useDeleteSubtask`, `useScheduleMutations` in `src/features/subtasks/` or `src/features/schedules/`.

## Acceptance criteria

- [ ] Owner can add/edit/delete subtasks; non-owner gets **403** with safe UI.
- [ ] Owner can attach schedules to challenge and subtasks per DTO.
- [ ] Lists invalidate after mutations (React Query).

## Dependencies

- **UI-006** / **UI-010**; **UI-015** may overlap with edit challenge route.
