/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F1115', // Industrial dark mode
        surface: '#1A1D24', // Card backgrounds
        surfaceHover: '#232730',
        primary: '#00E676', // Emerald Green Accent
        secondary: '#2979FF', // Electric Blue Accent
        textPrimary: '#FFFFFF',
        textSecondary: '#A0AABF',
        border: '#2E3340',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
