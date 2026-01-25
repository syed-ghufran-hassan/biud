#!/bin/bash
# Script to make incremental commits for BiUD theme transformation
# Animated Floating Cat + Wooden Theme

cd ~/biud-contribution/frontend

# Commit counter
commit_num=1

commit_change() {
  local msg="$1"
  git add -A
  git commit -m "$msg"
  echo "Commit $commit_num: $msg"
  ((commit_num++))
}

# ============================================
# PHASE 1: Wooden Color Palette (Commits 1-10)
# ============================================

# Commit 1: Add wooden color palette to tailwind
cat > tailwind.config.js << 'EOF'
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
      },
    },
  },
  plugins: [],
};
EOF
commit_change "feat(theme): add wooden color palette to tailwind config"

# Commit 2: Add bark and grain colors
cat > tailwind.config.js << 'EOF'
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
EOF
commit_change "feat(theme): add bark and grain accent colors"

# Commit 3: Add cat theme colors
cat > tailwind.config.js << 'EOF'
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
        cat: {
          orange: '#FF8C42',
          cream: '#FFF8DC',
          whisker: '#2C2C2C',
          nose: '#FFB6C1',
          eye: '#90EE90',
        },
      },
    },
  },
  plugins: [],
};
EOF
commit_change "feat(theme): add cat-themed accent colors"

# Commit 4: Add animation keyframes
cat > tailwind.config.js << 'EOF'
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
        cat: {
          orange: '#FF8C42',
          cream: '#FFF8DC',
          whisker: '#2C2C2C',
          nose: '#FFB6C1',
          eye: '#90EE90',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
EOF
commit_change "feat(animation): add float animation keyframes"

# Commit 5: Add bounce animation
cat > tailwind.config.js << 'EOF'
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
        cat: {
          orange: '#FF8C42',
          cream: '#FFF8DC',
          whisker: '#2C2C2C',
          nose: '#FFB6C1',
          eye: '#90EE90',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
};
EOF
commit_change "feat(animation): add bounce-slow animation"

# Commit 6: Add tail wag animation
cat > tailwind.config.js << 'EOF'
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
        cat: {
          orange: '#FF8C42',
          cream: '#FFF8DC',
          whisker: '#2C2C2C',
          nose: '#FFB6C1',
          eye: '#90EE90',
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'tail-wag': 'tail-wag 0.5s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
};
EOF
commit_change "feat(animation): add tail-wag animation"

echo "Phase 1 complete: $((commit_num-1)) commits made"
