/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff8ff",
          100: "#dbeefe",
          200: "#bfe3fe",
          300: "#93d2fd",
          400: "#60b8fa",
          500: "#3b9df5",
          600: "#2280e0",
          700: "#1c68bd",
          800: "#1c579a",
          900: "#1c497a",
          950: "#152f4d",
        },
        teal: {
          500: "#14b8a6",
          600: "#0d9488",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px -4px rgba(28, 87, 154, 0.08)",
        soft: "0 2px 12px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};
