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
        // Primary Red - Main color from logo
        primary: {
          DEFAULT: "#D32F2F",
          light: "#EF5350",
          lighter: "#FFEBEE",
          dark: "#C62828",
        },
        // Warm Orange - Secondary color harmonious with red
        accent: {
          DEFAULT: "#FF6F00",
          light: "#FFA726",
          lighter: "#FFF3E0",
          dark: "#E65100",
        },
        // Neutrals - Gray and natural beige
        neutral: {
          900: "#212121",
          700: "#424242",
          500: "#757575",
          300: "#E0E0E0",
          100: "#F5F5F5",
          50: "#FAFAFA",
        },
        // Semantic Colors
        success: {
          DEFAULT: "#66BB6A",
          light: "#E8F5E9",
        },
        warning: {
          DEFAULT: "#FFA726",
          light: "#FFF3E0",
        },
        error: {
          DEFAULT: "#EF5350",
          light: "#FFEBEE",
        },
        info: {
          DEFAULT: "#42A5F5",
          light: "#E3F2FD",
        },
        // Background colors
        background: {
          primary: "#FFFFFF",
          secondary: "#FFFAF6",
          tertiary: "#FFF8F5",
        },
      },
      fontFamily: {
        sans: ["Be Vietnam Pro", "Inter", "system-ui", "sans-serif"],
        heading: ["Montserrat", "Poppins", "sans-serif"],
        number: ["Roboto", "sans-serif"],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.2' }],
        'h1': ['3rem', { lineHeight: '1.2' }],
        'h2': ['2.25rem', { lineHeight: '1.2' }],
        'h3': ['1.75rem', { lineHeight: '1.4' }],
        'h4': ['1.5rem', { lineHeight: '1.4' }],
        'h5': ['1.25rem', { lineHeight: '1.4' }],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '8': '64px',
        '10': '80px',
        '12': '96px',
        '16': '128px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.12)',
        'warm': '0 4px 12px 0 rgba(211, 47, 47, 0.15)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.08)',
        'modal': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'button': '0 4px 12px 0 rgba(211, 47, 47, 0.25)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },
      maxWidth: {
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1280px',
        'mobile': '480px',
      },
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '350ms',
      },
    },
  },
  plugins: [],
};

export default config;
