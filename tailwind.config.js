/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8edf5',
          100: '#c5d0e6',
          200: '#9eb0d4',
          300: '#7690c2',
          400: '#5878b5',
          500: '#3a60a8',
          600: '#2d4f8f',
          700: '#1a3a5c',
          800: '#122840',
          900: '#0a1828',
        },
        teal: {
          50: '#e0f7f5',
          100: '#b3ece7',
          200: '#80dfd8',
          300: '#4dd2c9',
          400: '#26c7bc',
          500: '#0bbdb1',
          600: '#0aad9e',
          700: '#08978a',
          800: '#067f75',
          900: '#045c55',
        },
        eco: {
          light: '#e8f5f0',
          muted: '#c3e8de',
          base: '#0aad9e',
          dark: '#067f75',
          navy: '#1a3a5c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
