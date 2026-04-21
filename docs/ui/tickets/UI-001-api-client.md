# UI-001 — API client, headers, and 401 handling

| Field | Value |
|-------|--------|
| **ID** | UI-001 |
| **Status** | Done |
| **Workflow** | App shell |
| **Owner** | TBD |

## Summary

Central Axios instance for all backend calls: sends **`API-Version: 1`**, attaches **`Authorization: Bearer`** when a JWT exists, provides **`postForm`** for form-urlencoded endpoints, **`apiError`** for user-facing messages, and logs the user out on **401** with redirect to **`/login`** (when not already there).

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — “How to use this with the API”
- [`docs/ui/ui-description.md`](../ui-description.md) — headers and auth expectations

## Current implementation

| Item | Location |
|------|----------|
| Axios `create`, default headers | `src/lib/api.ts` |
| Request interceptor (Bearer) | `src/lib/api.ts` |
| Response interceptor (401) | `src/lib/api.ts` |
| `postForm`, `apiError` | `src/lib/api.ts` |
| Token store read | `src/features/auth/authStore.ts` (via `getState`) |

## Acceptance criteria (done)

- [x] Every request includes **`API-Version: 1`**.
- [x] JWT from auth store is sent as **`Authorization: Bearer`** when present.
- [x] **401** clears session and navigates to login for non-login flows.
- [x] Form helpers can be used for register/login-style endpoints.

## Out of scope

- Refresh token rotation (not documented by API).
- Per-request cancellation policies beyond Axios defaults.
