import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'What makes our Resume Builder unique?',
    answer: 'Our platform stands out with its advanced AI technology that provides real-time suggestions, personalized career insights, and ATS optimization. Unlike traditional builders, we analyze successful resumes in your industry to give you data-driven recommendations.'
  },
  {
    question: 'How does the AI writing assistant work?',
    answer: 'Our AI writing assistant analyzes your input in real-time, suggesting improvements in content, structure, and phrasing. It learns from millions of successful resumes to help you highlight your achievements effectively and match them with job requirements.'
  },
  {
    question: 'Is there a free plan available?',
    answer: 'Yes! We offer a comprehensive free plan that includes basic templates, essential AI features, and the ability to create and download your resume. Premium features like advanced AI suggestions, unlimited templates, and career insights are available in paid plans.'
  },
  {
    question: 'How does ATS optimization work?',
    answer: 'Our ATS (Applicant Tracking System) optimization ensures your resume is properly formatted and contains relevant keywords. The AI analyzes job descriptions and suggests modifications to increase your chances of passing automated screening systems.'
  },
  {
    question: 'What kind of career insights do you provide?',
    answer: 'Our AI analyzes your profile against industry trends and successful professionals to provide personalized career path suggestions, skill gap analysis, and salary insights. This helps you make informed decisions about your career progression.'
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#4ECCA3]/10 rounded-full blur-3xl"
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
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4ECCA3]/10 rounded-full blur-3xl"
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
            <HelpCircle className="w-5 h-5 text-[#4ECCA3]" />
            <span className="text-[#4ECCA3] font-semibold">FAQ</span>
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find answers to common questions about our AI-powered resume builder
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-5"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-6 bg-gray-800 border-2 rounded-xl ${
                  activeIndex === index 
                    ? 'border-[#4ECCA3] shadow-lg bg-[#4ECCA3]/10' 
                    : hoveredIndex === index
                    ? 'border-[#4ECCA3]/30 bg-[#4ECCA3]/10'
                    : 'border-gray-700 hover:border-[#4ECCA3]/30 hover:bg-[#4ECCA3]/10'
                } transition-all duration-300`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="text-lg font-semibold text-white text-left pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ 
                    rotate: activeIndex === index ? 180 : 0,
                    scale: activeIndex === index ? 1.2 : hoveredIndex === index ? 1.1 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex-shrink-0 ${
                    activeIndex === index || hoveredIndex === index ? 'text-[#4ECCA3]' : 'text-gray-400'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </motion.div>
              </motion.button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <motion.div 
                      className="p-6 bg-gray-800 border-2 border-gray-700 rounded-xl"
                      initial={{ y: -20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}