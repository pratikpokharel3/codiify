/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2e659b",
        secondary: "#6e8ac6"
      }
    }
  },
  plugins: []
}
