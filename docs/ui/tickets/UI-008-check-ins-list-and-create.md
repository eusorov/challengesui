# UI-008 — Check-ins — list, create, edit/delete, detail

| Field | Value |
|-------|--------|
| **ID** | UI-008 |
| **Status** | Partial |
| **Workflow** | §1.5, §5 |
| **Owner** | TBD |

## Summary

Members with read access see **`GET /api/challenges/{challengeId}/check-ins`** (Bearer). **POST** new check-ins via **`POST /api/check-ins`** with **`userId`** = current user. **Authors** may **PUT** / **DELETE** their own rows; **GET** single **`GET /api/check-ins/{id}`** for detail view. **Challenge owner** cannot edit another user’s check-in (**403**).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §1.5, §5
- [`docs/ui/ui-description.md`](../ui-description.md) — check-in visibility (pending invite does **not** grant read)

## Current implementation

| Item | Location |
|------|----------|
| List + pagination hook | `src/features/checkins/useCheckIns.ts` |
| Tab UI + quick “Check in today” | `src/pages/ChallengeDetailPage.tsx` |

## Work remaining

1. **Edit / delete** — `PUT` / `DELETE /api/check-ins/{id}` for own rows only; confirm author via `userId` vs `me`.
2. **Detail** — modal or `/check-ins/:id` with **`GET /api/check-ins/{id}`**; link from list rows.
3. **Form:** Optional note fields, **`subTaskId`** per DTO; date picker vs “today” only.
4. **Gate:** Hide or disable check-in UI when API returns 404 for list (not a participant).
5. **403** messaging when owner tries to edit someone else’s check-in.

## Acceptance criteria

- [x] List check-ins when API allows.
- [x] Create check-in for current user (minimal fields).
- [ ] Edit/delete own check-in; **not** others’.
- [ ] Detail view for one check-in.
- [ ] Errors mapped for 403/404.

## Dependencies

- **UI-007** (optional) for participant awareness.
