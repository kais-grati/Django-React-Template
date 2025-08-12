import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants, useInView } from 'framer-motion';
import { Plus, HelpCircle, MessageCircle, Phone, Mail } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-100px 0px",
    amount: 0.2
  });

  const faqData: FAQItem[] = [
    {
      id: '1',
      question: 'How do I get started with your platform?',
      answer: 'Getting started is easy! Simply sign up for a free account, verify your email, and you can begin using our platform immediately. We offer a comprehensive onboarding guide and 24/7 support to help you through the process.',
      category: 'getting-started'
    },
    {
      id: '2',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, bank transfers, and cryptocurrency payments. All transactions are secured with industry-standard encryption.',
      category: 'billing'
    },
    {
      id: '3',
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 30-day free trial with full access to all features. No credit card required to start. You can upgrade, downgrade, or cancel anytime during or after your trial period.',
      category: 'billing'
    },
    {
      id: '4',
      question: 'How secure is my data?',
      answer: 'Security is our top priority. We use enterprise-grade encryption, regular security audits, and comply with SOC 2 Type II standards. Your data is stored in secure, redundant servers with 99.9% uptime guarantee.',
      category: 'security'
    },
    {
      id: '5',
      question: 'Can I integrate with other tools?',
      answer: 'Absolutely! We offer integrations with over 100+ popular tools including Slack, Zapier, Google Workspace, Microsoft 365, and many more. We also provide a robust API for custom integrations.',
      category: 'integrations'
    },
    {
      id: '6',
      question: 'What kind of customer support do you offer?',
      answer: 'We provide 24/7 customer support through live chat, email, and phone. Our support team consists of product experts who can help with technical issues, account questions, and general guidance.',
      category: 'support'
    },
    {
      id: '7',
      question: 'Can I change my plan at any time?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated. There are no long-term contracts or cancellation fees.',
      category: 'billing'
    },
    {
      id: '8',
      question: 'Do you offer team collaboration features?',
      answer: 'Yes! Our platform includes robust team collaboration tools including real-time editing, commenting, task assignment, role-based permissions, and team analytics dashboards.',
      category: 'features'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'getting-started', name: 'Getting Started', icon: MessageCircle },
    { id: 'billing', name: 'Billing & Plans', icon: Phone },
    { id: 'security', name: 'Security', icon: Mail },
    { id: 'integrations', name: 'Integrations', icon: HelpCircle },
    { id: 'support', name: 'Support', icon: MessageCircle },
    { id: 'features', name: 'Features', icon: HelpCircle }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleItem = (id: string): void => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const answerVariants: Variants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10
    },
    visible: {
      opacity: 1,
      height: 'auto',
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden py-20 px-4">
      {/* Radial Gradient Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>
      
      {/* Secondary gradient for depth */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-gradient-to-r from-cyan-300/15 via-blue-300/15 to-indigo-300/15 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -40 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl"
          >
            <HelpCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about our platform, features, and services. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200
                  ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-200'
                    : 'bg-white/80 text-gray-600 hover:bg-gray-50 shadow-md border border-gray-200'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* FAQ Items */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-4"
        >
          <AnimatePresence mode="wait">
            {filteredFAQs.map((item, index) => (
              <motion.div
                key={`${activeCategory}-${item.id}`}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                layout
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <motion.button
                    onClick={() => toggleItem(item.id)}
                    className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-2xl"
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200 pr-4">
                        {item.question}
                      </h3>
                      <motion.div
                        animate={{ rotate: openItems.has(item.id) ? 45 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md"
                      >
                        <Plus className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                  </motion.button>

                  <AnimatePresence>
                    {openItems.has(item.id) && (
                      <motion.div
                        variants={answerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-4"></div>
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-600 leading-relaxed text-base md:text-lg"
                          >
                            {item.answer}
                          </motion.p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border border-blue-100"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6 text-lg">
            Our friendly support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-50"
            >
              Contact Support
            </motion.button>
            
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;