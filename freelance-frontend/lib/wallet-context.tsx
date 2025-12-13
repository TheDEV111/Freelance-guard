/**
 * Wallet Context Provider
 * Manages wallet connection state and network selection across the application
 */

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { connectWallet, disconnectWallet, isWalletConnected, getCurrentAddress } from '@/lib/wallet';
import { NetworkType } from '@/lib/stacks-config';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  network: NetworkType;
  connect: () => Promise<void>;
  disconnect: () => void;
  switchNetwork: (network: NetworkType) => void;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  address: null,
  network: 'testnet',
  connect: async () => {},
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
    // Check if wallet is already connected
    const checkConnection = () => {
      const connected = isWalletConnected();
      setIsConnected(connected);
      
      if (connected) {
        const savedNetwork = (localStorage.getItem('network') as NetworkType) || 'testnet';
        setNetwork(savedNetwork);
        const userAddress = getCurrentAddress(savedNetwork);
        setAddress(userAddress);
      }
      
      setLoading(false);
    };

    checkConnection();
  }, []);

  const connect = async () => {
    try {
      await connectWallet(network);
      
      // Update state after successful connection
      setIsConnected(true);
      const userAddress = getCurrentAddress(network);
      setAddress(userAddress);
    } catch (error) {
      console.error('Connection error:', error);
      throw error;
    }
  };

  const disconnect = () => {
    disconnectWallet();
    setIsConnected(false);
    setAddress(null);
  };

  const switchNetwork = (newNetwork: NetworkType) => {
    setNetwork(newNetwork);
    localStorage.setItem('network', newNetwork);
    
    // Update address for new network if connected
    if (isConnected) {
      const userAddress = getCurrentAddress(newNetwork);
      setAddress(userAddress);
    }
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
