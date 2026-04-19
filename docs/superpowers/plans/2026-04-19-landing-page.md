# Streak marketing landing page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a public `/` route that recreates the visual design and sections from `docs/streak-landing_1.html` inside the Vite + React app, using existing Streak Tailwind tokens where possible, without wrapping the page in `AppShell` or `ProtectedRoute`.

**Architecture:** Split the page into small presentational components under `src/features/landing/` plus a thin `LandingPage` composer. Port landing-specific CSS from the HTML demo into `src/features/landing/landing.css` (layout, hero, phone mockup, grids, footer) while reusing global `.btn` / `.eyebrow` from `src/index.css` and extending that file only for missing button variants (`btn-xl`, `btn-nav`, `btn-white`). Replace demo `<a href="#">` with `react-router-dom` `Link` where appropriate (`/login`, `/register`, in-app hash anchors for same-page sections). Restructure `createBrowserRouter` so `/` is public and authenticated app routes use a pathless `ProtectedRoute` + `AppShell` layout (unchanged URL paths `/challenges`, etc.). Add Vitest + Testing Library for one focused render test on the hero headline.

**Tech Stack:** React 18, Vite 5, TypeScript, Tailwind 3, React Router 6, Vitest, @testing-library/react, @testing-library/jest-dom

---

## File map

| File | Responsibility |
|------|----------------|
| `package.json` | Add `test` script; devDependencies: `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` |
| `vite.config.ts` | `test: { globals: true, environment: "jsdom", setupFiles: "src/test/setup.ts" }` and merge with existing `defineConfig` |
| `src/test/setup.ts` | `import "@testing-library/jest-dom/vitest"` |
| `src/index.css` | Add `.btn-xl`, `.btn-nav`, `.btn-white` in `@layer components` (match demo padding/border weights) |
| `src/features/landing/landing.css` | All section/layout rules from the demo `<style>` block **except** `.btn` / `.btn-primary` / `.btn-secondary` / `.btn-outline` / `.btn-gold` / `.btn-lg` / `.eyebrow` / `.container` if you prefer Tailwind `max-w-[1200px] mx-auto px-6` in JSX — **minimum** is everything from `nav.topnav` through `footer` and hero/phone/challenge/category/step/friends/footer rules |
| `src/features/landing/demoData.ts` | Exported typed arrays: `LANDING_CHALLENGE_TILES`, `LANDING_CATEGORIES` (shape: emoji, title, description, host*, pills*, people*, etc.) |
| `src/features/landing/LandingNav.tsx` | Sticky nav: hash links + `Link` to `/login`, `/register`, brand link to `/` |
| `src/features/landing/LandingHero.tsx` | Badge, h1 with highlighted phrase, lede, CTAs, meta avatars, phone mockup + float badges |
| `src/features/landing/LandingBerlinSection.tsx` | City chip, grid mapped from `demoData` |
| `src/features/landing/LandingBigJoin.tsx` | Green CTA card; buttons → `/register` and `#berlin` |
| `src/features/landing/LandingCategories.tsx` | Category grid from `demoData` |
| `src/features/landing/LandingHowItWorks.tsx` | Three steps |
| `src/features/landing/LandingFriends.tsx` | Chat mockup + checklist + CTA |
| `src/features/landing/LandingFooter.tsx` | Footer grid + legal row; use `#` for placeholder external links still in demo |
| `src/pages/LandingPage.tsx` | Imports `./features/landing/landing.css`, composes sections in order matching `streak-landing_1.html` |
| `src/pages/LandingPage.test.tsx` | Render test for hero copy |
| `src/routes/router.tsx` | Public `/` → `LandingPage`; pathless protected layout for `challenges` routes |
| `src/components/Logo.tsx` | Change mark emoji from `🔥` to `🦉` to match the demo and keep brand consistent |
| `index.html` | `<title>Streak — find your people, build your habits</title>` (match demo) |

---

### Task 1: Vitest and Testing Library bootstrap

**Files:**

- Modify: `package.json`
- Modify: `vite.config.ts`
- Create: `src/test/setup.ts`

- [ ] **Step 1: Add devDependencies**

Run:

```bash
cd /Users/evgenyusorov/workspace/js/challengesui/frontend
yarn add -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: Add test script**

In `package.json`, inside `"scripts"`, add:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: Create setup file**

Create `src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 4: Extend Vite config**

Replace the contents of `vite.config.ts` with:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
```

- [ ] **Step 5: Run tests (baseline)**

Run: `yarn test`

Expected: `No test files found` or exit 0 with 0 tests (depending on Vitest version) — **no failures**.

- [ ] **Step 6: Commit**

```bash
git add package.json yarn.lock vite.config.ts src/test/setup.ts
git commit -m "chore: add Vitest and Testing Library for landing page tests"
```

---

### Task 2: Failing test for landing hero copy

**Files:**

- Create: `src/pages/LandingPage.test.tsx`
- Create: `src/pages/LandingPage.tsx` (stub only so import resolves)

- [ ] **Step 1: Stub `LandingPage`**

Create `src/pages/LandingPage.tsx`:

```tsx
export default function LandingPage() {
  return <div />;
}
```

- [ ] **Step 2: Write failing test**

Create `src/pages/LandingPage.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LandingPage from "./LandingPage";

describe("LandingPage", () => {
  it("renders the hero headline from the Streak demo", () => {
    render(<LandingPage />);
    expect(
      screen.getByRole("heading", {
        name: /build habits with real people near you/i,
      }),
    ).toBeInTheDocument();
  });
});
```

- [ ] **Step 3: Run test — expect FAIL**

Run: `yarn test`

Expected: FAIL — Unable to find role `heading` (or no accessible name match).

- [ ] **Step 4: Commit the red test**

```bash
git add src/pages/LandingPage.tsx src/pages/LandingPage.test.tsx
git commit -m "test: expect landing hero headline"
```

---

### Task 3: Hero section + pass test

**Files:**

- Create: `src/features/landing/landing.css` (minimal slice for this task: `nav.topnav` through hero + `.container`, `.logo`, `.logo-mark`, `.nav-links`, `.nav-cta`, `.hero` … through `.float-badge` rules from the demo — copy verbatim from `docs/streak-landing_1.html` lines 140–400)
- Create: `src/features/landing/LandingNav.tsx`
- Create: `src/features/landing/LandingHero.tsx`
- Modify: `src/pages/LandingPage.tsx`
- Modify: `src/index.css` (add button variants)

- [ ] **Step 1: Extend global buttons**

Append inside `@layer components` in `src/index.css` (after `.btn-lg` block):

```css
  .btn-xl {
    @apply py-[22px] px-10 text-lg border-b-[6px];
  }
  .btn-nav {
    @apply py-2.5 px-4 text-xs border-b-4;
  }
  .btn-white {
    @apply bg-paper text-green-700 border-ink-300 hover:brightness-100;
  }
```

- [ ] **Step 2: Add `landing.css` hero + nav**

Create `src/features/landing/landing.css` by copying from `docs/streak-landing_1.html` the CSS rules for: `nav.topnav`, `.nav-inner`, `.logo`, `.logo-mark`, `.nav-links`, `.nav-cta`, `.btn-nav` (if not fully covered by Tailwind — prefer deleting duplicate `.btn-nav` from CSS file if using Tailwind component), `.hero` through `.float-badge` (lines 140–400 in the demo file). Keep using `var(--green-500)` style variables: at the top of `landing.css`, include the same `:root { ... }` custom property block as lines 9–66 of the demo so the file is self-contained.

- [ ] **Step 3: `LandingNav`**

Create `src/features/landing/LandingNav.tsx`:

```tsx
import { Link } from "react-router-dom";

export function LandingNav() {
  return (
    <nav className="topnav">
      <div className="nav-inner">
        <Link className="logo" to="/">
          <span className="logo-mark">🦉</span>
          Streak
        </Link>
        <div className="nav-links">
          <a href="#berlin">Challenges</a>
          <a href="#categories">Categories</a>
          <a href="#how">How it works</a>
          <a href="#friends">Community</a>
        </div>
        <div className="nav-cta">
          <Link className="btn btn-outline btn-nav" to="/login">
            Log in
          </Link>
          <Link className="btn btn-primary btn-nav" to="/register">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: `LandingHero`**

Create `src/features/landing/LandingHero.tsx`:

```tsx
import { Link } from "react-router-dom";

export function LandingHero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div>
          <div className="hero-badge">🔥 12,000+ streaks running</div>
          <h1>
            Build habits with <em>real people</em> near you.
          </h1>
          <p className="lede">
            Start a challenge, invite your friends, and check in daily. The ones
            who show up together, stick together.
          </p>
          <div className="hero-cta">
            <Link className="btn btn-primary btn-xl" to="/register">
              Join for free
            </Link>
            <a className="btn btn-outline btn-xl" href="#how">
              See how it works
            </a>
          </div>
          <div className="hero-meta">
            <div className="avatars">
              <div className="av av-g">SM</div>
              <div className="av av-r">JK</div>
              <div className="av av-b">AL</div>
              <div className="av av-gd">TR</div>
              <div className="av av-p">+</div>
            </div>
            <span>Loved by habit-builders in 40+ cities</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="float-badge fb-1">
            <span className="emoji">🔥</span> 12 day streak!
          </div>
          <div className="float-badge fb-2">
            <span className="emoji">🎉</span> Jamie checked in
          </div>
          <div className="float-badge fb-3">
            <span className="emoji">💪</span> +30 XP
          </div>

          <div className="phone">
            <div className="phone-screen">
              <div className="phone-streak">
                <div>
                  <div className="big">12</div>
                  <div className="lbl">Day streak</div>
                </div>
                <div className="flame">🔥</div>
              </div>
              <div className="phone-card">
                <div className="icon g">🏃</div>
                <div className="body">
                  <div className="title">Morning run club</div>
                  <div className="bar">
                    <div className="bar-fill bf-g" style={{ width: "70%" }} />
                  </div>
                </div>
              </div>
              <div className="phone-card">
                <div className="icon r">📚</div>
                <div className="body">
                  <div className="title">Read 20 pages</div>
                  <div className="bar">
                    <div className="bar-fill bf-r" style={{ width: "50%" }} />
                  </div>
                </div>
              </div>
              <div className="phone-card">
                <div className="icon b">💧</div>
                <div className="body">
                  <div className="title">8 glasses of water</div>
                  <div className="bar">
                    <div className="bar-fill bf-b" style={{ width: "90%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Compose `LandingPage`**

Replace `src/pages/LandingPage.tsx` with:

```tsx
import { LandingHero } from "@/features/landing/LandingHero";
import { LandingNav } from "@/features/landing/LandingNav";
import "@/features/landing/landing.css";

export default function LandingPage() {
  return (
    <>
      <LandingNav />
      <LandingHero />
    </>
  );
}
```

- [ ] **Step 6: Run tests**

Run: `yarn test`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/index.css src/features/landing/landing.css src/features/landing/LandingNav.tsx src/features/landing/LandingHero.tsx src/pages/LandingPage.tsx
git commit -m "feat(landing): add nav and hero matching streak demo"
```

---

### Task 4: Router — public landing and pathless protected layout

**Files:**

- Modify: `src/routes/router.tsx`
- Modify: `src/components/Logo.tsx`
- Modify: `index.html`

- [ ] **Step 1: Update `Logo` mark**

In `src/components/Logo.tsx`, change the inner span content from `🔥` to `🦉`.

- [ ] **Step 2: Replace router**

Replace `src/routes/router.tsx` with:

```tsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/features/auth/ProtectedRoute";
import { AppShell } from "@/components/AppShell";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ChallengesListPage from "@/pages/ChallengesListPage";
import ChallengeDetailPage from "@/pages/ChallengeDetailPage";
import NewChallengePage from "@/pages/NewChallengePage";
import LandingPage from "@/pages/LandingPage";

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      { path: "challenges", element: <ChallengesListPage /> },
      { path: "challenges/new", element: <NewChallengePage /> },
      { path: "challenges/:id", element: <ChallengeDetailPage /> },
    ],
  },
  { path: "*", element: <Navigate to="/" replace /> },
]);
```

- [ ] **Step 3: Update document title**

In `index.html`, set:

```html
<title>Streak — find your people, build your habits</title>
```

- [ ] **Step 4: Manual smoke**

Run: `yarn dev`

Open http://localhost:5173/ — expect landing hero. Open http://localhost:5173/challenges while logged out — expect redirect to `/login`. Log in — expect `/challenges` list inside `AppShell`.

- [ ] **Step 5: Run tests**

Run: `yarn test`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/routes/router.tsx src/components/Logo.tsx index.html
git commit -m "feat: serve marketing landing at / and keep challenges behind auth"
```

---

### Task 5: Berlin challenges grid + demo data

**Files:**

- Create: `src/features/landing/demoData.ts`
- Create: `src/features/landing/LandingBerlinSection.tsx`
- Modify: `src/features/landing/landing.css` (append `.berlin-head` through `.berlin-more` and `.ch-tile` rules — demo lines 413–593)
- Modify: `src/pages/LandingPage.tsx`

- [ ] **Step 1: Add types and data**

Create `src/features/landing/demoData.ts`:

```ts
export type LandingChallengeTile = {
  icon: string;
  iconClass: string;
  hostInitials: string;
  hostAvatarClass: string;
  hostLabel: string;
  title: string;
  description: string;
  pills: { label: string; className: string }[];
  people: { initials: string; avClass: string }[];
  joinedLabel: string;
};

export const LANDING_CHALLENGE_TILES: LandingChallengeTile[] = [
  {
    icon: "🏃",
    iconClass: "ti-g",
    hostInitials: "MK",
    hostAvatarClass: "av-g",
    hostLabel: "By Maya",
    title: "Tiergarten morning runs",
    description:
      "Easy 5k around the park every Mon/Wed/Fri at 7am. All paces welcome, we stick together.",
    pills: [
      { label: "Mon · Wed · Fri", className: "pill-green" },
      { label: "Mitte", className: "pill-red" },
    ],
    people: [
      { initials: "MK", avClass: "av-g" },
      { initials: "JP", avClass: "av-r" },
      { initials: "LS", avClass: "av-b" },
      { initials: "+5", avClass: "av-gd" },
    ],
    joinedLabel: "8 joined",
  },
  {
    icon: "🍳",
    iconClass: "ti-r",
    hostInitials: "DS",
    hostAvatarClass: "av-r",
    hostLabel: "By David",
    title: "30 days no takeout",
    description:
      "Cook every meal at home for a month. Share recipes in the group chat, nobody starves alone.",
    pills: [
      { label: "Daily", className: "pill-red" },
      { label: "30 days", className: "pill-gold" },
    ],
    people: [
      { initials: "DS", avClass: "av-r" },
      { initials: "NK", avClass: "av-g" },
      { initials: "+3", avClass: "av-p" },
    ],
    joinedLabel: "5 joined",
  },
  {
    icon: "🇩🇪",
    iconClass: "ti-b",
    hostInitials: "SR",
    hostAvatarClass: "av-b",
    hostLabel: "By Sofia",
    title: "Daily Deutsch — 15 min",
    description:
      "Practice German 15 minutes a day. Share what you learned, help each other with tricky grammar.",
    pills: [
      { label: "Daily", className: "pill-blue" },
      { label: "Beginner", className: "pill-purple" },
    ],
    people: [
      { initials: "SR", avClass: "av-b" },
      { initials: "TH", avClass: "av-gd" },
      { initials: "MO", avClass: "av-g" },
      { initials: "+9", avClass: "av-r" },
    ],
    joinedLabel: "12 joined",
  },
  {
    icon: "🧘",
    iconClass: "ti-p",
    hostInitials: "EK",
    hostAvatarClass: "av-p",
    hostLabel: "By Elena",
    title: "Yoga in Kreuzberg",
    description:
      "Meet in Görlitzer Park on sunny mornings. Bring your mat, we'll bring the good vibes.",
    pills: [
      { label: "Tue · Thu · Sat", className: "pill-purple" },
      { label: "Kreuzberg", className: "pill-red" },
    ],
    people: [
      { initials: "EK", avClass: "av-p" },
      { initials: "LR", avClass: "av-b" },
      { initials: "+4", avClass: "av-g" },
    ],
    joinedLabel: "6 joined",
  },
  {
    icon: "📚",
    iconClass: "ti-gd",
    hostInitials: "PB",
    hostAvatarClass: "av-gd",
    hostLabel: "By Paul",
    title: "Read 20 pages a day",
    description:
      "Any book, any genre. Post a photo or a sentence about what you read. Finish books, not excuses.",
    pills: [
      { label: "Daily", className: "pill-gold" },
      { label: "60 days", className: "pill-green" },
    ],
    people: [
      { initials: "PB", avClass: "av-gd" },
      { initials: "AS", avClass: "av-r" },
      { initials: "KM", avClass: "av-b" },
      { initials: "+15", avClass: "av-p" },
    ],
    joinedLabel: "18 joined",
  },
  {
    icon: "🚴",
    iconClass: "ti-o",
    hostInitials: "FW",
    hostAvatarClass: "av-r",
    hostLabel: "By Felix",
    title: "Bike to work — April",
    description:
      "Ditch the U-Bahn for a month. Cheer each other on through rainy days and sore legs.",
    pills: [
      { label: "Weekdays", className: "pill-green" },
      { label: "Prenzlauer Berg", className: "pill-blue" },
    ],
    people: [
      { initials: "FW", avClass: "av-r" },
      { initials: "HB", avClass: "av-g" },
      { initials: "+2", avClass: "av-gd" },
    ],
    joinedLabel: "4 joined",
  },
];
```

- [ ] **Step 2: Add test for Berlin section heading**

Append to `src/pages/LandingPage.test.tsx`:

```tsx
  it("renders Berlin challenges section title", () => {
    render(<LandingPage />);
    expect(
      screen.getByRole("heading", { name: /challenges near you/i }),
    ).toBeInTheDocument();
  });
```

Run: `yarn test` — expect FAIL until section is mounted.

- [ ] **Step 3: Implement `LandingBerlinSection`**

Create `src/features/landing/LandingBerlinSection.tsx`:

```tsx
import { Link } from "react-router-dom";
import { LANDING_CHALLENGE_TILES } from "./demoData";

export function LandingBerlinSection() {
  return (
    <section className="bg-alt" id="berlin">
      <div className="container">
        <div className="berlin-head">
          <div>
            <div className="city-chip">
              <span className="dot" />
              Berlin
            </div>
            <h2 className="section-title">Challenges near you</h2>
            <p className="section-sub">
              Real people, real places. Jump into something happening in your
              city this week.
            </p>
          </div>
          <button type="button" className="btn btn-outline">
            Change city ↓
          </button>
        </div>

        <div className="challenge-grid">
          {LANDING_CHALLENGE_TILES.map((t) => (
            <div key={t.title} className="ch-tile">
              <div className="ch-tile-top">
                <div className={`ch-tile-icon ${t.iconClass}`}>{t.icon}</div>
                <div className="ch-tile-host">
                  <div className={`mini-av ${t.hostAvatarClass}`}>
                    {t.hostInitials}
                  </div>
                  {t.hostLabel}
                </div>
              </div>
              <h3>{t.title}</h3>
              <p className="desc">{t.description}</p>
              <div className="ch-tile-meta">
                {t.pills.map((p) => (
                  <span key={p.label} className={`pill ${p.className}`}>
                    {p.label}
                  </span>
                ))}
              </div>
              <div className="ch-tile-footer">
                <div className="ch-tile-people">
                  <div className="avatars">
                    {t.people.map((p) => (
                      <div key={p.initials} className={`a ${p.avClass}`}>
                        {p.initials}
                      </div>
                    ))}
                  </div>
                  {t.joinedLabel}
                </div>
                <Link className="ch-join" to="/register">
                  Join
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="berlin-more">
          <Link className="btn btn-outline btn-lg" to="/register">
            See all 47 challenges in Berlin →
          </Link>
        </div>
      </div>
    </section>
  );
}
```

Note: `Link` styled as a button may need `className="ch-join inline-flex ..."` — if visual mismatch, use `render` prop or wrap in `className` string that matches `.ch-join` from CSS. If React Router `Link` refuses block display, add to `landing.css`:

```css
a.ch-join { text-decoration: none; display: inline-block; }
```

- [ ] **Step 4: Extend `landing.css`**

Append rules from demo lines 402–404 (`section`, `bg-alt`, `section-head-center`), 413–593.

- [ ] **Step 5: Mount section**

In `LandingPage.tsx`, import and render `<LandingBerlinSection />` after `<LandingHero />`.

- [ ] **Step 6: Run tests**

Run: `yarn test` — expect PASS.

- [ ] **Step 7: Commit**

```bash
git add src/features/landing/demoData.ts src/features/landing/LandingBerlinSection.tsx src/features/landing/landing.css src/pages/LandingPage.tsx src/pages/LandingPage.test.tsx
git commit -m "feat(landing): add Berlin challenges grid from demo data"
```

---

### Task 6: Remaining sections — big join, categories, how it works, friends, footer

**Files:**

- Modify: `src/features/landing/demoData.ts`
- Create: `src/features/landing/LandingBigJoin.tsx`
- Create: `src/features/landing/LandingCategories.tsx`
- Create: `src/features/landing/LandingHowItWorks.tsx`
- Create: `src/features/landing/LandingFriends.tsx`
- Create: `src/features/landing/LandingFooter.tsx`
- Modify: `src/features/landing/landing.css` (append `.big-join` through footer rules — demo lines 595–1025)
- Modify: `src/pages/LandingPage.tsx`

- [ ] **Step 1: Append category data**

Add to `src/features/landing/demoData.ts`:

```ts
export type LandingCategory = {
  emoji: string;
  title: string;
  count: string;
  tileClass: string;
};

export const LANDING_CATEGORIES: LandingCategory[] = [
  { emoji: "🏃", title: "Fitness", count: "218 challenges", tileClass: "cat-g" },
  { emoji: "🍳", title: "Cooking", count: "89 challenges", tileClass: "cat-r" },
  { emoji: "📚", title: "Reading", count: "134 challenges", tileClass: "cat-b" },
  { emoji: "🧘", title: "Mindfulness", count: "76 challenges", tileClass: "cat-p" },
  { emoji: "🎨", title: "Creative", count: "92 challenges", tileClass: "cat-gd" },
  { emoji: "💰", title: "Money", count: "41 challenges", tileClass: "cat-o" },
  { emoji: "🌱", title: "Eco", count: "58 challenges", tileClass: "cat-pk" },
  { emoji: "✨", title: "Other", count: "112 challenges", tileClass: "cat-ink" },
];
```

- [ ] **Step 2: Implement section components**

Create each file with JSX transcribed from `docs/streak-landing_1.html` sections `BIG JOIN` (lines 1301–1314), `CATEGORIES` (1316–1367), `HOW IT WORKS` (1370–1400), `FRIENDSHIPS` (1402–1448), `FOOTER` (1451–1524). Replace:

- `href="#join"` CTAs → `Link to="/register"` where the demo says sign up
- `href="#berlin"` → keep as `<a href="#berlin">` for browse
- `className="ch-join"` equivalents already covered

`LandingBigJoin.tsx` core structure:

```tsx
import { Link } from "react-router-dom";

export function LandingBigJoin() {
  return (
    <section className="big-join" id="join">
      <div className="container">
        <div className="big-join-inner">
          <h2>Your first streak is one tap away.</h2>
          <p>
            Free forever. No credit card. Just show up tomorrow with someone who
            cares if you did.
          </p>
          <div className="cta-row">
            <Link className="btn btn-white btn-xl" to="/register">
              Sign up — it&apos;s free
            </Link>
            <a className="btn btn-gold btn-xl" href="#berlin">
              Browse challenges
            </a>
          </div>
          <div className="free-note">⚡ Takes 30 seconds · No app required</div>
        </div>
      </div>
    </section>
  );
}
```

`LandingCategories.tsx`: map `LANDING_CATEGORIES`. `LandingHowItWorks.tsx`, `LandingFriends.tsx`, `LandingFooter.tsx`: static markup from HTML.

- [ ] **Step 3: Append CSS**

Copy remaining blocks from demo `section.big-join` through `.footer-bottom` into `landing.css`.

- [ ] **Step 4: Compose full page**

`LandingPage.tsx` order:

```tsx
<LandingNav />
<LandingHero />
<LandingBerlinSection />
<LandingBigJoin />
<LandingCategories />
<LandingHowItWorks />
<LandingFriends />
<LandingFooter />
```

- [ ] **Step 5: Add regression test for footer**

Append to `LandingPage.test.tsx`:

```tsx
  it("renders footer brand tagline", () => {
    render(<LandingPage />);
    expect(
      screen.getByText(/build habits with real people near you/i),
    ).toBeInTheDocument();
  });
```

Run: `yarn test` — PASS.

- [ ] **Step 6: Run lint and build**

Run:

```bash
yarn lint
yarn build
```

Expected: no ESLint errors; Vite build succeeds.

- [ ] **Step 7: Commit**

```bash
git add src/features/landing/ src/pages/LandingPage.tsx src/pages/LandingPage.test.tsx
git commit -m "feat(landing): complete demo sections and footer"
```

---

### Task 7 (optional): Redirect authenticated users from `/` to `/challenges`

**Files:**

- Create: `src/pages/LandingOrAppRedirect.tsx` **or** inline wrapper in `router.tsx`

- [ ] **Step 1: Wrapper component**

Create `src/features/landing/LandingGate.tsx`:

```tsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/features/auth/authStore";
import LandingPage from "@/pages/LandingPage";

export function LandingGate() {
  const token = useAuthStore((s) => s.token);
  if (token) {
    return <Navigate to="/challenges" replace />;
  }
  return <LandingPage />;
}
```

- [ ] **Step 2: Use in router**

In `src/routes/router.tsx`, change `{ path: "/", element: <LandingPage /> }` to `{ path: "/", element: <LandingGate /> }`.

- [ ] **Step 3: Test manually**

Log in, visit `/` — expect redirect to `/challenges`. Log out, visit `/` — expect landing.

- [ ] **Step 4: Commit**

```bash
git add src/features/landing/LandingGate.tsx src/routes/router.tsx
git commit -m "feat(landing): send logged-in users to challenges from /"
```

---

## Self-review (completed)

1. **Spec coverage:** Demo sections (nav, hero, Berlin grid, big join, categories, how it works, friends, footer), Streak tokens, routing, auth separation, CTAs to login/register, document title — all mapped to tasks. Optional authed redirect covered in Task 7.
2. **Placeholder scan:** No TBD steps; demo copy is explicit; CSS pointers reference exact line ranges in `docs/streak-landing_1.html`.
3. **Type consistency:** `LandingChallengeTile` / `LandingCategory` used consistently; `ch-join` as `Link` may need the `a.ch-join` CSS one-liner for layout parity.

---

**Plan complete and saved to `docs/superpowers/plans/2026-04-19-landing-page.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — Dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

**Which approach?**
