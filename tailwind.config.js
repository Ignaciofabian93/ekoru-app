import { lime, stone, gray, white, neutral, red, amber } from "tailwindcss/colors";

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
        info: "#87ceeb",
        success: "#71b64a",
        warning: "#f59e0b",
        white: "#ffffff",
        black: "#1a1a1a",
        icon: {
          light: gray[700],
          dark: gray[300],
          hover: lime[600],
        },
        navbar: {
          light: lime,
          dark: stone,
        },
        sidebar: {
          container: {
            light: neutral[50],
            dark: stone[900],
          },
          header: {
            light: neutral[50],
            dark: stone[900],
          },
          profile: {
            light: amber[50],
            dark: stone[800],
          },
          profileLink: {
            lightHover: lime[100],
            darkHover: stone[700],
          },
          light: amber,
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
        select: {
          light: gray,
          dark: stone,
        },
        title: gray,
        text: gray,
        card: {
          light: neutral,
          dark: stone,
        },
      },
    },
  },
  plugins: [],
};
