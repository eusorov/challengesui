# UI-003 — App shell — navigation and session

| Field | Value |
|-------|--------|
| **ID** | UI-003 |
| **Status** | Partial |
| **Workflow** | App shell |
| **Owner** | TBD |

## Summary

Sticky header with logo, primary nav, current user email, and logout. Product spec expects **Discover**, **My challenges**, and **Invites** (when logged in) plus auth affordances. Today only **Challenges** (to `/challenges`) is wired; naming does not yet match “Discover” vs “mine” split.

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — App shell table
- **Depends on:** **UI-011**, **UI-012** for meaningful destinations (optional: link to `/challenges` as Discover until filters land)

## Current implementation

| Item | Location |
|------|----------|
| Shell + nav + outlet | `src/components/AppShell.tsx` |
| User email | `useCurrentUser()` from `src/features/auth/useAuth.ts` |
| Logout | `useLogout()` |

## Work remaining

1. **Nav links:** Add **Discover** (public browse — likely `/challenges` or `/discover` once **UI-005** clarifies routing), **My challenges** (`/my-challenges`, **UI-011**), **Invites** (`/invites`, **UI-012**).
2. **Copy:** Align nav labels with [`docs/ui/ui-description.md`](../ui-description.md) product terms.
3. **Mobile:** Ensure drawer or compact nav if required by design (optional).

## Acceptance criteria

- [ ] Logged-in users see links to Discover, My challenges, and Invites (routes must exist or show disabled/tooltip with “coming soon” only if product allows).
- [ ] Active route styling matches current **Challenges** pattern.
- [ ] Logout remains available.

## Out of scope

- Full profile page (optional product).
