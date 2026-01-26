/**
 * BiUD Frontend - Name Search Component
 * Search and check availability of .sBTC names
 * Gold & Black Metallic Theme
 */

'use client';

import { useState } from 'react';
import { isNameAvailable, getRegistrationFee, validateLabel, formatSTX, getFullName } from '../services/biud';

interface NameSearchProps {
  onNameSelected?: (label: string, available: boolean, fee: number) => void;
}

export default function NameSearch({ onNameSelected }: NameSearchProps) {
  const [label, setLabel] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{
    available: boolean;
    fee: number;
    error?: string;
  } | null>(null);

  const handleSearch = async () => {
    const validation = validateLabel(label.toLowerCase());
    if (!validation.valid) {
      setResult({ available: false, fee: 0, error: validation.error });
      return;
    }

    setIsChecking(true);
    try {
      const normalizedLabel = label.toLowerCase();
      const [available, fee] = await Promise.all([
        isNameAvailable(normalizedLabel),
        getRegistrationFee(normalizedLabel),
      ]);

      setResult({ available, fee });
      onNameSelected?.(normalizedLabel, available, fee);
    } catch (error) {
      setResult({ available: false, fee: 0, error: 'Failed to check availability' });
    } finally {
      setIsChecking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Search Input */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value.toLowerCase())}
            onKeyPress={handleKeyPress}
            placeholder="Search for a name..."
            className="w-full px-5 py-4 metallic-input rounded-xl text-lg placeholder-metal-500 pr-20"
            maxLength={32}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gold-500/70 font-medium">
            .sBTC
          </span>
        </div>
        <button
          onClick={handleSearch}
          disabled={isChecking || !label}
          className="px-8 py-4 metallic-button rounded-xl font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isChecking ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Checking
            </span>
          ) : (
            'Search'
          )}
        </button>
      </div>

      {/* Result Display */}
      {result && (
        <div className={`mt-6 p-5 rounded-xl transition-all ${
          result.error 
            ? 'bg-red-900/20 border border-red-500/30'
            : result.available 
              ? 'metallic-card gold-glow'
              : 'bg-metal-800/50 border border-metal-600/30'
        }`}>
          {result.error ? (
            <p className="text-red-400">{result.error}</p>
          ) : (
            <>
              <p className="font-bold text-xl metallic-text-static mb-3">
                {getFullName(label)}
              </p>
              {result.available ? (
                <div className="space-y-3">
                  <span className="inline-block px-3 py-1.5 bg-green-500/20 text-green-400 text-sm rounded-lg border border-green-500/30 font-medium">
                    ✓ Available
                  </span>
                  <p className="text-metal-300">
                    Registration fee: <strong className="text-gold-400">{formatSTX(result.fee)} STX</strong>
                  </p>
                  <button className="w-full mt-2 py-3 metallic-button rounded-lg font-semibold">
                    Register Now
                  </button>
                </div>
              ) : (
                <div>
                  <span className="inline-block px-3 py-1.5 bg-metal-700/50 text-metal-400 text-sm rounded-lg border border-metal-600/30 font-medium">
                    ✗ Taken
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
