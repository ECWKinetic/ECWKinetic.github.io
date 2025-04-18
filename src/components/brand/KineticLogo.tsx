
import React from 'react';
import { cn } from '@/lib/utils';

interface KineticLogoProps {
  className?: string;
  isWhite?: boolean;
}

const KineticLogo = ({ className, isWhite = false }: KineticLogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      {/* SVG Logo - Simplified version of the double chevron logo */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
        {/* Copper Chevron */}
        <path d="M24 8L12 18L24 28" stroke={isWhite ? "#FFFFFF" : "#B87554"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {/* Navy Chevron */}
        <path d="M16 4L4 18L16 32" stroke={isWhite ? "#A4C2CF" : "#1B2B3A"} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      
      {/* Text Logo */}
      <div className={isWhite ? "text-white" : "text-kinetic-navy"}>
        <div className="font-bold text-xl tracking-tight">KINETIC</div>
        <div className="text-xs tracking-wider">CONSULTING PARTNERS</div>
      </div>
    </div>
  );
};

export default KineticLogo;
