import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calculator, Sparkles, Calendar, HelpCircle, ArrowRight, Shield } from 'lucide-react';
import { SERVICE_DETAILS } from '../data/mockData';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CalculatorModal({ isOpen, onClose }: CalculatorModalProps) {
  // Calculator Form State
  const [selectedService, setSelectedService] = useState('standard');
  const [origin, setOrigin] = useState('US');
  const [destination, setDestination] = useState('Europe');
  const [weight, setWeight] = useState('10');
  const [climate, setClimate] = useState(false);
  const [insurance, setInsurance] = useState(true);
  
  // Quote results states
  const [quoteCalculated, setQuoteCalculated] = useState(true);
  const [quoteDetails, setQuoteDetails] = useState({
    baseCost: 45.00,
    routeCost: 35.00,
    surcharges: 15.00,
    total: 95.00,
    time: "5-7 Business Days"
  });

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) return;

    // Find service rate
    const serviceObj = SERVICE_DETAILS.find(s => s.id === selectedService) || SERVICE_DETAILS[0];
    const ratePerKg = serviceObj.ratePerKg;

    // 1. Base Cost
    const baseVal = weightNum * ratePerKg;

    // 2. Zone/Distance Charge multiplier
    let distanceFactor = 20.00;
    if (origin !== destination) {
      if ((origin === 'US' && destination === 'Asia') || (origin === 'Asia' && destination === 'US')) {
        distanceFactor = 65.00;
      } else {
        distanceFactor = 45.00;
      }
    } else {
      distanceFactor = 15.00; // regional
    }

    // 3. Surcharges
    let extraCosts = 0;
    if (climate) extraCosts += 25.00; // special equipment
    if (insurance) extraCosts += 15.00; // cargo security index

    const totalVal = baseVal + distanceFactor + extraCosts;

    setQuoteDetails({
      baseCost: Number(baseVal.toFixed(2)),
      routeCost: Number(distanceFactor.toFixed(2)),
      surcharges: Number(extraCosts.toFixed(2)),
      total: Number(totalVal.toFixed(2)),
      time: serviceObj.avgLeadTime
    });
    setQuoteCalculated(true);
  };

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
            className="absolute inset-0 bg-black/70 backdrop-blur-2xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-4xl bg-zinc-950 border border-white/10 shadow-2xl rounded-none overflow-hidden max-h-[95vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 rounded-full transition-all duration-200 z-10 shadow-lg"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Form Column */}
                <div className="lg:col-span-7 space-y-8">
                  <div className="space-y-2">
                    <div className="inline-flex items-center space-x-2 text-brand-orange text-xs font-mono font-bold uppercase tracking-widest">
                      <Calculator size={14} />
                      <span>Interactive Estimation Engine</span>
                    </div>
                    <h2 className="font-display text-3xl font-bold uppercase text-white tracking-tight">
                      Global Rate Calculator
                    </h2>
                    <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider">
                      Generate high-fidelity transport coordinates
                    </p>
                  </div>

                  <form onSubmit={handleCalculate} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Product Class */}
                      <div className="space-y-2">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Product Class</label>
                        <select
                          className="w-full bg-zinc-900 border border-white/5 rounded-none px-4 py-3 text-sm text-white outline-none focus:border-brand-orange transition-all"
                          value={selectedService}
                          onChange={(e) => setSelectedService(e.target.value)}
                        >
                          <option value="standard">Standard Carrier</option>
                          <option value="express">Express Priority</option>
                          <option value="cod_flow">COD Cash Flow</option>
                          <option value="inventory">Inventory Climate</option>
                        </select>
                      </div>

                      {/* Weight */}
                      <div className="space-y-2">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Cargo Mass (kg)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          className="w-full bg-zinc-900 border border-white/5 rounded-none px-4 py-3 text-sm text-white outline-none focus:border-brand-orange transition-all"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Origin */}
                      <div className="space-y-2">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Origin Hub</label>
                        <select
                          className="w-full bg-zinc-900 border border-white/5 rounded-none px-4 py-3 text-sm text-white outline-none focus:border-brand-orange transition-all"
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                        >
                          <option value="US">North America (JFK)</option>
                          <option value="Europe">Europe Hub (FRA)</option>
                          <option value="Asia">Asia Pacific (SIN)</option>
                        </select>
                      </div>

                      {/* Destination */}
                      <div className="space-y-2">
                        <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Destination Hub</label>
                        <select
                          className="w-full bg-zinc-900 border border-white/5 rounded-none px-4 py-3 text-sm text-white outline-none focus:border-brand-orange transition-all"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                        >
                          <option value="Europe">Europe Hub (FRA)</option>
                          <option value="US">North America (JFK)</option>
                          <option value="Asia">Asia Pacific (SIN)</option>
                        </select>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={climate}
                            onChange={(e) => setClimate(e.target.checked)}
                          />
                          <div className={`w-10 h-5 bg-zinc-800 transition-colors ${climate ? 'bg-brand-orange' : ''}`} />
                          <div className={`absolute top-1 left-1 w-3 h-3 bg-white transition-transform ${climate ? 'translate-x-5' : ''}`} />
                        </div>
                        <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">Climate Stabilized (+$25)</span>
                      </label>

                      <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={insurance}
                            onChange={(e) => setInsurance(e.target.checked)}
                          />
                          <div className={`w-10 h-5 bg-zinc-800 transition-colors ${insurance ? 'bg-brand-orange' : ''}`} />
                          <div className={`absolute top-1 left-1 w-3 h-3 bg-white transition-transform ${insurance ? 'translate-x-5' : ''}`} />
                        </div>
                        <span className="text-xs text-zinc-400 group-hover:text-white transition-colors">Cargo Insurance (+$15)</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-brand-orange hover:bg-brand-orange-hover text-black font-dmmono font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center space-x-2 mt-4"
                    >
                      <span>Execute Calculation</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>
                </div>

                {/* Results Column */}
                <div className="lg:col-span-5 bg-zinc-900/50 border border-white/5 p-8 flex flex-col justify-between">
                  <div className="space-y-8">
                    <h3 className="font-display text-sm font-bold text-white uppercase tracking-widest border-b border-white/5 pb-4 flex items-center space-x-2">
                      <Sparkles size={16} className="text-brand-orange animate-pulse" />
                      <span>Consignment Estimate</span>
                    </h3>

                    {quoteCalculated ? (
                      <div className="space-y-5">
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] text-zinc-500 uppercase font-mono">Base Fee</span>
                          <span className="text-sm text-white font-mono">${quoteDetails.baseCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] text-zinc-500 uppercase font-mono">Zone Access</span>
                          <span className="text-sm text-white font-mono">${quoteDetails.routeCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-[10px] text-zinc-500 uppercase font-mono">Value Addons</span>
                          <span className="text-sm text-white font-mono">${quoteDetails.surcharges.toFixed(2)}</span>
                        </div>
                        
                        <div className="pt-4 border-t border-white/10">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-zinc-400 uppercase">Total Quote</span>
                            <span className="text-2xl font-bold text-brand-orange font-mono">${quoteDetails.total.toFixed(2)}</span>
                          </div>
                        </div>

                        <div className="bg-zinc-950 p-4 space-y-3">
                          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                            <div className="flex items-center space-x-2">
                              <Calendar size={12} className="text-brand-orange" />
                              <span>Transit Velocity</span>
                            </div>
                            <span className="text-zinc-300 font-bold">{quoteDetails.time}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                            <div className="flex items-center space-x-2">
                              <Shield size={12} className="text-brand-orange" />
                              <span>Security Rank</span>
                            </div>
                            <span className="text-zinc-300 font-bold">Elite Tier 01</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-20 text-zinc-600 space-y-4">
                        <HelpCircle size={40} className="mx-auto opacity-20" />
                        <p className="text-xs font-mono uppercase tracking-widest">Awaiting Parameters</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-8 text-[9px] text-zinc-600 font-mono uppercase leading-relaxed text-center">
                    Note: This calculation provides a high-fidelity estimate based on current global logistics coordinates and surcharge indices.
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
