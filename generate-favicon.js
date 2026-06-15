import fs from 'fs';
import path from 'path';

const pngPath = path.join(process.cwd(), 'public', 'logo1.png');
const svgPath = path.join(process.cwd(), 'public', 'favicon.svg');

const base64Png = fs.readFileSync(pngPath).toString('base64');

const svgContent = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="#2a62d6"/>
  <image href="data:image/png;base64,${base64Png}" x="4" y="4" width="24" height="24"/>
</svg>`;

fs.writeFileSync(svgPath, svgContent);
console.log('Favicon SVG generated with embedded Base64 PNG.');
