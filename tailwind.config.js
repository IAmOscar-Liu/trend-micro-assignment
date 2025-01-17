/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "sans-serif"], // Set Arial as the default sans-serif font
      },
      colors: {
        primary: {
          DEFAULT: "#da4c4d",
          hover: "#c43e3f",
          disabled: "#d3c4c4",
        },
        secondary: {
          DEFAULT: "#f0f0f0",
          disabled: "#eeeeee",
        },
        danger: {
          DEFAULT: "rgba(251, 116, 116, 110)",
        },
        black: {
          DEFAULT: "#000000", // 100% opacity
          87: "rgba(0, 0, 0, 0.87)", // 87% opacity
          60: "rgba(0, 0, 0, 0.6)", // 60% opacity
          40: "rgba(0, 0, 0, 0.4)", // 40% opacity
          20: "rgba(0, 0, 0, 0.2)", // 20% opacity
        },
      },
    },
  },
  plugins: [],
};
