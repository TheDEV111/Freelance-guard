/**
 * Wallet Context Provider
 * Manages wallet connection state across the application
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { userSession, connectWallet, disconnectWallet, getUserAddress } from '@/lib/wallet';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  connect: () => void;
  disconnect: () => void;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  connect: () => {},
  disconnect: () => {},
  loading: true,
});

export const useWallet = () => useContext(WalletContext);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already signed in
    const checkConnection = () => {
      if (userSession.isUserSignedIn()) {
        setIsConnected(true);
        const userAddress = getUserAddress();
        setAddress(userAddress);
      }
      setLoading(false);
    };

    checkConnection();
  }, []);

  const connect = () => {
    connectWallet({
      onFinish: () => {
        setIsConnected(true);
        const userAddress = getUserAddress();
        setAddress(userAddress);
      },
    });
  };

  const disconnect = () => {
    disconnectWallet();
    setIsConnected(false);
    setAddress(null);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        connect,
        disconnect,
        loading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
