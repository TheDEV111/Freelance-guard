/**
 * About Us Component
 * Explains FreelanceGuard mission and value proposition
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Zap, Globe } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Smart contracts ensure funds are secure and released only when milestones are completed.',
  },
  {
    icon: Users,
    title: 'Fair for Everyone',
    description: 'Balanced escrow system protects both freelancers and clients from fraud.',
  },
  {
    icon: Zap,
    title: 'Fast & Efficient',
    description: 'No intermediaries means faster payments and lower fees.',
  },
  {
    icon: Globe,
    title: 'Decentralized',
    description: 'Built on Stacks blockchain for transparency and reliability.',
  },
];

export default function AboutUs() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              About FreelanceGuard
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We're revolutionizing freelance payments with blockchain technology. 
              No more disputes, delayed payments, or trust issues—just transparent, 
              milestone-based escrow.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl p-6 md:p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 sm:mb-6">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {value.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 md:mt-16 lg:mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 lg:p-16 text-white"
          >
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                Our Mission
              </h3>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-90">
                To empower freelancers and clients worldwide with a trustless, transparent payment 
                system that eliminates disputes and ensures fair compensation for completed work. 
                We believe in a future where smart contracts replace middlemen, and blockchain 
                technology creates a level playing field for all.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
