
import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-kinetic-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img 
              src="/lovable-uploads/63e50857-d311-4914-96b8-7125cb4a1775.png" 
              alt="Kinetic Consulting Partners" 
              className="h-12 w-auto mb-4"
            />
            <p className="mt-4 max-w-md">
              Kinetic Consulting Partners delivers expert strategic consulting focused on creating sustainable value for lower- and mid-market PE-owned portfolio companies through innovative solutions.
            </p>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://www.linkedin.com/company/kinetic-consulting-partners" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white hover:text-kinetic-copper transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="mailto:info@kineticconsultingpartners.com" 
                className="text-white hover:text-kinetic-copper transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="not-italic">
              <p>info@kineticconsultingpartners.com</p>
            </address>
          </div>
        </div>
      </div>
      <div className="bg-black/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
            <p>© {new Date().getFullYear()} Kinetic Consulting Partners. All rights reserved.</p>
            <Link to="/privacy-policy" className="hover:text-kinetic-copper transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
