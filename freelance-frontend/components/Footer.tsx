/**
 * Footer Component
 * Site footer with links, social media, and info
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wallet, Github, Twitter, Mail, ExternalLink } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Escrows', href: '/escrows' },
    { label: 'Disputes', href: '/disputes' },
    { label: 'How It Works', href: '#how-it-works' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Smart Contract', href: 'https://explorer.hiro.so' },
    { label: 'GitHub', href: 'https://github.com/TheDEV111/Freelance-guard' },
    { label: 'Support', href: '/support' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: 'https://twitter.com/freelanceguard', label: 'Twitter' },
  { icon: Github, href: 'https://github.com/TheDEV111/Freelance-guard', label: 'GitHub' },
  { icon: Mail, href: 'mailto:support@freelanceguard.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link href="/" className="flex items-center space-x-2 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold text-white">
                  FreelanceGuard
                </span>
              </Link>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed max-w-sm">
                Decentralized escrow platform for freelancers. Secure payments with 
                blockchain-powered smart contracts on Stacks.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                      aria-label={social.label}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Product Links */}
            <div className="lg:col-span-2">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-1"
                    >
                      <span>{link.label}</span>
                      {link.href.startsWith('http') && (
                        <ExternalLink className="w-3 h-3" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div className="lg:col-span-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              © {new Date().getFullYear()} FreelanceGuard. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
              <span>Built on</span>
              <a
                href="https://www.stacks.co"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
              >
                Stacks
              </a>
              <span>Blockchain</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
