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
        // Gold & Black Metallic Theme
        gold: {
          50: '#fffdf5',
          100: '#fef9e7',
          200: '#fdf0c4',
          300: '#fae59c',
          400: '#f5d56a',
          500: '#D4AF37', // Classic gold
          600: '#C5A028',
          700: '#A6851F',
          800: '#8B6914',
          900: '#6B4F0E',
          950: '#3D2C08',
        },
        metal: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        accent: {
          gold: '#FFD700',
          bronze: '#CD7F32',
          silver: '#C0C0C0',
          platinum: '#E5E4E2',
        },
        cat: {
          orange: '#FFD700',
          cream: '#FFF8DC',
          whisker: '#1a1a1a',
          nose: '#D4AF37',
          eye: '#FFD700',
        },
      },
      backgroundImage: {
        'metallic-gold': 'linear-gradient(135deg, #D4AF37 0%, #FFD700 25%, #D4AF37 50%, #B8860B 75%, #D4AF37 100%)',
        'metallic-dark': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        'metallic-shine': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'tail-wag': 'tail-wag 0.5s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'tail-wag': {
          '0%, 100%': { transform: 'rotate(-10deg)' },
          '50%': { transform: 'rotate(10deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #D4AF37, 0 0 10px #D4AF37' },
          '100%': { boxShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 30px #FFD700' },
        },
      },
      boxShadow: {
        'gold': '0 4px 15px -3px rgba(212, 175, 55, 0.4)',
        'gold-lg': '0 10px 40px -10px rgba(212, 175, 55, 0.5)',
        'inner-gold': 'inset 0 2px 4px 0 rgba(212, 175, 55, 0.2)',
      },
    },
  },
  plugins: [],
};
