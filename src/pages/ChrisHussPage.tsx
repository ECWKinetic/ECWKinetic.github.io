
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ChrisHussPage = () => (
  <MainLayout>
    <section className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-5xl flex flex-col md:flex-row gap-12 mx-auto">
        <div className="flex-shrink-0">
          <img
            src="/lovable-uploads/79bf4a8d-e93a-4b77-afef-7e2b147d2f07.png"
            alt="Chris Huss"
            className="w-64 h-64 object-cover rounded-md shadow mb-4"
          />
          <h1 className="text-3xl font-bold text-kinetic-copper mb-3">Chris Huss</h1>
          <div className="mb-5">
            <div className="text-xs uppercase mb-1 text-kinetic-navy font-bold">Representative Clients:</div>
            <ul className="list-disc text-sm ml-5 mb-4">
              <li>Guidepost Growth Equity</li>
              <li>SVP Global</li>
              <li>New Mountain Capital</li>
              <li>Platinum Equity</li>
              <li>Waud Capital Partners</li>
              <li>JLL Partners</li>
              <li>Audax Group</li>
              <li>Mayo Clinic</li>
              <li>Kaiser Permanente</li>
              <li>Netcare (South Africa)</li>
              <li>Walgreens</li>
              <li>Bloomberg</li>
            </ul>
            <div className="text-xs uppercase mb-1 text-kinetic-navy font-bold">Education, Licenses & Certifications:</div>
            <ul className="list-disc text-sm ml-5">
              <li>MBA, University of Chicago</li>
              <li>BS, Industrial Engineering, Bradley University</li>
              <li>General Electric Lean/Six Sigma</li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-kinetic-copper mb-2">Profile</h2>
          <p className="mb-4 text-base text-gray-700 leading-relaxed">Chris is an operations and strategy consultant specializing in value creation, process improvement, mergers & acquisitions and strategic planning. He focuses his practice on facilitating transformation for both healthy and challenged organizations. He has advised multi-national Fortune 100 companies, mid-cap private equity portfolio companies and healthcare systems on performance improvement objectives across various industries, including diversified industrials, consumer, medical devices, healthcare providers, life sciences (branded and generics), construction & mining, aerospace, media & information and B2B services.</p>
          <h3 className="font-semibold text-lg text-kinetic-copper mt-7 mb-2">Consulting Focus</h3>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-1 text-green-900 text-sm list-disc ml-5 mb-4">
            <li>Cost Reduction</li>
            <li>Vendor Management</li>
            <li>Value Creation</li>
            <li>Lean/Process Improvement</li>
            <li>Business Process Outsourcing</li>
            <li>Interim Management</li>
            <li>M&amp;A</li>
            <li>Operating Model Improvement</li>
            <li>International Expansion</li>
            <li>Playbook Development</li>
            <li>Strategic Planning</li>
            <li>Competitive Intelligence</li>
          </ul>
          <h3 className="font-semibold text-lg text-kinetic-copper mt-9 mb-2">Representative Project Experience</h3>
          <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
            <li>Assessed and developed a refined operating model for a European based PE backed B2B services holding</li>
            <li>Served as Interim North American Transformation lead for European based multi-national PE backed PortCo, establishing and managing workstreams to achieve aggressive 3-year transformation goals</li>
            <li>Led reorganization for 1 of 4 US regions for a well-known international non-profit, creating the project governance, timelines, stakeholder groups and facilitating relevant change management activities</li>
            <li>Led carve-out buy-side diligence engagements for Private Equity sponsors to determine headcount and non-headcount associated costs (run-rate + one-time), identify savings opportunities, establish Transition Service Agreements (TSAs) and create Day-1 readiness and 100-day implementation plans</li>
            <li>Created operational playbooks (growth opportunities, pricing/margin management, sourcing, LEAN / continuous improvement, SG&amp;A, sales force effectiveness and inventory / working capital)</li>
            <li>Led multiple integration management office (IMO) to facilitate post-close integration activities</li>
          </ul>
          {/* Navigation at bottom */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="text-kinetic-copper text-sm underline flex items-center mb-2 md:mb-0">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Our Team
            </Link>
            <div className="flex gap-4 mt-2 md:mt-0">
              <Link to="/profile/eric-west" className="flex items-center text-kinetic-copper hover:text-kinetic-navy text-sm">
                Next <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
);

export default ChrisHussPage;
