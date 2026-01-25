'use client';

import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import ThemeToggle from '../components/ThemeToggle';
import FloatingCat from '../components/FloatingCat';
import NameSearch from '../components/NameSearch';

export default function Home() {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [registrationFee, setRegistrationFee] = useState<number>(0);

  const handleNameSelected = (label: string, available: boolean, fee: number) => {
    setSelectedName(label);
    setIsAvailable(available);
    setRegistrationFee(fee);
  };

  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-950 wood-grain">
      <header className="border-b border-wood-300 dark:border-wood-700 bg-wood-100/90 dark:bg-wood-900/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FloatingCat />
            <span className="text-2xl font-bold text-wood-800 dark:text-wood-100">BiUD</span>
            <span className="text-sm text-wood-500">.sBTC</span>
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

      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <FloatingCat />
          </div>
          <h1 className="text-5xl font-bold text-wood-900 dark:text-wood-50 mb-6">
            Your Bitcoin Username
          </h1>
          <p className="text-xl text-wood-600 dark:text-wood-300 mb-12">
            Register your unique <span className="text-cat-orange font-semibold">.sBTC</span> name on the Bitcoin blockchain.
          </p>
          <NameSearch onNameSelected={handleNameSelected} />
        </div>
      </section>
    </div>
  );
}

      {/* Features Section */}
      <section className="py-20 px-4 bg-wood-100 dark:bg-wood-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-wood-800 dark:text-wood-100 mb-12">
            Why BiUD?
          </h2>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-wood-100 dark:bg-wood-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-wood-800 dark:text-wood-100 mb-12">
            Why BiUD?
          </h2>
        </div>
      </section>
