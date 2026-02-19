/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cosmetics palette
        rose: {
          blush: '#fff1f2',
          soft: '#ffe4e6',
          mid: '#fda4af',
        },
        burgundy: {
          DEFAULT: '#450a0a',
          light: '#7f1d1d',
          dark: '#2d0707',
        },
        gold: '#c9a84c',
        cream: '#fdf6ec',
        // Cleaning palette
        sky: {
          clean: '#0ea5e9',
          light: '#e0f2fe',
          mid: '#38bdf8',
        },
        teal: {
          coastal: '#0d9488',
          light: '#ccfbf1',
        },
        navy: {
          pro: '#0f172a',
          mid: '#1e3a5f',
        },
        sand: '#fef3c7',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        glow: '0 0 40px rgba(200, 100, 100, 0.3)',
        'glow-blue': '0 0 40px rgba(14, 165, 233, 0.3)',
      },
    },
  },
  plugins: [],
}
