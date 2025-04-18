
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-kinetic-navy to-kinetic-navy/90 text-white py-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2244')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-4 text-kinetic-copper">
            <MapPin className="h-5 w-5" />
            <span className="text-sm font-medium">Chicago-Based Excellence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Strategic Solutions for <span className="text-kinetic-copper">Business Transformation</span>
          </h1>
          <p className="text-xl mb-8">
            From our home in Chicago's business district, we empower organizations across the Midwest and beyond to achieve sustainable growth through innovative consulting partnerships.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-kinetic-copper hover:bg-kinetic-copper/90">
              Explore Our Services
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Meet Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
