
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
            src="https://media.licdn.com/dms/image/v2/D4D03AQHs-bxf4SjhRg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1707844582071?e=1750291200&v=beta&t=h_k475zmke5nuI1VwNqV0BTT66gNBXv4sokzqspzTso"
            alt="Eric West"
            className="w-64 h-64 object-cover rounded-md shadow mb-4"
          />
          <h1 className="text-3xl font-bold text-kinetic-copper mb-3">Eric West</h1>
          <div className="mb-5">
            <div className="text-xs uppercase mb-1 text-kinetic-navy font-bold">Representative Clients:</div>
            <ul className="list-disc text-sm ml-5 mb-4">
              <li>Mason Wells</li>
              <li>JLL Partners</li>
              <li>Warburg Pincus</li>
              <li>Audax Group</li>
              <li>Chicago Pacific Founders</li>
              <li>Waud Capital Partners</li>
              <li>New Mountain Capital</li>
              <li>Advent International</li>
              <li>NMS Capital</li>
              <li>GSO Capital Partners</li>
              <li>Riverside Company</li>
            </ul>
            <div className="text-xs uppercase mb-1 text-kinetic-navy font-bold">Education, Licenses & Certifications:</div>
            <ul className="list-disc text-sm ml-5">
              <li>MBA, University of Chicago</li>
              <li>BS, Chemical Engineering, University of Illinois</li>
              <li>PMP Certification</li>
            </ul>
          </div>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-kinetic-copper mb-2">Profile</h2>
          <p className="mb-4 text-base text-gray-700 leading-relaxed">Eric is a seasoned strategy and operations executive with a focus on driving growth and operational excellence for small-to-mid market PE-owned portfolio companies. With over 20 years of experience spanning consulting, private equity portfolio operations, and C-Suite leadership roles, Eric brings a unique perspective to value creation initiatives. His expertise includes commercial strategy development, sales force effectiveness, operational improvement, and organizational design for companies across healthcare, industrial, and business services sectors.</p>
          <h3 className="font-semibold text-lg text-kinetic-copper mt-7 mb-2">Consulting Focus</h3>
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-1 text-green-900 text-sm list-disc ml-5 mb-4">
            <li>Commercial Due Diligence</li>
            <li>Revenue Growth Strategy</li>
            <li>Go-To-Market Optimization</li>
            <li>Sales Force Effectiveness</li>
            <li>Pricing Strategy</li>
            <li>Operational Excellence</li>
            <li>Organizational Design</li>
            <li>Interim Executive Leadership</li>
            <li>Process Improvement</li>
            <li>Portfolio Company Strategy</li>
          </ul>
          <h3 className="font-semibold text-lg text-kinetic-copper mt-9 mb-2">Representative Project Experience</h3>
          <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
            <li>Led comprehensive commercial transformation for a PE-owned healthcare services provider, resulting in 35% revenue growth in 18 months through sales force redesign and new market entry strategies.</li>
            <li>Served as Interim COO for a distressed industrial manufacturing portfolio company, stabilizing operations and improving EBITDA by 22% through lean manufacturing implementation and supply chain optimization.</li>
            <li>Developed and executed post-acquisition integration roadmap for a business services platform, including synergy capture planning and organizational redesign.</li>
            <li>Conducted customer segmentation and pricing analysis for a SaaS provider, identifying $3.5M in incremental annual revenue opportunities through targeted price increases and customer retention strategies.</li>
            <li>Built comprehensive commercial due diligence playbook for a mid-market PE firm, standardizing approach to market sizing, competitive analysis, and customer research across the portfolio.</li>
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
