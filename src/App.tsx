import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Navbar from './components/Navbar';
import DashboardLayout from './components/dashboard/DashboardLayout';
import DashboardHome from './components/dashboard/DashboardHome';
import AITools from './components/dashboard/AITools';
import Subscription from './components/dashboard/Subscription';
import Settings from './components/dashboard/Settings';
import ResumeBuilder from './components/dashboard/ResumeBuilder';
import ResumeTemplates from './components/templates/ResumeTemplates';
import ResumeCreator from './components/resume/ResumeCreator';

function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-24 h-24 relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute top-0 left-0 w-full h-full border-4 border-[#4ECCA3]/20 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-[#4ECCA3] rounded-full"></div>
      </motion.div>
      <motion.div
        className="absolute text-2xl font-bold text-[#4ECCA3] mt-32"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        ResumeLabs
      </motion.div>
    </motion.div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated (e.g., from localStorage)
    const checkAuth = localStorage.getItem('isAuthenticated');
    if (checkAuth === 'true') {
      setIsAuthenticated(true);
    }
    setIsAuthChecked(true);

    // Simulate loading resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  // Show preloader while checking auth status
  if (loading || !isAuthChecked) {
    return <Preloader />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-900">
        <Routes>
          {/* Landing Page Route with Auth Check */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <>
                  <Navbar onLogin={handleLogin} isAuthenticated={isAuthenticated} />
                  <Hero />
                  <Features />
                  <Testimonials />
                  <Pricing />
                  <FAQ />
                  <Footer />
                </>
              )
            }
          />

          {/* Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? 
              <DashboardLayout onLogout={handleLogout} /> : 
              <Navigate to="/" replace />
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="resumes" element={<ResumeBuilder />} />
            <Route path="ai-tools" element={<AITools />} />
            <Route path="subscription" element={<Subscription />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Resume Creator Route */}
          <Route path="/resume/create" element={<ResumeCreator />} />

          {/* Templates Route */}
          <Route 
            path="/templates" 
            element={
              isAuthenticated ? 
              <ResumeTemplates /> : 
              <Navigate to="/" replace />
            } 
          />

          {/* Redirect any unmatched routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      {/* Modal root for portals */}
      <div id="modal-root"></div>
    </Router>
  );
}

export default App;