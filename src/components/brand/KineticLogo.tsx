
import React from 'react';
import { cn } from '@/lib/utils';

interface KineticLogoProps {
  className?: string;
  isWhite?: boolean;
}

const KineticLogo = ({ className, isWhite = false }: KineticLogoProps) => {
  return (
    <div className={cn("flex items-center", className)}>
      {/* SVG Logo - Double chevron logo matching the provided design */}
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
        {/* Copper Chevron */}
        <path 
          d="M26 6L14 20L26 34" 
          stroke={isWhite ? "#FFFFFF" : "#B87554"} 
          strokeWidth="4" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
        {/* Navy Chevron */}
        <path 
          d="M18 6L6 20L18 34" 
          stroke={isWhite ? "#A4C2CF" : "#1B2B3A"} 
          strokeWidth="4" 
          strokeLinecap="square" 
          strokeLinejoin="miter"
        />
      </svg>
      
      {/* Text Logo with updated styling */}
      <div className={cn(
        "flex flex-col",
        isWhite ? "text-white" : "text-kinetic-navy"
      )}>
        <span className="text-xl font-bold tracking-wider leading-tight">KINETIC</span>
        <span className="text-[0.65rem] tracking-[0.2em] leading-tight">CONSULTING PARTNERS</span>
      </div>
    </div>
  );
};

export default KineticLogo;
