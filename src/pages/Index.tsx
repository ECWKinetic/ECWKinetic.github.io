
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import ValueCreationPillarsSection from '@/components/home/ValueCreationPillarsSection';
import WhyWeExistSection from '@/components/home/WhyWeExistSection';
import TeamSection from '@/components/home/TeamSection';
import ClientLogosSection from '@/components/home/ClientLogosSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <MainLayout>
      <div id="home">
        <HeroSection />
      </div>
      <div id="value-creation">
        <ValueCreationPillarsSection />
      </div>
      <div id="how-we-work">
        <WhyWeExistSection />
      </div>
      <div id="clients">
        <ClientLogosSection />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <div id="contact">
        <CTASection />
      </div>
    </MainLayout>
  );
};

export default Index;
