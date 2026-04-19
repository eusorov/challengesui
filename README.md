# Streak frontend

React + Vite + TypeScript UI for the Streak / Challenges API.

Minimal MVP scope: authentication (login & register), challenges list, new
challenge form, and challenge detail with subtasks, check-ins, and comments.
All wired to the Spring backend described in `../openapi.yaml` and
`../ui-description.md`.

## Stack

- **Yarn** (Classic) for dependencies and scripts
- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** with Streak design tokens ported from `../streak-landing_1.html`
- **TanStack Query** for server state
- **Axios** with Bearer-token + `API-Version: 1` interceptors
- **React Router v6**
- **Zustand** (persisted) for the auth session

## Run locally

```bash
cd frontend
yarn install
yarn dev
```

Open http://localhost:5173.

The Vite dev server proxies `/api/*` to `http://localhost:8080` (see
`vite.config.ts`), so start the Spring backend first. To point at a different
host, copy `.env.example` to `.env.local` and set `VITE_API_URL`.

## Folder layout

```
src/
├── components/           # shared UI (AppShell, Logo, Spinner)
├── features/
│   ├── auth/             # authStore, useAuth hooks, ProtectedRoute
│   ├── challenges/       # challenge queries/mutations
│   ├── subtasks/
│   ├── checkins/
│   └── comments/
├── lib/                  # api client, query client, shared types
├── pages/                # Route-level screens
├── routes/router.tsx     # React Router config
├── App.tsx
├── main.tsx
└── index.css             # Tailwind entry + design-token components
```

## Auth contract

`/api/login` returns `object` in the OpenAPI spec, so `src/features/auth/useAuth.ts`
defensively looks for `token` / `accessToken` / `access_token` / `jwt` /
`id_token`, including a one-level nested `{ data: {...} }`. If your backend
returns something else, update `extractToken` in that file.

All authed requests carry `Authorization: Bearer <token>` via the Axios
interceptor in `src/lib/api.ts`. A 401 response clears the session and
bounces the user to `/login`.

## Adding the remaining screens

You'll likely want to follow the same pattern for the not-yet-built screens:

- **Invites** — `GET /api/invites` (paginated, optional `challengeId` query),
  `PUT /api/invites/{id}` to accept.
- **Participants** — `GET /api/challenges/{id}/participants` (paginated).
- **Profile / password reset** — `GET /api/user`, `POST /api/forgot-password`,
  `POST /api/reset-password`.

For each: add a hook in `src/features/<domain>/use*.ts`, a page in
`src/pages/*.tsx`, then a route in `src/routes/router.tsx`.

## Design tokens

All Streak colors and radii live in `tailwind.config.ts`. Reusable
components (buttons, cards, inputs) are defined in `src/index.css` under
`@layer components`. Tweak once, propagates everywhere.
