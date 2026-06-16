import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, Box, Truck } from 'lucide-react';
import WeParcelLogo from './WeParcelLogo';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenQuickTrack: () => void;
  onOpenAuth: (view?: 'login' | 'register') => void;
  onOpenCalculator: () => void;
}

export default function Navbar({ activePage, setActivePage, onOpenQuickTrack, onOpenAuth, onOpenCalculator }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Shipments', id: 'shipments' },
    { label: 'Services', id: 'services' },
    { label: 'Support', id: 'support' },
  ];

  const handleNavClick = (pageId: string, hash?: string) => {
    setActivePage(pageId);
    setIsOpen(false);
    
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-black/85 backdrop-blur-md border-b border-white/5 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand markup conforming directly to the WEParcel visual identity */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center cursor-pointer group py-1"
          >
            <div className="h-12 sm:h-14 w-auto max-w-[75px] hover:opacity-90 transition-opacity duration-350">
              <WeParcelLogo height="100%" width="100%" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 font-display text-sm font-medium tracking-wide transition-colors duration-200 outline-none ${
                    isActive ? 'text-brand-orange' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute bottom-0 left-4 right-4 h-[2px] bg-brand-orange"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
               onClick={() => onOpenAuth('login')}
               className={`px-4 py-2 font-display text-sm font-semibold tracking-wide transition-colors duration-200 outline-none ${
                 activePage === 'login' || activePage === 'register' ? 'text-brand-orange' : 'text-zinc-300 hover:text-white'
               }`}
            >
              Client Access
            </button>
            <button
               onClick={onOpenCalculator}
               className="px-5 py-2 font-dmmono text-xs font-semibold uppercase tracking-wider bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 rounded-none transition-colors duration-300 transform active:scale-95 flex items-center space-x-1.5"
            >
              <Box size={14} className="text-brand-orange" />
              <span>Calculate</span>
            </button>
            <button
               onClick={onOpenQuickTrack}
               className="px-5 py-2 font-dmmono text-xs font-semibold uppercase tracking-wider bg-brand-orange hover:bg-brand-orange-hover text-black rounded-none transition-colors duration-300 transform active:scale-95 shadow-[0_4px_14px_rgba(255,122,0,0.25)] flex items-center space-x-1.5"
            >
              <Truck size={14} />
              <span>Track Now</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-zinc-400 hover:text-white focus:outline-none transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu with layout slide transition */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-zinc-950 border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-none font-display text-base font-semibold ${
                      isActive 
                        ? 'bg-zinc-900 text-brand-orange border-l-2 border-brand-orange' 
                        : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              
              {/* Dynamic Client Portal Mobile trigger */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAuth('login');
                }}
                className={`block w-full text-left px-4 py-3 rounded-none font-display text-base font-semibold ${
                  activePage === 'login' || activePage === 'register'
                    ? 'bg-zinc-900 text-brand-orange border-l-2 border-brand-orange' 
                    : 'text-zinc-300 hover:bg-zinc-900 hover:text-white'
                }`}
              >
                Client Access Portal
              </button>

              <div className="pt-4 grid grid-cols-2 gap-3 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenCalculator();
                  }}
                  className="py-3 text-center font-dmmono text-xs font-bold uppercase tracking-wider bg-zinc-900 text-white rounded-none shadow-md transition-colors"
                >
                  Calculate
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenQuickTrack();
                  }}
                  className="py-3 text-center font-dmmono text-xs font-bold uppercase tracking-wider bg-brand-orange hover:bg-brand-orange-hover text-black rounded-none shadow-md transition-colors"
                >
                  Track Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
