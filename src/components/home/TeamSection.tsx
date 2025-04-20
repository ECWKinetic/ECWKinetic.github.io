
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface TeamMember {
  name: string;
  title: string;
  practice: string[];
  pragmatism: string[];
  education: string[];
  image: string;
  profileLink: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Chris Huss",
    title: "Partner and Co-Founder",
    practice: [
      "20+ years total experience",
      "13 years of consulting with A&M, E&Y, and Axxum Consulting"
    ],
    pragmatism: [
      "5 years of GE experience",
      "Independent consultant to PE firms for past 5 years",
      "Kinetic Spikes: Operations and Transaction Support"
    ],
    education: [
      "BS, Industrial Engineering",
      "U of Chicago Booth MBA"
    ],
    image: "https://media.licdn.com/dms/image/v2/C5603AQHoTByT0_O11A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1651007592263?e=1750291200&v=beta&t=tDXvzVbDOq1TYd8Ta0ntCWszS9GaiptvcjlB67S0chU",
    profileLink: "/profile/chris-huss"
  },
  {
    name: "Dale Cabreira",
    title: "Partner and Co-Founder",
    practice: [
      "20+ years total experience",
      "16 years of M&A / Transaction support consulting with E&Y, KPMG, and BearingPoint"
    ],
    pragmatism: [
      "In-Industry experience at Cruise / GM building out M&A playbooks for charging station acquisitions",
      "Kinetic Spikes: Transaction Support"
    ],
    education: [
      "BA, Accounting",
      "DePaul MBA",
      "CPA Holder"
    ],
    image: "https://media.licdn.com/dms/image/v2/C4D03AQGQGmRmU-Tn-g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1516264118059?e=1750291200&v=beta&t=WgeK_W6dM0ifyLCackuN1QXCRkkhIsAV5ASCrOl6_L0",
    profileLink: "/profile/dale-cabreira"
  },
  {
    name: "Eric West",
    title: "Partner and Co-Founder",
    practice: [
      "20+ years total experience",
      "4 years of consulting at Kearney"
    ],
    pragmatism: [
      "7 years of ELT experience at PE PortCos",
      "Kinetic Spikes: Commercial Value Creation, Ops, & Interim Leadership"
    ],
    education: [
      "BS, Chemical Engineering",
      "U of Chicago Booth MBA"
    ],
    image: "https://media.licdn.com/dms/image/v2/D4D03AQHs-bxf4SjhRg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1707844582071?e=1750291200&v=beta&t=h_k475zmke5nuI1VwNqV0BTT66gNBXv4sokzqspzTso",
    profileLink: "/profile/eric-west"
  }
];

const TeamSection = () => {
  return (
    <section id="team" className="py-16 bg-kinetic-lightGray">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-kinetic-navy mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card key={member.name} className="bg-white h-full flex flex-col">
              <CardHeader className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-kinetic-navy">{member.name}</h3>
                <p className="text-kinetic-copper font-medium">{member.title}</p>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col flex-1">
                <div>
                  <h4 className="font-semibold text-kinetic-navy mb-2">Practice</h4>
                  <ul className="text-sm space-y-1">
                    {member.practice.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-kinetic-navy mb-2">Pragmatism</h4>
                  <ul className="text-sm space-y-1">
                    {member.pragmatism.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-kinetic-navy mb-2">Education</h4>
                  <ul className="text-sm space-y-1">
                    {member.education.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-4 text-center">
                  <Link 
                    to={member.profileLink} 
                    className="text-kinetic-copper text-xs hover:underline"
                  >
                    See More
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

