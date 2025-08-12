import React, { useState, useRef } from 'react';
import { motion, type Variants, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  buttonStyle: string;
  isPopular: boolean;
}

const PricingBoxes: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true, // Only trigger once
    margin: "-100px 0px", // Trigger when 100px before entering viewport
    amount: 0.3 // Trigger when 30% of the element is visible
  });

  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$9',
      description: 'Good for anyone who is self-employed and just getting started.',
      features: [
        'Send 10 quotes and invoices',
        'Connect up to 2 bank accounts',
        'Track up to 15 expenses per month',
        'Manual payroll support',
        'Export up to 3 reports'
      ],
      buttonStyle: 'border border-gray-600 text-gray-300 hover:bg-gray-800',
      isPopular: false
    },
    {
      id: 'small-business',
      name: 'Small business',
      price: '$15',
      description: 'Perfect for small / medium sized businesses.',
      features: [
        'Send 25 quotes and invoices',
        'Connect up to 5 bank accounts',
        'Track up to 50 expenses per month',
        'Automated payroll support',
        'Export up to 12 reports',
        'Bulk reconcile transactions',
        'Track in multiple currencies'
      ],
      buttonStyle: 'bg-white text-blue-600 hover:bg-gray-100',
      isPopular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$39',
      description: 'For even the biggest enterprise companies.',
      features: [
        'Send unlimited quotes and invoices',
        'Connect up to 15 bank accounts',
        'Track up to 200 expenses per month',
        'Automated payroll support',
        'Export up to 25 reports, including TPS'
      ],
      buttonStyle: 'border border-gray-600 text-gray-300 hover:bg-gray-800',
      isPopular: false
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
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

  const featureVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple pricing, for everyone.
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            It doesn't matter what size your business is, our software won't work well for you.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8,
                transition: { type: "spring", stiffness: 300, damping: 20 }
              }}
              onHoverStart={() => setHoveredCard(plan.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className={`
                relative rounded-3xl p-8 backdrop-blur-lg
                ${plan.isPopular 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-2xl shadow-blue-500/25 transform scale-105' 
                  : 'bg-slate-800/50 border border-slate-700/50'
                }
                transition-all duration-300 group
              `}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </motion.div>
              )}

              {/* Price */}
              <motion.div 
                className="mb-6"
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className={`text-6xl font-bold mb-2 ${plan.isPopular ? 'text-white' : 'text-white'}`}>
                  {plan.price}
                </h3>
                <h4 className={`text-2xl font-semibold mb-3 ${plan.isPopular ? 'text-blue-100' : 'text-gray-300'}`}>
                  {plan.name}
                </h4>
                <p className={`text-lg ${plan.isPopular ? 'text-blue-100' : 'text-gray-400'}`}>
                  {plan.description}
                </p>
              </motion.div>

              {/* Get Started Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full py-4 px-6 rounded-2xl font-semibold text-lg mb-8 transition-all duration-200
                  ${plan.buttonStyle}
                `}
              >
                Get started
              </motion.button>

              {/* Features */}
              <motion.div className="space-y-4">
                {plan.features.map((feature: string, featureIndex: number) => (
                  <motion.div
                    key={featureIndex}
                    variants={featureVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 + (featureIndex * 0.1) }}
                    whileHover={{ x: 4 }}
                    className="flex items-center space-x-3 group/feature"
                  >
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`
                        flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
                        ${plan.isPopular 
                          ? 'bg-blue-200 text-blue-700' 
                          : 'bg-green-500 text-white'
                        }
                      `}
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                    <span className={`
                      text-base transition-colors duration-200
                      ${plan.isPopular ? 'text-blue-50' : 'text-gray-300'}
                      group-hover/feature:text-white
                    `}>
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Hover Glow Effect */}
              <motion.div
                className={`
                  absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300
                  ${hoveredCard === plan.id ? 'opacity-100' : ''}
                  ${plan.isPopular 
                    ? 'bg-gradient-to-br from-blue-400/20 to-purple-600/20' 
                    : 'bg-gradient-to-br from-blue-600/10 to-purple-600/10'
                  }
                `}
                style={{ pointerEvents: 'none' }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 text-lg mb-6">
            All plans include 30-day free trial. No credit card required.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg">
              Start Your Free Trial
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingBoxes;