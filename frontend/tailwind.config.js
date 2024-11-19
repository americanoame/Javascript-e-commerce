/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        ipadpro: { raw: "(min-width: 1024px) and (max-width: 1366px)" },
        nesthub: { raw: "(max-width: 1024px) and (max-height: 600px)" },
        nesthubmax: { raw: "(max-width: 1280px) and (max-height: 800px)" },
      },
    },
  },
  plugins: [],
}