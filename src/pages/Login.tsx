import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, ArrowRight, ShieldCheck, User, Building, LogIn, CheckCircle } from 'lucide-react';

interface LoginProps {
  setActivePage: (page: string) => void;
}

export default function Login({ setActivePage }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<'personal' | 'enterprise'>('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please populate all credential coordinates.');
      return;
    }

    setIsLoading(true);
    
    // Simulate high-performance secure login handover
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg(`Welcome back ! Secure session token initialized for ${email}.`);
      setEmail('');
      setPassword('');
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center relative px-4 text-white">
      {/* Background glow meshes */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#121316] border border-white/5 p-8 shadow-2xl relative"
        >
          {/* Subtle top decoration orange line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-orange" />

          <div className="text-center space-y-2 mb-8">
            <span className="font-dmmono text-[10px] tracking-[0.25em] text-brand-orange uppercase block">
              Global Access Terminal
            </span>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
              Client Portal
            </h2>
            <p className="text-xs text-zinc-400 font-sans max-w-xs mx-auto">
              Access your real-time manifest, COD ledgers, and priority support.
            </p>
          </div>

          {/* Account type tab selector */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-zinc-950 border border-white/5 mb-6">
            <button
              type="button"
              onClick={() => setAccountType('personal')}
              className={`flex items-center justify-center space-x-1.5 py-2 text-xs font-semibold tracking-wider uppercase font-dmmono transition-all duration-300 ${
                accountType === 'personal'
                  ? 'bg-brand-orange text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <User size={13} />
              <span>Personal</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountType('enterprise')}
              className={`flex items-center justify-center space-x-1.5 py-2 text-xs font-semibold tracking-wider uppercase font-dmmono transition-all duration-300 ${
                accountType === 'enterprise'
                  ? 'bg-brand-orange text-black font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Building size={13} />
              <span>Enterprise</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Display status feedbacks */}
            {errorMsg && (
              <div id="login-error" className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div id="login-success" className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-sans space-y-2">
                <div className="flex items-center space-x-1.5 font-bold">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>Authentication Successful</span>
                </div>
                <p className="opacity-90">{successMsg}</p>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-dmmono text-[10px] uppercase tracking-wider text-zinc-400 block" htmlFor="login-email">
                E-mail Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                  <Mail size={15} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-zinc-950 border border-white/5 py-3.5 pl-11 pr-4 text-xs font-sans text-white focus:border-brand-orange focus:bg-zinc-900 focus:outline-none transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="font-dmmono text-[10px] uppercase tracking-wider text-zinc-400 block" htmlFor="login-password">
                  Security Code / Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('Demo Mode: Contact your Account Executive or register a new account to redefine your security credentials.')}
                  className="text-[10px] font-dmmono text-brand-orange hover:underline uppercase tracking-wide"
                >
                  Forgot Code?
                </button>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                  <Lock size={15} />
                </span>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-zinc-950 border border-white/5 py-3.5 pl-11 pr-4 text-xs font-sans text-white focus:border-brand-orange focus:bg-zinc-900 focus:outline-none transition-all placeholder:text-zinc-600"
                />
              </div>
            </div>

            {/* Submit CTA */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-black font-dmmono font-bold uppercase tracking-wider text-xs rounded-none transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 shadow-[0_4px_14px_rgba(255,122,0,0.15)] disabled:opacity-55"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
                  <span>Validating Terminal Auth...</span>
                </>
              ) : (
                <>
                  <LogIn size={14} />
                  <span>Enter Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Prompt to register alternative */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-sans gap-2">
            <span>New client to WEParcel?</span>
            <button
              type="button"
              onClick={() => setActivePage('register')}
              className="text-brand-orange font-dmmono font-semibold tracking-wide uppercase hover:underline flex items-center space-x-1"
            >
              <span>Onboard Account</span>
              <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>

        {/* Global custody assurance footnote */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] font-dmmono text-zinc-500 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-zinc-500" />
          <span>Sovereign Security Standards Protected</span>
        </div>
      </div>
    </div>
  );
}
