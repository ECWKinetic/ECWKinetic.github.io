
import React from 'react';
import { Card } from '@/components/ui/card';

interface ClientGroup {
  title: string;
  logos: Array<{
    name: string;
    image: string;
  }>;
}

const clientGroups: ClientGroup[] = [
  {
    title: "Corporate Experience",
    logos: [
      { name: "ExxonMobil", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Unilever", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "GE", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Walmart", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "The Salvation Army", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "McMaster", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "TreeHouse", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Omnicom Group", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Coca-Cola", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Google", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Swissport", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" }
    ]
  },
  {
    title: "PE Client Experience",
    logos: [
      { name: "Atlas Holdings", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Platinum Equity", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "New Mountain Capital", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "TPG", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "SVP", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Pamplona", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Guidepost", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Yellow Wood Partners", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Bain Capital", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Advent", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" },
      { name: "Littlejohn & Co.", image: "/lovable-uploads/0fcca51a-92e0-4bcc-a872-98db4bb5bc61.png" }
    ]
  }
];

const ClientLogosSection = () => {
  return (
    <section id="clients" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-kinetic-navy mb-4 text-center">What We've Delivered</h2>
        <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
          Our consultants have a unique blend of experiences - both as management at some of the most well-respected corporates, 
          and as consultants for our Private Equity clients and their portfolio companies.
        </p>
        
        {clientGroups.map((group) => (
          <div key={group.title} className="mb-12">
            <h3 className="text-xl font-semibold text-kinetic-copper mb-6 text-center">{group.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {group.logos.map((client) => (
                <Card key={client.name} className="flex items-center justify-center p-4 h-24">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-kinetic-navy/50 text-sm text-center">{client.name}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLogosSection;
