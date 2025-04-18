
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import HeroSection from '@/components/home/HeroSection';
import WhyWeExistSection from '@/components/home/WhyWeExistSection';
import ValueCreationPillarsSection from '@/components/home/ValueCreationPillarsSection';
import HowWeWorkSection from '@/components/home/HowWeWorkSection';
import CTASection from '@/components/home/CTASection';

const Index = () => {
  return (
    <MainLayout>
      <HeroSection />
      <WhyWeExistSection />
      <ValueCreationPillarsSection />
      <HowWeWorkSection />
      <CTASection />
    </MainLayout>
  );
};

export default Index;
