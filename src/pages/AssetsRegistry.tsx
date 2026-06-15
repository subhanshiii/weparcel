import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Image, FileCode, Copy, Check, Info, Settings, Heart, Laptop, Eye, HelpCircle, Code, ListFilter } from 'lucide-react';
import { IMAGES } from '../assets';

export default function AssetsRegistry() {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);
  const [sandboxUrl, setSandboxUrl] = useState('');
  const [sandboxPlacement, setSandboxPlacement] = useState<'logo' | 'hero' | 'cargo'>('hero');
  const [activeTab, setActiveTab] = useState<'images' | 'icons' | 'guide'>('images');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPath(text);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const registeredAssets = [
    {
      id: 'logo',
      name: 'WEParcel Official Brand Identity',
      path: '/src/assets/logo1.png',
      type: 'PNG Image',
      description: 'The high-impact brand logo. Used across the master Navigation bar and Footer.',
      thumbnail: IMAGES.customLogoUrl || '/src/assets/logo1.png',
      aspect: 'aspect-[540/230] max-w-[200px]',
      bgAccent: 'bg-zinc-950 border border-white/5 p-4',
    },
    {
      id: 'mskContainerYard',
      name: 'WEParcel Primary Container Terminal',
      path: '/src/assets/main.jpeg',
      type: 'JPEG Landscape Photo',
      description: 'High-fidelity dynamic container terminal rendering shown on the Home page Hero layout.',
      thumbnail: IMAGES.mskContainerYard,
      aspect: 'aspect-video w-full',
      bgAccent: 'bg-zinc-950 border border-white/5',
    },
    {
      id: 'airCargo',
      name: 'Air Cargo Express Atmosphere',
      path: '/src/assets/side.jpeg',
      type: 'JPEG Cargo Atmosphere',
      description: 'Atmospheric cargo imagery used across the shipping and services sections.',
      thumbnail: IMAGES.airCargo,
      aspect: 'aspect-video w-full',
      bgAccent: 'bg-zinc-950 border border-white/5',
    },
    {
      id: 'oceanFreight',
      name: 'Ocean Line Freight Artwork',
      path: '/src/assets/side.jpeg',
      type: 'JPEG Freight Artwork',
      description: 'Heavy cargo vessel and freight imagery used for sea route transport sections.',
      thumbnail: IMAGES.oceanFreight,
      aspect: 'aspect-video w-full',
      bgAccent: 'bg-zinc-950 border border-white/5',
    }
  ];

  const lucideIconGroup = [
    { name: 'Ship', importName: "import { Ship } from 'lucide-react';", usage: 'Ocean freight service card indicators' },
    { name: 'Plane', importName: "import { Plane } from 'lucide-react';", usage: 'Express air-freight service headers' },
    { name: 'Box', importName: "import { Box } from 'lucide-react';", usage: 'Standard ground shipping & packages tracker' },
    { name: 'ShieldCheck', importName: "import { ShieldCheck } from 'lucide-react';", usage: 'Sovereign security guarantee badges' },
    { name: 'Truck', importName: "import { Truck } from 'lucide-react';", usage: 'Ground linehaul freight fleet indicators' },
    { name: 'Workflow', importName: "import { Workflow } from 'lucide-react';", usage: 'Custom bulk Merchant API integration labels' },
    { name: 'MapPin', importName: "import { MapPin } from 'lucide-react';", usage: 'Logistics center geo-terminal coordinates' },
    { name: 'UserCheck', importName: "import { UserCheck } from 'lucide-react';", usage: 'Lead designer mockup attribution badge' },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#08080a] relative px-4 sm:px-6 lg:px-8 text-white">
      {/* Visual Ambient Meshes */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-brand-blue/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Breadcrumbs */}
        <div className="space-y-4 border-b border-white/5 pb-8">
          <div className="flex items-center space-x-2 text-[10px] uppercase font-dmmono tracking-widest text-brand-orange">
            <span>Core Workspace Engine</span>
            <span>/</span>
            <span>Creative Resources Portal</span>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-bold tracking-tight uppercase">
            Asset & Media Registry
          </h1>
          <div className="flex flex-col space-y-2">
            <p className="max-w-3xl text-sm text-zinc-400 leading-relaxed">
              Welcome to the centralized asset index of WEParcel. Inside this environment, you can reference, preview, 
              and learn how to modify or extend any of the primary image components, local SVGs, PNGs, and vector icons.
            </p>
            <p className="text-[10px] text-zinc-500 font-dmmono uppercase tracking-wider flex items-center space-x-2">
              <span className="w-1 h-1 rounded-full bg-brand-orange" />
              <span>Disclaimer: Media assets are sourced from external creators for demonstration purposes only.</span>
            </p>
          </div>
        </div>

        {/* Tab Controls to toggle workspace views */}
        <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab('images')}
            className={`px-5 py-2.5 font-dmmono text-xs uppercase tracking-wider transition-all border ${
              activeTab === 'images'
                ? 'bg-brand-orange text-black border-brand-orange font-bold'
                : 'bg-zinc-900/40 text-zinc-400 hover:text-white hover:bg-zinc-900 border-white/5'
            }`}
          >
            <span className="flex items-center space-x-2">
              <Image size={13} />
              <span>Image & SVG Assets ({registeredAssets.length})</span>
            </span>
          </button>
          
          <button
            type="button"
            onClick={() => setActiveTab('icons')}
            className={`px-5 py-2.5 font-dmmono text-xs uppercase tracking-wider transition-all border ${
              activeTab === 'icons'
                ? 'bg-brand-orange text-black border-brand-orange font-bold'
                : 'bg-zinc-900/40 text-zinc-400 hover:text-white hover:bg-zinc-900 border-white/5'
            }`}
          >
            <span className="flex items-center space-x-2">
              <Code size={13} />
              <span>Vector Icon Inventory</span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-5 py-2.5 font-dmmono text-xs uppercase tracking-wider transition-all border ${
              activeTab === 'guide'
                ? 'bg-brand-orange text-black border-brand-orange font-bold'
                : 'bg-zinc-900/40 text-zinc-400 hover:text-white hover:bg-zinc-900 border-white/5'
            }`}
          >
            <span className="flex items-center space-x-2">
              <Settings size={13} />
              <span>How to Swap PNG/JPEG/SVG</span>
            </span>
          </button>
        </div>

        {/* Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Panel Column */}
          <div className="lg:col-span-2 space-y-8">
            
            <AnimatePresence mode="wait">
              {activeTab === 'images' && (
                <motion.div
                  key="images-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {registeredAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="bg-zinc-950/80 border border-white/5 p-6 hover:border-brand-orange/30 transition-all duration-300 space-y-4 shadow-xl group flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          {/* Top Tag Metadata Bar */}
                          <div className="flex items-center justify-between text-[10px] font-dmmono text-zinc-500 uppercase tracking-widest">
                            <span>{asset.type}</span>
                            <span className="text-zinc-650">Registered</span>
                          </div>

                          {/* Image preview canvas window */}
                          <div className={`overflow-hidden flex items-center justify-center relative bg-[#090a0d] border border-white/5 ${asset.bgAccent}`}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                            <img
                              src={asset.thumbnail}
                              alt={asset.name}
                              className={`object-cover h-full w-full select-none transition-transform duration-500 group-hover:scale-105 ${asset.aspect}`}
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="space-y-1 pt-2">
                            <h3 className="font-display text-sm font-bold uppercase tracking-wide text-zinc-200 group-hover:text-white transition-colors">
                              {asset.name}
                            </h3>
                            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                              {asset.description}
                            </p>
                          </div>
                        </div>

                        {/* Relative path and copy action code string */}
                        <div className="pt-4 border-t border-white/5 space-y-2">
                          <span className="font-dmmono text-[9px] uppercase tracking-wider text-zinc-500 block">
                            Import / File Reference Path:
                          </span>
                          <div className="flex items-center justify-between gap-2 p-2 bg-black border border-white/5 text-[11px] font-dmmono text-zinc-300">
                            <span className="truncate">{asset.path}</span>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(asset.path)}
                              className="p-1 hover:text-brand-orange hover:bg-zinc-905 transition-all"
                              title="Copy file path"
                            >
                              {copiedPath === asset.path ? (
                                <Check size={13} className="text-green-500" />
                              ) : (
                                <Copy size={13} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'icons' && (
                <motion.div
                  key="icons-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-zinc-950/60 border border-white/5 p-6 md:p-8 space-y-6"
                >
                  <div className="space-y-2">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wider">
                      Lucide Vector Icon Library Map
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                      All general symbols across this application are imported dynamically from <strong className="text-zinc-200">lucide-react</strong>. 
                      You can instantly rewrite any of these imports to replace icons in your layout files. Here are the core icons mapped:
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    {lucideIconGroup.map((icon, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-black border border-white/5 flex flex-col justify-between space-y-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 text-sm font-bold text-white uppercase font-display">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                            <span>{icon.name}</span>
                          </div>
                          <p className="text-xs text-zinc-400">{icon.usage}</p>
                        </div>

                        <div className="flex items-center justify-between gap-2 p-2 bg-zinc-950 border border-white/5 text-[10px] font-dmmono text-brand-orange">
                          <span className="truncate">{icon.importName}</span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(icon.importName)}
                            className="p-1 hover:text-white transition-all text-zinc-500"
                            title="Copy Import Command"
                          >
                            {copiedPath === icon.importName ? (
                              <Check size={12} className="text-green-500" />
                            ) : (
                              <Copy size={12} />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'guide' && (
                <motion.div
                  key="guide-tab"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.2 }}
                  className="bg-zinc-950/60 border border-white/5 p-6 md:p-8 space-y-8"
                >
                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-bold uppercase tracking-wider text-white">
                      Swap / Customize Images Walkthrough
                    </h3>
                    <p className="text-xs text-[#ced4da] leading-relaxed">
                      This application maps dynamic image endpoints using standard ES modules inside Vite. Follow these clear, simple steps to replace or add your own image files.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-brand-orange/30 text-brand-orange font-dmmono text-xs flex items-center justify-center shrink-0">
                        1
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-white text-xs uppercase tracking-wide">
                          Place Your Image File in `/src/assets/`
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Drag and drop or upload any brand asset including <strong className="text-zinc-200">PNG (.png)</strong>, <strong className="text-zinc-200">JPEG (.jpg, .jpeg)</strong>, or <strong className="text-zinc-200">SVG (.svg)</strong> files inside your local project directory path: <code className="font-dmmono bg-black text-[#f8f9fa] border border-white/5 px-1 py-0.5 rounded text-[11px]">/src/assets/</code>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-brand-orange/30 text-brand-orange font-dmmono text-xs flex items-center justify-center shrink-0">
                        2
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-white text-xs uppercase tracking-wide">
                          Import in `/src/assets.tsx`
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Open the file <code className="font-dmmono bg-black text-[#f8f9fa] border border-white/5 px-1 py-0.5 rounded text-[11px]">/src/assets.tsx</code> and add an import statement matching your new file, e.g.:
                        </p>
                        <pre className="p-3 bg-zinc-950 border border-white/5 text-[11px] font-dmmono text-[#fd7e14] block overflow-x-auto rounded">
                          {`import myCustomPhotoUrl from './assets/my-new-delivery-photo.png';`}
                        </pre>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-zinc-900 border border-brand-orange/30 text-brand-orange font-dmmono text-xs flex items-center justify-center shrink-0">
                        3
                      </div>
                      <div className="space-y-1.5">
                        <h4 className="font-display font-bold text-white text-xs uppercase tracking-wide">
                          Modify the Global `IMAGES` Export
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          Update the properties mapping in the constant named <code className="font-dmmono text-brand-orange text-[11px] font-semibold">export const IMAGES</code> to point variables to your new import alias:
                        </p>
                        <pre className="p-3 bg-zinc-950 border border-white/5 text-[11px] font-dmmono text-[#ced4da] block overflow-x-auto rounded">
                          {`export const IMAGES = {
  mskContainerYard: myCustomPhotoUrl, // Swapped to PNG!
  customLogoUrl: '', // Or leave empty to use SVG logo
  airCargo: airCargoUrl,
  oceanFreight: oceanFreightUrl,
};`}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 flex gap-3 text-xs">
                    <Info className="text-brand-orange shrink-0 mt-0.5" size={16} />
                    <p className="text-zinc-300 leading-relaxed">
                      <strong>Automatic Asset Type declarations (.d.ts)</strong> are pre-configured to support <code className="font-dmmono text-white px-0.5 bg-black">.png</code>, <code className="font-dmmono text-white px-0.5 bg-black">.jpg</code>, <code className="font-dmmono text-white px-0.5 bg-black">.jpeg</code>, and <code className="font-dmmono text-white px-0.5 bg-black">.svg</code> files dynamically via client references!
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Interactive Sandbox Sidebar Column */}
          <div className="space-y-6">
            
            <div className="bg-[#121316] border border-white/5 p-6 space-y-6 relative">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-orange" />
              
              <div className="space-y-1 text-center">
                <span className="text-[10px] uppercase font-dmmono tracking-widest text-brand-orange block">
                  Media Sandbox
                </span>
                <h3 className="font-display text-base font-bold uppercase text-white">
                  Live View Testing
                </h3>
                <p className="text-xs text-zinc-500 font-sans">
                  Paste any direct URL (PNG, JPG, or SVG) to see how alternative placements render live inside our container frames.
                </p>
              </div>

              <div className="space-y-4">
                {/* Select target frame */}
                <div className="space-y-1.5">
                  <span className="font-dmmono text-[10px] uppercase tracking-wider text-zinc-400 block">
                    Choose Target Frame placement:
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 p-1 bg-zinc-950 border border-white/5">
                    <button
                      type="button"
                      onClick={() => setSandboxPlacement('logo')}
                      className={`py-1.5 text-[10px] font-semibold font-dmmono uppercase transition-all ${
                        sandboxPlacement === 'logo'
                          ? 'bg-brand-orange text-black font-bold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Logo
                    </button>
                    <button
                      type="button"
                      onClick={() => setSandboxPlacement('hero')}
                      className={`py-1.5 text-[10px] font-semibold font-dmmono uppercase transition-all ${
                        sandboxPlacement === 'hero'
                          ? 'bg-brand-orange text-black font-bold'
                          : 'text-zinc-500 hover:text-white'
                      }`}
                    >
                      Hero Yard
                    </button>
                    <button
                      type="button"
                      onClick={() => setSandboxPlacement('cargo')}
                      className={`py-1.5 text-[10px] font-semibold font-dmmono uppercase transition-all ${
                        sandboxPlacement === 'cargo'
                          ? 'bg-brand-orange text-black font-bold'
                          : 'text-zinc-500 hover:text-white'
                      }`}
                    >
                      Cargo Jet
                    </button>
                  </div>
                </div>

                {/* Paste URL Input field */}
                <div className="space-y-1.5">
                  <span className="font-dmmono text-[10px] uppercase tracking-wider text-zinc-400 block">
                    Source Link (PNG, JPG, SVG):
                  </span>
                  <input
                    type="url"
                    value={sandboxUrl}
                    onChange={(e) => setSandboxUrl(e.target.value)}
                    placeholder="https://example.com/logo-or-photo.png"
                    className="w-full bg-zinc-950 border border-white/5 p-3 text-xs font-sans text-white focus:border-brand-orange focus:bg-zinc-900 focus:outline-none transition-all placeholder:text-zinc-700"
                  />
                </div>
              </div>

              {/* Dynamic Sandbox Rendering frame */}
              <div className="p-4 bg-zinc-950 border border-white/5 rounded-none flex flex-col justify-center items-center">
                <span className="font-dmmono text-[9px] uppercase tracking-widest text-zinc-600 block mb-3 text-center">
                  Live Placement Frame Preview
                </span>
                
                <div className="w-full aspect-video bg-black flex items-center justify-center p-3 border border-white/5 overflow-hidden text-center select-none relative">
                  {sandboxUrl ? (
                    sandboxPlacement === 'logo' ? (
                      <img
                        src={sandboxUrl}
                        alt="Sandbox Logo placement"
                        className="max-h-[50px] object-contain"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/150x50/ff7a00/000000?text=Invalid+Image+URL';
                        }}
                      />
                    ) : (
                      <img
                        src={sandboxUrl}
                        alt="Sandbox Landscape photo placement"
                        className="h-full w-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/600x400/27272a/ef4444?text=Failed+to+load+URL';
                        }}
                      />
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-1 text-zinc-650 p-6 text-xs">
                      <HelpCircle size={18} />
                      <span className="font-medium text-[10px] uppercase">Waiting for Image Link...</span>
                    </div>
                  )}
                </div>
                
                {sandboxUrl && (
                  <button
                    type="button"
                    onClick={() => setSandboxUrl('')}
                    className="mt-3.5 text-[9px] hover:text-white transition-colors duration-200 font-dmmono text-zinc-500 uppercase tracking-widest block"
                  >
                    Reset Testing sandbox
                  </button>
                )}
              </div>
            </div>

            {/* Quick deployment attribution card */}
            <div className="p-6 bg-zinc-900/40 border border-white/5 flex flex-col items-center space-y-3 text-center">
              <Laptop size={24} className="text-[#a1a1aa]" />
              <div className="space-y-1">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                  Developer Direct Build Info
                </h4>
                <p className="text-[11px] text-[#71717a] font-mono leading-relaxed">
                  All CSS styles rendered here inherit from Tailwind. Standalone SVG illustrations can be fully overwritten using simple text or standard paint code modifications instantly.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
