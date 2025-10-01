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
        info: "#87ceeb",
        success: "#71b64a",
        warning: "#f59e0b",
        white: "#ffffff",
        black: "#1a1a1a",
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
