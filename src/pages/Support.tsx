import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, HelpCircle, MessageSquare, ClipboardCheck, Clock, ShieldCheck, UserCheck } from 'lucide-react';
import { SupportTicket } from '../types';

export default function Support() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "TKT-309-881",
      name: "Jean Dupont",
      email: "jean.dupont@retail.fr",
      subject: "Customs Tariff Query",
      message: "Our Express air carriage to London Heathrow seems flagged under customs inspect schedules. Could your concierge advocate contact Heath customs directly?",
      status: "In Progress",
      dateSubmitted: "2026-06-15 10:20"
    }
  ]);

  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSuccess(false);

    if (!name || !email || !subject || !message) {
      setFormError('Please fill out all contact fields to connect with our concierge division.');
      return;
    }

    if (!email.includes('@')) {
      setFormError('Please input a valid corporate email. (e.g. name@company.com)');
      return;
    }

    const newTicket: SupportTicket = {
      id: `TKT-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`,
      name,
      email,
      subject,
      message,
      status: 'Open',
      dateSubmitted: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    setTickets([newTicket, ...tickets]);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-brand-black text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Header Block banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto border-b border-white/5 pb-10">
          <p className="text-[10px] uppercase font-mono tracking-[0.3em] text-brand-orange">
            CONCIERGE DESK
          </p>
          <h1 className="font-liberation text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
            Sovereign Support Console
          </h1>
          <p className="font-dmsans text-zinc-400 text-sm leading-relaxed">
            Connect immediately with your dedicated logistics advisors. We provide round-the-clock manual dispatch oversight, customs clearances, and urgent route changes.
          </p>
        </div>

        {/* 2 Grid Layout: Contact Info & Support Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Coordinates */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="font-dmsans text-xl font-bold uppercase text-white">
                Global Coordinates
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Direct lines to our physical terminals and transit centers are always staffed.
              </p>
            </div>

            {/* Micro details panel */}
            <div className="space-y-6">
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-none bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-brand-orange">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold uppercase text-zinc-300">
                    Sovereign Account Mailbox
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">Response Time: &lt; 15 Mins</p>
                  <p className="text-xs text-brand-orange mt-1">concierge@weparcel.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-none bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-brand-orange">
                  <Phone size={18} />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold uppercase text-zinc-300">
                    Priority Voice Terminals
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-mono mt-0.5">24/7 Enterprise Direct</p>
                  <p className="text-xs text-zinc-300 mt-1">+1 (800) 555-PARCEL</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-none bg-zinc-900 border border-white/5 flex items-center justify-center shrink-0 text-brand-orange">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="font-display text-xs font-bold uppercase text-zinc-300">
                    Registered Headquarters Terminal
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    Transit Depo 09, European Free Trade Zone,<br />Luxembourg Logistics Center
                  </p>
                </div>
              </div>

            </div>

            {/* Brand Assurance pledge */}
            <div className="p-6 bg-[#0f1013] border border-white/5 rounded-none space-y-4">
              <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                <ShieldCheck size={16} className="text-brand-orange" />
                <span>Concierge Guarantee</span>
              </h4>
              <p className="text-zinc-400 text-[11px] leading-relaxed">
                WEParcel operates under rigid privacy codes. All cargo details, sovereign manifests, and client communication are stored inside enciphered ledger vaults and are never disclosed.
              </p>
            </div>

            {/* Developer Contact & Mockup attribution card */}
            <div className="p-6 bg-zinc-950/60 border border-brand-orange/20 rounded-none space-y-4 shadow-[0_4px_14px_rgba(255,122,0,0.05)]">
              <h4 className="font-display text-xs font-bold text-brand-orange uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                <UserCheck size={16} />
                <span>Mockup Designer Credit</span>
              </h4>
              <div className="space-y-2 text-xs">
                <p className="text-zinc-300">
                  This interactive web application was custom-crafted as an expert mockup presentation for <strong className="text-white">WEParcel</strong>.
                </p>
                <div className="pt-2 border-t border-white/5 space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Lead Designer & Developer:</div>
                  <div className="text-sm font-semibold text-white">Subhanshi Agrawal</div>
                  
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono pt-2">Direct Collaboration Email:</div>
                  <a 
                    href="mailto:agrawalsubhanshi1@gmail.com" 
                    className="text-xs text-brand-orange hover:underline font-mono flex items-center space-x-1"
                  >
                    <Mail size={12} className="shrink-0 text-brand-orange" />
                    <span>agrawalsubhanshi1@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interaction Form */}
          <div className="lg:col-span-7 bg-[#0f1013] rounded-none border border-white/5 p-6 sm:p-8 space-y-6">
            
            <div className="space-y-1">
              <h2 className="font-dmsans text-lg font-bold uppercase text-white">
                Lodge Help Coordinate Ticketing
              </h2>
              <p className="text-xs text-zinc-500">
                Lodge formal requests instantly into our priority support tracking system.
              </p>
            </div>

            {success && (
              <div className="p-4 bg-green-950/40 border border-green-500/20 text-green-300 text-xs rounded-none flex items-center space-x-2 animate-bounce">
                <ClipboardCheck size={16} />
                <span>Ticket registered! Your dedicated concierge operator will contact you shortly.</span>
              </div>
            )}

            {formError && (
              <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-300 text-xs rounded-none">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Your Full Name *</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-white outline-none focus:border-brand-orange"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Enterprise Email *</label>
                  <input
                    type="text"
                    className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-white outline-none focus:border-brand-orange"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Subject / Topic *</label>
                <input
                  type="text"
                  className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-white outline-none focus:border-brand-orange"
                  placeholder="e.g. Expediting custom customs clearing"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-400 uppercase tracking-widest font-mono">Message Manifest *</label>
                <textarea
                  rows={4}
                  className="w-full bg-zinc-950 border border-white/5 rounded px-3 py-2 text-white outline-none focus:border-brand-orange resize-none"
                  placeholder="State your shipment tracking ID and describing specifications..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-brand-orange hover:bg-brand-orange-hover text-black font-dmmono font-bold uppercase tracking-wider rounded-none transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send size={14} />
                  <span>Transmit Query</span>
                </button>
              </div>

            </form>

          </div>

        </div>

        {/* Dynamic Inbox Board: Displays all tickets submitted during the active screen session */}
        <div className="pt-8 border-t border-white/5 space-y-6">
          <div className="space-y-1">
            <h3 className="font-dmsans text-lg font-bold uppercase text-white">
              Lobby Inquiries Inbox ({tickets.length} Registered Cases)
            </h3>
            <p className="text-zinc-500 text-xs">
              Monitor active help desk cases logged during this browser session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.map((t) => (
              <div 
                key={t.id} 
                className="bg-[#0f1013] border border-white/5 rounded-none p-5 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-white">
                        {t.id}
                      </span>
                      <span className={`text-[9px] px-2 py-0.2 rounded-full font-bold uppercase ${
                        t.status === 'Resolved' ? 'bg-green-500/10 text-green-400' :
                        t.status === 'In Progress' ? 'bg-yellow-500/10 text-[#fcd34d]' :
                        'bg-blue-500/10 text-blue-400'
                      }`}>
                        {t.status}
                      </span>
                    </div>
                    <h4 className="text-xs text-zinc-300 font-bold font-sans mt-1">
                      {t.subject}
                    </h4>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    {t.dateSubmitted}
                  </span>
                </div>

                <p className="text-zinc-400 text-[11px] leading-relaxed italic">
                  "{t.message}"
                </p>

                <div className="flex justify-between pt-3 border-t border-white/5 text-[10px] text-zinc-500 font-mono">
                  <span>Contact: {t.name}</span>
                  <span>Email: {t.email}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
