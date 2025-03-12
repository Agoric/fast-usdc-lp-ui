/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'agoric-red': 'rgba(var(--agoric-red), <alpha-value>)',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              color: '#1f2937', // text-gray-800
              fontWeight: '700',
            },
            h2: {
              color: '#1f2937', // text-gray-800
              fontWeight: '700',
            },
            h3: {
              color: '#1f2937', // text-gray-800
              fontWeight: '600',
            },
            strong: {
              color: '#1f2937', // text-gray-800
            },
            a: {
              color: '#e53e3e', // text-agoric-red
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            code: {
              color: '#4a5568', // text-gray-700
            },
            blockquote: {
              color: '#4a5568', // text-gray-700
              borderLeftColor: '#e53e3e', // border-agoric-red
            },
            li: {
              marginTop: '0.25em',
              marginBottom: '0.25em',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
