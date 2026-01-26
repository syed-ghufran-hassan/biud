/**
 * BiUD Frontend - Wallet Connection Component
 * Gold & Black Metallic Theme
 */

'use client';

import { useState, useEffect } from 'react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { getPrimaryName } from '../services/biud';

const appConfig = new AppConfig(['store_write', 'publish_data']);

let userSession: UserSession | null = null;
if (typeof window !== 'undefined') {
  userSession = new UserSession({ appConfig });
}

const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

export default function WalletConnect({ onConnect, onDisconnect }: WalletConnectProps) {
  const [address, setAddress] = useState<string | null>(null);
  const [primaryName, setPrimaryName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
    handlePendingSignIn();
  }, []);

  useEffect(() => {
    if (address) {
      fetchPrimaryName(address);
    } else {
      setPrimaryName(null);
    }
  }, [address]);

  const fetchPrimaryName = async (addr: string) => {
    try {
      const name = await getPrimaryName(addr);
      if (name) {
        setPrimaryName(name.fullName);
      } else {
        setPrimaryName(null);
      }
    } catch (error) {
      console.error('Error fetching primary name:', error);
      setPrimaryName(null);
    }
  };

  const handlePendingSignIn = async () => {
    if (typeof window === 'undefined' || !userSession) return;
    
    try {
      if (userSession.isSignInPending()) {
        const userData = await userSession.handlePendingSignIn();
        if (userData) {
          const userAddress = userData?.profile?.stxAddress?.mainnet;
          if (userAddress) {
            setAddress(userAddress);
            onConnect?.(userAddress);
          }
        }
      }
    } catch (e) {
      console.error('Error handling pending sign-in:', e);
    }
  };

  const clearSession = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('blockstack-session');
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('blockstack') || key.startsWith('stacks')) {
            localStorage.removeItem(key);
          }
        });
      } catch (e) {}
    }
    setAddress(null);
  };

  const checkSession = () => {
    if (typeof window === 'undefined' || !userSession) {
      setIsLoading(false);
      return;
    }

    try {
      const sessionData = localStorage.getItem('blockstack-session');
      if (!sessionData) {
        setIsLoading(false);
        return;
      }

      if (userSession.isUserSignedIn()) {
        const userData = userSession.loadUserData();
        const userAddress = userData?.profile?.stxAddress?.mainnet;
        if (userAddress) {
          setAddress(userAddress);
          onConnect?.(userAddress);
        }
      }
    } catch (e) {
      clearSession();
    }
    setIsLoading(false);
  };

  const handleConnect = () => {
    if (!userSession) return;
    
    showConnect({
      appDetails: {
        name: 'BiUD - Bitcoin Username Domain',
        icon: typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png',
      },
      onFinish: (payload) => {
        try {
          const addressFromPayload = payload?.userSession?.loadUserData()?.profile?.stxAddress?.mainnet;
          
          if (addressFromPayload) {
            setAddress(addressFromPayload);
            onConnect?.(addressFromPayload);
            return;
          }
          
          if (userSession?.isUserSignedIn()) {
            const userData = userSession.loadUserData();
            const userAddress = userData?.profile?.stxAddress?.mainnet;
            if (userAddress) {
              setAddress(userAddress);
              onConnect?.(userAddress);
            }
          }
        } catch (e) {
          console.error('Connection finish error:', e);
          setTimeout(() => {
            checkSession();
          }, 500);
        }
      },
      onCancel: () => {},
      userSession,
    });
  };

  const handleDisconnect = () => {
    try {
      userSession?.signUserOut();
    } catch (e) {}
    
    clearSession();
    setPrimaryName(null);
    onDisconnect?.();
  };

  if (isLoading) {
    return (
      <button disabled className="px-4 py-2 bg-metal-700 text-metal-400 rounded-lg opacity-50">
        Loading...
      </button>
    );
  }

  if (address) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          {primaryName ? (
            <span className="text-sm font-semibold metallic-text-static">
              {primaryName}
            </span>
          ) : null}
          <span className="text-xs text-metal-400">
            {address.slice(0, 6)}...{address.slice(-4)}
          </span>
        </div>
        <button
          onClick={handleDisconnect}
          className="px-4 py-2 bg-metal-800 hover:bg-metal-700 text-metal-300 hover:text-white rounded-lg transition-all border border-metal-600/50 hover:border-gold-500/30"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleConnect}
        className="metallic-button px-6 py-2.5 rounded-lg font-semibold"
      >
        Connect Wallet
      </button>
      {isMobileDevice() && (
        <p className="text-xs text-metal-500 text-center max-w-[200px]">
          Use Xverse mobile app for best experience
        </p>
      )}
    </div>
  );
}

export { userSession };
