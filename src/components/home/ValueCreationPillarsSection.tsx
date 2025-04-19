
import React from 'react';
import { ArrowRight } from 'lucide-react';

const ValueCreationPillarsSection = () => {
  const pillars = [
    {
      title: "Transaction Support",
      description: "Comprehensive support for all stages of transaction lifecycle",
      color: "text-kinetic-copper",
      items: [
        "Due Diligence (Ops, Commercial, Confirmatory)",
        "Day-1 / 100-Day Planning",
        "Post-Merger Integration",
        "Carveout Support",
        "Sell-Side Preparedness"
      ]
    },
    {
      title: "Operations Improvement",
      description: "Driving operational excellence and efficiency",
      color: "text-kinetic-navy",
      items: [
        "Transformation Program Management",
        "Supply Chain Optimization",
        "Site / Plant Assessment",
        "Sales & Operations Planning",
        "Procurement Transformation"
      ]
    },
    {
      title: "Commercial Excellence",
      description: "Maximizing commercial potential and market impact",
      color: "text-kinetic-teal",
      items: [
        "Sales Process Improvement",
        "Sales Strategy Development",
        "Sales Operations / Forecasting Improvement",
        "Customer & Product-level profitability analysis & margin improvement"
      ]
    }
  ];

  return (
    <section className="py-16 bg-kinetic-lightGray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-kinetic-navy mb-4">Value Creation Pillars</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Our comprehensive approach to value creation is built on three strategic pillars that drive business transformation and growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className={`text-xl font-bold mb-3 ${pillar.color}`}>{pillar.title}</h3>
              <p className="text-gray-600 mb-4">{pillar.description}</p>
              <ul className="space-y-2 mb-4">
                {pillar.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
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

