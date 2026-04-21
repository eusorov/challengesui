# UI-018 — Marketing landing (logged-out home)

| Field | Value |
|-------|--------|
| **ID** | UI-018 |
| **Status** | Done |
| **Workflow** | — (marketing) |
| **Owner** | TBD |

## Summary

Public landing at **`/`** when no JWT: hero, categories, social proof sections, CTA to register/login. **`LandingGate`** redirects authenticated users to **`/challenges`**.

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — App shell, routes

## Current implementation

| Item | Location |
|------|----------|
| Page | `src/pages/LandingPage.tsx` |
| Sections | `src/features/landing/*` (Hero, Nav, Categories, How it works, etc.) |
| Gate | `src/features/landing/LandingGate.tsx` |

## Acceptance criteria (done)

- [x] Logged-out users see marketing content.
- [x] Logged-in users skip landing to app shell.
- [x] Links to login/register work.

## Out of scope

- SEO meta and OG tags (optional follow-up).
