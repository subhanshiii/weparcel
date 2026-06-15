import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, ArrowRight, ShieldCheck, User, Building, MapPin, CheckCircle } from 'lucide-react';

interface RegisterProps {
  setActivePage: (page: string) => void;
}

export default function Register({ setActivePage }: RegisterProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('US');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isBusiness, setIsBusiness] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [loadStep, setLoadStep] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg('Please populate all required details.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Credential codes / passwords do not match.');
      return;
    }

    setIsLoading(true);
    setLoadStep(1);

    // Multi-stage simulated premium client setup
    setTimeout(() => {
      setLoadStep(2);
      setTimeout(() => {
        setLoadStep(3);
        setTimeout(() => {
          setIsLoading(false);
          setLoadStep(0);
          setSuccessMsg(`Welcome to the fleet, ${name}! Your WEParcel account has been fully provisioned and mapped to terminal region: ${location}.`);
          setName('');
          setEmail('');
          setCompany('');
          setPassword('');
          setConfirmPassword('');
        }, 1200);
      }, 1000);
    }, 1000);
  };

  const stepsText = [
    '',
    '1/3. Allocating unique customer ID ledger...',
    '2/3. Customizing regional logistics route matrices...',
    '3/3. Cryptographically securing security keys...',
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center relative px-4 text-white">
      {/* Background radial overlays */}
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#121316] border border-white/5 p-8 shadow-2xl relative"
        >
          {/* Accent decoration ribbon */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-orange" />

          <div className="text-center space-y-2 mb-6">
            <span className="font-dmmono text-[10px] tracking-[0.25em] text-brand-orange uppercase block">
              Global Fleet Onboarding
            </span>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white animate-pulse">
              Create Client Account
            </h2>
            <p className="text-xs text-zinc-400 font-sans max-w-xs mx-auto">
              Initiate a high-speed relationship. Set up personal or business logistics profiles instantly.
            </p>
          </div>

          {/* Account Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Direct Feedbacks */}
            {errorMsg && (
              <div id="register-error" className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div id="register-success" className="p-3.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-sans space-y-3">
                <div className="flex items-center space-x-1.5 font-bold">
                  <CheckCircle size={15} className="text-green-500" />
                  <span>Onboarding Initiated Successfully</span>
                </div>
                <p className="opacity-90 leading-relaxed">{successMsg}</p>
                <button
                  type="button"
                  onClick={() => setActivePage('login')}
                  className="bg-green-500 text-black font-dmmono text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 transition-all hover:bg-green-400"
                >
                  Confirm & Log In
                </button>
              </div>
            )}

            {/* Quick checkbox choosing profile mode */}
            <div className="flex items-center space-x-3 p-3 bg-zinc-950 border border-white/5">
              <input
                id="is-business-chk"
                type="checkbox"
                checked={isBusiness}
                onChange={(e) => setIsBusiness(e.target.checked)}
                className="w-4 h-4 rounded-none accent-brand-orange border-white/10 bg-zinc-900 cursor-pointer"
              />
              <label htmlFor="is-business-chk" className="text-xs font-sans text-zinc-300 font-medium cursor-pointer">
                This is a <strong className="text-white">Business / Merchant Account</strong> (Unlocks Bulk Rates & COD integration)
              </label>
            </div>

            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="font-dmmono text-[10px] uppercase tracking-wider text-zinc-400 block" htmlFor="reg-name">
                Authorized Executive / Contact Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                  <User size={15} />
                </span>
                <input
                  id="reg-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Subhanshi Agrawal"
                  className="w-full bg-zinc-950 border border-white/5 py-3 pl-11 pr-4 text-xs font-sans text-white focus:border-brand-orange focus:bg-zinc-900 focus:outline-none transition-all placeholder:text-zinc-650"
                />
              </div>
            </div>

            {/* Company Name */}
            {isBusiness && (
              <div className="space-y-1.5">
                <label className="font-dmmono text-[10px] uppercase tracking-wider text-zinc-400 block" htmlFor="reg-company">
                  Company / Organization Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                    <Building size={15} />
                  </span>
                  <input
                    id="reg-company"
                    type="text"
                    required={isBusiness}
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. WEParcel Logistics Corp"
                    className="w-full bg-zinc-950 border border-white/5 py-3 pl-11 pr-4 text-xs font-sans text-white focus:border-brand-orange focus:bg-zinc-900 focus:outline-none transition-all placeholder:text-zinc-650"
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="font-dmmono text-[10px] uppercase tracking-wider text-zinc-400 block" htmlFor="reg-email">
                Primary Contact E-mail
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                  <Mail size={15} />
                </span>
                <input
                  id="reg-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-zinc-950 border border-white/5 py-3 pl-11 pr-4 text-xs font-sans text-white focus:border-brand-orange focus:bg-zinc-900 focus:outline-none transition-all placeholder:text-zinc-650"
                />
              </div>
            </div>

            {/* Headlining Region Select list */}
            <div className="space-y-1.5">
              <label className="font-dmmono text-[10px] uppercase tracking-wider text-zinc-400 block" htmlFor="reg-location">
                Operational Terminal / Location
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                  <MapPin size={15} />
                </span>
                <select
                  id="reg-location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/5 py-3 pl-11 pr-4 text-xs font-sans text-white focus:border-brand-orange focus:bg-zinc-900 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="US">North America Hub (US / East Coast)</option>
                  <option value="EU">European Main Union Hub (Luxembourg)</option>
                  <option value="AS">Asia Pacific Port Hub (Singapore)</option>
                  <option value="IN">Indian Subcontinent Terminal (Mumbai Region)</option>
                </select>
              </div>
            </div>

            {/* Password fields row config */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Pass 1 */}
              <div className="space-y-1.5">
                <label className="font-dmmono text-[9px] uppercase tracking-wider text-zinc-400 block" htmlFor="reg-pass">
                  Security Code
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                    <Lock size={13} />
                  </span>
                  <input
                    id="reg-pass"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-white/5 py-3 pl-11 pr-4 text-xs font-sans text-white focus:border-brand-orange focus:bg-zinc-900 focus:outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>
              </div>

              {/* Pass 2 */}
              <div className="space-y-1.5">
                <label className="font-dmmono text-[9px] uppercase tracking-wider text-zinc-400 block" htmlFor="reg-confirm">
                  Confirm Code
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-zinc-500">
                    <Lock size={13} />
                  </span>
                  <input
                    id="reg-confirm"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-zinc-950 border border-white/5 py-3 pl-11 pr-4 text-xs font-sans text-white focus:border-brand-orange focus:bg-zinc-900 focus:outline-none transition-all placeholder:text-zinc-600"
                  />
                </div>
              </div>
            </div>

            {/* Onboarding Trigger button */}
            <button
              id="register-submit-btn"
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-brand-orange hover:bg-brand-orange-hover text-black font-dmmono font-bold uppercase tracking-wider text-xs rounded-none transition-all duration-300 transform active:scale-95 flex items-center justify-center space-x-1.5 shadow-[0_4px_14px_rgba(255,122,0,0.15)] disabled:opacity-55"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin inline-block" />
                  <span>Onboarding...</span>
                </>
              ) : (
                <>
                  <span>Initialize Onboarding</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Interactive Steps indicators if loading */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-3 bg-zinc-950 border border-white/5 text-center text-[10px] font-dmmono text-brand-orange uppercase animate-pulse"
              >
                {stepsText[loadStep]}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation link switch */}
          <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-sans gap-2">
            <span>Already have operational access?</span>
            <button
              type="button"
              onClick={() => setActivePage('login')}
              className="text-brand-orange font-dmmono font-semibold tracking-wide uppercase hover:underline"
            >
              Log In Instead
            </button>
          </div>
        </motion.div>

        {/* Global certification trust badge */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-[10px] font-dmmono text-zinc-500 uppercase tracking-widest">
          <ShieldCheck size={14} className="text-zinc-500" />
          <span>IATA certified priority clearance channel</span>
        </div>
      </div>
    </div>
  );
}
