'use client';

import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import ThemeToggle from '../components/ThemeToggle';

export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-wood-50">
      <header className="border-b border-wood-300 bg-wood-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-wood-800">BiUD</span>
          <ThemeToggle />
        </div>
      </header>
    </div>
  );
}
