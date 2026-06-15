import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';
import Login from '../pages/Login';
import Register from '../pages/Register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialView = 'login' }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'register'>(initialView);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          {/* Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative w-full max-w-lg bg-zinc-950 border border-white/10 shadow-2xl rounded-none overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-10">
              {/* Header */}
              <div className="mb-8 space-y-2 text-center">
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
                  {view === 'login' ? 'Client Access' : 'Register Account'}
                </h2>
                <p className="text-sm text-zinc-500 font-mono uppercase tracking-widest">
                  {view === 'login' ? 'WEParcel Global Logistics Portal' : 'Join the Elite Shipping Network'}
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex border border-white/5 bg-zinc-900/50 mb-8">
                <button
                  onClick={() => setView('login')}
                  className={`flex-1 py-3 text-xs font-dmmono font-bold uppercase tracking-widest transition-all ${
                    view === 'login' ? 'bg-brand-orange text-black' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setView('register')}
                  className={`flex-1 py-3 text-xs font-dmmono font-bold uppercase tracking-widest transition-all ${
                    view === 'register' ? 'bg-brand-orange text-black' : 'text-zinc-500 hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* View Content */}
              <div className="space-y-6">
                {view === 'login' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                        <input
                          type="email"
                          placeholder="client@weparcel.com"
                          className="w-full bg-zinc-900 border border-white/5 p-3 pl-10 text-sm focus:border-brand-orange outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Sovereign Key</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                        <input
                          type="password"
                          placeholder="••••••••"
                          className="w-full bg-zinc-900 border border-white/5 p-3 pl-10 text-sm focus:border-brand-orange outline-none transition-all"
                        />
                      </div>
                    </div>
                    <button className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover text-black font-dmmono font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2">
                      <span>Authorize Access</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                        <input
                          type="text"
                          placeholder="Subhanshi Agrawal"
                          className="w-full bg-zinc-900 border border-white/5 p-3 pl-10 text-sm focus:border-brand-orange outline-none transition-all"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Enterprise Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                        <input
                          type="email"
                          placeholder="admin@enterprise.com"
                          className="w-full bg-zinc-900 border border-white/5 p-3 pl-10 text-sm focus:border-brand-orange outline-none transition-all"
                        />
                      </div>
                    </div>
                    <button className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover text-black font-dmmono font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2">
                      <span>Initialize Account</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-center space-x-2 text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
                <ShieldCheck size={14} className="text-brand-orange" />
                <span>End-to-End Cryptographic Security</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
