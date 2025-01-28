/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'agoric-red': 'rgba(var(--agoric-red), <alpha-value>)',
      },
    },
  },
  plugins: [],
};
