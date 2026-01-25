#!/bin/bash
cd ~/biud-contribution

# Add more features section and footer
cat >> frontend/src/app/page.tsx << 'ADDEOF'

      {/* Features Section */}
      <section className="py-20 px-4 bg-wood-100 dark:bg-wood-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-wood-800 dark:text-wood-100 mb-12">
            Why BiUD?
          </h2>
        </div>
      </section>
ADDEOF
git add -A && git commit -m "feat(page): add features section header"

# Add feature cards one by one
cat > frontend/src/components/FeatureCard.tsx << 'EOF'
'use client';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

export default function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-wood-50 dark:bg-wood-800 rounded-xl border border-wood-200 dark:border-wood-700 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold mb-2 text-wood-800 dark:text-wood-100">{title}</h3>
      <p className="text-wood-600 dark:text-wood-300">{description}</p>
    </div>
  );
}
EOF
git add -A && git commit -m "feat(ui): create FeatureCard component"

# Add hover animation
cat > frontend/src/components/FeatureCard.tsx << 'EOF'
'use client';

interface FeatureCardProps {
  emoji: string;
  title: string;
  description: string;
}

export default function FeatureCard({ emoji, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 bg-wood-50 dark:bg-wood-800 rounded-xl border border-wood-200 dark:border-wood-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="text-4xl mb-4 animate-bounce-slow">{emoji}</div>
      <h3 className="text-xl font-semibold mb-2 text-wood-800 dark:text-wood-100">{title}</h3>
      <p className="text-wood-600 dark:text-wood-300">{description}</p>
    </div>
  );
}
EOF
git add -A && git commit -m "feat(ui): add hover animation to FeatureCard"

# Create CatPaw component
cat > frontend/src/components/CatPaw.tsx << 'EOF'
'use client';

export default function CatPaw({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <span className="text-2xl">🐾</span>
    </div>
  );
}
EOF
git add -A && git commit -m "feat(ui): create CatPaw decorative component"

# Add animated cat paw trail
cat > frontend/src/components/CatPaw.tsx << 'EOF'
'use client';

export default function CatPaw({ className = '', delay = 0 }: { className?: string; delay?: number }) {
  return (
    <div 
      className={`relative animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="text-2xl opacity-30">🐾</span>
    </div>
  );
}
EOF
git add -A && git commit -m "feat(ui): add animation delay to CatPaw"

# Create wooden button component
cat > frontend/src/components/WoodButton.tsx << 'EOF'
'use client';

interface WoodButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function WoodButton({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}: WoodButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-wood-600 hover:bg-wood-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-wood-200 hover:bg-wood-300 text-wood-800 dark:bg-wood-700 dark:hover:bg-wood-600 dark:text-wood-100"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
EOF
git add -A && git commit -m "feat(ui): create WoodButton component"

# Add wood grain effect to button
cat > frontend/src/components/WoodButton.tsx << 'EOF'
'use client';

interface WoodButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
}

export default function WoodButton({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary' 
}: WoodButtonProps) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 wood-grain";
  const variants = {
    primary: "bg-wood-600 hover:bg-wood-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5",
    secondary: "bg-wood-200 hover:bg-wood-300 text-wood-800 dark:bg-wood-700 dark:hover:bg-wood-600 dark:text-wood-100"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-0.5'}`}
    >
      {children}
    </button>
  );
}
EOF
git add -A && git commit -m "style(ui): add wood grain effect to WoodButton"

# Create footer component
cat > frontend/src/components/Footer.tsx << 'EOF'
'use client';

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-wood-300 dark:border-wood-700 bg-wood-100 dark:bg-wood-900">
      <div className="max-w-6xl mx-auto text-center text-wood-600 dark:text-wood-400">
        <p>BiUD — Bitcoin Username Domain 🐱</p>
        <p className="text-sm mt-2">Built on Stacks • Secured by Bitcoin</p>
      </div>
    </footer>
  );
}
EOF
git add -A && git commit -m "feat(ui): create Footer component"

# Add cat paws to footer
cat > frontend/src/components/Footer.tsx << 'EOF'
'use client';

import CatPaw from './CatPaw';

export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-wood-300 dark:border-wood-700 bg-wood-100 dark:bg-wood-900 relative overflow-hidden">
      <CatPaw className="absolute left-4 top-2" delay={0} />
      <CatPaw className="absolute left-12 top-6" delay={0.2} />
      <CatPaw className="absolute left-20 top-3" delay={0.4} />
      <div className="max-w-6xl mx-auto text-center text-wood-600 dark:text-wood-400">
        <p>BiUD — Bitcoin Username Domain 🐱</p>
        <p className="text-sm mt-2">Built on Stacks • Secured by Bitcoin</p>
        <p className="text-xs mt-4">© 2026 BiUD. All rights reserved.</p>
      </div>
      <CatPaw className="absolute right-20 top-3" delay={0.5} />
      <CatPaw className="absolute right-12 top-6" delay={0.3} />
      <CatPaw className="absolute right-4 top-2" delay={0.1} />
    </footer>
  );
}
EOF
git add -A && git commit -m "feat(ui): add cat paw decorations to footer"

# Update theme toggle with cat theme
cat > frontend/src/components/ThemeToggle.tsx << 'EOF'
'use client';

import { useState, useEffect } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('biud-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('biud-theme', 'light');
    }
  };

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-wood-200 dark:bg-wood-700 hover:bg-wood-300 dark:hover:bg-wood-600 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? '🌙' : '☀️'}
    </button>
  );
}
EOF
git add -A && git commit -m "style(ui): update ThemeToggle with wooden theme"

echo "Batch 4 complete"
git log --oneline | wc -l
