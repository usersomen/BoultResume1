import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  CreditCard, 
  Calendar, 
  Download, 
  Sparkles, 
  Zap, 
  Shield,
  ArrowRight
} from 'lucide-react';

// Define subscription plans
const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Basic resume building tools',
    features: [
      'Create up to 3 resumes',
      'Access to 5 basic templates',
      'Download as PDF',
      'Basic ATS check'
    ],
    isPopular: false,
    buttonText: 'Current Plan'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'Advanced tools for job seekers',
    features: [
      'Unlimited resumes',
      'Access to all templates',
      'AI content suggestions',
      'Advanced ATS optimization',
      'Interview preparation',
      'Priority support'
    ],
    isPopular: true,
    buttonText: 'Upgrade Now'
  },
  {
    id: 'team',
    name: 'Team',
    price: '$49.99',
    period: 'per month',
    description: 'Perfect for career coaches and teams',
    features: [
      'Everything in Pro plan',
      'Up to 10 team members',
      'Team analytics dashboard',
      'Collaborative editing',
      'Custom branding',
      'API access',
      'Dedicated account manager'
    ],
    isPopular: false,
    buttonText: 'Contact Sales'
  }
];

export default function Subscription() {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Subscription</h1>
        <p className="text-gray-600">Manage your subscription and billing details</p>
      </div>

      {/* Current Subscription */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Current Subscription</h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold text-gray-900">Free Plan</span>
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                  Active
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                You're currently on the Free plan with basic features.
                Upgrade to unlock premium features and templates.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <CreditCard className="w-4 h-4" />
                  <span>No payment method</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>No renewal date</span>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-all"
            >
              Upgrade Plan
            </motion.button>
          </div>
        </div>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Downloads</h3>
              <p className="text-gray-600 text-sm">This month</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-bold text-gray-900">2</span>
              <span className="text-gray-600 ml-2">/ 3</span>
            </div>
            <div className="text-xs text-gray-500">1 remaining</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-blue-500 rounded-full h-2" style={{ width: '66%' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">AI Credits</h3>
              <p className="text-gray-600 text-sm">This month</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-bold text-gray-900">15</span>
              <span className="text-gray-600 ml-2">/ 20</span>
            </div>
            <div className="text-xs text-gray-500">5 remaining</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-purple-500 rounded-full h-2" style={{ width: '75%' }} />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Zap className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
              <p className="text-gray-600 text-sm">Available</p>
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-3xl font-bold text-gray-900">5</span>
              <span className="text-gray-600 ml-2">/ 12</span>
            </div>
            <div className="text-xs text-gray-500">Upgrade for all</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-green-500 rounded-full h-2" style={{ width: '42%' }} />
          </div>
        </div>
      </div>

      {/* Available Plans */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Available Plans</h2>
          
          <div className="bg-gray-100 p-1 rounded-lg flex items-center">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600'
              }`}
            >
              Annual
              <span className="ml-1 text-xs text-primary">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white border rounded-xl overflow-hidden transition-all ${
                plan.isPopular
                  ? 'border-primary shadow-lg shadow-primary/10 relative'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {billingCycle === 'annual' && plan.id !== 'free'
                      ? `$${(parseFloat(plan.price.replace('$', '')) * 0.8).toFixed(2)}`
                      : plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-xl font-medium mb-6 flex items-center justify-center gap-2 ${
                    currentPlan === plan.id
                      ? 'bg-gray-100 text-gray-700'
                      : plan.isPopular
                      ? 'bg-primary text-white hover:bg-primary-dark'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                  disabled={currentPlan === plan.id}
                >
                  {currentPlan === plan.id ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      <span>Current Plan</span>
                    </>
                  ) : (
                    <>
                      <span>{plan.buttonText}</span>
                      {plan.id !== 'team' && <ArrowRight className="w-4 h-4" />}
                    </>
                  )}
                </motion.button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex items-start gap-4">
        <div className="p-2 bg-gray-100 rounded-lg">
          <Shield className="w-5 h-5 text-gray-600" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-1">Secure Payments</h3>
          <p className="text-sm text-gray-600">
            All payments are processed securely through Stripe. We never store your credit card information.
            You can cancel your subscription at any time from your account settings.
          </p>
        </div>
      </div>
    </div>
  );
}