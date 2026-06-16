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

      </div>
    </div>
  );
}
