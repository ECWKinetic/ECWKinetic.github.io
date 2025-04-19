
import React from 'react';

const ValueCreationPillarsSection = () => {
  const pillars = [
    {
      title: "Transaction Support",
      description: "Comprehensive support for PE-owned portfolio companies throughout the transaction lifecycle",
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
      description: "Driving operational excellence in small-to-mid market portfolio companies",
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
      description: "Maximizing commercial potential for sustainable growth",
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
            Our comprehensive approach to value creation helps small-to-mid market PE portfolio companies drive transformation and sustainable growth.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className={`text-xl font-bold mb-3 ${pillar.color}`}>{pillar.title}</h3>
              <p className="text-gray-600 mb-4">{pillar.description}</p>
              <ul className="space-y-2">
                {pillar.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueCreationPillarsSection;
