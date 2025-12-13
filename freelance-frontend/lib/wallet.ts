/**
 * Stacks Connect Wallet Integration
 * Modern approach using @stacks/connect v8.x
 */

'use client';

import { connect, disconnect, getLocalStorage, isConnected } from '@stacks/connect';

export interface WalletConnection {
  address: string;
  publicKey?: string;
}

export const connectWallet = async (network: 'mainnet' | 'testnet' = 'testnet'): Promise<WalletConnection[]> => {
  try {
    // Connect using the modern connect() function
    const result = await connect({
      forceWalletSelect: true, // Always show wallet selection modal
    });

    // Filter addresses by network
    const addresses = result.addresses.filter(addr => {
      const isMainnet = addr.address.startsWith('SP') || addr.address.startsWith('SM');
      return network === 'mainnet' ? isMainnet : !isMainnet;
    });

    return addresses;
  } catch (error) {
    console.error('Wallet connection failed:', error);
    throw error;
  }
};

export const disconnectWallet = () => {
  disconnect();
};

export const isWalletConnected = (): boolean => {
  return isConnected();
};

export const getConnectedAddresses = () => {
  const storage = getLocalStorage();
  return storage?.addresses || { stx: [], btc: [] };
};

export const getCurrentAddress = (network: 'mainnet' | 'testnet' = 'testnet'): string | null => {
  const { stx } = getConnectedAddresses();
  
  if (stx.length === 0) return null;

  // Filter by network
  const address = stx.find(addr => {
    const isMainnet = addr.address.startsWith('SP') || addr.address.startsWith('SM');
    return network === 'mainnet' ? isMainnet : !isMainnet;
  });

  return address?.address || stx[0]?.address || null;
};
