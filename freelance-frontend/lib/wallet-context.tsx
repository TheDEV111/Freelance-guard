/**
 * Wallet Context Provider
 * Manages wallet connection state and network selection across the application
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { userSession, connectWallet, disconnectWallet, getUserAddress } from '@/lib/wallet';
import { NetworkType } from '@/lib/stacks-config';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  network: NetworkType;
  connect: () => void;
  disconnect: () => void;
  switchNetwork: (network: NetworkType) => void;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  network: 'testnet',
  connect: () => {},
  disconnect: () => {},
  switchNetwork: () => {},
  loading: true,
});

export const useWallet = () => useContext(WalletContext);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<NetworkType>('testnet');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already signed in
    const checkConnection = () => {
      if (userSession.isUserSignedIn()) {
        setIsConnected(true);
        const userAddress = getUserAddress();
        setAddress(userAddress);
      }
      
      // Load network preference from localStorage
      const savedNetwork = localStorage.getItem('network') as NetworkType;
      if (savedNetwork && (savedNetwork === 'testnet' || savedNetwork === 'mainnet')) {
        setNetwork(savedNetwork);
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

  const switchNetwork = (newNetwork: NetworkType) => {
    setNetwork(newNetwork);
    localStorage.setItem('network', newNetwork);
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        network,
        connect,
        disconnect,
        switchNetwork,
        loading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}
