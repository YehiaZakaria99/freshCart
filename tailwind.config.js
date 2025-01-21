/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      colors: {
        'main' : '#0aad0a',
        'light' : '#f0f3f2'
      },
      width: {
        'custom-width' : '50%'
      }
    },
  },
  plugins: [],
}