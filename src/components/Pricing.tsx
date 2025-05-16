import { motion } from 'framer-motion';
import { Check, Crown, Zap, CreditCard } from 'lucide-react';
import { useState } from 'react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with resume building',
    features: [
      'Up to 3 Resume Downloads',
      'Essential AI Writing Tools',
      'Basic Resume Analysis',
      'Standard Templates',
      'Email Support'
    ],
    cta: 'Get Started Free',
    popular: false,
    icon: <CreditCard className="w-6 h-6" />
  },
  {
    name: 'Pro',
    price: '$12',
    period: 'per month',
    description: 'Advanced features for job seekers',
    features: [
      'Unlimited Resume Downloads',
      'Advanced AI Writing Assistant',
      'Unlimited Resume Analysis',
      '50+ Premium Templates',
      'Career Path Insights',
      'Job Match Technology',
      'Priority Support 24/7'
    ],
    cta: 'Start 7-Day Free Trial',
    popular: true,
    icon: <Crown className="w-6 h-6" />
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per team',
    description: 'Custom solutions for organizations',
    features: [
      'Custom Branded Templates',
      'Team Management Portal',
      'API Integration Access',
      'Dedicated Account Manager',
      'Custom AI Training',
      'Advanced Analytics',
      'Training & Workshops'
    ],
    cta: 'Contact Sales',
    popular: false,
    icon: <Zap className="w-6 h-6" />
  }
];

export default function Pricing() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-gray-900 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-[#4ECCA3]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -top-40 right-0 w-[600px] h-[600px] bg-[#4ECCA3]/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-[#4ECCA3]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-6 px-6 py-2 bg-[#4ECCA3]/20 rounded-full"
          >
            <CreditCard className="w-5 h-5 text-[#4ECCA3]" />
            <span className="text-[#4ECCA3] font-semibold">Simple Pricing</span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Choose Your Perfect Plan
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Select the plan that best fits your needs. All plans include core AI features.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`group relative bg-gray-800 border-2 ${
                tier.popular ? 'border-[#4ECCA3] shadow-[0_0_30px_rgba(78,204,163,0.3)]' : 'border-gray-700'
              } rounded-2xl overflow-hidden hover:border-[#4ECCA3]/20 transition-all duration-300`}
              onMouseEnter={() => setHoveredTier(tier.name)}
              onMouseLeave={() => setHoveredTier(null)}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-[#4ECCA3] text-white px-6 py-2 text-sm font-medium rounded-bl-2xl">
                  Most Popular
                </div>
              )}
              
              <div className="p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    className={`w-12 h-12 rounded-xl bg-[#4ECCA3]/20 flex items-center justify-center text-[#4ECCA3] group-hover:scale-110 transition-transform duration-300`}
                    animate={{ 
                      scale: hoveredTier === tier.name ? [1, 1.1, 1] : 1,
                      rotate: hoveredTier === tier.name ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {tier.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-[#4ECCA3] transition-colors duration-300">
                      {tier.name}
                    </h3>
                    <p className="text-gray-400">{tier.description}</p>
                  </div>
                </div>
                
                <div className="flex items-baseline mb-6">
                  <motion.span 
                    className="text-5xl font-bold text-white"
                    animate={{ 
                      scale: hoveredTier === tier.name ? [1, 1.05, 1] : 1
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: "easeInOut"
                    }}
                  >
                    {tier.price}
                  </motion.span>
                  <span className="text-gray-400 ml-2 text-lg">/{tier.period}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full rounded-xl px-6 py-4 font-semibold text-lg mb-8 ${
                    tier.popular
                      ? 'bg-[#4ECCA3] text-white hover:bg-[#45B08C]'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  } transition-all duration-300`}
                  onClick={() => {
                    if (tier.name === 'Free') {
                      window.location.href = '/dashboard';
                    }
                  }}
                >
                  {tier.cta}
                </motion.button>
                
                <div className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.div 
                      key={feature} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * featureIndex, duration: 0.3 }}
                    >
                      <motion.div 
                        className={`flex-shrink-0 w-5 h-5 rounded-full ${tier.popular ? 'bg-[#4ECCA3]/20' : 'bg-gray-700'} flex items-center justify-center mt-0.5`}
                        whileHover={{ scale: 1.2 }}
                      >
                        <Check className={`w-3 h-3 ${
                          tier.popular ? 'text-[#4ECCA3]' : 'text-gray-300'
                        }`} />
                      </motion.div>
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}