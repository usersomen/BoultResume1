import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Sparkles,
  CreditCard,
  Settings,
  Menu,
  X,
  LogOut,
  User,
  Bell
} from 'lucide-react';

// Define menu items with their icons and paths
const menuItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: FileText, label: 'Resume Builder', path: '/dashboard/resumes' },
  { icon: Sparkles, label: 'AI Tools', path: '/dashboard/ai-tools' },
  { icon: CreditCard, label: 'Subscription', path: '/dashboard/subscription' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' }
];

interface DashboardLayoutProps {
  onLogout?: () => void;
}

export default function DashboardLayout({ onLogout }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6 border-b border-gray-700 flex items-center">
          <div className="bg-[#4ECCA3] text-white p-2 rounded-lg mr-3">
            <FileText className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-white">ResumeLabs</h1>
        </div>
        <div className="flex flex-col flex-1 p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-[#4ECCA3] text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-auto pt-6">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-left text-gray-300 hover:bg-gray-700 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isSidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 20 }}
        className="fixed inset-0 z-40 w-64 bg-gray-800 shadow-xl md:hidden"
      >
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-[#4ECCA3] text-white p-2 rounded-lg mr-3">
              <FileText className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold text-white">ResumeLabs</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg text-gray-400 hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex flex-col flex-1 p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-[#4ECCA3] text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
          <div className="mt-auto pt-6">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-left text-gray-300 hover:bg-gray-700 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-700 md:hidden"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="ml-4 md:ml-0">
                <h1 className="text-xl font-semibold text-white">Home</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button className="p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-3 h-3 bg-[#4ECCA3] rounded-full border-2 border-gray-800"></span>
                </button>
              </div>
              <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-700">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-white">John Doe</span>
                  <span className="text-xs text-gray-400">Free Plan</span>
                </div>
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-300">
                  <span className="text-xs font-medium">JD</span>
                </div>
              </button>
              <button className="hidden md:block px-4 py-2 bg-[#4ECCA3] text-white rounded-xl hover:bg-[#45B08C] transition-colors">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}