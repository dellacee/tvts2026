import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E7000B",
          50: "#FEF2F2",
          100: "#FFE2E2",
          200: "#FFC9C9",
          300: "#FFA8A8",
          400: "#FB2C36",
          500: "#E7000B",
          600: "#D11629",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },
        secondary: {
          DEFAULT: "#00C950",
          50: "#F0FDF4",
          100: "#DCFCE7",
          200: "#BBF7D0",
          300: "#7BF1A8",
          400: "#00C950",
          500: "#00A63E",
          600: "#008236",
          700: "#016630",
          800: "#065F46",
          900: "#064E3B",
        },
        gray: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DC",
          400: "#99A1AF",
          500: "#6A7282",
          600: "#4A5565",
          700: "#364153",
          800: "#1E2939",
          900: "#0A0A0A",
        },
        blue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BEDBFF",
          300: "#8EC5FF",
          400: "#155DFC",
          500: "#1447E6",
          600: "#193CB8",
        },
        purple: {
          50: "#FAF5FF",
          100: "#F3E8FF",
          200: "#E9D4FF",
          300: "#DAB2FF",
          400: "#9810FA",
          500: "#8200DB",
          600: "#6E11B0",
          700: "#5531AA",
        },
        yellow: {
          50: "#FEFCE8",
          100: "#FEF9C2",
          200: "#FDC700",
          300: "#EAC839",
          400: "#FBDC43",
          500: "#F54900",
          600: "#894B00",
        },
        orange: {
          50: "#FFF7ED",
          100: "#FFEDD4",
          200: "#FFD6A7",
          300: "#FFB86A",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0px 2px 4px -2px rgba(0, 0, 0, 0.10), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)",
        button: "0px 4px 6px -4px #FFC9C9, 0px 10px 15px -3px #FFC9C9",
        modal: "0px 25px 50px -12px rgba(0, 0, 0, 0.25)",
      },
      borderRadius: {
        xl: "14px",
        "2xl": "16px",
      },
      maxWidth: {
        mobile: "390px",
      },
    },
  },
  plugins: [],
};

export default config;
