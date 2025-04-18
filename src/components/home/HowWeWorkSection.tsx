
import React from 'react';
import { Briefcase, PieChart, Target, Building } from 'lucide-react';

const HowWeWorkSection = () => {
  const steps = [
    {
      title: "Discover",
      description: "We begin by deeply understanding your business challenges, objectives, and the current state of your operations.",
      icon: Briefcase,
    },
    {
      title: "Design",
      description: "Working collaboratively, we design tailored solutions that address your specific needs and align with your strategic goals.",
      icon: PieChart,
    },
    {
      title: "Deliver",
      description: "We implement the solutions with rigorous project management and change management to ensure successful adoption.",
      icon: Target,
    },
    {
      title: "Sustain",
      description: "We transfer knowledge and capabilities to your team to ensure long-term sustainability of the implemented changes.",
      icon: Building,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-kinetic-navy mb-4">How We Work</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our proven methodology ensures we deliver consistent, high-quality outcomes for our clients at every stage of the engagement.
          </p>
        </div>
        
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-kinetic-copper/20 -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-kinetic-copper text-white rounded-full p-3 mr-4">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-kinetic-navy">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="md:w-1/2 hidden md:flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-kinetic-copper z-20 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
