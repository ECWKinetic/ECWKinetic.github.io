
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EricWestPage = () => (
  <MainLayout>
    <section className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-5xl flex flex-col md:flex-row gap-12 mx-auto">
        <div className="flex-shrink-0">
          <img
            src="/lovable-uploads/e223d156-c1c8-4506-b724-a4f612bfca2d.png"
            alt="Eric West"
            className="w-64 h-64 object-cover rounded-md shadow mb-4"
          />
          <h1 className="text-3xl font-bold text-kinetic-copper mb-3">Eric West</h1>
          <div className="mb-5">
            <div className="text-xs uppercase mb-1 text-kinetic-navy font-bold">Representative Clients:</div>
            <ul className="list-disc text-sm ml-5 mb-4">
              <li>Atlas Holdings, Inc.</li>
              <li>Enru Logistics & Postal Optimization</li>
              <li>LSC Communications</li>
              <li>Integrated Merchandising Solutions</li>
              <li>Lyondell Bassel</li>
              <li>Walmart.com</li>
              <li>Coca-Cola</li>
            </ul>
            <div className="text-xs uppercase mb-1 text-kinetic-navy font-bold">Education, Licenses & Certifications:</div>
            <ul className="list-disc text-sm ml-5">
              <li>BS Chemical Engineering, Rensselaer Polytechnic Institute</li>
              <li>MBA, University of Chicago</li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-kinetic-copper mb-2">Profile</h2>
          <p className="mb-4 text-base text-gray-700 leading-relaxed">Eric is a senior consultant with a focus in B2B services and industrials PortCos. In his 20+ years of experience, Eric has split his time as both consultant and operator; he's a former management consultant at Kearney and has been a P&L owner as a member of 4 management teams reporting into Private Equity and Holding Companies. This blend of experience provides him a unique perspective and the ability to work shoulder-to-shoulder with management teams to produce value creation plans that are achievable and communicate them to BODs for understanding and approval. His value creation focus areas are in commercial strategy / GTM / revenue operations as well as supply chain cost improvement across plan/source/make/deliver.</p>
          <h3 className="font-semibold text-lg text-kinetic-copper mt-7 mb-2">Consulting Focus</h3>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-1 text-green-900 text-sm list-disc ml-5 mb-4">
            <li>Ops Diagnosis / Cost Reduction</li>
            <li>Operational Due Diligence</li>
            <li>Supply Chain / Logistics</li>
            <li>Procurement / Category Sourcing</li>
            <li>Stakeholder Management</li>
            <li>Performance Improvement</li>
            <li>Strategic Planning</li>
            <li>Lean / Process Improvement</li>
            <li>Transformation</li>
            <li>KPI Metrics / 100-Day Plan</li>
            <li>Interim Management (COO/CRO)</li>
            <li>GTM / Rev Ops</li>
          </ul>
          <h3 className="font-semibold text-lg text-kinetic-copper mt-9 mb-2">Representative Project Experience</h3>
          <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
            <li>For a $40M branded merchandise BU of a mid-market marketing execution firm – redesigned inventory programs for company store; redesigned go to market messaging and pitch process; developed margin calculator and project tracker for improved workflow</li>
            <li>For a $750M vertically integrated distributor, drove a rapid-improvement exercise for a $25M manufacturing operation. Focus on inventory optimization, production scheduling, fixed asset audit, space allocation and workflow improvement.</li>
            <li>For a $500M Industrial: Sales team restructuring – including territory reassignment, sales incentive compensation revision, and product/rep realignment.</li>
            <li>For a $300M Transportation: Sales Process (Prospect-to-close) and CRM/Revenue Operations capability standup.</li>
            <li>For a F100: Reimagined procurement process for a global indirect category to drive innovation while mitigating cost</li>
            <li>For a $16B AUM Fund: Led an 8-week sprint to develop a business case for a new investment thesis</li>
            <li>For a Large PE Growth Fund: Led a 3-week operational due diligence</li>
            <li>For a $350M Services: Customer Service / CX Improvement and Cost-Out. Integrated new CRM and Telephony systems with redesigned workflow and process mapping exercise to create queues for process improvement and improved customer experience.</li>
            <li>For a $80M Industrial: Created new capabilities via revised operating process and commercialized with full GTM inclusive of marketing plan, pricing model, channel strategy.</li>
            <li>For a $100M Services: Led RFP Process for warehousing and field services to take out $2.5M in cost</li>
          </ul>
          {/* Navigation at bottom */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="text-kinetic-copper text-sm underline flex items-center mb-2 md:mb-0">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Our Team
            </Link>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link to="/profile/dale-cabreira" className="flex items-center text-kinetic-copper hover:text-kinetic-navy text-sm">
                <ArrowLeft className="w-4 h-4 mr-1" /> Previous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
);

export default EricWestPage;
