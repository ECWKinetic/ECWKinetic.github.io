import React from 'react';
import { ArrowRight, BarChart3, Users, Briefcase, PieChart, Target, Building, MapPin, Landmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
  return (
    <MainLayout>
      {/* Hero Section with Chicago Theme */}
      <section className="relative bg-gradient-to-r from-kinetic-navy to-kinetic-navy/90 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2244')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4 text-kinetic-copper">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">Chicago-Based Excellence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Strategic Solutions for <span className="text-kinetic-copper">Business Transformation</span>
            </h1>
            <p className="text-xl mb-8">
              From our home in Chicago's business district, we empower organizations across the Midwest and beyond to achieve sustainable growth through innovative consulting partnerships.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-kinetic-copper hover:bg-kinetic-copper/90">
                Explore Our Services
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Meet Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-kinetic-navy mb-4">Chicago's Premier Consulting Partner</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Founded in the heart of Chicago, Kinetic Consulting Partners combines Midwestern values with world-class expertise to deliver tangible, measurable results with a client-centric approach.
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

      {/* Value Creation Pillars */}
      <section className="py-16 bg-kinetic-lightGray">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-kinetic-navy mb-4">Value Creation Pillars</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our comprehensive approach to value creation is built on four strategic pillars that address the key drivers of business performance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
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
            ].map((pillar, index) => (
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

      {/* How We Work */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-kinetic-navy mb-4">How We Work</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our proven methodology ensures we deliver consistent, high-quality outcomes for our clients at every stage of the engagement.
            </p>
          </div>
          
          <div className="relative">
            {/* Process Steps */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-kinetic-copper/20 -translate-x-1/2 z-0"></div>
            
            <div className="space-y-12 relative z-10">
              {[
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
              ].map((step, index) => (
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

      {/* CTA Section with Chicago Theme */}
      <section className="py-16 bg-kinetic-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1494522855154-9297ac14b55f?q=80&w=2240')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with our Chicago team to discuss how Kinetic Consulting Partners can help you achieve your strategic objectives.
          </p>
          <Button className="bg-kinetic-copper hover:bg-kinetic-copper/90 text-white">
            Contact Our Chicago Office
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
