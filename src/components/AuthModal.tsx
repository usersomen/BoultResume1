import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Facebook } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'signin' | 'signup';
  onToggleMode: () => void;
  onAuthSuccess?: () => void;
}

// Test credentials for development (not shown in UI)
const TEST_USER = {
  email: 'user@email.com',
  password: 'password'
};

export default function AuthModal({
  isOpen,
  onClose,
  mode,
  onToggleMode,
  onAuthSuccess,
}: AuthModalProps) {
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  // Use a function to get the navigate function to avoid issues with SSR
  const getNavigate = () => {
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useNavigate();
    } catch (e) {
      // Return a dummy function if useNavigate is not available
      return (path: string) => {
        window.location.href = path;
      };
    }
  };
  
  const navigate = getNavigate();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (mode === 'signin') {
      // Verify credentials
      if (email === TEST_USER.email && password === TEST_USER.password) {
        onAuthSuccess?.(); // Call the success handler
        // Navigate to dashboard after successful login
        navigate('/dashboard');
        onClose();
      } else {
        setError('Invalid email or password');
      }
    } else {
      // Handle signup (in a real app, this would create a new user)
      // Validate confirm password
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      
      console.log('Sign up:', { name, email, password });
      // For demo purposes, let's consider signup always successful
      onAuthSuccess?.(); // Call the success handler
      // Navigate to dashboard after successful signup
      navigate('/dashboard');
      onClose();
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999998
            }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div className="w-full max-w-md mx-4">
              {/* Modal Content */}
              <div className="relative bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute right-4 top-4 text-gray-400 hover:text-[#4ECCA3] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Content */}
                <style>
                  {`
                    @keyframes float {
                      0% { transform: translateY(0px); }
                      50% { transform: translateY(-7px); }
                      100% { transform: translateY(0px); }
                    }
                    @keyframes pulse {
                      0% { text-shadow: 0 0 0px rgba(78, 204, 163, 0); }
                      50% { text-shadow: 0 0 10px rgba(78, 204, 163, 0.5); }
                      100% { text-shadow: 0 0 0px rgba(78, 204, 163, 0); }
                    }
                    .animate-float {
                      display: inline-block;
                      animation: float 2.5s ease-in-out infinite, pulse 2.5s ease-in-out infinite;
                    }
                  `}
                </style>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {mode === 'signin' ? (
                      <motion.div
                        key="welcome-back"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="animate-float"
                      >
                        Welcome back
                      </motion.div>
                    ) : (
                      <motion.div
                        key="create-account"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="animate-float"
                      >
                        Create your account
                      </motion.div>
                    )}
                  </h2>
                  <p className="text-gray-400">
                    {mode === 'signin'
                      ? 'Sign in to continue building your resume'
                      : 'Start creating professional resumes in minutes'}
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-3 bg-red-900/50 text-red-200 rounded-xl text-sm border border-red-800"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Social Buttons */}
                <div className="space-y-3 mb-6">
                  <button className="w-full flex items-center justify-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-200 font-medium hover:bg-gray-700 transition-all duration-300">
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Continue with Google
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white rounded-xl px-4 py-3 font-medium hover:bg-[#1865F2] transition-all duration-300">
                    <Facebook className="w-5 h-5" />
                    Continue with Facebook
                  </button>
                </div>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-gray-900 text-gray-500">
                      Or continue with email
                    </span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div>
                      <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#4ECCA3] transition-colors"
                          required={mode === 'signup'}
                        />
                      </div>
                    </div>
                  )}
                  <div>
                    <div className="relative">
                      <Mail className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#4ECCA3] transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#4ECCA3] transition-colors"
                        required
                      />
                    </div>
                  </div>
                  {mode === 'signup' && (
                    <div>
                      <div className="relative">
                        <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-3.5" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm password"
                          className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#4ECCA3] transition-colors"
                          required={mode === 'signup'}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-[#4ECCA3] text-white rounded-xl px-4 py-3 font-medium hover:bg-[#45B08C] transition-colors"
                  >
                    {mode === 'signin' ? 'Sign In' : 'Create Account'}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-400">
                    {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
                    <button
                      onClick={onToggleMode}
                      className="text-[#4ECCA3] hover:text-[#45B08C] font-medium transition-colors"
                    >
                      {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return mounted ? createPortal(modalContent, document.body) : null;
}