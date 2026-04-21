# UI-004 — Auth — login, register, logout, current user

| Field | Value |
|-------|--------|
| **ID** | UI-004 |
| **Status** | Partial |
| **Workflow** | §0 |
| **Owner** | TBD |

## Summary

Users can register (form-urlencoded), log in (JSON), log out, and load **`GET /api/user`** when a token exists. Token is persisted (Zustand persist). Login navigates to **`state.from`** or **`/challenges`**. Register navigates to login with success message.

## References

- [`docs/ui/ui-tasks.md`](../ui-tasks.md) — §0
- [`docs/ui/ui-description.md`](../ui-description.md) — Auth endpoints

## Current implementation

| Feature | Location |
|---------|----------|
| Login | `src/pages/LoginPage.tsx`, `useLogin` in `src/features/auth/useAuth.ts` |
| Register | `src/pages/RegisterPage.tsx`, `useRegister` |
| Token extraction | `extractToken` in `useAuth.ts` |
| `GET /api/user` | `useCurrentUser` |
| Logout | `useLogout` |
| Store | `src/features/auth/authStore.ts` |

## Work remaining

1. **Forgot password** — `POST /api/forgot-password` (form); page + copy per API (no email enumeration promises unless documented).
2. **Reset password** — `POST /api/reset-password`; route from email link params per OpenAPI.
3. **Email verification landing** — `GET /api/email/verify/{id}/{hash}` as full navigation or fetch; success/failure UI.
4. **Optional:** `POST /api/email/verification-notification` for resend.
5. After login, **invalidate** and refetch **`["me"]`** (already partially done); ensure **`ownerUserId`** / **`userId`** consumers wait for `useCurrentUser` success where needed.

## Acceptance criteria

- [x] Login stores JWT and loads user.
- [x] Register submits form fields expected by backend.
- [x] Logout clears client session and query cache.
- [ ] Forgot / reset / verify flows **or** explicit “not in v1” callout in product doc.

## Testing notes

- Cover happy path and invalid credentials; 401 on protected `GET /api/user` should align with **UI-001** behavior.
