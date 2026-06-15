import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, MessageSquare, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shipments from './pages/Shipments';
import Services from './pages/Services';
import Support from './pages/Support';
import Login from './pages/Login';
import Register from './pages/Register';
import AssetsRegistry from './pages/AssetsRegistry';
import TrackingSection from './components/TrackingSection';
import AuthModal from './components/AuthModal';

export default function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [isQuickTrackOpen, setIsQuickTrackOpen] = useState(false);
  const [quickTrackPreloadId, setQuickTrackPreloadId] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login');

  const openAuthModal = (view: 'login' | 'register' = 'login') => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  // Handles smooth page selection transitions
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            setActivePage={setActivePage}
            openQuickTrackWithId={(id) => {
              setQuickTrackPreloadId(id);
              setIsQuickTrackOpen(true);
            }}
            onOpenAuth={openAuthModal}
          />
        );
      case 'shipments':
        return <Shipments />;
      case 'services':
        return <Services />;
      case 'support':
        return <Support />;
      case 'login':
        return <Login setActivePage={setActivePage} />;
      case 'register':
        return <Register setActivePage={setActivePage} />;
      case 'assets':
        return <AssetsRegistry />;
      default:
        return (
          <Home
            setActivePage={setActivePage}
            openQuickTrackWithId={(id) => {
              setQuickTrackPreloadId(id);
              setIsQuickTrackOpen(true);
            }}
            onOpenAuth={openAuthModal}
          />
        );
    }
  };

  return (
    <div className="bg-[#0c0c0e] min-h-screen text-white flex flex-col justify-between selection:bg-brand-orange selection:text-black antialiased relative">
      
      {/* Dynamic Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        onOpenQuickTrack={() => {
          setQuickTrackPreloadId('');
          setIsQuickTrackOpen(true);
        }}
        onOpenAuth={openAuthModal}
      />

      {/* Main page content area wrapped under fade layout animations */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer coordinates structure */}
      <Footer setActivePage={setActivePage} />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
      />

      {/* Global Quick Track Modal popup */}
      <AnimatePresence>
        {isQuickTrackOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-black border border-white/10 max-w-3xl w-full rounded-none shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative text-white"
              role="dialog"
              aria-modal="true"
            >
              {/* Modal close bar */}
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-dmsans text-lg font-bold uppercase text-white tracking-wider">
                    Instant Transit Tracker
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5 font-mono">WEPARCEL GLOBAL REAL-TIME COPT</p>
                </div>
                <button
                  onClick={() => setIsQuickTrackOpen(false)}
                  className="p-1.5 bg-zinc-900 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                  aria-label="Close tracking"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Embedding tracking layout component */}
              <div className="py-2">
                <TrackingSection initialTrackingCode={quickTrackPreloadId} />
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 font-dmmono gap-3">
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck size={14} className="text-brand-orange" />
                  <span>End-to-End Cryptographic Custody</span>
                </div>
                <button
                  onClick={() => {
                    setIsQuickTrackOpen(false);
                    setActivePage('shipments');
                  }}
                  className="text-white hover:text-brand-orange underline underline-offset-4 font-dmmono transition-colors"
                >
                  Open Advanced Ledger Board
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
