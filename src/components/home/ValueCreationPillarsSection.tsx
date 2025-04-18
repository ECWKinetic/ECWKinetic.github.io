
import React from 'react';
import { Target, BarChart3, Users, PieChart, ArrowRight } from 'lucide-react';

const ValueCreationPillarsSection = () => {
  const pillars = [
    {
      title: "Strategic Growth",
      description: "Identifying and executing growth strategies to expand market reach and revenue streams.",
      icon: Target,
      color: "text-kinetic-copper",
    },
    {
      title: "Operational Excellence",
      description: "Optimizing processes to improve efficiency, reduce costs, and enhance quality.",
      icon: BarChart3,
      color: "text-kinetic-navy",
    },
    {
      title: "Organizational Effectiveness",
      description: "Building high-performing teams and organizational structures that drive success.",
      icon: Users,
      color: "text-kinetic-teal",
    },
    {
      title: "Digital Transformation",
      description: "Leveraging technology to transform business models and create competitive advantage.",
      icon: PieChart,
      color: "text-kinetic-green",
    },
  ];

  return (
    <section className="py-16 bg-kinetic-lightGray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-kinetic-navy mb-4">Value Creation Pillars</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our comprehensive approach to value creation is built on four strategic pillars that address the key drivers of business performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <pillar.icon className={`h-12 w-12 ${pillar.color} mb-4`} />
              <h3 className="text-xl font-bold mb-3 text-kinetic-navy">{pillar.title}</h3>
              <p className="text-gray-600 mb-4">{pillar.description}</p>
              <a href="#" className={`inline-flex items-center font-medium ${pillar.color}`}>
                Learn more <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueCreationPillarsSection;
