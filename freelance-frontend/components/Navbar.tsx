/**
 * Navbar Component
 * Main navigation with Stacks Connect wallet integration and animated active state
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wallet,
  LayoutDashboard,
  FileText,
  AlertCircle,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Globe,
} from 'lucide-react';
import { useWallet } from '@/lib/wallet-context';
import { truncateAddress } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/escrows', label: 'Escrows', icon: FileText },
  { href: '/disputes', label: 'Disputes', icon: AlertCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isConnected, address, network, connect, disconnect, switchNetwork, loading } = useWallet();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [networkMenuOpen, setNetworkMenuOpen] = useState(false);

  const handleConnect = () => {
    connect();
    setMobileMenuOpen(false);
  };

  const handleDisconnect = () => {
    disconnect();
    setUserMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
              >
                <Wallet className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-xl font-bold text-gray-900">
                FreelanceGuard
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-1"
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative px-4 py-2 cursor-pointer group"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={`w-4 h-4 transition-colors ${
                        isActive ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'
                      }`} />
                      <span className={`text-sm font-medium transition-colors ${
                        isActive ? 'text-blue-600' : 'text-gray-700 group-hover:text-blue-600'
                      }`}>
                        {item.label}
                      </span>
                    </div>

                    {/* Animated underline */}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                        initial={false}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}

                    {/* Hover effect */}
                    {!isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 opacity-0 group-hover:opacity-100"
                        initial={false}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </motion.div>

          {/* Wallet Connection & Network Switcher */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center space-x-3"
          >
            {/* Network Switcher */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setNetworkMenuOpen(!networkMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium capitalize">{network}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${networkMenuOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              {/* Network dropdown */}
              <AnimatePresence>
                {networkMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
                  >
                    <button
                      onClick={() => {
                        switchNetwork('testnet');
                        setNetworkMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                        network === 'testnet' ? 'text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${network === 'testnet' ? 'bg-blue-600' : 'bg-gray-300'}`} />
                      <span>Testnet</span>
                    </button>
                    <button
                      onClick={() => {
                        switchNetwork('mainnet');
                        setNetworkMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                        network === 'mainnet' ? 'text-blue-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full ${network === 'mainnet' ? 'bg-blue-600' : 'bg-gray-300'}`} />
                      <span>Mainnet</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {loading ? (
              <div className="w-32 h-10 bg-gray-200 animate-pulse rounded-lg" />
            ) : isConnected && address ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="text-sm font-medium">{truncateAddress(address, 6)}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* User dropdown menu */}
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                    >
                      <button
                        onClick={handleDisconnect}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Disconnect</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleConnect}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Wallet className="w-4 h-4" />
                <span className="text-sm font-medium">Connect Wallet</span>
              </motion.button>
            )}
          </motion.div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 bg-white"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Mobile wallet connection & network */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {/* Network Switcher Mobile */}
                <div>
                  <p className="text-xs text-gray-500 px-4 mb-2">Network</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => switchNetwork('testnet')}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        network === 'testnet'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Testnet
                    </button>
                    <button
                      onClick={() => switchNetwork('mainnet')}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        network === 'mainnet'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Mainnet
                    </button>
                  </div>
                </div>

                {loading ? (
                  <div className="w-full h-12 bg-gray-200 animate-pulse rounded-lg" />
                ) : isConnected && address ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 bg-gray-50 rounded-lg">
                      <p className="text-xs text-gray-500">Connected Wallet</p>
                      <p className="text-sm font-medium text-gray-900">{truncateAddress(address)}</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDisconnect}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm font-medium">Disconnect</span>
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={handleConnect}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-colors"
                  >
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-medium">Connect Wallet</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
