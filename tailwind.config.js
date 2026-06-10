/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./components/*.html",
    "./js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg':       '#FFFFFF',
        'brand-surface':  '#F5F5F5',
        'brand-accent':   '#EFEFEF',
        'brand-border':   '#E5E5E5',
        'brand-text':     '#111111',
        'brand-secondary':'#444444',
        'brand-muted':    '#666666',
        'brand-red':      '#D93025',
        'brand-red-dark': '#B5271E',
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', 'Impact', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'site': '1200px',
      },
      borderColor: {
        DEFAULT: '#E5E5E5',
      },
      boxShadow: {
        'standard': '0 10px 30px rgba(0,0,0,0.08)',
        'featured': '0 15px 40px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
};
