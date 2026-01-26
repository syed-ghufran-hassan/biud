'use client';

import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import ThemeToggle from '../components/ThemeToggle';
import FloatingCat from '../components/FloatingCat';
import NameSearch from '../components/NameSearch';
import FeatureCard from '../components/FeatureCard';
import Footer from '../components/Footer';

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
    <div className="min-h-screen bg-metal-950">
      {/* Header */}
      <header className="border-b border-gold-500/20 bg-metal-900/90 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FloatingCat />
            <span className="text-2xl font-bold metallic-text">BiUD</span>
            <span className="text-sm text-gold-500/70 font-medium">.sBTC</span>
          </div>
          <div className="flex items-center gap-3">
            <WalletConnect
              onConnect={(address) => setConnectedAddress(address)}
              onDisconnect={() => setConnectedAddress(null)}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <FloatingCat />
              <div className="absolute -inset-4 bg-gold-500/10 rounded-full blur-xl" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="metallic-text">Your Bitcoin Username</span>
          </h1>
          
          <p className="text-xl text-metal-300 mb-12 max-w-2xl mx-auto">
            Register your unique <span className="metallic-text-static font-semibold">.sBTC</span> name 
            on the Bitcoin blockchain. Own your digital identity forever.
          </p>
          
          <NameSearch onNameSelected={handleNameSelected} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-metal-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="metallic-text">Why BiUD?</span>
          </h2>
          <p className="text-metal-400 text-center mb-12 max-w-2xl mx-auto">
            The premier Bitcoin username service built on Stacks
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon="🔐"
              title="Secure & Decentralized"
              description="Your name is stored on the Bitcoin blockchain, giving you true ownership and censorship resistance."
            />
            <FeatureCard 
              icon="⚡"
              title="Lightning Fast"
              description="Register in seconds with low transaction fees. No lengthy verification or approval process."
            />
            <FeatureCard 
              icon="🌐"
              title="Universal Identity"
              description="Use your .sBTC name across all compatible apps, wallets, and services in the Bitcoin ecosystem."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="metallic-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold metallic-text mb-2">10K+</div>
                <div className="text-metal-400">Names Registered</div>
              </div>
              <div>
                <div className="text-4xl font-bold metallic-text mb-2">0.1 STX</div>
                <div className="text-metal-400">Starting Price</div>
              </div>
              <div>
                <div className="text-4xl font-bold metallic-text mb-2">∞</div>
                <div className="text-metal-400">Possibilities</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
