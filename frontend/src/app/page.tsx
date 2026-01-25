'use client';

import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import ThemeToggle from '../components/ThemeToggle';
import FloatingCat from '../components/FloatingCat';

export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-950">
      <header className="border-b border-wood-300 dark:border-wood-700 bg-wood-100 dark:bg-wood-900">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FloatingCat />
            <span className="text-2xl font-bold text-wood-800 dark:text-wood-100">BiUD</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <WalletConnect
              onConnect={(address) => setConnectedAddress(address)}
              onDisconnect={() => setConnectedAddress(null)}
            />
          </div>
        </div>
      </header>
    </div>
  );
}
