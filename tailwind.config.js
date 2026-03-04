import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: "#f5f8f7",
        ink: "#111827",
        muted: "#5f6f68",
        brand: {
          50: "#eaf8f3",
          100: "#d7f1e8",
          500: "#138a68",
          600: "#0f7356",
          700: "#0b5d45",
        },
        accent: {
          100: "#ffe5cc",
          500: "#ff9f43",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        display: ['"Fraunces"', "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -30px rgba(12, 44, 36, 0.32)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up .6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [forms],
};
