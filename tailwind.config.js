
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    style:{
      left: "20px",
    },
    extend: {
      colors: {
        main: "#F57C00",
        light: "#f0f3f2",
      },
      width: {
        "custom-width": "50%",
      },
    },
  },
  plugins: [],
};
