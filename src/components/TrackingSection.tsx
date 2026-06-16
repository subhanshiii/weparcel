import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, ArrowRight, Package, CheckCircle2, ShieldCheck, Clock, MapPin, Thermometer, AlertCircle, Copy, Check } from 'lucide-react';
import { INITIAL_SHIPMENTS } from '../data/mockData';
import { Shipment } from '../types';

interface TrackingSectionProps {
  initialTrackingCode?: string;
  onTrackSubmit?: (code: string) => void;
}

export default function TrackingSection({ initialTrackingCode = '', onTrackSubmit }: TrackingSectionProps) {
  const [trackingNumber, setTrackingNumber] = useState(initialTrackingCode);
  const [searchedId, setSearchedId] = useState('');
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [showDemoCodes, setShowDemoCodes] = useState(false);

  // Automatically trace when the component receives or updates initialTrackingCode (useful for quick tracking in modals)
  useEffect(() => {
    if (initialTrackingCode) {
      const formattedCode = initialTrackingCode.trim().toUpperCase();
      const found = INITIAL_SHIPMENTS.find(
        (s) => s.id === formattedCode || s.id.replace(/-/g, '') === formattedCode.replace(/-/g, '')
      );
      if (found) {
        setShipment(found);
        setSearchedId(found.id);
        setTrackingNumber(found.id);
        setError('');
      } else {
        setError(`No shipment found under "${formattedCode}".`);
        setShipment(null);
        setTrackingNumber(initialTrackingCode);
      }
    } else {
      // Clear previous search state if cleared
      setShipment(null);
      setSearchedId('');
      setError('');
    }
  }, [initialTrackingCode]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const formattedCode = trackingNumber.trim().toUpperCase();

    // If a custom handler is defined (e.g. to open modal instead of rendering inline in hero page), call it
    if (onTrackSubmit) {
      onTrackSubmit(formattedCode || 'WE-500-112-IN');
      return;
    }

    if (!formattedCode) {
      setError('Please enter a parcel tracking number.');
      setShipment(null);
      return;
    }

    const found = INITIAL_SHIPMENTS.find(
      (s) => s.id === formattedCode || s.id.replace(/-/g, '') === formattedCode.replace(/-/g, '')
    );

    if (found) {
      setShipment(found);
      setSearchedId(found.id);
    } else {
      setError(`No shipment found under "${formattedCode}". Try one of the high-fidelity demo numbers below.`);
      setShipment(null);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTrackingNumber(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Tracking Form Search Box exactly corresponding to Figma's orange arrow layout */}
      <form onSubmit={handleTrack} className="relative z-10 flex flex-col md:flex-row items-stretch gap-3 md:gap-0 bg-zinc-900/90 border border-white/10 rounded-none p-2 max-w-2xl mx-auto shadow-2xl backdrop-blur-md">
        <div className="flex-1 flex items-center px-3 min-h-[48px]">
          <Search size={20} className="text-zinc-500 mr-2 shrink-0 animate-pulse" />
          <input
            type="text"
            className="w-full bg-transparent text-white placeholder-zinc-500 text-sm focus:outline-none font-medium"
            placeholder="Enter tracking number... (e.g. WE-500-112-IN)"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-brand-orange hover:bg-brand-orange-hover text-black px-6 py-3 font-dmmono rounded-none text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all duration-300"
        >
          <span>Track Package</span>
          <ArrowRight size={16} />
        </button>
      </form>

      {/* Toggle Button for Demo Codes */}
      <div className="mt-4 flex flex-col items-center">
        <button
          type="button"
          onClick={() => setShowDemoCodes(!showDemoCodes)}
          className="px-4 py-1.5 bg-zinc-950/60 hover:bg-zinc-900 text-zinc-400 hover:text-brand-orange border border-white/5 rounded-full transition-all duration-300 font-dmmono text-[11px] uppercase tracking-wider flex items-center space-x-1.5 hover:shadow-lg"
          aria-expanded={showDemoCodes}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse" />
          <span>{showDemoCodes ? 'Hide Test Ledger Codes' : 'Show Demo Tracking Codes'}</span>
          <span className="text-xs transition-transform duration-300 inline-block transform" style={{ transform: showDemoCodes ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            ▼
          </span>
        </button>

        <AnimatePresence>
          {showDemoCodes && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -5 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -5 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500 mt-4 pb-2 max-w-2xl px-4"
            >
              <span className="font-mono uppercase tracking-widest text-[9px] text-zinc-600 block sm:inline">Click to load:</span>
              {INITIAL_SHIPMENTS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => copyToClipboard(s.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-zinc-900/80 hover:bg-zinc-800 hover:text-white border border-white/10 rounded-none transition-all duration-200"
                >
                  <span className="font-mono text-zinc-300 text-[11px]">{s.id}</span>
                  {copiedId === s.id ? (
                    <Check size={11} className="text-green-500" />
                  ) : (
                    <Copy size={11} className="opacity-40" />
                  )}
                  <span className="text-[10px] text-zinc-500 hover:text-brand-orange">({s.type})</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Output feedback */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-6 p-4 bg-red-950/40 border border-red-500/20 text-red-200 text-xs rounded-none flex items-start space-x-2 max-w-2xl mx-auto"
          >
            <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tracking Results Drawer Panel */}
      <AnimatePresence>
        {shipment && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="mt-12 bg-zinc-950 border border-white/5 rounded-none shadow-2xl overflow-hidden"
          >
            {/* Header Plate */}
            <div className="bg-gradient-to-r from-zinc-900 to-zinc-950 p-6 sm:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-[10px] font-mono tracking-widest uppercase rounded-none">
                    {shipment.type}
                  </span>
                  {shipment.temperatureControlled && (
                    <span className="flex items-center space-x-0.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono tracking-widest uppercase rounded-none">
                      <Thermometer size={10} />
                      <span>Climate Active</span>
                    </span>
                  )}
                </div>
                <h3 className="font-dmsans text-xl sm:text-2xl font-bold text-white mt-1">
                  Parcel Coordinates: {shipment.id}
                </h3>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-zinc-500 uppercase font-mono">Estimated Handover</p>
                <p className="font-dmsans font-semibold text-white text-base">
                  {shipment.estimatedDelivery}
                </p>
              </div>
            </div>

            {/* Status overview and progress bar */}
            <div className="p-6 sm:p-8 border-b border-white/5 bg-[#0e0e11]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-orange animate-ping" />
                  <p className="text-sm text-zinc-300">
                    Current Position: <span className="text-white font-medium">{shipment.currentLocation}</span>
                  </p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                  shipment.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                  shipment.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                  shipment.status === 'Customs' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                  'bg-zinc-800 text-zinc-300'
                }`}>
                  {shipment.status}
                </span>
              </div>

              {/* Progress Slider bar */}
              <div className="h-2 bg-zinc-900 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shipment.progress}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-brand-orange to-amber-400 rounded-full"
                />
              </div>
              <div className="flex justify-between items-center text-xs text-zinc-500 font-mono mt-2">
                <span>Origin Terminal</span>
                <span>Consolidated Gate</span>
                <span>Destination Center</span>
              </div>
            </div>

            {/* Grid for Shipment Details & Timelines */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              
              {/* Manifest info */}
              <div className="lg:col-span-2 p-6 sm:p-8 border-r border-b lg:border-b-0 border-white/5 space-y-6">
                <div>
                  <h4 className="font-dmsans text-xs font-bold text-white uppercase tracking-wider mb-3">
                    Shipper Profile
                  </h4>
                  <div className="space-y-1 text-xs">
                    <p className="text-zinc-300 font-semibold">{shipment.senderName}</p>
                    <p className="text-zinc-500 leading-relaxed font-mono">{shipment.senderAddress}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-dmsans text-xs font-bold text-white uppercase tracking-wider mb-3">
                    Delivery Consignee
                  </h4>
                  <div className="space-y-1 text-xs">
                    <p className="text-zinc-300 font-semibold">{shipment.recipientName}</p>
                    <p className="text-zinc-500 leading-relaxed font-mono">{shipment.recipientAddress}</p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase">Cargo Mass</span>
                    <p className="text-sm font-semibold text-white mt-0.5">{shipment.weight} kg</p>
                  </div>
                  {shipment.isCod && (
                    <div>
                      <span className="text-[10px] text-zinc-500 font-mono uppercase">COD Collection</span>
                      <p className="text-sm font-semibold text-brand-orange mt-0.5">
                        ${shipment.codAmount?.toFixed(2)} (Ledger: {shipment.codStatus})
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Milestones Log Timeline */}
              <div className="lg:col-span-3 p-6 sm:p-8 space-y-6">
                <h4 className="font-dmsans text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Biometric Handover Timeline & Custody Log
                </h4>
                
                <div className="relative border-l-2 border-zinc-800 ml-4 pl-6 space-y-6">
                  {shipment.history.map((milestone, idx) => {
                    const isLatest = idx === shipment.history.length - 1;
                    return (
                      <div key={idx} className="relative">
                        {/* Bullet Icon container */}
                        <div className={`absolute -left-[35px] top-0 w-6 h-6 rounded-full border flex items-center justify-center ${
                          isLatest
                            ? 'bg-brand-orange border-brand-orange text-black'
                            : 'bg-zinc-950 border-zinc-700 text-zinc-400'
                        }`}>
                          {milestone.iconType === 'pickup' && <Package size={10} />}
                          {milestone.iconType === 'transit' && <MapPin size={10} />}
                          {milestone.iconType === 'customs' && <ShieldCheck size={10} />}
                          {milestone.iconType === 'out_for_delivery' && <Clock size={10} />}
                          {milestone.iconType === 'delivered' && <CheckCircle2 size={10} />}
                        </div>

                        {/* Detail text */}
                        <div className="space-y-1 text-xs">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                            <h5 className={`font-semibold ${isLatest ? 'text-brand-orange text-sm' : 'text-zinc-300'}`}>
                              {milestone.status}
                            </h5>
                            <span className="text-[10px] text-zinc-500 font-mono">{milestone.time}</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 font-mono">{milestone.location}</p>
                          <p className="text-zinc-500 leading-relaxed mt-1 text-[11px]">{milestone.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
