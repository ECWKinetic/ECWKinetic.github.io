
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, Briefcase, ChartLine } from 'lucide-react';

const WhyWeExistSection = () => {
  const workPillars = [
    {
      title: "Accountable to All",
      points: [
        "We serve both the fund and the management team because lasting change requires buy-in from all stakeholders",
        "We work with not for or against our clients and assume accountability for our collective outcomes"
      ],
      icon: <Handshake className="h-10 w-10 text-kinetic-copper mb-4" />
    },
    {
      title: "Sleeves Rolled Up",
      points: [
        "Each of our consultants has been 'in industry' so we know what actual work looks like",
        "We enjoy getting our hands dirty – and we know when to dig in",
        "We build models, clean up data, write the plan, walk the floor, and talk shop"
      ],
      icon: <Briefcase className="h-10 w-10 text-kinetic-copper mb-4" />
    },
    {
      title: "Only the necessary",
      points: [
        "Slides that sit on a shelf don't create value, but building out an Excel model, process map, or visual may",
        "We only create the necessary to communicate or to help make a decision"
      ],
      icon: <ChartLine className="h-10 w-10 text-kinetic-copper mb-4" />
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-kinetic-navy mb-4">How We Work</h2>
          <div className="text-lg text-gray-700 max-w-4xl mx-auto">
            <p>
              We know the answers often lie within the company itself. By partnering with management and building on their insight, we bring structure and momentum to drive meaningful performance improvement.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workPillars.map((pillar, index) => (
            <Card key={index} className="border-t-4 border-t-kinetic-copper">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center mb-4">
                  {pillar.icon}
                  <h3 className="text-xl font-bold mb-4 text-kinetic-navy">{pillar.title}</h3>
                </div>
                <ul className="space-y-4">
                  {pillar.points.map((point, idx) => (
                    <li key={idx} className="text-gray-600">
                      {point}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyWeExistSection;
