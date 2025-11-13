import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import KineticLogo from '../brand/KineticLogo';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (id: string) => {
    if (location.pathname === '/') {
      // If we're on the home page, scroll to the section with offset for sticky header
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = 80; // Approximate header height
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // If we're on another page, navigate to home with hash
      window.location.href = `/#${id}`;
    }
  };

  return (
    <header className="border-b sticky top-0 z-50 bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <KineticLogo className="h-12 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLinks onNavigate={handleNavigation} />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinks isMobile onItemClick={() => setIsMenuOpen(false)} onNavigate={handleNavigation} />
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinksProps {
  isMobile?: boolean;
  onItemClick?: () => void;
  onNavigate: (id: string) => void;
}

const NavLinks = ({ isMobile, onItemClick, onNavigate }: NavLinksProps) => {
  const { user, profile } = useAuth();
  const links = [
    { name: 'Home', id: 'home' },
    { name: 'Value Creation', id: 'value-creation' },
    { name: 'How We Work', id: 'how-we-work' },
    { name: 'Clients', id: 'clients' },
    { name: 'Team', id: 'team' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
    if (onItemClick) onItemClick();
  };

  return (
    <>
      {user && profile ? (
        <Link to={profile.user_type === 'talent' ? '/talent-network' : '/project-brief'}>
          <Button 
            style={{ backgroundColor: '#C49A6C' }}
            className={`text-white hover:bg-opacity-90 ${isMobile ? 'w-full' : ''}`}
          >
            Dashboard
          </Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button 
            style={{ backgroundColor: '#C49A6C' }}
            className={`text-white hover:bg-opacity-90 ${isMobile ? 'w-full' : ''}`}
          >
            Login
          </Button>
        </Link>
      )}
      {links.map((link) => (
        <a
          key={link.name}
          href={`#${link.id}`}
          className={`font-medium text-kinetic-navy hover:text-kinetic-copper transition-colors ${
            isMobile ? 'block py-2' : ''
          }`}
          onClick={(e) => handleClick(e, link.id)}
        >
          {link.name}
        </a>
      ))}
      <Button 
        style={{ backgroundColor: '#379392' }}
        className="text-white hover:bg-opacity-90"
        onClick={() => onNavigate('contact')}
      >
        Get in Touch
      </Button>
    </>
  );
};

export default Header;
