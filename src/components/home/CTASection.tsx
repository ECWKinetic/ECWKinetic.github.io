
import React from 'react';
import PEFirmForm from '../contact/PEFirmForm';
import TalentForm from '../contact/TalentForm';

const CTASection = () => {
  return (
    <section id="contact" className="py-16 bg-kinetic-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2240')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Connect With Us</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* PE Firms & Portfolio Companies */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Looking for Talent?</h3>
            <p className="mb-6 text-white/80">
              PE firms and portfolio companies seeking expert consultants for your next engagement.
            </p>
            <PEFirmForm />
          </div>
          
          {/* Talent Database */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
            <h3 className="text-2xl font-bold mb-4">Join Our Talent Network</h3>
            <p className="mb-6 text-white/80">
              Submit your information to be considered for future consulting opportunities.
            </p>
            <TalentForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
