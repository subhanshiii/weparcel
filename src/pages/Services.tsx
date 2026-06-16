import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Truck, Zap, Banknote, Warehouse, Check, Scale, Globe, Shield, Calendar, Calculator, Sparkles, HelpCircle } from 'lucide-react';
import { SERVICE_DETAILS } from '../data/mockData';

export default function Services() {
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
    <div className="pt-28 pb-20 min-h-screen bg-brand-black text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Services Page Intro Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto border-b border-white/5 pb-10">
          <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-brand-orange">
            CONCIERGE FLIGHTS
          </p>
          <h1 className="font-liberation text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
            Our Elite Services Catalog
          </h1>
          <p className="font-dmsans text-zinc-400 text-sm leading-relaxed">
            Discover precision transport. Whether you are dispatching express medical containers or managing international retail cashflows, we provide secure custom logistics.
          </p>
        </div>

        {/* List of Elite Services of WEPARCEL with Bullet points and high contrast grids */}
        <div className="space-y-16">
          {SERVICE_DETAILS.map((srv, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#0d0e11] border border-white/5 p-8 rounded-none ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                
                {/* Text specifics columns */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 bg-brand-orange/15 text-brand-orange text-[10px] font-mono tracking-widest uppercase rounded">
                      Avg Transit: {srv.avgLeadTime}
                    </span>
                    <h2 className="font-dmsans text-2xl sm:text-3xl font-bold text-white mt-2">
                      {srv.title} Logistical Flow
                    </h2>
                    <p className="text-zinc-300 font-medium text-sm leading-relaxed">
                      {srv.tagline}
                    </p>
                  </div>

                  <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">
                    {srv.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {srv.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-2 text-xs">
                        <span className="w-4 h-4 rounded-full bg-brand-orange/10 flex items-center justify-center shrink-0 text-brand-orange mt-0.5">
                          <Check size={10} />
                        </span>
                        <span className="text-zinc-300">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center space-x-6 text-xs text-zinc-500 font-mono">
                    <span>Baseline Cost: <strong className="text-white">${srv.ratePerKg.toFixed(2)} / kg</strong></span>
                    <span>Class Rank: <strong className="text-white">Premium Tier 01</strong></span>
                  </div>

                </div>

                {/* Decorative Visual Illustration cards representing premium logistics */}
                <div className={`lg:col-span-5 flex justify-center ${isEven ? 'lg order-2' : 'lg:order-1'}`}>
                  <div className="aspect-square w-full max-w-[340px] bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/5 rounded-none p-6 flex flex-col justify-between relative overflow-hidden group shadow-xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-1000" />
                    
                    {/* Header icon block */}
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-zinc-950 rounded-none border border-white/10 flex items-center justify-center text-brand-orange">
                        {srv.id === 'standard' && <Truck size={24} />}
                        {srv.id === 'express' && <Zap size={24} />}
                        {srv.id === 'cod_code' || srv.id === 'cod_flow' ? <Banknote size={24} /> : null}
                        {srv.id === 'inventory' && <Warehouse size={24} />}
                      </div>
                      <span className="text-[10px] font-mono text-zinc-600">CODE: {srv.id.toUpperCase()}</span>
                    </div>

                    {/* Middle stats placeholder illustration */}
                    <div className="space-y-2 py-4">
                      <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-orange w-1/2 rounded-full" />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono">
                        <span>STABILITY LOG</span>
                        <span>100% COMPLETE</span>
                      </div>
                    </div>

                    {/* Bottom coordinates badge */}
                    <div className="flex items-center space-x-2 text-[11px] font-mono text-zinc-400 border-t border-white/5 pt-4">
                      <Globe size={12} className="text-brand-orange" />
                      <span>Transit Hubs: NYC - MUN - BRU - TYO</span>
                    </div>

                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* 4. FREIGHT RATE CALCULATOR SECTION */}
        <section id="calculator" className="bg-zinc-950 rounded-none border border-white/5 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            {/* Form Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-1.5 text-brand-orange text-xs font-mono font-bold uppercase">
                  <Calculator size={14} />
                  <span>Interactive Estimation</span>
                </div>
                <h2 className="font-dmsans text-2xl sm:text-3xl font-extrabold uppercase text-white">
                  Global Rate Calculator
                </h2>
                <p className="text-zinc-400 text-xs sm:text-sm">
                  Estimate total shipping expenses and transit boundaries across continent zones instantly.
                </p>
              </div>

              <form onSubmit={handleCalculate} className="space-y-4 text-xs text-zinc-300">
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Select Service */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Product Class</label>
                    <select
                      className="w-full bg-[#0a0a0c] border border-white/5 rounded px-3 py-2 text-white outline-none focus:border-brand-orange select-none"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                    >
                      <option value="standard">Standard Carrier</option>
                      <option value="express">Express Priority</option>
                      <option value="cod_flow">COD Cash Flow</option>
                      <option value="inventory">Inventory climate</option>
                    </select>
                  </div>

                  {/* Select origin */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Origin Zone</label>
                    <select
                      className="w-full bg-[#0a0a0c] border border-white/5 rounded px-3 py-2 text-white outline-none focus:border-brand-orange"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                    >
                      <option value="US">North America (JFK)</option>
                      <option value="Europe">Europe Hub (FRA)</option>
                      <option value="Asia">Asia Pacific (SIN)</option>
                    </select>
                  </div>

                  {/* Select destination */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Destination Zone</label>
                    <select
                      className="w-full bg-[#0a0a0c] border border-white/5 rounded px-3 py-2 text-white outline-none focus:border-brand-orange"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    >
                      <option value="Europe">Europe Hub (FRA)</option>
                      <option value="US">North America (JFK)</option>
                      <option value="Asia">Asia Pacific (SIN)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  
                  {/* Weight Input */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 uppercase tracking-wider font-mono">Weight (kg)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      className="w-full bg-[#0a0a0c] border border-white/5 rounded px-3 py-2 text-white outline-none focus:border-brand-orange"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>

                  {/* Checkbox Climate */}
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="climateOption"
                      className="h-4 w-4 rounded bg-[#0a0a0c] border-white/5 accent-brand-orange cursor-pointer"
                      checked={climate}
                      onChange={(e) => setClimate(e.target.checked)}
                    />
                    <label htmlFor="climateOption" className="text-[11px] text-zinc-300 pointer-events-auto cursor-pointer select-none">
                      Climate Stabilized (+ $25)
                    </label>
                  </div>

                  {/* Checkbox Insurance */}
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="insuranceOption"
                      className="h-4 w-4 rounded bg-[#0a0a0c] border-white/5 accent-brand-orange cursor-pointer"
                      checked={insurance}
                      onChange={(e) => setInsurance(e.target.checked)}
                    />
                    <label htmlFor="insuranceOption" className="text-[11px] text-zinc-300 pointer-events-auto cursor-pointer select-none">
                      Cargo Insurance (+ $15)
                    </label>
                  </div>

                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-brand-orange hover:bg-brand-orange-hover text-black font-dmmono font-bold uppercase tracking-wider rounded-none transition-colors cursor-pointer"
                  >
                    Calculate Transport Quote
                  </button>
                </div>

              </form>

            </div>

            {/* Results Quote Card Column */}
            <div className="lg:col-span-5 bg-[#0d0e11] border border-white/10 rounded-none p-6 sm:p-8 space-y-6">
              <h3 className="font-dmsans text-sm font-bold text-white uppercase tracking-wider border-b border-white/5 pb-3 flex items-center space-x-1.5">
                <Sparkles size={14} className="text-brand-orange animate-pulse" />
                <span>Consignment Estimate Invoice</span>
              </h3>

              {quoteCalculated ? (
                <div className="space-y-4 text-xs font-mono">
                  
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Base Class Fee:</span>
                    <span className="text-zinc-200">${quoteDetails.baseCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-500">Transcontinental Zone:</span>
                    <span className="text-zinc-200">${quoteDetails.routeCost.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-zinc-500">Selected Addons:</span>
                    <span className="text-zinc-200">${quoteDetails.surcharges.toFixed(2)}</span>
                  </div>

                  <hr className="border-white/5" />

                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400 font-bold uppercase">Estimated Quote:</span>
                    <span className="text-brand-orange font-bold">${quoteDetails.total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} className="text-brand-orange" />
                      <span>Avg Lead Time:</span>
                    </div>
                    <strong>{quoteDetails.time}</strong>
                  </div>

                </div>
              ) : (
                <div className="text-center py-10 text-zinc-500 space-y-2">
                  <HelpCircle size={24} className="mx-auto text-zinc-700" />
                  <p className="text-xs">Provide shipping details to generate quote coordinates.</p>
                </div>
              )}
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}
