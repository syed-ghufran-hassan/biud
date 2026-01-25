/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bitcoin: '#F7931A',
        stacks: '#5546FF',
        wood: {
          50: '#fdf8f3',
          100: '#f9ede0',
          200: '#f2d9bf',
          300: '#e8be94',
          400: '#dca06a',
          500: '#d18545',
          600: '#c4703a',
          700: '#a35831',
          800: '#83472c',
          900: '#6b3c27',
          950: '#3a1e13',
        },
        bark: {
          light: '#8B7355',
          DEFAULT: '#5D4E37',
          dark: '#3D3222',
        },
        grain: {
          light: '#DEB887',
          DEFAULT: '#C4A574',
          dark: '#A68B5B',
        },
      },
    },
  },
  plugins: [],
};
