
import React from 'react';
import { Link } from 'react-router-dom';
import KineticLogo from '../brand/KineticLogo';
import { Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-kinetic-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <KineticLogo className="h-12 w-auto mb-4" isWhite />
            <p className="mt-4 max-w-md">
              Kinetic Consulting Partners delivers expert strategic consulting focused on creating sustainable value for our clients through innovative solutions.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://linkedin.com" className="text-white hover:text-kinetic-copper transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:info@kineticconsulting.com" className="text-white hover:text-kinetic-copper transition-colors">
                <Mail size={20} />
              </a>
              <a href="tel:+1234567890" className="text-white hover:text-kinetic-copper transition-colors">
                <Phone size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="hover:text-kinetic-copper transition-colors">Services</Link></li>
              <li><Link to="/approach" className="hover:text-kinetic-copper transition-colors">Our Approach</Link></li>
              <li><Link to="/industries" className="hover:text-kinetic-copper transition-colors">Industries</Link></li>
              <li><Link to="/team" className="hover:text-kinetic-copper transition-colors">Our Team</Link></li>
              <li><Link to="/contact" className="hover:text-kinetic-copper transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <address className="not-italic">
              <p>123 Business Avenue</p>
              <p>Suite 200</p>
              <p>New York, NY 10001</p>
              <p className="mt-4">info@kineticconsulting.com</p>
              <p>(123) 456-7890</p>
            </address>
          </div>
        </div>
      </div>
      <div className="bg-black/30 py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} Kinetic Consulting Partners. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
