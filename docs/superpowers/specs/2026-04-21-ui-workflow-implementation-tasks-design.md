# UI workflow implementation tasks — design

**Date:** 2026-04-21  
**Status:** Approved (user confirmed task shape and epic/story model)

## Purpose

Define how **implementation work** for the React challenges client should be **broken into trackable tasks** so each item maps cleanly to product workflows, API usage, and existing docs—without prescribing code.

## Canonical references

| Document | Role |
|----------|------|
| [`docs/ui/ui-tasks.md`](../../ui/ui-tasks.md) | Screens, actions, HTTP mapping (§0–§7); suggested build order |
| [`docs/ui/ui-description.md`](../../ui/ui-description.md) | Product goals, visibility rules, endpoint index |
| `docs/superpowers/specs/2026-04-21-main-workflows-api-design.md` | Workflow semantics (same § numbering); add or link from backend repo if not in this workspace |

Contract detail: live **`/v3/api-docs`** and **`/swagger-ui.html`** on the API; generated **`build/openapi/openapi.yaml`** when that artifact exists in the API project.

## Task template (every story)

Use the same fields so tickets stay comparable and traceable.

| Field | Content |
|-------|---------|
| **Traceability** | Workflow § and subsection (e.g. §1.1), plus pointer to the relevant table rows in `ui-tasks.md` |
| **Title** | User-visible outcome + primary screen or route |
| **Scope** | Routes, components/surfaces, and behaviors covered |
| **APIs** | HTTP method + path; note whether **Bearer** is required |
| **UX rules** | 401 / 403 / 404 handling per `ui-description.md`; empty states; pagination where the list is paged |
| **Out of scope** | Explicit exclusions (e.g. no rollup summary UI; no server reminders until API exists) |
| **Depends on** | Other stories or epics (e.g. API client + auth before protected lists) |
| **Done when** | Short checklist: happy path plus at least one representative error or empty state |

## Grouping model (chosen approach)

- **Epic** = one workflow section **§0–§7** (plus **App shell** as its own epic before §0, and **Optional: user directory** if needed).
- **Story** = one **vertical slice**: a screen (or a coherent subset such as “Discover filters + list”) plus its API calls and error handling.
- **Ordering** across epics follows the suggested sequence in `ui-tasks.md` (API client + auth → discover/detail read paths → my challenges and invites → join/accept → owner CRUD → owner invites → check-ins → comments behind flag → reminders when API exists).

Alternative groupings (by pure user journey or by single mega-epic) were rejected for this project because they either scatter § traceability or hide dependencies.

## Epic: App shell (cross-cutting)

**Goal:** Routing, navigation, session awareness, and a single API layer that sends `API-Version: 1` and `Authorization: Bearer` when a JWT exists.

**Stories (examples):**

- API client module + shared error mapping (401 → login with return URL where applicable).
- Route skeleton matching suggested paths in `ui-tasks.md` (e.g. `/`, `/login`, `/register`, `/challenges`, `/challenges/:id`, `/my-challenges`, `/invites`, `/invites/:id`, optional `/profile`).
- Top nav or drawer: Discover, My challenges, Invites when authenticated; Log in / Register or user menu + Log out.
- Protected-route behavior for endpoints that require Bearer (e.g. `GET /api/challenges/mine`).

## Epic: §0 — Auth and current user

**Goal:** Register, log in, optional forgot/reset, email verification landing, and post-auth **`GET /api/user`** bootstrap (cache in app state).

**Stories:** One per screen (Register, Login, Forgot/Reset if in scope, Email verify) plus one story for loading and caching current user after login or on app load with token.

## Epic: §1 — View challenges

**Goal:** Discover public challenges, open detail when allowed, roster and conditional activity, subtasks, my challenges, invites lists, check-in detail.

**Stories (split §1 by screen):**

- Discover: `GET /api/categories`, `GET /api/challenges` with filters and pagination; cards link to `/challenges/:id`.
- Challenge detail (read core): `GET /api/challenges/{id}`, `GET .../participants`, `GET .../subtasks`; show `GET .../check-ins` only when API allows; hide or gate with copy when not a member.
- Check-in detail (modal or route): `GET /api/check-ins/{id}` with same read gate as list.
- My challenges: `GET /api/challenges/mine` (Bearer).
- Invites: `GET /api/invites` with RECEIVED vs SENT; row navigation to challenge and optional invite detail.

**Out of scope:** UI for internal rollup summaries (no public list endpoint; use check-ins list only per `ui-tasks.md`).

## Epic: §2 — User participates

**Goal:** Join via **`POST /api/challenges/{id}/join`**; accept or decline invites via **`PUT /api/invites/{id}`** per product rules.

**Depends on:** §1 challenge detail and invites surfaces.

**Stories:** Join CTA + error mapping; invite accept/decline from inbox or invite detail.

## Epic: §3 — Create and manage challenges

**Goal:** Owner creates challenge and schedules; manages subtasks and schedules; edits or deletes challenge; optional cover image.

**Stories:** Create challenge + `POST /api/challenges` (with `ownerUserId` from current user); add schedules (`POST /api/schedules`); subtasks CRUD and schedule attach; edit/delete challenge; optional image upload (`POST /api/challenges/{id}/image`).

## Epic: §4 — Invites (owner creates)

**Goal:** Owner invites registered user by email; optional sent list; invite detail and optional revoke/delete.

**Stories:** Invite modal + `POST /api/invites`; optional `GET` sent filtered by challenge; `GET /api/invites/{id}`; `DELETE /api/invites/{id}` if in product scope. Document duplicate/resend behavior against [`docs/tickets/2026-04-21-invite-replace-on-resend.md`](../../tickets/2026-04-21-invite-replace-on-resend.md) until server behavior is final.

## Epic: §5 — Participant check-ins (write)

**Goal:** Members log check-ins; authors edit/delete only their own rows.

**Stories:** Log check-in from challenge context (`POST /api/check-ins`); edit/delete on check-in detail (`PUT` / `DELETE /api/check-ins/{id}`). Owner cannot edit others’ check-ins (**403**).

**Depends on:** Participant/membership understanding from §1–§2.

## Epic: §6 — Reminders (push)

**Goal (future):** Notifications and opt-out per product; **no React v1 implementation** unless purely client-side without server truth.

**Stories:** Placeholder or spike only; link [`docs/tickets/2026-04-21-user-reminders-opt-out.md`](../../tickets/2026-04-21-user-reminders-opt-out.md) and reminder scheduler ticket. No committed UI until API exists.

## Epic: §7 — Comments / group chat

**Goal:** List and post comments; optional edit/delete per exposed API.

**Stories:** Thread list + post; optional single-comment view. **Feature flag** recommended until tickets in `docs/tickets/` for participant-only access and author-only edit/delete are resolved (see `ui-tasks.md` ticket list).

## Epic (optional): User directory

**Goal:** Only if the product needs user picking by id; otherwise prefer invite-by-email.

**Stories:** Paginated `GET /api/users` with auth requirements verified in OpenAPI.

## Default implementation order (dependency order)

1. App shell + §0  
2. §1 Discover + challenge detail read path + participants + subtasks  
3. §1 My challenges + Invites lists  
4. §2  
5. §3  
6. §4  
7. §1 check-ins read (member) + §5 write  
8. §7 behind feature flag  
9. §6 when API exists  

This matches [`docs/ui/ui-tasks.md`](../../ui/ui-tasks.md) “Suggested implementation order.”

## Scope boundaries

- Tasks describe **what to build and verify**, not component library choices.
- **§6** and partial **§7** API alignment are explicitly constrained so work does not over-commit to unfinished server behavior.

## Spec self-review

- [x] No placeholder sections; future work is explicitly scoped (§6, §7 tickets).
- [x] Consistent with § numbering across `ui-tasks.md` and main workflows spec.
- [x] Single coherent scope: task breakdown and ordering only.
