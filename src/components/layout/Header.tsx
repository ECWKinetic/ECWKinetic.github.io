
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import KineticLogo from '../brand/KineticLogo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <NavLinks />
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
            <NavLinks isMobile onItemClick={() => setIsMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinksProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

const NavLinks = ({ isMobile, onItemClick }: NavLinksProps) => {
  const links = [
    { name: 'Services', path: '/services' },
    { name: 'Approach', path: '/approach' },
    { name: 'Industries', path: '/industries' },
    { name: 'Team', path: '/team' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`font-medium text-kinetic-navy hover:text-kinetic-copper transition-colors ${
            isMobile ? 'block py-2' : ''
          }`}
          onClick={onItemClick}
        >
          {link.name}
        </Link>
      ))}
      <Button 
        className="bg-kinetic-copper text-white hover:bg-kinetic-copper/90"
      >
        Get in Touch
      </Button>
    </>
  );
};

export default Header;
