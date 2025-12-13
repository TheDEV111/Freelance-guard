/**
 * How It Works Component
 * Step-by-step guide explaining the escrow process
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, DollarSign, ArrowRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: FileText,
    title: 'Create Escrow',
    description: 'Client creates an escrow agreement with project details, milestones, and amounts. Funds are locked in the smart contract.',
  },
  {
    number: '02',
    icon: CheckCircle,
    title: 'Complete Milestones',
    description: 'Freelancer works on deliverables and submits each milestone with proof of completion.',
  },
  {
    number: '03',
    icon: AlertCircle,
    title: 'Review & Approve',
    description: 'Client reviews the work. If satisfied, approves the milestone. If not, can reject or raise a dispute.',
  },
  {
    number: '04',
    icon: DollarSign,
    title: 'Automatic Payment',
    description: 'Once approved, the smart contract automatically releases payment to the freelancer—no delays.',
  },
];

export default function HowItWorks() {
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
            className="text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              How It Works
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Four simple steps to secure payments and protect your work
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Connector Arrow (hidden on mobile, last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-16 -right-5 xl:-right-8">
                      <ArrowRight className="w-6 h-6 xl:w-8 xl:h-8 text-blue-300" />
                    </div>
                  )}

                  <div className="text-center">
                    {/* Step Number */}
                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-blue-50 mb-4">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full mb-4 sm:mb-6">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-2">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-10 sm:mt-12 md:mt-16 lg:mt-20"
          >
            <a
              href="/dashboard"
              className="inline-flex items-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <span>Start Your First Escrow</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
