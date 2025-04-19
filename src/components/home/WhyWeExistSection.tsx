
import React from 'react';
import { Target, Users, Landmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const WhyWeExistSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-kinetic-navy mb-4">Your Premier Consulting Partner</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Kinetic Consulting Partners combines proven expertise with innovative approaches to deliver tangible, measurable results with a client-centric approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="border-t-4 border-t-kinetic-copper">
            <CardContent className="pt-6">
              <div className="bg-kinetic-lightGray p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Target className="h-8 w-8 text-kinetic-copper" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-kinetic-navy">Midwest Heritage</h3>
              <p className="text-gray-600">
                Built on Chicago's tradition of innovation and enterprise, delivering transformation with integrity.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-kinetic-teal">
            <CardContent className="pt-6">
              <div className="bg-kinetic-lightGray p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-kinetic-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-kinetic-navy">Client-Centric</h3>
              <p className="text-gray-600">
                We partner closely with our clients to deliver tailored solutions that address their unique challenges.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-t-4 border-t-kinetic-green">
            <CardContent className="pt-6">
              <div className="bg-kinetic-lightGray p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Landmark className="h-8 w-8 text-kinetic-green" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-kinetic-navy">Global Reach</h3>
              <p className="text-gray-600">
                From our Chicago base, we deliver impact across industries and borders with proven methodologies.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyWeExistSection;
