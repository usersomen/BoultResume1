import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Twitter, Github, Linkedin, Mail, Globe, Phone, MapPin, ArrowRight, ArrowUp } from 'lucide-react';
import ResumeLabs from './Logo/ResumeLabs';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Templates', href: '#templates' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'AI Tools', href: '#ai-tools' },
    { label: 'Success Stories', href: '#success-stories' },
    { label: 'Compare Plans', href: '#compare' },
  ],
  resources: [
    { label: 'Resume Guide', href: '#guide' },
    { label: 'Cover Letter Tips', href: '#tips' },
    { label: 'Career Blog', href: '#blog' },
    { label: 'Interview Prep', href: '#interview' },
    { label: 'Resume Examples', href: '#examples' },
    { label: 'Job Search Tips', href: '#job-search' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Press Kit', href: '#press' },
    { label: 'Contact Us', href: '#contact' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Privacy Policy', href: '#privacy' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-[#1DA1F2]' },
  { icon: Github, href: '#', label: 'GitHub', color: 'hover:bg-[#333]' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-[#0A66C2]' },
  { icon: Mail, href: '#', label: 'Email', color: 'hover:bg-[#4ECCA3]' },
];

const contactInfo = [
  { icon: Globe, text: 'www.resumelabs.com', href: 'https://www.resumelabs.com' },
  { icon: Phone, text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { icon: MapPin, text: 'New York, NY 10001', href: 'https://maps.google.com' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your newsletter service
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1000);
  };

  // Add scroll event listener to show/hide the scroll-to-top button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#4ECCA3]/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#4ECCA3]/10 rounded-full blur-3xl" />
      </div>

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-800">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Get career insights and tips
            </h2>
            <p className="text-gray-300 mb-8">
              Join our newsletter and receive the latest resume advice, interview tips, and career resources directly in your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 mt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-[#4ECCA3] focus:border-transparent transition-all"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isSubmitted}
              />
              <motion.button
                type="submit"
                className={`px-6 py-3 rounded-xl font-medium text-white shadow-sm ${
                  isSubmitted ? 'bg-green-500' : 'bg-[#4ECCA3] hover:bg-[#45B08C]'
                } transition-all duration-300 flex items-center gap-2 whitespace-nowrap`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading || isSubmitted}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </>
                ) : isSubmitted ? (
                  <>
                    <span>Success!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center">
                <div className="bg-[#4ECCA3] text-white p-2 rounded-lg mr-3">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-white">ResumeLabs</span>
              </div>
              <p className="text-gray-300">
                Create professional resumes in minutes with our AI-powered platform. 
                Stand out from the crowd and land your dream job.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <motion.a
                    key={item.text}
                    href={item.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-[#4ECCA3] transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.text}</span>
                  </motion.a>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className={`p-2 rounded-lg border border-gray-700 ${social.color} hover:text-white transition-all duration-300`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="sr-only">{social.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-white font-semibold mb-6 capitalize">
                {category}
              </h3>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-[#4ECCA3] transition-colors inline-block"
                      whileHover={{ x: 2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ResumeLabs. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <motion.a
                href="#"
                className="text-gray-300 hover:text-[#4ECCA3] text-sm transition-colors"
                whileHover={{ x: 2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-300 hover:text-[#4ECCA3] text-sm transition-colors"
                whileHover={{ x: 2 }}
              >
                Terms of Service
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-300 hover:text-[#4ECCA3] text-sm transition-colors"
                whileHover={{ x: 2 }}
              >
                Cookie Policy
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 p-3 rounded-full bg-[#4ECCA3] text-white shadow-lg z-50 transition-all duration-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}