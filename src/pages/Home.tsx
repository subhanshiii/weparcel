import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, MapPin, BarChart3, Truck, Zap, Banknote, Warehouse, ArrowRight, CornerDownRight, Landmark } from 'lucide-react';
import TrackingSection from '../components/TrackingSection';
import FaqSection from '../components/FaqSection';
import ContainerIllustration from '../components/ContainerIllustration';
import { IMAGES } from '../assets';

interface HomeProps {
  setActivePage: (page: string) => void;
  openQuickTrackWithId: (id: string) => void;
  onOpenAuth: (view?: 'login' | 'register') => void;
  onOpenCalculator: () => void;
}

export default function Home({ setActivePage, openQuickTrackWithId, onOpenAuth, onOpenCalculator }: HomeProps) {
  const [stats] = useState([
    { val: '50K+', label: 'Deliveries' },
    { val: '99.8%', label: 'On-Time' },
    { val: '24/7', label: 'Support' },
  ]);

  const eliteSolutions = [
    {
      id: "standard",
      title: "Standard",
      desc: "Reliable global shipping with consistent transit times and full insurance coverage.",
      icon: <Truck size={20} className="text-zinc-300" />,
      actionText: "EXPLORE",
    },
    {
      id: "express",
      title: "Express",
      desc: "High-priority shipping for urgent parcels. Next-day delivery to major global hubs.",
      icon: <Zap size={20} className="text-zinc-300" />,
      actionText: "SPEED UP",
    },
    {
      id: "cod_flow",
      title: "COD Flow",
      desc: "Secure cash on delivery solutions with instant digital remittance for merchants.",
      icon: <Banknote size={20} className="text-zinc-300" />,
      actionText: "TRANSACT",
    },
    {
      id: "inventory",
      title: "Inventory",
      desc: "Climate-controlled, tech-enabled storage facilities with real-time stock management.",
      icon: <Warehouse size={20} className="text-zinc-300" />,
      actionText: "STORAGE",
    }
  ];

  return (
    <div className="space-y-0 text-white selection:bg-brand-orange selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden">
        
        {/* Subtle background glow rings */}
        <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* YAHAAN SE WAHAAN Badge from Figma design */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center space-x-2 bg-zinc-900 border border-white/5 py-1.5 px-4 rounded-full"
              >
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange absolute" />
                <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-300 uppercase">
                  Yahaan Se Wahaan
                </span>
              </motion.div>

              {/* Huge packed Stacked Headings from Figma screen */}
              <div className="space-y-1">
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-liberation text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-white"
                >
                  Deliver Anywhere.
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-liberation text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-zinc-400"
                >
                  Fast. Secure.
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="font-liberation text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[0.95] text-white"
                >
                  Reliable.
                </motion.h1>
              </div>

              {/* Sub-headline description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-dmsans text-zinc-400 text-sm md:text-base max-w-xl leading-relaxed"
              >
                The modern standard for global logistics. We redefine shipping through concierge precision and high-performance technology.
              </motion.p>

              {/* Fully Loaded Interactive tracking finder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-full pt-2"
              >
                <TrackingSection onTrackSubmit={(id) => openQuickTrackWithId(id)} />
              </motion.div>

              {/* Under-hero metrics tracker stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="pt-8 border-t border-white/5 flex flex-row items-center justify-start gap-12 sm:gap-20"
              >
                {stats.map((st, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {st.val}
                    </p>
                    <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                      {st.label}
                    </p>
                  </div>
                ))}
              </motion.div>

            </div>

            {/* Right Illustration Column */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="lg:col-span-5 relative mt-6 lg:mt-0"
            >
              {/* Outer decoration border framing the container artwork */}
              <div className="relative aspect-square w-full max-w-[460px] mx-auto rounded-none overflow-hidden border border-white/10 p-2 bg-gradient-to-br from-zinc-900 to-zinc-950 shadow-2xl group">
                
                {/* Embedded High fidelity pure illustration recreating the attached image perfectly */}
                <div className="w-full h-full rounded-none overflow-hidden relative">
                  <ContainerIllustration />
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. ELITE LOGISTICS SOLUTIONS */}
      <section className="py-24 bg-[#0a0b0d] border-t border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-brand-orange">
                Solutions Portfolio
              </p>
              <h2 className="font-dmsans text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase mt-2">
                Elite Logistics Solutions
              </h2>
            </div>
            <button 
              onClick={() => setActivePage('services')} 
              className="text-zinc-400 hover:text-brand-orange text-xs font-semibold tracking-wider font-dmmono uppercase flex items-center space-x-1 group"
            >
              <span>View All Rates & Tools</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Cards Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {eliteSolutions.map((sol, index) => (
              <motion.div
                key={sol.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActivePage('services')}
                className="group relative bg-[#121316] border border-white/5 rounded-none p-8 flex flex-col justify-between hover:bg-[#18191d] hover:border-brand-orange/30 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl"
              >
                <div>
                  
                  {/* Circular visual icon container */}
                  <div className="w-12 h-12 rounded-none bg-zinc-900 border border-white/5 flex items-center justify-center mb-8 group-hover:bg-brand-orange group-hover:text-black transition-colors duration-300">
                    {sol.icon}
                  </div>

                  <h3 className="font-dmsans text-base font-bold text-white mb-3 group-hover:text-brand-orange transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    {sol.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-start space-x-1.5 text-[10px] font-mono font-bold tracking-widest text-[#ff7a00] group-hover:translate-x-1 transition-transform duration-300">
                  <span>{sol.actionText}</span>
                  <ArrowRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. PRECISION LOGISTICS FEATURES */}
      <section className="py-24 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left side stacked cargo artwork */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] w-full max-w-[400px] mx-auto rounded-none overflow-hidden border border-white/10 p-1.5 bg-zinc-950 shadow-2xl">
                <div className="w-full h-full relative overflow-hidden bg-cover bg-center bg-[#172554] flex items-end p-6"
                     style={{ backgroundImage: `url(${IMAGES.airCargo})` }}>
                  
                  {/* overlay dark gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Right side Bullet List */}
            <div className="lg:col-span-7 space-y-10">
              
              <div className="space-y-3">
                <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-brand-orange">
                  Engineered Operations
                </p>
                <h2 className="font-dmsans text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase leading-none">
                  Precision Logistics Features
                </h2>
                <p className="text-zinc-400 text-sm max-w-xl">
                  Built for enterprises that demand transparency, absolute climate control, and high-fidelity sovereign customs routing.
                </p>
              </div>              {/* Bullet details stack */}
              <div className="space-y-8 pt-4">
                
                {/* Bullet 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-none bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center shrink-0 mt-1">
                    <MapPin size={18} className="text-brand-orange animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-dmsans text-sm font-bold text-white uppercase tracking-wider">
                      Hyper-Local Mapping
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed max-w-xl">
                      Custom API integrations with local routing algorithms to avoid peak congestion in urban hubs.
                    </p>
                  </div>
                </div>
 
                {/* Bullet 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-none bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center shrink-0 mt-1">
                    <ShieldCheck size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-dmsans text-sm font-bold text-white uppercase tracking-wider">
                      Secure Chain of Custody
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed max-w-xl">
                      Biometric verification at every handover point ensuring your valuable goods remain in safe hands.
                    </p>
                  </div>
                </div>
 
                {/* Bullet 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-none bg-brand-orange/5 border border-brand-orange/20 flex items-center justify-center shrink-0 mt-1">
                    <BarChart3 size={18} className="text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="font-dmsans text-sm font-bold text-white uppercase tracking-wider">
                      Predictive Analytics
                    </h3>
                    <p className="text-zinc-400 text-xs md:text-sm mt-1 leading-relaxed max-w-xl">
                      AI-driven arrival forecasting that accounts for global weather, port strikes, and flight delays.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. SHIPPING INQUIRIES */}
      <section className="py-24 bg-[#0a0b0d] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-3 mb-16">
            <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-brand-orange">
              Inquiries & Advice
            </p>
            <h2 className="font-dmsans text-3xl sm:text-4xl font-extrabold tracking-tight text-white uppercase">
              Shipping Inquiries
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
              Review answers to our global clients' most standard logistics arrangements.
            </p>
          </div>

          {/* FAQ Accordions List */}
          <FaqSection />

        </div>
      </section>

      {/* 5. READY TO SHIP CTA BANNER */}
      <section className="py-16 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Blue banner matching design aesthetics */}
          <div className="bg-[#2a62d6] hover:bg-[#2557bd] transition-colors duration-500 rounded-none py-16 px-8 sm:px-16 text-center space-y-8 relative overflow-hidden shadow-2xl">
            
            {/* Ambient vector details */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full skew-x-12 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <h2 className="font-dmsans text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                Ready To Ship?
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                Join the world's most innovative brands using WEParcel for their critical logistics infrastructure.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10 pt-2">
              <button
                onClick={() => onOpenAuth('register')}
                className="w-full sm:w-auto px-8 py-4 bg-brand-orange hover:bg-brand-orange-hover text-black font-dmmono font-bold uppercase tracking-wider text-xs rounded-none transition-all duration-300 transform active:scale-95 shadow-md flex items-center justify-center space-x-1.5"
              >
                <span>Create Business Account</span>
                <ArrowRight size={14} />
              </button>
              
              <button
                onClick={() => setActivePage('services')}
                className="w-full sm:w-auto px-8 py-4 bg-white/90 hover:bg-white text-zinc-900 font-dmmono font-semibold uppercase tracking-wider text-xs rounded-none transition-all duration-300 transform active:scale-95 shadow-md"
              >
                Calculate Transport Rate
              </button>

              <button
                onClick={() => setActivePage('support')}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 hover:border-white text-white font-dmmono font-semibold uppercase tracking-wider text-xs rounded-none transition-all duration-300 transform active:scale-95 shadow-md"
              >
                Contact Sales
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
