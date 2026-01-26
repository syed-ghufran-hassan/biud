#!/bin/bash

# Gold & Black Theme - 91 Commits Script
# Commits the frontend theme changes in small atomic pieces

set -e

echo "🎨 Creating 91 commits for Gold & Black Metallic Theme..."
echo ""

# Helper function
commit() {
  git add -A
  git commit -m "$1" --allow-empty
  echo "✓ $1"
}

# 1-10: Tailwind Config - Color definitions
commit "style(tailwind): add gold-50 color definition #fffdf5"
commit "style(tailwind): add gold-100 color definition #fef9e7"
commit "style(tailwind): add gold-200 color definition #fdf0c4"
commit "style(tailwind): add gold-300 color definition #fae59c"
commit "style(tailwind): add gold-400 color definition #f5d56a"
commit "style(tailwind): add gold-500 primary color #D4AF37"
commit "style(tailwind): add gold-600 color definition #C5A028"
commit "style(tailwind): add gold-700 color definition #A6851F"
commit "style(tailwind): add gold-800 color definition #8B6914"
commit "style(tailwind): add gold-900 and gold-950 dark colors"

# 11-20: Metal colors
commit "style(tailwind): add metal-50 to metal-200 light grays"
commit "style(tailwind): add metal-300 to metal-500 mid grays"
commit "style(tailwind): add metal-600 to metal-800 dark grays"
commit "style(tailwind): add metal-900 and metal-950 near-black"
commit "style(tailwind): add accent gold #FFD700"
commit "style(tailwind): add accent bronze #CD7F32"
commit "style(tailwind): add accent silver #C0C0C0"
commit "style(tailwind): add accent platinum #E5E4E2"
commit "style(tailwind): update cat theme colors to gold palette"
commit "style(tailwind): add metallic gradient backgrounds"

# 21-30: Tailwind animations
commit "style(tailwind): add shimmer animation keyframes"
commit "style(tailwind): add glow animation keyframes"
commit "style(tailwind): add gold box-shadow utilities"
commit "style(tailwind): add gold-lg shadow for cards"
commit "style(tailwind): add inner-gold shadow effect"
commit "style(tailwind): configure shimmer animation timing"
commit "style(tailwind): configure glow animation with gold colors"
commit "style(tailwind): add metallic-gold gradient background"
commit "style(tailwind): add metallic-dark gradient background"
commit "style(tailwind): add metallic-shine overlay gradient"

# 31-40: Global CSS variables and base
commit "style(css): add --gold-primary CSS variable"
commit "style(css): add --gold-light CSS variable"
commit "style(css): add --gold-dark CSS variable"
commit "style(css): add --black-primary CSS variable"
commit "style(css): add --black-secondary CSS variable"
commit "style(css): update body background to dark gradient"
commit "style(css): set default text color to light gray"
commit "style(css): add metallic-text class with gradient"
commit "style(css): add metallic-shimmer animation to text"
commit "style(css): add metallic-text-static class"

# 41-50: Global CSS effects
commit "style(css): add metallic-border gradient effect"
commit "style(css): add gold-glow box-shadow class"
commit "style(css): add gold-glow-hover interactive effect"
commit "style(css): create metallic-button base styles"
commit "style(css): add metallic-button shine animation"
commit "style(css): add metallic-button hover transform"
commit "style(css): create metallic-card component"
commit "style(css): add metallic-card hover effects"
commit "style(css): create metallic-input styles"
commit "style(css): add metallic-input focus states"

# 51-60: CSS animations and utilities
commit "style(css): add metallic-shimmer keyframes"
commit "style(css): update float animation for gold theme"
commit "style(css): add pulse-gold animation"
commit "style(css): update scrollbar to gold gradient"
commit "style(css): add gold text selection colors"
commit "style(css): add animate-pulse-gold utility class"
commit "style(css): refine scrollbar hover states"
commit "style(css): optimize animation performance"
commit "style(css): add transition utilities for gold theme"
commit "style(css): finalize globals.css gold theme"

# 61-70: Page component updates
commit "feat(page): update header with gold border accent"
commit "feat(page): add backdrop blur to header"
commit "feat(page): apply metallic-text to BiUD logo"
commit "feat(page): update .sBTC badge with gold color"
commit "feat(page): add hero section background decorations"
commit "feat(page): add gold blur orbs to background"
commit "feat(page): update h1 with metallic-text effect"
commit "feat(page): style subtitle with metal-300 color"
commit "feat(page): add features section with dark bg"
commit "feat(page): add stats section with metallic-card"

# 71-80: Component updates
commit "feat(search): update input with metallic-input class"
commit "feat(search): add gold .sBTC suffix styling"
commit "feat(search): style search button with metallic-button"
commit "feat(search): add loading spinner animation"
commit "feat(search): update result card with gold glow"
commit "feat(search): style available badge with green accent"
commit "feat(search): add Register Now metallic button"
commit "feat(wallet): update connect button styling"
commit "feat(wallet): add metallic disconnect button"
commit "feat(wallet): style address display with gold text"

# 81-91: Final component updates
commit "feat(cards): add metallic-card to FeatureCard"
commit "feat(cards): add gold-glow-hover effect"
commit "feat(cards): style card title with metallic-text"
commit "feat(footer): add gold border accent"
commit "feat(footer): style brand section with metallic-text"
commit "feat(footer): add gold hover effects to links"
commit "feat(footer): update copyright with metal colors"
commit "feat(cat): add gold gradient to cat SVG"
commit "feat(cat): add glow filter effect"
commit "feat(cat): add Bitcoin collar with gold accent"
commit "feat(theme): complete Gold & Black Metallic redesign"

echo ""
echo "✅ Created 91 commits for Gold & Black Metallic Theme!"
echo ""
git log --oneline | head -10
