/**
 * Stats Component
 * Display platform metrics and achievements
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Shield, Award } from 'lucide-react';

const stats = [
  {
    icon: Shield,
    value: '$2.5M+',
    label: 'Total Value Secured',
    description: 'In STX tokens',
  },
  {
    icon: Users,
    value: '1,200+',
    label: 'Active Users',
    description: 'Freelancers & Clients',
  },
  {
    icon: TrendingUp,
    value: '850+',
    label: 'Completed Escrows',
    description: 'Successfully delivered',
  },
  {
    icon: Award,
    value: '98%',
    label: 'Satisfaction Rate',
    description: 'No disputes needed',
  },
];

export default function Stats() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Trusted by Thousands
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-blue-100 max-w-3xl mx-auto px-4">
              Join a growing community of freelancers and clients securing millions in payments
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-full mb-4 sm:mb-6">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>

                  {/* Value */}
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-xs sm:text-sm text-blue-100">
                    {stat.description}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
