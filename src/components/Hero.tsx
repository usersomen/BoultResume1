import { motion } from 'framer-motion';
import { FileText, ArrowRight, Check, ChevronDown, Loader } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCards, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/effect-coverflow';
import { useState } from 'react';

interface HeroProps {
  onAnalyzeClick?: () => void;
}

// Updated to use placeholder images from a CDN
const resumeTemplates = [
  'https://placehold.co/600x800/4ECCA3/FFFFFF/png?text=Resume+Template+1',
  'https://placehold.co/600x800/45B08C/FFFFFF/png?text=Resume+Template+2',
  'https://placehold.co/600x800/4ECCA3/FFFFFF/png?text=Resume+Template+3',
  'https://placehold.co/600x800/45B08C/FFFFFF/png?text=Resume+Template+4',
];

export default function Hero({ onAnalyzeClick }: HeroProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzeClick = () => {
    if (onAnalyzeClick) {
      setIsAnalyzing(true);
      // Simulate API call delay
      setTimeout(() => {
        onAnalyzeClick();
        setIsAnalyzing(false);
      }, 1000);
    }
  };

  return (
    <section className="relative pt-0 overflow-hidden bg-gray-900">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#4ECCA3]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#4ECCA3]/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 pt-24 pb-24 md:pt-28 md:pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left content - Enhanced */}
          <motion.div 
            className="flex-1 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Highlight tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#4ECCA3]/20 text-[#4ECCA3] font-medium text-sm"
            >
              <span className="inline-block w-2 h-2 rounded-full bg-[#4ECCA3]"></span>
              AI-Powered Resume Builder
            </motion.div>
            
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              Get hired at <span className="relative">
                top companies
                <motion.span 
                  className="absolute bottom-1 left-0 h-3 w-full bg-[#4ECCA3]/20 -z-10 rounded-lg"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
              </span> with our Resume Builder
            </h1>
            
            <p className="text-xl text-gray-300 mb-10 leading-relaxed">
              Create professional resumes in minutes with our AI-powered platform. 
              Get tailored suggestions, pass ATS screenings, and stand out from other applicants.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <motion.a
                href="/dashboard"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(78, 204, 163, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  x: [0, -5, 5, -5, 5, -3, 3, 0],
                  scale: [1, 1.02, 1, 1.02, 1]
                }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  y: { duration: 0.5 },
                  x: {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut"
                  }
                }}
                className="relative flex items-center justify-center gap-2 bg-[#4ECCA3] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-[#45B08C] transition-all group"
              >
                <span className="relative inline-flex items-center gap-2">
                  Build My Resume
                  <motion.div
                    animate={{
                      x: [0, 3, 0]
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  >
                    <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </motion.div>
                </span>
              </motion.a>
              
              <motion.button
                onClick={handleAnalyzeClick}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(78, 204, 163, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                  delay: 0.1
                }}
                disabled={isAnalyzing}
                className="relative flex items-center justify-center gap-2 border-2 border-gray-700 hover:border-[#4ECCA3]/30 hover:bg-[#4ECCA3]/10 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all disabled:opacity-70 group overflow-hidden"
              >
                {isAnalyzing ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-[#4ECCA3]/5"
                      initial={{ x: "-100%" }}
                      animate={{ 
                        x: ["-100%", "100%"],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="relative">Check Your Resume Score</span>
                    <motion.div
                      className="relative"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <ArrowRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </motion.div>
                    <motion.div
                      className="absolute -top-1 -right-1 w-3 h-3 bg-[#4ECCA3] rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </>
                )}
              </motion.button>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {[
                { number: "5,000+", label: "Resumes created" },
                { number: "98%", label: "Pass ATS scanning" },
                { number: "3x", label: "More interviews" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                  className="text-center"
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Features list - Enhanced */}
            <div className="space-y-5">
              {[
                'AI-powered resume analysis and suggestions',
                'ATS-friendly templates designed by experts',
                'Real-time grammar and formatting checks',
                'Tailored for your target job and industry'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4ECCA3]/20 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#4ECCA3]" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Scroll indicator */}
            <motion.div 
              className="hidden lg:flex items-center gap-2 mt-16 text-gray-400 text-sm cursor-pointer"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span>Scroll to explore</span>
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>

          {/* Right content - Resume previews with enhanced animation */}
          <motion.div
            className="flex-1 w-full max-w-xl perspective-1000"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-[3/4] w-full">
              <div className="absolute -right-12 -top-12 w-64 h-64 bg-[#4ECCA3]/10 rounded-full blur-3xl"></div>
              
              <Swiper
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: true
                }}
                modules={[EffectCoverflow, Autoplay]}
                className="w-full h-full"
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {resumeTemplates.map((template, index) => (
                  <SwiperSlide key={index} className="w-[85%] pt-8">
                    <motion.div 
                      className="w-full h-full bg-white rounded-xl overflow-hidden shadow-xl"
                      whileHover={{ y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={template}
                        alt={`Resume template ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 rounded-xl ring-1 ring-black/5"></div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              {/* Decorative elements */}
              <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 w-16 h-16 bg-[#4ECCA3]/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/3 -left-8 w-24 h-24 bg-[#4ECCA3]/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}