
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import WhyWeExistSection from '@/components/home/WhyWeExistSection';
import ValueCreationPillarsSection from '@/components/home/ValueCreationPillarsSection';
import HowWeWorkSection from '@/components/home/HowWeWorkSection';
import TeamSection from '@/components/home/TeamSection';
import ClientLogosSection from '@/components/home/ClientLogosSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <MainLayout>
      <div id="home">
        <HeroSection />
      </div>
      <div id="services">
        <WhyWeExistSection />
      </div>
      <div id="approach">
        <ValueCreationPillarsSection />
        <HowWeWorkSection />
      </div>
      <div id="industries">
        <ClientLogosSection />
      </div>
      <TeamSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
