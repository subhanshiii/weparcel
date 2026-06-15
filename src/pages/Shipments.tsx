import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Truck, Plus, Search, Calendar, ChevronRight, Hash, Ban, Weight, Ship, Anchor, MapPin, Gauge, ShieldCheck, Thermometer, Info, ClipboardCheck, Play } from 'lucide-react';
import { INITIAL_SHIPMENTS } from '../data/mockData';
import { Shipment, ShipmentMilestone } from '../types';

export default function Shipments() {
  const [shipments, setShipments] = useState<Shipment[]>(INITIAL_SHIPMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(INITIAL_SHIPMENTS[0]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  // States for booking form
  const [senderName, setSenderName] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [weight, setWeight] = useState('');
  const [type, setType] = useState<'Standard' | 'Express' | 'COD Flow' | 'Inventory'>('Standard');
  const [isCod, setIsCod] = useState(false);
  const [codAmount, setCodAmount] = useState('');
  const [temperatureControlled, setTemperatureControlled] = useState(false);
  const [source, setSource] = useState('New York Gateway (JFK)');
  const [destination, setDestination] = useState('Luxembourg Airport (LUX)');
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Search filtered shipments list
  const filteredShipments = shipments.filter(s => 
    s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.recipientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Validate form entries and schedule shipment
  const handleBookShipment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccessMsg('');

    if (!senderName || !senderAddress || !recipientName || !recipientAddress || !weight) {
      setFormError('Please fill out all mandatory fields highlighted in orange.');
      return;
    }

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      setFormError('Weight must be a positive number.');
      return;
    }

    const codAmountNum = isCod ? parseFloat(codAmount) : undefined;
    if (isCod && (isNaN(codAmountNum || 0) || (codAmountNum || 0) <= 0)) {
      setFormError('Please specify a valid Cash On Delivery settlement amount.');
      return;
    }

    // Generate a unique high-fidelity parcel tracking designator
    const rndNum = Math.floor(100000 + Math.random() * 900000);
    const idPrefix = type === 'Express' ? 'EXP' : type === 'COD Flow' ? 'COD' : 'STD';
    const newId = `WE-${r_format(rndNum)}-${idPrefix}`;

    const dateToday = new Date();
    dateToday.setDate(dateToday.getDate() + (type === 'Express' ? 2 : type === 'Standard' ? 7 : 4));
    const estDeliveryStr = dateToday.toISOString().split('T')[0];

    const newShipment: Shipment = {
      id: newId,
      senderName,
      senderAddress,
      recipientName,
      recipientAddress,
      weight: weightNum,
      type,
      status: 'In Transit',
      estimatedDelivery: estDeliveryStr,
      source,
      destination,
      currentLocation: `${source} Loading Gate`,
      progress: 10,
      history: [
        {
          time: new Date().toISOString().replace('T', ' ').substring(0, 16),
          location: source,
          status: 'Shipment Created',
          description: 'A custom, premium logistics manifest has been generated. Ready for dispatch.',
          iconType: 'pickup'
        }
      ],
      isCod,
      codAmount: codAmountNum,
      codStatus: isCod ? 'Pending' : undefined,
      temperatureControlled
    };

    setShipments([newShipment, ...shipments]);
    setSelectedShipment(newShipment);
    
    // Clear details
    setSenderName('');
    setSenderAddress('');
    setRecipientName('');
    setRecipientAddress('');
    setWeight('');
    setIsCod(false);
    setCodAmount('');
    setTemperatureControlled(false);

    setSuccessMsg(`Voyage Successfully Registered! Assigned Tracking ID: ${newId}`);
    setTimeout(() => {
      setIsBookingOpen(false);
      setSuccessMsg('');
    }, 2500);
  };

  const r_format = (num: number) => {
    const s = String(num);
    return `${s.substring(0, 3)}-${s.substring(3, 6)}`;
  };

  // Live Transit Simulator state change trigger
  const handleSimulateStatus = (shipmentId: string) => {
    const updated = shipments.map(s => {
      if (s.id !== shipmentId) return s;

      let nextStatus = s.status;
      let nextProgress = s.progress;
      let nextLocation = s.currentLocation;
      const nextHistory = [...s.history];
      const nowStr = new Date().toISOString().replace('T', ' ').substring(0, 16);

      if (s.status === 'In Transit') {
        nextStatus = 'Customs';
        nextProgress = 70;
        nextLocation = `${s.destination} sovereign gates`;
        nextHistory.push({
          time: nowStr,
          location: nextLocation,
          status: 'Sovereign Clearing Inspection',
          description: 'Biometric custody scans cleared. Verification of customs cargo details in progress.',
          iconType: 'customs'
        });
      } else if (s.status === 'Customs') {
        nextStatus = 'Out for Delivery';
        nextProgress = 90;
        nextLocation = `${s.destination} localized dispatch line`;
        nextHistory.push({
          time: nowStr,
          location: nextLocation,
          status: 'Out for final miles delivery',
          description: 'Package routed onto final miles transport vehicle. Handover estimate confirmed.',
          iconType: 'out_for_delivery'
        });
      } else if (s.status === 'Out for Delivery') {
        nextStatus = 'Delivered';
        nextProgress = 100;
        nextLocation = s.destination;
        nextHistory.push({
          time: nowStr,
          location: nextLocation,
          status: 'Delivered',
          description: s.isCod 
            ? 'Package handed over. COD cash settlement secured, bank ledgers processed.'
            : 'Package successfully signed and delivered with secure terminal authorization logs.',
          iconType: 'delivered'
        });
      } else {
        // Reset back to transit
        nextStatus = 'In Transit';
        nextProgress = 15;
        nextLocation = `${s.source} Terminal Gate`;
        nextHistory.push({
          time: nowStr,
          location: nextLocation,
          status: 'Departed Gate',
          description: 'Restarted carriage simulations. Parcel is active at origin staging.',
          iconType: 'transit'
        });
      }

      const mod: Shipment = {
        ...s,
        status: nextStatus as any,
        progress: nextProgress,
        currentLocation: nextLocation,
        history: nextHistory,
        codStatus: (s.isCod && nextStatus === 'Delivered') ? 'Remitted' : s.codStatus
      };

      if (selectedShipment?.id === s.id) {
        setSelectedShipment(mod);
      }
      return mod;
    });

    setShipments(updated);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-brand-black text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Page Header visual banner */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-6 gap-4">
          <div>
            <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-brand-orange">
              Operational Ledger
            </p>
            <h1 className="font-liberation text-3xl sm:text-4xl font-extrabold tracking-tight uppercase mt-2">
              Shipments & Despatch Console
            </h1>
            <p className="font-dmsans text-zinc-400 text-xs sm:text-sm mt-1">
              Analyze running carriage container states, update active cargos, or book custom freight line transits instantly.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Search Input ledger filter */}
            <div className="relative bg-zinc-900 border border-white/5 rounded px-3 py-2 text-xs flex items-center w-full sm:w-56">
              <Search size={14} className="text-zinc-500 mr-2 shrink-0" />
              <input 
                type="text" 
                placeholder="Search ledger..."
                className="bg-transparent text-white focus:outline-none w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Book new shipment trigger */}
            <button
              onClick={() => setIsBookingOpen(true)}
              className="px-5 py-2.5 font-dmmono text-xs font-bold uppercase tracking-wider bg-brand-orange hover:bg-brand-orange-hover text-black rounded-none shadow-[0_4px_14px_rgba(255,122,0,0.2)] flex items-center space-x-1 w-full sm:w-auto justify-center transition-colors"
            >
              <Plus size={14} />
              <span>Book New Voyage</span>
            </button>
          </div>
        </div>

        {/* Ledger and Details split pane */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Console: List of Shipment Cards */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-dmsans text-xs font-bold uppercase tracking-widest text-zinc-500 font-mono mb-4">
              Consignment Registry ({filteredShipments.length} items)
            </h3>

            {filteredShipments.length === 0 ? (
              <div className="text-center py-16 bg-zinc-900/40 rounded-none border border-white/5 text-zinc-500 space-y-2">
                <Ban size={24} className="mx-auto text-zinc-700" />
                <p className="text-xs">No matching parcels found in ledger files.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                {filteredShipments.map((ship) => {
                  const isSelected = selectedShipment?.id === ship.id;
                  return (
                    <div
                      key={ship.id}
                      onClick={() => setSelectedShipment(ship)}
                      className={`p-4 rounded-none border cursor-pointer transition-all duration-300 relative group flex justify-between items-center ${
                        isSelected 
                          ? 'bg-[#15161a] border-brand-orange/40 shadow-md' 
                          : 'bg-[#0f1013] border-white/5 hover:bg-zinc-900'
                      }`}
                    >
                      {/* Left accent strip */}
                      {isSelected && (
                        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-orange" />
                      )}

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[11px] font-bold text-white group-hover:text-brand-orange transition-colors">
                            {ship.id}
                          </span>
                          <span className="text-[9px] text-zinc-500 font-mono uppercase bg-zinc-900 px-1.5 py-0.2 border border-white/5 rounded">
                            {ship.type}
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 font-sans">
                          {ship.senderName} → {ship.recipientName}
                        </p>
                        <div className="flex items-center space-x-3 text-[10px] text-zinc-500 font-mono pt-1">
                          <span className="flex items-center space-x-1">
                            <MapPin size={10} className="text-brand-orange shrink-0" />
                            <span>{ship.currentLocation}</span>
                          </span>
                        </div>
                      </div>

                      <div className="text-right flex flex-col items-end justify-center space-y-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          ship.status === 'Delivered' ? 'bg-green-500/10 text-green-400' :
                          ship.status === 'In Transit' ? 'bg-blue-500/10 text-blue-400' :
                          ship.status === 'Customs' ? 'bg-yellow-500/10 text-[#fcd34d]' :
                          'bg-zinc-800 text-zinc-300'
                        }`}>
                          {ship.status}
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          Est: {ship.estimatedDelivery}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Console: Deep Dive interactive detail details */}
          <div className="lg:col-span-7">
            {selectedShipment ? (
              <div className="bg-[#0f1013] border border-white/5 rounded-none p-6 sm:p-8 space-y-8 shadow-2xl relative">
                
                {/* Visual Action Banner for updating state */}
                <div className="absolute top-6 right-6 flex items-center space-x-2">
                  <button
                    onClick={() => handleSimulateStatus(selectedShipment.id)}
                    className="px-3 py-1.5 bg-brand-orange/5 hover:bg-brand-orange hover:text-black border border-brand-orange/20 text-brand-orange text-[10px] font-bold font-dmmono uppercase rounded-none flex items-center space-x-1 transition-all duration-300"
                    title="Simulate step transit"
                  >
                    <Play size={10} />
                    <span>Run Stage Simulator</span>
                  </button>
                </div>

                {/* Tracking ID visual Plate */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 bg-brand-orange/10 border border-brand-orange/35 text-brand-orange text-[10px] font-mono font-bold tracking-widest uppercase rounded-none">
                      {selectedShipment.type}
                    </span>
                    {selectedShipment.temperatureControlled && (
                      <span className="flex items-center space-x-0.5 px-2 py-0.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono tracking-widest uppercase rounded-none">
                        <Thermometer size={10} />
                        <span>Climate Locked</span>
                      </span>
                    )}
                  </div>
                  <h2 className="font-dmsans text-2xl sm:text-3xl font-bold tracking-tight text-white m-0">
                    {selectedShipment.id}
                  </h2>
                  <p className="text-zinc-500 font-mono text-xs">
                    Gateway Transit Routing: <span className="text-zinc-300">{selectedShipment.source}</span> to <span className="text-zinc-300">{selectedShipment.destination}</span>
                  </p>
                </div>

                {/* Progress Visual Bar */}
                <div className="p-5 bg-zinc-950/60 rounded-none border border-white/5 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400 text-[11px] font-mono">Freight Progress Coordinates</span>
                    <span className="text-brand-orange font-bold text-sm font-mono">{selectedShipment.progress}%</span>
                  </div>
                  <div className="h-2 bg-zinc-900 rounded-full overflow-hidden relative border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-brand-orange to-yellow-400 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${selectedShipment.progress}%` }}
                    />
                  </div>
                </div>

                {/* Grid layout for Detailed Shipper Recipient manifest details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2 p-4 bg-zinc-950/20 rounded-none border border-white/5">
                    <h4 className="font-dmsans text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                      Sender Details (A)
                    </h4>
                    <p className="text-xs text-white font-semibold">{selectedShipment.senderName}</p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">{selectedShipment.senderAddress}</p>
                  </div>

                  <div className="space-y-2 p-4 bg-zinc-950/20 rounded-none border border-white/5">
                    <h4 className="font-dmsans text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                      Recipient Details (B)
                    </h4>
                    <p className="text-xs text-white font-semibold">{selectedShipment.recipientName}</p>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-mono">{selectedShipment.recipientAddress}</p>
                  </div>
                </div>

                {/* Metadata details list */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-white/5">
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-zinc-500 uppercase font-mono">Declared Mass</p>
                    <p className="text-xs text-white font-semibold">{selectedShipment.weight} kg</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-zinc-500 uppercase font-mono">Temp Logs</p>
                    <p className="text-xs text-blue-400 font-mono font-semibold">
                      {selectedShipment.temperatureControlled ? 'Active (5.6°C)' : 'Ambient'}
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-zinc-500 uppercase font-mono">Estimated Arrival</p>
                    <p className="text-xs text-brand-orange font-semibold">{selectedShipment.estimatedDelivery}</p>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-[9px] text-zinc-500 uppercase font-mono">COD Collect</p>
                    <p className="text-xs text-white font-semibold font-mono">
                      {selectedShipment.isCod ? `$${selectedShipment.codAmount?.toFixed(2)} (${selectedShipment.codStatus})` : 'N/A'}
                    </p>
                  </div>
                </div>

                {/* Milestones timeline logs */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <h4 className="font-dmsans text-xs font-bold text-white uppercase tracking-wider">
                    Sovereign Logistics Milestones Logs
                  </h4>
                  <div className="space-y-5 border-l border-zinc-800 ml-3 pl-5 pt-2">
                    {selectedShipment.history.map((mil, idx) => (
                      <div key={idx} className="relative text-xs">
                        {/* Dot indicator marker */}
                        <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-brand-orange border border-black" />
                        
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                          <span className="font-semibold text-zinc-200">{mil.status}</span>
                          <span className="text-[10px] text-zinc-500 font-mono">{mil.time}</span>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{mil.location}</p>
                        <p className="text-[11px] text-zinc-400 mt-1 font-sans">{mil.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="h-[400px] border border-white/5 bg-[#0f1013] rounded-none flex items-center justify-center text-center p-8 text-zinc-500">
                <div className="space-y-2">
                  <Info size={32} className="text-zinc-700 mx-auto" />
                  <p className="font-display text-sm">Select a consignment record from the registry ledger to observe live telemetry.</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Booking Dialog Modal overlay backdrop */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0f1013] border border-white/10 max-w-2xl w-full rounded-none shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto relative"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex justify-between items-start border-b border-white/5 pb-4">
                <div>
                  <h3 className="font-dmsans text-lg font-bold uppercase text-white">
                    Book Carriage Container
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">Create a custom WEParcel logistic dispatch route on our global network</p>
                </div>
                <button
                  onClick={() => setIsBookingOpen(false)}
                  className="p-1 text-zinc-500 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Success state info message */}
              {successMsg && (
                <div className="p-4 bg-green-950/40 border border-green-500/20 text-green-300 text-xs rounded-none text-center flex items-center justify-center space-x-2 animate-bounce">
                  <ClipboardCheck size={16} />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Form validation alert message */}
              {formError && (
                <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-300 text-xs rounded-none">
                  {formError}
                </div>
              )}

              {/* Main Schedule Form fields */}
              <form onSubmit={handleBookShipment} className="space-y-4 text-xs">
                
                {/* Splints Shipper Recipient addresses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5Packed">
                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Sender Full Name *</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-white placeholder-zinc-700 outline-none focus:border-brand-orange"
                      placeholder="e.g. Johannes Gutenberg"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Sender Physical Address *</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-white placeholder-zinc-700 outline-none focus:border-brand-orange"
                      placeholder="Address, City, Country"
                      value={senderAddress}
                      onChange={(e) => setSenderAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Recipient Full Name *</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-white placeholder-zinc-700 outline-none focus:border-brand-orange"
                      placeholder="e.g. Emily Watson"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Recipient Delivery Address *</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-white placeholder-zinc-700 outline-none focus:border-brand-orange"
                      placeholder="Address, City, Country"
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                  </div>
                </div>

                {/* Gateways coordinates selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Origin Airport Hub</label>
                    <select
                      className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-zinc-300 outline-none focus:border-brand-orange"
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                    >
                      <option value="New York Gateway (JFK)">New York Gateway (JFK)</option>
                      <option value="Singapore Hub (SIN)">Singapore Changi (SIN)</option>
                      <option value="Munich Cargo (MUC)">Munich Airport (MUC)</option>
                      <option value="Paris Depo (CDG)">Paris Charles de Gaulle (CDG)</option>
                      <option value="London Heathrow (LHR)">London Heathrow (LHR)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Destination Airport Hub</label>
                    <select
                      className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-zinc-300 outline-none focus:border-brand-orange"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    >
                      <option value="Tokyo Narita (NRT)">Tokyo Narita (NRT)</option>
                      <option value="London Heathrow (LHR)">London Heathrow (LHR)</option>
                      <option value="Munich Cargo (MUC)">Munich Airport (MUC)</option>
                      <option value="Shanghai PVG Depo">Shanghai Pudong PVG</option>
                      <option value="Luxembourg Terminal (LUX)">Luxembourg Terminal (LUX)</option>
                    </select>
                  </div>
                </div>

                {/* Details on Weight and type */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Cargo Weight (kg) *</label>
                    <input
                      type="number"
                      step="0.1"
                      className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-white placeholder-zinc-700 outline-none focus:border-brand-orange"
                      placeholder="e.g. 15.4"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-400 font-mono uppercase">Service Level *</label>
                    <select
                      className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-zinc-300 outline-none focus:border-brand-orange"
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                    >
                      <option value="Standard">Standard Courier</option>
                      <option value="Express">Express Air Cargo</option>
                      <option value="COD Flow">Cash On Delivery (COD)</option>
                      <option value="Inventory">Inventory Storage</option>
                    </select>
                  </div>

                  {/* Temperature Controlled toggle */}
                  <div className="flex items-center space-x-2 pt-6">
                    <input
                      type="checkbox"
                      id="tempCheck"
                      checked={temperatureControlled}
                      className="h-4 w-4 bg-zinc-950 border-white/5 rounded text-brand-orange focus:ring-opacity-0 accent-brand-orange cursor-pointer"
                      onChange={(e) => setTemperatureControlled(e.target.checked)}
                    />
                    <label htmlFor="tempCheck" className="text-[11px] text-zinc-300 select-none cursor-pointer flex items-center space-x-1">
                      <Thermometer size={14} className="text-blue-400" />
                      <span>Climate Controlled</span>
                    </label>
                  </div>
                </div>

                {/* Cash on Delivery Details conditional flow */}
                {type === 'COD Flow' && (
                  <div className="p-4 bg-zinc-950 rounded-none border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="codCheck"
                        className="h-4 w-4 checked:bg-brand-orange text-brand-orange border border-[#fff3eb]/10 cursor-pointer"
                        checked={isCod}
                        onChange={(e) => setIsCod(e.target.checked)}
                      />
                      <label htmlFor="codCheck" className="text-zinc-300 select-none cursor-pointer">
                        Require Cashless COD Collection
                      </label>
                    </div>

                    {isCod && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-zinc-400 font-mono uppercase">Settlement Cash Amount ($)</label>
                        <input
                          type="number"
                          placeholder="e.g. 1500"
                          className="w-full bg-zinc-900 border border-white/5 rounded px-3 py-1.5 text-white outline-none focus:border-brand-orange"
                          value={codAmount}
                          onChange={(e) => setCodAmount(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-end items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(false)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-dmmono font-semibold uppercase rounded-none transition-colors text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 bg-brand-orange hover:bg-brand-orange-hover text-black font-dmmono font-semibold uppercase rounded-none shadow transition-colors text-center"
                  >
                    Confirm Consignment Voyage
                  </button>
                </div>

              </form>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
