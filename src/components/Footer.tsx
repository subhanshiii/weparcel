import React from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import WeParcelLogo from './WeParcelLogo';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const handleNav = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] border-t border-white/5 pt-16 pb-8 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Logo Brand / Kinetic Quote */}
          <div className="lg:col-span-2 space-y-5">
            <div 
              onClick={() => handleNav('home')}
              className="flex items-center cursor-pointer group w-fit py-0.5"
            >
              <div className="h-12 w-auto max-w-[70px] hover:opacity-90 transition-opacity duration-350">
                <WeParcelLogo height="100%" width="100%" />
              </div>
            </div>
            
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Kinetic Luxury Logistics. Redefining the speed of business globally with bespoke shipping coordinates and concierge operations.
            </p>
            
            <div className="space-y-2.5 pt-2 text-xs text-zinc-500 font-mono">
              <div className="flex items-center space-x-2 hover:text-brand-orange transition-colors">
                <Mail size={12} className="text-brand-orange" />
                <span>concierge@weparcel.com</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-brand-orange transition-colors">
                <Phone size={12} className="text-brand-orange" />
                <span>+1 (800) 555-PARCEL</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={12} className="text-brand-orange" />
                <span>Global Transit Terminal 09, Luxembourg</span>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-5">
              Services
            </h4>
            <ul className="space-y-3.5 text-xs text-zinc-400 font-sans">
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                >
                  Express Delivery
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                >
                  Ocean Freight
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                >
                  Warehousing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('services')} 
                  className="hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                >
                  Customs Brokerage
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-5">
              Company
            </h4>
            <ul className="space-y-3.5 text-xs text-zinc-400 font-sans">
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                >
                  Global Network
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                >
                  Sustainability
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('support')} 
                  className="hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                >
                  Careers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('home')} 
                  className="hover:text-brand-orange hover:translate-x-1 transition-all duration-200"
                >
                  Press Room
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className="font-display text-sm font-semibold text-white tracking-wider uppercase mb-5">
              Legal
            </h4>
            <ul className="space-y-3.5 text-xs text-zinc-400">
              <li>
                <a href="#privacy" className="hover:text-brand-orange transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-brand-orange transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-brand-orange transition-colors">
                  Compliance
                </a>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('assets')} 
                  className="hover:text-brand-orange text-left hover:translate-x-1 transition-all duration-200 text-brand-orange font-medium"
                >
                  Asset & Media Panel
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNav('support')} 
                  className="hover:text-brand-orange text-left hover:translate-x-1 transition-all duration-200"
                >
                  Contact Support
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider and Copyright Row */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500 text-xs">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-mono text-[10px] tracking-wider uppercase text-zinc-400">
              © 2026 WEParcel Mockup Portal. All Rights Reserved.
            </p>
            <p className="text-[9px] text-zinc-600 font-mono uppercase tracking-[0.1em]">
              Note: Images used are for demonstration purposes and are property of their respective creators.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end space-y-1 shrink-0 text-center md:text-right">
            <span className="text-[9px] text-zinc-600 font-mono uppercase tracking-widest">Designed & Developed by</span>
            <span className="font-semibold text-zinc-300">Subhanshi Agrawal</span>
            <a 
              href="mailto:agrawalsubhanshi1@gmail.com" 
              className="text-[11px] text-brand-orange hover:underline font-mono flex items-center space-x-1"
            >
              <span>agrawalsubhanshi1@gmail.com</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
