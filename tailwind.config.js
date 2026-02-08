/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0e1117',
          card: 'rgba(30, 35, 45, 0.7)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
        accent: {
          blue: '#3b82f6',
          teal: '#14b8a6',
        },
        warning: '#f59e0b',
        success: '#10b981',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
