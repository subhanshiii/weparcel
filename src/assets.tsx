import React from 'react';

// Import SVG assets dynamically via Vite file path routing
import logoUrl from './assets/logo1.png';
import mskContainerYardUrl from './assets/main.jpeg';
import airCargoUrl from './assets/side.jpeg';
import oceanFreightUrl from './assets/side.jpeg';

/**
 * Global Image assets registry mapping local high-fidelity SVG/PNG paths inside /src/assets/.
 */
export const IMAGES = {
  // Main container yard photo used on the Home screen
  mskContainerYard: mskContainerYardUrl,
  
  // Custom logo placeholder (can be a direct URL to a PNG/SVG or a local path)
  customLogoUrl: '', 

  // Secondary service and cargo illustration background photos
  airCargo: airCargoUrl,
  oceanFreight: oceanFreightUrl,
};

interface WeParcelLogoProps {
  className?: string;
  height?: number | string;
  width?: number | string;
}

/**
 * WEParcel official brand identity rendered from standalone file path.
 */
export function WeParcelLogo({ className = '', height = 'auto', width = '100%' }: WeParcelLogoProps) {
  const src = IMAGES.customLogoUrl || logoUrl;
  return (
    <img
      id="weparcel-brand-logo-img"
      src={src}
      alt="WEParcel Logo"
      className={`${className} object-contain`}
      style={{ height, width }}
      referrerPolicy="no-referrer"
    />
  );
}

/**
 * WEParcel container yard illustration loaded via local file path.
 */
export function ContainerIllustration() {
  return (
    <img
      id="container-illustration-img"
      src={IMAGES.mskContainerYard}
      alt="Container Yard Illustration"
      className="select-none h-full w-full object-cover"
      referrerPolicy="no-referrer"
    />
  );
}
