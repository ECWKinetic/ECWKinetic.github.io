
import React from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-r from-kinetic-navy to-kinetic-navy/90 text-white py-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2244')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Strategic Solutions for <span className="text-kinetic-copper">Business Transformation</span>
          </h1>
          <p className="text-xl mb-8">
            Empowering lower- and mid-market PE-owned portfolio companies to achieve sustainable performance improvement through transaction, operational, and commercial excellence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={() => scrollToSection('value-creation')}
              className="bg-kinetic-copper hover:bg-kinetic-copper/90 text-white font-medium"
            >
              Explore Our Services
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              style={{ backgroundColor: '#379392' }}
              className="text-white hover:bg-opacity-90 font-medium border-none"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
