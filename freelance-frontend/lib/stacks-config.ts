/**
 * Stacks Network Configuration
 * Configure network settings for testnet and mainnet
 */

import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const NETWORK_CONFIG = {
  testnet: {
    network: new StacksTestnet(),
    contractAddress: 'STVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2BKDND68',
    contractName: 'escrow',
    explorerUrl: 'https://explorer.hiro.so',
    apiUrl: 'https://api.testnet.hiro.so',
  },
  mainnet: {
    network: new StacksMainnet(),
    contractAddress: 'SPVQ61FEWR6M4HVAT3BNE07D4BNW6A1C2ACCNQ6F',
    contractName: 'escrow',
    explorerUrl: 'https://explorer.hiro.so',
    apiUrl: 'https://api.hiro.so',
  },
} as const;

export type NetworkType = keyof typeof NETWORK_CONFIG;

// Default to testnet during development
export const DEFAULT_NETWORK: NetworkType = 'testnet';

export const getNetworkConfig = (network: NetworkType = DEFAULT_NETWORK) => {
  return NETWORK_CONFIG[network];
};
