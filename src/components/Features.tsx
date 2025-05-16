import { motion } from 'framer-motion';
import { Sparkles, Brain, Target, FileCheck, Lightbulb, Award, BarChart, Shield, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <Sparkles className="w-7 h-7" />,
    title: 'AI-Powered Writing',
    description: 'Get intelligent content suggestions and real-time improvements as you write your resume',
    color: 'from-[#4ECCA3] to-[#5FDDB4]'
  },
  {
    icon: <Brain className="w-7 h-7" />,
    title: 'Smart Analysis',
    description: 'Our AI analyzes your resume against top performers in your industry for optimal results',
    color: 'from-[#45B08C] to-[#4ECCA3]'
  },
  {
    icon: <Target className="w-7 h-7" />,
    title: 'Skills Targeting',
    description: 'Automatically match your skills and experience with job requirements for higher success',
    color: 'from-[#4ECCA3] to-[#5FDDB4]'
  },
  {
    icon: <FileCheck className="w-7 h-7" />,
    title: 'ATS Optimization',
    description: 'Ensure your resume passes ATS screening with our advanced formatting technology',
    color: 'from-[#45B08C] to-[#4ECCA3]'
  },
  {
    icon: <Lightbulb className="w-7 h-7" />,
    title: 'Smart Suggestions',
    description: 'Get personalized recommendations to highlight your achievements effectively',
    color: 'from-[#4ECCA3] to-[#5FDDB4]'
  },
  {
    icon: <Award className="w-7 h-7" />,
    title: 'Expert Review',
    description: 'Access AI-powered feedback based on successful resumes in your field',
    color: 'from-[#45B08C] to-[#4ECCA3]'
  }
];

// Additional features for the second section
const advancedFeatures = [
  {
    icon: Shield,
    title: "Keyword Optimization",
    description: "Our AI automatically identifies and incorporates industry-specific keywords that resonate with both hiring managers and ATS systems."
  },
  {
    icon: BarChart,
    title: "Performance Analytics",
    description: "Track how your resume performs against job postings and receive insights on how to improve your application success rate."
  },
  {
    icon: CheckCircle,
    title: "Grammar & Style Check",
    description: "Advanced linguistic analysis ensures your resume is free of errors and maintains a professional tone throughout."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-28 lg:py-36 bg-gray-900 relative overflow-hidden">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Left blob */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -left-48 top-1/4 w-[600px] h-[600px] bg-[#4ECCA3]/10 rounded-full blur-3xl"
        />
        
        {/* Right blob */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -right-48 bottom-1/4 w-[600px] h-[600px] bg-[#4ECCA3]/10 rounded-full blur-3xl"
        />
        
        {/* Center blob */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-[#4ECCA3]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-[#4ECCA3]/20"
          >
            <Sparkles className="w-4 h-4 text-[#4ECCA3]" />
            <span className="text-[#4ECCA3] font-semibold">Powerful Features</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Build resumes that <span className="text-[#4ECCA3]">get you noticed</span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our AI-powered platform helps you create professional resumes that stand out and pass ATS screening
          </p>
        </motion.div>

        {/* Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="group bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl border border-gray-700 transition-all duration-300"
            >
              <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 shadow-lg shadow-[#4ECCA3]/20`}>
                <div className="w-full h-full bg-gray-900 rounded-[10px] flex items-center justify-center text-[#4ECCA3] group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#4ECCA3] transition-colors duration-300">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        {/* Advanced features section */}
        <div className="mt-32 relative">
          {/* Decorative elements */}
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-[#4ECCA3]/10 rounded-full blur-2xl"></div>
          <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-[#4ECCA3]/10 rounded-full blur-2xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="absolute inset-0 -m-6 bg-[#4ECCA3]/10 rounded-3xl blur-xl"></div>
                <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
                  <img 
                    src="https://placehold.co/800x500/4ECCA3/FFFFFF/png?text=Resume+Builder+Dashboard" 
                    alt="Resume Builder Dashboard" 
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Floating stats */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute -right-8 -bottom-6 bg-gray-800 px-6 py-4 rounded-xl shadow-lg border border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4ECCA3]/20 rounded-full flex items-center justify-center">
                      <BarChart className="w-5 h-5 text-[#4ECCA3]" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Interview Rate</div>
                      <div className="text-lg font-bold text-white">+86%</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Right side content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-[#4ECCA3]/20"
                >
                  <Brain className="w-4 h-4 text-[#4ECCA3]" />
                  <span className="text-[#4ECCA3] font-semibold">AI-Powered</span>
                </motion.div>
                
                <h3 className="text-3xl font-bold text-white mb-6">
                  Advanced features to maximize your success rate
                </h3>
                
                <p className="text-lg text-gray-300 mb-8">
                  Our platform goes beyond just resume creation. We analyze industry trends, job descriptions, and successful applicants to maximize your chances.
                </p>
              </div>
              
              <div className="space-y-6">
                {advancedFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex gap-5"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#4ECCA3]/20 flex items-center justify-center text-[#4ECCA3]">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                      <p className="text-gray-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}