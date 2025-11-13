import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown, Users, Briefcase, Home, LogOut, Plus } from 'lucide-react';

interface PortalSwitcherProps {
  currentPortal: 'talent' | 'client';
  hasBothProfiles: boolean;
  onSignOut: () => void;
}

export function PortalSwitcher({ currentPortal, hasBothProfiles, onSignOut }: PortalSwitcherProps) {
  const navigate = useNavigate();

  const handleSwitchPortal = () => {
    const targetPath = currentPortal === 'talent' ? '/project-brief' : '/talent-network';
    navigate(targetPath);
  };

  const handleAddProfile = () => {
    const profileType = currentPortal === 'talent' ? 'customer' : 'talent';
    navigate(`/setup-profile?add=${profileType}`);
  };

  const handleReturnToMain = () => {
    navigate('/');
  };

  const otherPortalName = currentPortal === 'talent' ? 'Client Portal' : 'Talent Portal';
  const OtherPortalIcon = currentPortal === 'talent' ? Briefcase : Users;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <span className="hidden sm:inline">Menu</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white z-[100]">
        {hasBothProfiles ? (
          <>
            <DropdownMenuItem onClick={handleSwitchPortal} className="cursor-pointer">
              <OtherPortalIcon className="mr-2 h-4 w-4" />
              Switch to {otherPortalName}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        ) : (
          <>
            <DropdownMenuItem onClick={handleAddProfile} className="cursor-pointer">
              <Plus className="mr-2 h-4 w-4" />
              Add {otherPortalName.replace(' Portal', ' Profile')}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem onClick={handleReturnToMain} className="cursor-pointer">
          <Home className="mr-2 h-4 w-4" />
          Return to Main Website
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onSignOut} className="cursor-pointer text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
