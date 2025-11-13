import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import KineticLogo from '@/components/brand/KineticLogo';
import { PortalSwitcher } from './PortalSwitcher';
import { Users, Briefcase } from 'lucide-react';

interface PortalHeaderProps {
  portalType: 'talent' | 'client';
  userEmail: string;
  onSignOut: () => void;
}

export default function PortalHeader({ portalType, userEmail, onSignOut }: PortalHeaderProps) {
  const navigate = useNavigate();
  const { hasTalentProfile, hasCustomerProfile } = useAuth();

  const handleLogoClick = () => {
    navigate('/');
  };

  const portalTitle = portalType === 'talent' ? 'Talent Portal' : 'Client Portal';
  const PortalIcon = portalType === 'talent' ? Users : Briefcase;

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-kinetic-navy">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={handleLogoClick} className="h-10 hover:opacity-80 transition-opacity">
              <KineticLogo className="h-full" />
            </button>
            <div className="flex items-center gap-2 text-kinetic-navy">
              <PortalIcon className="h-5 w-5" />
              <h1 className="text-lg font-semibold">{portalTitle}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col items-end">
              <p className="text-sm text-muted-foreground">{userEmail}</p>
            </div>
            <PortalSwitcher
              currentPortal={portalType}
              hasBothProfiles={hasTalentProfile && hasCustomerProfile}
              onSignOut={onSignOut}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
