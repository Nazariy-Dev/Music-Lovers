/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        appear: {
          '0%': { opacity: '0', scale: "0.5" },
          '100%': { opacity: '100', scale: "1" },
        }
      },
      animation: {
        appear: 'appear linear',
      }
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["dracula"],
  },
}

