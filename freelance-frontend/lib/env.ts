/**
 * Environment variables configuration
 */

export const ENV = {
  // Default network for the application
  NETWORK: (process.env.NEXT_PUBLIC_NETWORK as 'testnet' | 'mainnet') || 'testnet',
  
  // App metadata
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'FreelanceGuard',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Feature flags
  ENABLE_MAINNET: process.env.NEXT_PUBLIC_ENABLE_MAINNET === 'true',
} as const;
