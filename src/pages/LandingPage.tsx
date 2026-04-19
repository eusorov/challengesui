import { Link } from "react-router-dom";

// Landing page ported from streak-landing_1.html.
// All colors, radii, and fonts come from tailwind.config.ts.
// Kept as a single file so you can see the whole page at once while iterating
// on copy — split into sub-components when it stabilises.

export default function LandingPage() {
  return (
    <div className="bg-paper text-ink-900">
      <PublicNav />
      <Hero />
      <BerlinChallenges />
      <BigJoin />
      <Categories />
      <HowItWorks />
      <Friends />
      <Footer />
    </div>
  );
}

/* ---------- NAV ---------- */
function PublicNav() {
  return (
    <nav className="sticky top-0 z-20 bg-paper border-b-2 border-ink-300">
      <div className="max-w-[1200px] mx-auto px-6 py-3 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="flex items-center gap-2.5 no-underline text-green-500 font-black text-2xl tracking-tight"
        >
          <span className="w-9 h-9 rounded-full bg-green-500 border-2 border-b-[4px] border-green-700 flex items-center justify-center text-xl">
            🦉
          </span>
          Streak
        </a>

        <div className="hidden md:flex items-center gap-7 text-ink-700 font-extrabold text-sm">
          <a href="#berlin" className="hover:text-green-600">Challenges</a>
          <a href="#categories" className="hover:text-green-600">Categories</a>
          <a href="#how" className="hover:text-green-600">How it works</a>
          <a href="#friends" className="hover:text-green-600">Community</a>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="btn btn-outline text-xs px-4 py-2.5 border-b-[4px]"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="btn btn-primary text-xs px-4 py-2.5 border-b-[4px]"
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden py-20 md:py-[80px]"
      style={{
        background:
          "radial-gradient(circle at 15% 20%, #E8F7E4 0%, transparent 40%), radial-gradient(circle at 85% 80%, #FFF4D6 0%, transparent 40%), #FFFFFF",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 items-center">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-gold-50 text-gold-800 border-2 border-gold-400 rounded-pill px-3.5 py-1.5 text-xs font-black uppercase tracking-[0.08em] mb-5">
            🔥 12,000+ streaks running
          </div>
          <h1 className="text-[42px] sm:text-5xl md:text-[64px] font-black tracking-[-0.04em] leading-[1.02] mb-5">
            Build habits with{" "}
            <span className="relative inline-block text-green-500 not-italic">
              real people
              <span className="absolute left-0 right-0 bottom-1 h-3 bg-gold-200 rounded-sm -z-[1]" />
            </span>{" "}
            near you.
          </h1>
          <p className="text-base md:text-[19px] font-medium text-ink-700 max-w-xl md:max-w-[520px] mx-auto md:mx-0 mb-8 leading-[1.5]">
            Start a challenge, invite your friends, and check in daily. The
            ones who show up together, stick together.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            <Link to="/register" className="btn btn-primary btn-lg">
              Join for free
            </Link>
            <a href="#how" className="btn btn-outline btn-lg">
              See how it works
            </a>
          </div>

          <div className="mt-7 flex items-center gap-4 justify-center md:justify-start text-[13px] font-bold text-ink-700">
            <div className="flex">
              <Avatar className="bg-green-400 text-green-900">SM</Avatar>
              <Avatar className="bg-red-100 text-red-800 -ml-2.5">JK</Avatar>
              <Avatar className="bg-blue-50 text-blue-800 -ml-2.5">AL</Avatar>
              <Avatar className="bg-gold-200 text-gold-800 -ml-2.5">TR</Avatar>
              <Avatar className="bg-purple-50 text-purple-800 -ml-2.5">+</Avatar>
            </div>
            <span>Loved by habit-builders in 40+ cities</span>
          </div>
        </div>

        <PhoneMockup />
      </div>
    </section>
  );
}

function Avatar({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "w-8 h-8 rounded-full border-[3px] border-paper shadow-[0_0_0_1.5px_theme(colors.ink.300)] flex items-center justify-center text-[11px] font-black " +
        className
      }
    >
      {children}
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center min-h-[480px]">
      {/* Floating badges */}
      <FloatBadge className="top-10 left-0 text-gold-800">
        <span className="text-xl">🔥</span> 12 day streak!
      </FloatBadge>
      <FloatBadge className="bottom-16 right-0 text-red-800">
        <span className="text-xl">🎉</span> Jamie checked in
      </FloatBadge>
      <FloatBadge className="top-44 right-5 text-green-700">
        <span className="text-xl">💪</span> +30 XP
      </FloatBadge>

      <div className="relative z-[2] w-[280px] bg-paper border-[3px] border-ink-900 rounded-[36px] p-4 shadow-[8px_8px_0_theme(colors.green.500)]">
        <div className="bg-ink-100 rounded-[20px] p-4">
          {/* Big streak card */}
          <div className="flex items-center justify-between bg-green-500 text-paper border-2 border-b-[4px] border-green-700 rounded-lg p-3.5 mb-3">
            <div>
              <div className="text-[28px] font-black tracking-[-0.02em] leading-none">
                12
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.1em] opacity-90 mt-1">
                Day streak
              </div>
            </div>
            <div className="text-3xl">🔥</div>
          </div>

          <PhoneCard
            icon="🏃"
            iconClass="bg-green-50 border-green-400"
            title="Morning run club"
            barFill="bg-green-500"
            barWidth="70%"
          />
          <PhoneCard
            icon="📚"
            iconClass="bg-red-50 border-red-500"
            title="Read 20 pages"
            barFill="bg-red-500"
            barWidth="50%"
          />
          <PhoneCard
            icon="💧"
            iconClass="bg-blue-50 border-blue-400"
            title="8 glasses of water"
            barFill="bg-blue-400"
            barWidth="90%"
          />
        </div>
      </div>
    </div>
  );
}

function FloatBadge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "hidden md:flex absolute z-[3] bg-paper border-2 border-b-[4px] border-ink-300 rounded-lg px-4 py-3 text-[13px] font-black items-center gap-2 " +
        className
      }
    >
      {children}
    </div>
  );
}

function PhoneCard({
  icon,
  iconClass,
  title,
  barFill,
  barWidth,
}: {
  icon: string;
  iconClass: string;
  title: string;
  barFill: string;
  barWidth: string;
}) {
  return (
    <div className="bg-paper border-2 border-b-[3px] border-ink-300 rounded-md p-2.5 mb-2 flex items-center gap-2.5">
      <div
        className={
          "w-9 h-9 rounded-sm flex items-center justify-center text-xl border-2 flex-shrink-0 " +
          iconClass
        }
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-black text-ink-900 mb-[3px]">
          {title}
        </div>
        <div className="h-[6px] bg-ink-100 rounded-pill overflow-hidden">
          <div
            className={"h-full rounded-pill " + barFill}
            style={{ width: barWidth }}
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- BERLIN CHALLENGES ---------- */
function BerlinChallenges() {
  return (
    <section id="berlin" className="bg-ink-100 py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-wrap items-end justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-800 border-2 border-b-[4px] border-red-500 rounded-pill px-3.5 py-1.5 text-[13px] font-black uppercase tracking-[0.05em] mb-3">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              Berlin
            </div>
            <h2 className="text-[30px] md:text-[40px] font-black tracking-[-0.03em] leading-[1.1] mb-3">
              Challenges near you
            </h2>
            <p className="text-[17px] font-medium text-ink-700 max-w-[560px]">
              Real people, real places. Jump into something happening in your
              city this week.
            </p>
          </div>
          <button className="btn btn-outline">Change city ↓</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BERLIN_CHALLENGES.map((c, i) => (
            <ChallengeTile key={i} {...c} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/register" className="btn btn-outline btn-lg">
            See all 47 challenges in Berlin →
          </Link>
        </div>
      </div>
    </section>
  );
}

interface ChallengeTileData {
  icon: string;
  iconClass: string;
  host: string;
  hostAvatar: string;
  hostAvatarClass: string;
  title: string;
  desc: string;
  pills: { text: string; className: string }[];
  people: { initials: string; className: string }[];
  joined: number;
}

function ChallengeTile(c: ChallengeTileData) {
  return (
    <div className="bg-paper border-2 border-b-[5px] border-ink-300 rounded-xl p-5 cursor-pointer transition-transform hover:-translate-y-[3px] flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div
          className={
            "w-14 h-14 rounded-lg flex items-center justify-center text-3xl border-2 border-b-[4px] " +
            c.iconClass
          }
        >
          {c.icon}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-black text-ink-500 uppercase tracking-[0.05em]">
          <div
            className={
              "w-[22px] h-[22px] rounded-full flex items-center justify-center text-[9px] font-black " +
              c.hostAvatarClass
            }
          >
            {c.hostAvatar}
          </div>
          By {c.host}
        </div>
      </div>
      <h3 className="text-[19px] font-black tracking-[-0.02em] leading-[1.2] mb-2">
        {c.title}
      </h3>
      <p className="text-sm font-medium text-ink-700 leading-[1.5] mb-4 flex-1">
        {c.desc}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {c.pills.map((p, i) => (
          <span
            key={i}
            className={
              "text-[10px] font-black px-2.5 py-1 rounded-pill uppercase tracking-[0.05em] border-2 " +
              p.className
            }
          >
            {p.text}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t-2 border-ink-300">
        <div className="flex items-center gap-2 text-[13px] font-black">
          <div className="flex">
            {c.people.map((p, i) => (
              <div
                key={i}
                className={
                  "w-[26px] h-[26px] rounded-full border-2 border-paper shadow-[0_0_0_1.5px_theme(colors.ink.300)] flex items-center justify-center text-[10px] font-black " +
                  (i > 0 ? "-ml-1.5 " : "") +
                  p.className
                }
              >
                {p.initials}
              </div>
            ))}
          </div>
          {c.joined} joined
        </div>
        <button className="bg-green-500 text-paper border-2 border-b-[3px] border-green-700 rounded-sm px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.05em] active:border-b active:translate-y-0.5">
          Join
        </button>
      </div>
    </div>
  );
}

const BERLIN_CHALLENGES: ChallengeTileData[] = [
  {
    icon: "🏃",
    iconClass: "bg-green-50 border-green-400",
    host: "Maya",
    hostAvatar: "MK",
    hostAvatarClass: "bg-green-400 text-green-900",
    title: "Tiergarten morning runs",
    desc: "Easy 5k around the park every Mon/Wed/Fri at 7am. All paces welcome, we stick together.",
    pills: [
      {
        text: "Mon · Wed · Fri",
        className: "bg-green-50 text-green-700 border-green-400",
      },
      { text: "Mitte", className: "bg-red-50 text-red-800 border-red-500" },
    ],
    people: [
      { initials: "MK", className: "bg-green-400 text-green-900" },
      { initials: "JP", className: "bg-red-100 text-red-800" },
      { initials: "LS", className: "bg-blue-50 text-blue-800" },
      { initials: "+5", className: "bg-gold-200 text-gold-800" },
    ],
    joined: 8,
  },
  {
    icon: "🍳",
    iconClass: "bg-red-50 border-red-500",
    host: "David",
    hostAvatar: "DS",
    hostAvatarClass: "bg-red-100 text-red-800",
    title: "30 days no takeout",
    desc: "Cook every meal at home for a month. Share recipes in the group chat, nobody starves alone.",
    pills: [
      { text: "Daily", className: "bg-red-50 text-red-800 border-red-500" },
      { text: "30 days", className: "bg-gold-50 text-gold-800 border-gold-400" },
    ],
    people: [
      { initials: "DS", className: "bg-red-100 text-red-800" },
      { initials: "NK", className: "bg-green-400 text-green-900" },
      { initials: "+3", className: "bg-purple-50 text-purple-800" },
    ],
    joined: 5,
  },
  {
    icon: "🇩🇪",
    iconClass: "bg-blue-50 border-blue-400",
    host: "Sofia",
    hostAvatar: "SR",
    hostAvatarClass: "bg-blue-50 text-blue-800",
    title: "Daily Deutsch — 15 min",
    desc: "Practice German 15 minutes a day. Share what you learned, help each other with tricky grammar.",
    pills: [
      { text: "Daily", className: "bg-blue-50 text-blue-800 border-blue-400" },
      {
        text: "Beginner",
        className: "bg-purple-50 text-purple-800 border-purple-400",
      },
    ],
    people: [
      { initials: "SR", className: "bg-blue-50 text-blue-800" },
      { initials: "TH", className: "bg-gold-200 text-gold-800" },
      { initials: "MO", className: "bg-green-400 text-green-900" },
      { initials: "+9", className: "bg-red-100 text-red-800" },
    ],
    joined: 12,
  },
  {
    icon: "🧘",
    iconClass: "bg-purple-50 border-purple-400",
    host: "Elena",
    hostAvatar: "EK",
    hostAvatarClass: "bg-purple-50 text-purple-800",
    title: "Yoga in Kreuzberg",
    desc: "Meet in Görlitzer Park on sunny mornings. Bring your mat, we'll bring the good vibes.",
    pills: [
      {
        text: "Tue · Thu · Sat",
        className: "bg-purple-50 text-purple-800 border-purple-400",
      },
      { text: "Kreuzberg", className: "bg-red-50 text-red-800 border-red-500" },
    ],
    people: [
      { initials: "EK", className: "bg-purple-50 text-purple-800" },
      { initials: "LR", className: "bg-blue-50 text-blue-800" },
      { initials: "+4", className: "bg-green-400 text-green-900" },
    ],
    joined: 6,
  },
  {
    icon: "📚",
    iconClass: "bg-gold-50 border-gold-400",
    host: "Paul",
    hostAvatar: "PB",
    hostAvatarClass: "bg-gold-200 text-gold-800",
    title: "Read 20 pages a day",
    desc: "Any book, any genre. Post a photo or a sentence about what you read. Finish books, not excuses.",
    pills: [
      { text: "Daily", className: "bg-gold-50 text-gold-800 border-gold-400" },
      {
        text: "60 days",
        className: "bg-green-50 text-green-700 border-green-400",
      },
    ],
    people: [
      { initials: "PB", className: "bg-gold-200 text-gold-800" },
      { initials: "AS", className: "bg-red-100 text-red-800" },
      { initials: "KM", className: "bg-blue-50 text-blue-800" },
      { initials: "+15", className: "bg-purple-50 text-purple-800" },
    ],
    joined: 18,
  },
  {
    icon: "🚴",
    iconClass: "bg-orange-50 border-orange-400",
    host: "Felix",
    hostAvatar: "FW",
    hostAvatarClass: "bg-red-100 text-red-800",
    title: "Bike to work — April",
    desc: "Ditch the U-Bahn for a month. Cheer each other on through rainy days and sore legs.",
    pills: [
      {
        text: "Weekdays",
        className: "bg-green-50 text-green-700 border-green-400",
      },
      {
        text: "Prenzlauer Berg",
        className: "bg-blue-50 text-blue-800 border-blue-400",
      },
    ],
    people: [
      { initials: "FW", className: "bg-red-100 text-red-800" },
      { initials: "HB", className: "bg-green-400 text-green-900" },
      { initials: "+2", className: "bg-gold-200 text-gold-800" },
    ],
    joined: 4,
  },
];

/* ---------- BIG JOIN ---------- */
function BigJoin() {
  return (
    <section
      id="join"
      className="py-24 relative"
      style={{
        background:
          "radial-gradient(circle at 10% 50%, #FFF4D6 0%, transparent 35%), radial-gradient(circle at 90% 50%, #E8F7E4 0%, transparent 35%), #FFFFFF",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="relative overflow-hidden max-w-[900px] mx-auto text-center bg-green-500 border-[3px] border-b-[8px] border-green-700 rounded-2xl px-10 py-14 md:py-[60px] text-paper">
          <span
            aria-hidden
            className="pointer-events-none absolute -top-5 -left-5 text-[140px] opacity-10 rotate-[-15deg]"
          >
            🔥
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -right-5 text-[160px] opacity-10 rotate-[15deg]"
          >
            🏆
          </span>

          <h2 className="relative text-[36px] md:text-[52px] font-black tracking-[-0.04em] leading-[1.05] mb-4">
            Your first streak is one tap away.
          </h2>
          <p className="relative text-[17px] md:text-[19px] font-semibold opacity-95 max-w-[560px] mx-auto mb-8">
            Free forever. No credit card. Just show up tomorrow with someone
            who cares if you did.
          </p>
          <div className="relative flex flex-wrap justify-center gap-3">
            <Link
              to="/register"
              className="btn btn-lg bg-paper text-green-700 border-ink-300"
            >
              Sign up — it's free
            </Link>
            <a href="#berlin" className="btn btn-gold btn-lg">
              Browse challenges
            </a>
          </div>
          <div className="relative mt-5 text-[13px] font-bold opacity-90 uppercase tracking-[0.05em]">
            ⚡ Takes 30 seconds · No app required
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- CATEGORIES ---------- */
const CATEGORIES: {
  emoji: string;
  title: string;
  count: string;
  className: string;
}[] = [
  {
    emoji: "🏃",
    title: "Fitness",
    count: "218 challenges",
    className: "border-green-400 text-green-700",
  },
  {
    emoji: "🍳",
    title: "Cooking",
    count: "89 challenges",
    className: "border-red-500 text-red-800",
  },
  {
    emoji: "📚",
    title: "Reading",
    count: "134 challenges",
    className: "border-blue-400 text-blue-800",
  },
  {
    emoji: "🧘",
    title: "Mindfulness",
    count: "76 challenges",
    className: "border-purple-400 text-purple-800",
  },
  {
    emoji: "🎨",
    title: "Creative",
    count: "92 challenges",
    className: "border-gold-400 text-gold-800",
  },
  {
    emoji: "💰",
    title: "Money",
    count: "41 challenges",
    className: "border-orange-400 text-orange-800",
  },
  {
    emoji: "🌱",
    title: "Eco",
    count: "58 challenges",
    className: "border-pink-400 text-pink-800",
  },
  {
    emoji: "✨",
    title: "Other",
    count: "112 challenges",
    className: "border-ink-300 text-ink-900",
  },
];

function Categories() {
  return (
    <section id="categories" className="py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">Find your thing</div>
          <h2 className="text-[30px] md:text-[40px] font-black tracking-[-0.03em] leading-[1.1] mb-3">
            Browse by category
          </h2>
          <p className="text-[17px] font-medium text-ink-700 max-w-[560px] mx-auto">
            From fitness to language learning — there's a challenge for
            whatever you're trying to build.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((c) => (
            <div
              key={c.title}
              className={
                "bg-paper border-2 border-b-[5px] rounded-xl p-6 cursor-pointer text-center transition-transform hover:-translate-y-[3px] " +
                c.className
              }
            >
              <span className="block text-5xl mb-3">{c.emoji}</span>
              <h3 className="text-[17px] font-black tracking-[-0.01em] mb-1">
                {c.title}
              </h3>
              <div className="text-xs font-extrabold uppercase tracking-[0.05em] opacity-70">
                {c.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
const STEPS: {
  num: number;
  illus: string;
  title: string;
  body: string;
  numClass: string;
}[] = [
  {
    num: 1,
    illus: "🎯",
    title: "Pick your challenge",
    body: 'Join something happening in your city or spin up your own. Set the days, the duration, and what counts as "showing up."',
    numClass: "bg-green-500 text-paper border-green-700",
  },
  {
    num: 2,
    illus: "👥",
    title: "Bring your people",
    body: "Invite friends, coworkers, or open it up to your neighborhood. Accountability hits different when someone's watching.",
    numClass: "bg-red-500 text-paper border-red-800",
  },
  {
    num: 3,
    illus: "🔥",
    title: "Check in daily",
    body: "Tap the button. Drop a photo, a comment, a high five. Watch the streak grow — and the habit with it.",
    numClass: "bg-gold-400 text-gold-800 border-gold-600",
  },
];

function HowItWorks() {
  return (
    <section id="how" className="bg-ink-100 py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-12">
          <div className="eyebrow mb-3">How it works</div>
          <h2 className="text-[30px] md:text-[40px] font-black tracking-[-0.03em] leading-[1.1] mb-3">
            Three steps. No excuses.
          </h2>
          <p className="text-[17px] font-medium text-ink-700 max-w-[560px] mx-auto">
            Setting up a challenge takes less time than deciding what to watch
            tonight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 pt-6">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="relative bg-paper border-2 border-b-[5px] border-ink-300 rounded-xl p-8"
            >
              <div
                className={
                  "absolute -top-5 left-6 w-12 h-12 rounded-full border-2 border-b-[4px] flex items-center justify-center text-xl font-black " +
                  s.numClass
                }
              >
                {s.num}
              </div>
              <div className="text-[64px] mt-4 mb-5 leading-none">
                {s.illus}
              </div>
              <h3 className="text-[22px] font-black tracking-[-0.02em] mb-2.5">
                {s.title}
              </h3>
              <p className="text-[15px] font-medium text-ink-700 leading-[1.5]">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- FRIENDS ---------- */
function Friends() {
  return (
    <section id="friends" className="py-20">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-16 items-center">
        {/* Chat visual */}
        <div className="relative min-h-[420px] flex items-center justify-center">
          <div className="hidden md:flex absolute z-[3] top-5 -right-5 bg-paper border-2 border-b-[4px] border-ink-300 rounded-pill px-3.5 py-2 text-[13px] font-black items-center gap-1.5 text-red-800">
            <span>❤️</span> 12 cheers
          </div>
          <div className="hidden md:flex absolute z-[3] bottom-10 -left-8 bg-paper border-2 border-b-[4px] border-ink-300 rounded-pill px-3.5 py-2 text-[13px] font-black items-center gap-1.5 text-gold-800">
            <span>🏆</span> Badge unlocked
          </div>

          <div className="relative z-[2] w-full max-w-[360px] bg-paper border-2 border-b-[4px] border-ink-300 rounded-xl p-5">
            <div className="flex items-center gap-2.5 pb-3.5 mb-3.5 border-b-2 border-ink-300">
              <div className="flex">
                <Avatar className="bg-green-400 text-green-900">MK</Avatar>
                <Avatar className="bg-red-100 text-red-800 -ml-2">JP</Avatar>
                <Avatar className="bg-blue-50 text-blue-800 -ml-2">LS</Avatar>
              </div>
              <div className="text-sm font-black">
                Tiergarten runs
                <span className="block text-[11px] font-extrabold text-green-600 uppercase tracking-[0.05em]">
                  ● Live today
                </span>
              </div>
            </div>

            <Message from="MK" avClass="bg-green-400 text-green-900">
              <strong>Maya</strong> checked in 🏃 "Beat my 5k time!"
            </Message>
            <Message from="ME" avClass="bg-red-100 text-red-800" mine>
              Lets gooo 🔥 same time tomorrow?
            </Message>
            <Message from="LS" avClass="bg-blue-50 text-blue-800">
              <strong>Lukas</strong> "count me in, bringing coffee after"
            </Message>
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="eyebrow mb-3">Better together</div>
          <h2 className="text-[30px] md:text-[40px] font-black tracking-[-0.03em] leading-[1.1] mb-4">
            Habits are a team sport.
          </h2>
          <p className="text-[17px] font-medium text-ink-700 leading-[1.5] mb-6">
            Streak isn't a solo tracker that guilt-trips you. It's a place to
            find your people, cheer them on, and be cheered back.
          </p>

          <ul className="mb-7 space-y-2">
            {[
              "Invite friends to any challenge in one tap",
              "Chat, react, and celebrate in the group feed",
              "See who else in your city shares your goal",
              "Build real friendships through showing up",
            ].map((line) => (
              <li
                key={line}
                className="flex items-center gap-3 py-2 text-[15px] font-bold"
              >
                <span className="w-7 h-7 bg-green-500 border-2 border-b-[3px] border-green-700 rounded-full flex items-center justify-center text-paper text-sm font-black flex-shrink-0">
                  ✓
                </span>
                {line}
              </li>
            ))}
          </ul>

          <Link to="/register" className="btn btn-primary btn-lg">
            Find your crew
          </Link>
        </div>
      </div>
    </section>
  );
}

function Message({
  children,
  avClass,
  from,
  mine = false,
}: {
  children: React.ReactNode;
  avClass: string;
  from: string;
  mine?: boolean;
}) {
  return (
    <div
      className={
        "flex gap-2 mb-3 items-start " + (mine ? "flex-row-reverse" : "")
      }
    >
      <div
        className={
          "w-[26px] h-[26px] rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-black " +
          avClass
        }
      >
        {from}
      </div>
      <div
        className={
          "rounded-md px-3 py-2 text-[13px] font-semibold leading-[1.4] max-w-[80%] " +
          (mine ? "bg-green-500 text-paper" : "bg-ink-100 text-ink-900")
        }
      >
        {children}
      </div>
    </div>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="bg-ink-900 text-paper py-16 pb-6">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-8 mb-12">
          <div>
            <a
              href="#top"
              className="flex items-center gap-2.5 no-underline text-paper font-black text-2xl tracking-tight mb-4"
            >
              <span className="w-9 h-9 rounded-full bg-green-500 border-2 border-b-[4px] border-green-700 flex items-center justify-center text-xl">
                🦉
              </span>
              Streak
            </a>
            <p className="text-sm font-medium text-ink-500 leading-[1.5] mb-5 max-w-[280px]">
              Build habits with real people near you. Show up together, stick
              together.
            </p>
            <div className="flex gap-2.5">
              {[
                ["𝕏", "Twitter"],
                ["IG", "Instagram"],
                ["TT", "TikTok"],
                ["DC", "Discord"],
              ].map(([label, title]) => (
                <a
                  key={title}
                  href="#"
                  title={title}
                  className="w-10 h-10 border-2 border-b-[3px] border-ink-700 rounded-md flex items-center justify-center text-paper text-base font-black hover:border-green-500 hover:text-green-500 no-underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            heading="Product"
            links={[
              ["Challenges", "#berlin"],
              ["Categories", "#categories"],
              ["How it works", "#how"],
              ["Pricing", "#"],
              ["Mobile app", "#"],
              ["Changelog", "#"],
            ]}
          />
          <FooterCol
            heading="Cities"
            links={[
              ["Berlin", "#"],
              ["Hamburg", "#"],
              ["Munich", "#"],
              ["Vienna", "#"],
              ["Zurich", "#"],
              ["All cities", "#"],
            ]}
          />
          <FooterCol
            heading="Community"
            links={[
              ["How friendships work", "#friends"],
              ["Community guidelines", "#"],
              ["Host a challenge", "#"],
              ["Success stories", "#"],
              ["Blog", "#"],
            ]}
          />
          <FooterCol
            heading="Company"
            links={[
              ["About us", "#"],
              ["Careers", "#"],
              ["Press kit", "#"],
              ["Contact", "#"],
              ["Support", "#"],
            ]}
          />
        </div>

        <div className="border-t-2 border-ink-700 pt-6 flex flex-wrap justify-between items-center gap-4 text-[13px] font-bold text-ink-500">
          <div>© 2026 Streak. Made with 🔥 in Berlin.</div>
          <div className="flex gap-4">
            <a href="#" className="text-ink-500 hover:text-paper no-underline">
              Privacy
            </a>
            <a href="#" className="text-ink-500 hover:text-paper no-underline">
              Terms
            </a>
            <a href="#" className="text-ink-500 hover:text-paper no-underline">
              Cookies
            </a>
            <a href="#" className="text-ink-500 hover:text-paper no-underline">
              Imprint
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  heading,
  links,
}: {
  heading: string;
  links: [string, string][];
}) {
  return (
    <div>
      <h4 className="text-xs font-black tracking-[0.1em] uppercase text-gold-400 mb-4">
        {heading}
      </h4>
      <ul className="space-y-2.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <a
              href={href}
              className="text-ink-300 text-sm font-bold no-underline hover:text-green-400"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
