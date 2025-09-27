import { lime, stone, gray, white, neutral, red } from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: lime[600],
        danger: red[600],
        secondary: "#9bc53d",
        accent: "#8b4513",
        neutral: {
          light: "#f4e4bc",
          DEFAULT: "#696969",
          dark: "#2c2c2c",
        },
        info: "#87ceeb",
        success: "#71b64a",
        warning: "#f59e0b",
        error: "#dc2626",
        white: "#ffffff",
        black: "#1a1a1a",
        text: {
          primary: "#1f2937",
          secondary: "#6b7280",
          muted: "#9ca3af",
          inverse: "#ffffff",
        },
        background: {
          DEFAULT: "#ffffff",
          secondary: "#f9fafb",
          dark: "#1a1a1a",
          "dark-secondary": "#2d3748",
          "dark-container": "#2a2a2a",
        },
        navbar: {
          light: lime,
          dark: stone,
        },
        footer: {
          light: lime,
          dark: stone,
        },
        subheader: {
          light: white,
          dark: stone,
        },
        container: {
          light: neutral,
          dark: stone,
        },
        layout: {
          light: neutral,
          dark: stone,
        },
        button: {
          primary: lime,
          danger: red,
        },
        input: {
          light: gray,
          dark: stone,
        },
      },
    },
  },
  plugins: [],
};
