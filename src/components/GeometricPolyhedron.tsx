import React from 'react';
import { useTheme } from '../context/ThemeContext';

export const GeometricPolyhedron: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute top-0 left-0 w-48 sm:w-72 md:w-88 h-[800px] pointer-events-none -z-10 select-none overflow-hidden opacity-90 transition-all duration-700">
      <svg
        viewBox="0 0 400 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Colorful geometric polygon tessellation inspired by Aditya Pratama's signature branding with dynamic theme harmony */}
        
        {/* Top Orange / Coral Poly */}
        <polygon points="120,40 240,10 200,110" fill="#ea580c" fillOpacity="0.85" />
        <polygon points="120,40 200,110 90,130" fill="#dc2626" fillOpacity="0.75" />
        <polygon points="200,110 240,10 320,80" fill="#f97316" fillOpacity="0.9" />
        <polygon points="200,110 320,80 280,180" fill="#fbbf24" fillOpacity="0.85" />
        
        {/* Dynamic Center Poly - adapts to active theme */}
        <polygon points="90,130 200,110 180,220" fill={theme.hex} fillOpacity="0.9" />
        <polygon points="90,130 180,220 50,230" fill="#0369a1" fillOpacity="0.8" />
        <polygon points="180,220 280,180 260,290" fill={theme.hex} fillOpacity="0.95" />
        <polygon points="180,220 260,290 140,320" fill="#0d9488" fillOpacity="0.85" />

        {/* Lower Poly Accents */}
        <polygon points="50,230 180,220 140,320" fill="#0891b2" fillOpacity="0.9" />
        <polygon points="50,230 140,320 20,340" fill="#0f766e" fillOpacity="0.8" />
        <polygon points="140,320 260,290 220,400" fill={theme.hex} fillOpacity="0.8" />
        <polygon points="140,320 220,400 110,430" fill="#0284c7" fillOpacity="0.85" />

        {/* Floating small prism */}
        <polygon points="290,360 340,390 310,430" fill={theme.hex} fillOpacity="0.75" />
        <polygon points="310,430 340,390 370,440" fill="#0284c7" fillOpacity="0.65" />
      </svg>
    </div>
  );
};
