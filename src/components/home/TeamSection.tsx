
import React from 'react';

const TeamSection = () => {
  return (
    <section id="team" className="py-16 bg-kinetic-lightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-kinetic-navy mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Placeholder for team members - update when screenshots are provided */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="w-32 h-32 mx-auto mb-4 bg-kinetic-navy/10 rounded-full" />
            <h3 className="text-xl font-bold text-center mb-2">Team Member</h3>
            <p className="text-gray-600 text-center">Position</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
