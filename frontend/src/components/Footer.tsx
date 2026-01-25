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
