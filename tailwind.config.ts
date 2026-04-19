import type { Config } from "tailwindcss";

// Streak design tokens (mirrored from streak-landing_1.html)
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "DM Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        green: {
          50: "#E8F7E4",
          100: "#C8EDB9",
          400: "#7ED957",
          500: "#58CC02",
          600: "#4BAF00",
          700: "#378D00",
          900: "#1C4A00",
        },
        red: {
          50: "#FFE8E8",
          100: "#FFC1C1",
          500: "#ED1C24",
          600: "#C91418",
          800: "#8A0B0F",
        },
        gold: {
          50: "#FFF4D6",
          200: "#FFE07A",
          400: "#FFC107",
          600: "#E8A700",
          800: "#7A5600",
        },
        blue: {
          50: "#E3F2FD",
          400: "#1CB0F6",
          600: "#0E7CB8",
          800: "#073E5C",
        },
        purple: {
          50: "#F3E5FF",
          400: "#CE82FF",
          600: "#8B2FD1",
          800: "#4A1570",
        },
        pink: {
          50: "#FFE8F1",
          400: "#FF6EC7",
          600: "#D63A9B",
          800: "#6E1A4C",
        },
        orange: {
          50: "#FFF0E0",
          400: "#FF8C3A",
          600: "#D96A10",
          800: "#6E3300",
        },
        ink: {
          900: "#3C3C3C",
          700: "#777777",
          500: "#AFAFAF",
          300: "#E5E5E5",
          100: "#F7F7F7",
        },
        paper: "#FFFFFF",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "28px",
        pill: "999px",
      },
    },
  },
  plugins: [],
};

export default config;
