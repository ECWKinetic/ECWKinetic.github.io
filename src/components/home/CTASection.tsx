
import React from 'react';
import ContactForm from '../contact/ContactForm';

const CTASection = () => {
  return (
    <section id="contact" className="py-16 bg-kinetic-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2240')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with us to discuss how Kinetic Consulting Partners can help you achieve your strategic objectives.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default CTASection;
