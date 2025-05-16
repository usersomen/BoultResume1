import { useState, useEffect } from 'react';
import { Menu, X, User, FileText } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import ResumeLabs from './Logo/ResumeLabs';
import AuthModal from './AuthModal';

interface NavbarProps {
  onLogin?: () => void;
  isAuthenticated?: boolean;
}

export default function Navbar({ onLogin, isAuthenticated = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [scrolled, setScrolled] = useState(false);
  
  // Scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const openSignIn = () => {
    setAuthMode('signin');
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const openSignUp = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    onLogin?.();
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-gray-900 shadow-md' 
          : 'bg-gray-900'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Scroll progress indicator */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-[#4ECCA3] origin-left"
        style={{ scaleX }}
      />

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <div className="bg-[#4ECCA3] text-white p-2 rounded-lg mr-3">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white">ResumeLabs</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <motion.a
              href="#features"
              className="group relative px-4 py-2 text-gray-300 transition-colors duration-200 hover:text-white"
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10">Features</span>
              <motion.span
                className="absolute inset-0 rounded-lg bg-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                variants={{
                  hover: { opacity: 1, scale: 1 },
                  tap: { scale: 0.95 }
                }}
              />
            </motion.a>

            <motion.a
              href="#testimonials"
              className="group relative px-4 py-2 text-gray-300 transition-colors duration-200 hover:text-white"
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10">Testimonials</span>
              <motion.span
                className="absolute inset-0 rounded-lg bg-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                variants={{
                  hover: { opacity: 1, scale: 1 },
                  tap: { scale: 0.95 }
                }}
              />
            </motion.a>

            <motion.a
              href="#pricing"
              className="group relative px-4 py-2 text-gray-300 transition-colors duration-200 hover:text-white"
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10">Pricing</span>
              <motion.span
                className="absolute inset-0 rounded-lg bg-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                variants={{
                  hover: { opacity: 1, scale: 1 },
                  tap: { scale: 0.95 }
                }}
              />
            </motion.a>

            <motion.a
              href="#faq"
              className="group relative px-4 py-2 text-gray-300 transition-colors duration-200 hover:text-white"
              whileHover="hover"
              whileTap="tap"
            >
              <span className="relative z-10">FAQ</span>
              <motion.span
                className="absolute inset-0 rounded-lg bg-gray-800"
                initial={{ opacity: 0, scale: 0.95 }}
                variants={{
                  hover: { opacity: 1, scale: 1 },
                  tap: { scale: 0.95 }
                }}
              />
            </motion.a>

            {isAuthenticated ? (
              <motion.a
                href="/dashboard"
                className="group relative px-4 py-2 text-gray-300 transition-colors duration-200 hover:text-white"
                whileHover="hover"
                whileTap="tap"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  My Dashboard
                </span>
                <motion.span
                  className="absolute inset-0 rounded-lg bg-gray-800"
                  initial={{ opacity: 0, scale: 0.95 }}
                  variants={{
                    hover: { opacity: 1, scale: 1 },
                    tap: { scale: 0.95 }
                  }}
                />
              </motion.a>
            ) : (
              <motion.button
                onClick={openSignIn}
                className="group relative px-4 py-2 text-gray-300 transition-colors duration-200 hover:text-white"
                whileHover="hover"
                whileTap="tap"
              >
                <span className="relative z-10">Sign In</span>
                <motion.span
                  className="absolute inset-0 rounded-lg bg-gray-800"
                  initial={{ opacity: 0, scale: 0.95 }}
                  variants={{
                    hover: { opacity: 1, scale: 1 },
                    tap: { scale: 0.95 }
                  }}
                />
              </motion.button>
            )}

            <motion.a
              href={isAuthenticated ? "/dashboard" : "#"}
              onClick={isAuthenticated ? undefined : openSignUp}
              className="group relative overflow-hidden rounded-xl bg-[#4ECCA3] px-6 py-2 text-white shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{isAuthenticated ? "Go to Dashboard" : "Get Started"}</span>
              <motion.div
                className="absolute inset-0 bg-[linear-gradient(110deg,transparent_33%,rgba(255,255,255,0.1)_50%,transparent_67%)] bg-[length:200%_100%]"
                animate={{
                  backgroundPosition: ['100% 0', '-33% 0'],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.2 }}
          className={`md:hidden overflow-hidden ${isMenuOpen ? 'border-t border-gray-800' : ''}`}
        >
          <div className="py-4 space-y-4">
            <motion.a
              href="#features"
              className="block text-gray-300 hover:text-white transition-colors px-2 py-1"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeMenu}
            >
              Features
            </motion.a>
            <motion.a
              href="#testimonials"
              className="block text-gray-300 hover:text-white transition-colors px-2 py-1"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeMenu}
            >
              Testimonials
            </motion.a>
            <motion.a
              href="#pricing"
              className="block text-gray-300 hover:text-white transition-colors px-2 py-1"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeMenu}
            >
              Pricing
            </motion.a>
            <motion.a
              href="#faq"
              className="block text-gray-300 hover:text-white transition-colors px-2 py-1"
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={closeMenu}
            >
              FAQ
            </motion.a>
            
            {isAuthenticated ? (
              <motion.a
                href="/dashboard"
                className="block text-gray-300 hover:text-white transition-colors px-2 py-1"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeMenu}
              >
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  My Dashboard
                </span>
              </motion.a>
            ) : (
              <motion.button
                onClick={openSignIn}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors px-2 py-1"
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
            )}
            
            <motion.a
              href={isAuthenticated ? "/dashboard" : "#"}
              onClick={isAuthenticated ? closeMenu : openSignUp}
              className="group relative overflow-hidden w-full rounded-xl bg-[#4ECCA3] px-6 py-2 text-white shadow-sm hover:shadow-md transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">{isAuthenticated ? "Go to Dashboard" : "Get Started"}</span>
              <motion.div
                className="absolute inset-0 bg-[linear-gradient(110deg,transparent_33%,rgba(255,255,255,0.1)_50%,transparent_67%)] bg-[length:200%_100%]"
                animate={{
                  backgroundPosition: ['100% 0', '-33% 0'],
                  transition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onToggleMode={() =>
          setAuthMode(authMode === 'signin' ? 'signup' : 'signin')
        }
        onAuthSuccess={handleAuthSuccess}
      />
    </motion.nav>
  );
}