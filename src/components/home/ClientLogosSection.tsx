
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
      { name: "Atlas Holdings", image: "/lovable-uploads/b917a56d-8569-4e98-8455-264bd5f5d093.png" },
      { name: "Platinum Equity", image: "/lovable-uploads/73bc2610-353e-4862-86a8-6f5ee9ab422a.png" },
      { name: "New Mountain Capital", image: "/lovable-uploads/16753e9e-e117-4639-bf3c-2c7ddcb8fc9e.png" },
      { name: "TPG", image: "/lovable-uploads/915b9034-a22e-4526-8115-c1d8f4dae4a6.png" },
      { name: "SVP", image: "/lovable-uploads/b264242c-7402-4290-a842-38e08a197391.png" },
      { name: "Pamplona", image: "/lovable-uploads/852d5d25-7d18-4d39-a5b0-de861e05c65f.png" },
      { name: "Guidepost", image: "/lovable-uploads/8ab0d48d-adfe-436a-a4a0-4e02988cbd3f.png" },
      { name: "Yellow Wood Partners", image: "/lovable-uploads/8b7360b1-5d57-4999-bba4-99d1a2b2c4ad.png" },
      { name: "Bain Capital", image: "/lovable-uploads/3247256b-0d3b-4f8d-929d-09cf80be347b.png" },
      { name: "Advent", image: "/lovable-uploads/8d585386-60ad-4e31-9022-ebe5dd716ded.png" }
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
                    <img 
                      src={client.image} 
                      alt={client.name} 
                      className="max-w-full max-h-full object-contain"
                    />
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
