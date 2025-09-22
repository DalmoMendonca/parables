/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c5aa0',
        secondary: '#e7672e',
        magenta: '#ff69b4',
        red: '#dc2626',
        amber: '#f59e0b',
        orange: '#ea580c',
        green: '#16a34a',
        teal: '#0d9488',
        turquoise: '#06b6d4',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in',
        'slide-up': 'slideUp 0.4s ease-out',
      },
    },
  },
  plugins: [],
}