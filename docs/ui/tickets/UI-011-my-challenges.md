# UI-011 — My challenges — owned list

| Field | Value |
|-------|--------|
| **ID** | UI-011 |
| **Status** | Not started |
| **Workflow** | §1.2 |
| **Owner** | TBD |

## Summary

Authenticated owners see **all** challenges they created (public and private) via **`GET /api/challenges/mine`** (Bearer; **401** without JWT). Paginated cards linking to **`/challenges/:id`**. Distinct from **Discover** (**UI-005** / **`GET /api/challenges`** public catalog).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §1.2
- [`docs/ui/ui-description.md`](../ui-description.md) — `GET /api/challenges/mine`

## Proposed implementation

### Route

- e.g. **`/my-challenges`** behind **`ProtectedRoute`**.

### API

- New hook `useMyChallenges(page, size)` → `GET /api/challenges/mine`.

### UI

- Reuse card layout from `ChallengesListPage` or extract shared **`ChallengeCard`**; heading “My challenges”.

## Acceptance criteria

- [ ] List loads only when authenticated.
- [ ] Pagination matches Spring `Page` shape used elsewhere.
- [ ] Cards link to challenge detail.
- [ ] Empty state for new users with no owned challenges.

## Dependencies

- **UI-002** router entry.
- **UI-003** nav link “My challenges”.
