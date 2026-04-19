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
