# UI-002 — Router, landing gate, protected layout

| Field | Value |
|-------|--------|
| **ID** | UI-002 |
| **Status** | Done |
| **Workflow** | App shell |
| **Owner** | TBD |

## Summary

Browser router with public routes for marketing landing, login, and register; authenticated subtree wrapped in **`ProtectedRoute`** + **`AppShell`** for challenge routes. Unknown paths redirect to **`/`** (then **`LandingGate`** decides landing vs redirect when token exists).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — App shell, suggested routes

## Current implementation

| Route | Element | Notes |
|-------|---------|--------|
| `/` | `LandingGate` | Redirects to `/challenges` if token present |
| `/login` | `LoginPage` | Public |
| `/register` | `RegisterPage` | Public |
| `/challenges`, `/challenges/new`, `/challenges/:id` | `ProtectedRoute` → `AppShell` → outlet | JWT required |
| `*` | `Navigate` to `/` | |

**Files:** `src/routes/router.tsx`, `src/features/landing/LandingGate.tsx`, `src/features/auth/ProtectedRoute.tsx`

## Acceptance criteria (done)

- [x] Logged-out users can open `/`, `/login`, `/register`.
- [x] Challenge app routes require a stored token; missing token redirects to **`/login`** with **`state.from`** for return URL.
- [x] Logged-in users hitting `/` go to `/challenges`.

## Follow-ups

- Add routes for **`/my-challenges`**, **`/invites`**, **`/invites/:id`** (see **UI-011**, **UI-012**).
