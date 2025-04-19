
import React from 'react';
import { cn } from '@/lib/utils';

interface KineticLogoProps {
  className?: string;
  isWhite?: boolean;
}

const KineticLogo = ({ className, isWhite = false }: KineticLogoProps) => {
  return (
    <img 
      src="https://kineticconsultingpartners.wordpress.com/wp-content/uploads/2025/02/picture2-1.png"
      alt="Kinetic Consulting Partners"
      className={cn("h-full w-auto", className)}
    />
  );
};

export default KineticLogo;
