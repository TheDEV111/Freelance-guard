/**
 * FAQ Component
 * Frequently Asked Questions with accordion functionality
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How does FreelanceGuard work?',
    answer: 'FreelanceGuard uses smart contracts on the Stacks blockchain to hold funds in escrow. When a client creates an escrow, funds are locked in the contract. As the freelancer completes milestones, the client approves them, and payments are automatically released.',
  },
  {
    question: 'What are milestones?',
    answer: 'Milestones are checkpoints in a project. Instead of paying everything upfront, the project is divided into smaller deliverables. Each milestone has its own amount and deadline, reducing risk for both parties.',
  },
  {
    question: 'What happens if there\'s a dispute?',
    answer: 'If a client rejects a milestone, either party can raise a dispute. An independent arbitrator reviews the case and decides how to distribute the funds fairly. The smart contract automatically executes the arbitrator\'s decision.',
  },
  {
    question: 'Are my funds safe?',
    answer: 'Yes! Funds are secured by Clarity smart contracts on the Stacks blockchain. The code is immutable and audited. Funds can only be released when milestones are approved or through arbitrator resolution.',
  },
  {
    question: 'What fees does FreelanceGuard charge?',
    answer: 'FreelanceGuard only charges blockchain transaction fees (gas fees) for executing smart contract functions. There are no platform fees or commissions—just the minimal cost of running transactions on Stacks.',
  },
  {
    question: 'Can I use FreelanceGuard for any type of project?',
    answer: 'Yes! FreelanceGuard is designed for any freelance work that can be broken into milestones—web development, design, writing, consulting, and more. As long as deliverables can be defined, our platform can secure the payment.',
  },
  {
    question: 'How do I connect my wallet?',
    answer: 'Click "Connect Wallet" in the navbar and choose your Stacks wallet (like Hiro Wallet or Xverse). You\'ll need testnet or mainnet STX tokens to create escrows and pay transaction fees.',
  },
  {
    question: 'What\'s the difference between testnet and mainnet?',
    answer: 'Testnet uses fake STX tokens for testing and learning how the platform works. Mainnet uses real STX and is for actual projects with real money. You can switch between them in the navbar.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10 sm:mb-12 md:mb-16"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full mb-4 sm:mb-6">
              <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Everything you need to know about FreelanceGuard
            </p>
          </motion.div>

          {/* FAQ List */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 flex items-center justify-between text-left"
                >
                  <span className="text-base sm:text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 md:px-8 pb-4 sm:pb-5 md:pb-6">
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 sm:mt-12 md:mt-16 text-center"
          >
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Still have questions?
            </p>
            <a
              href="mailto:support@freelanceguard.com"
              className="inline-block px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-medium rounded-lg transition-colors"
            >
              Contact Support
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
