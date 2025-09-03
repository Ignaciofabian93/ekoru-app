/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#71b64a",
          dark: "#2d5016",
          light: "#d8f999",
        },
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
      },
    },
  },
  plugins: [],
};
