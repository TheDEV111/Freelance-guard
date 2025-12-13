/**
 * Stacks Connect Wallet Integration
 * Handles wallet connection and authentication using Stacks Connect
 */

'use client';

import { AppConfig, UserSession, showConnect } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

export interface AuthOptions {
  onFinish?: (payload: any) => void;
  onCancel?: () => void;
}

export const connectWallet = (options?: AuthOptions) => {
  showConnect({
    appDetails: {
      name: 'FreelanceGuard',
      icon: typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '/logo.png',
    },
    redirectTo: '/',
    onFinish: (payload: any) => {
      console.log('Wallet connected:', payload);
      // Trigger a state update instead of full page reload
      if (options?.onFinish) {
        options.onFinish(payload);
      }
    },
    onCancel: () => {
      console.log('Wallet connection cancelled');
      options?.onCancel?.();
    },
    userSession,
  });
};

export const disconnectWallet = () => {
  userSession.signUserOut();
};

export const isUserSignedIn = () => {
  return userSession.isUserSignedIn();
};

export const getUserData = () => {
  return userSession.loadUserData();
};

export const getUserAddress = () => {
  if (!isUserSignedIn()) return null;
  const userData = getUserData();
  
  // Get the network from localStorage to determine which address to use
  const network = (typeof window !== 'undefined' ? localStorage.getItem('network') : null) || 'testnet';
  
  if (network === 'mainnet') {
    return userData.profile.stxAddress.mainnet;
  }
  return userData.profile.stxAddress.testnet;
};
