
import React from 'react';

const ClientLogosSection = () => {
  return (
    <section id="clients" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-kinetic-navy mb-8 text-center">Trusted By</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {/* Placeholder for client logos - update when images are provided */}
          {[1, 2, 3, 4].map((index) => (
            <div key={index} className="w-40 h-20 bg-kinetic-navy/5 rounded flex items-center justify-center">
              <span className="text-kinetic-navy/30">Client Logo</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
