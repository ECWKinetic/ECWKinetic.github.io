
import React from 'react';

const DaleCabreiraPage = () => (
  <section className="bg-white min-h-screen py-12 px-4">
    <div className="max-w-5xl flex flex-col md:flex-row gap-12 mx-auto">
      <div className="flex-shrink-0">
        <img
          src="public/lovable-uploads/d0fa29f0-6446-41db-98fe-b64192df3c89.png"
          alt="Dale Cabreira"
          className="w-64 h-64 object-cover rounded-md shadow mb-4"
        />
        <h1 className="text-3xl font-bold text-kinetic-copper mb-3">Dale Cabreira</h1>
        <div className="mb-5">
          <div className="text-xs uppercase mb-1 text-kinetic-navy font-bold">Representative Clients:</div>
          <ul className="list-disc text-sm ml-5 mb-4">
            <li>Astellas Pharmaceutical</li>
            <li>BAE Systems</li>
            <li>Barclays</li>
            <li>Baxter</li>
            <li>Cardinal Health</li>
            <li>Eastman Kodak</li>
            <li>Federal Mogul</li>
            <li>Invitae</li>
            <li>iShares</li>
            <li>Johnson & Johnson</li>
            <li>Mason Wells</li>
            <li>Microsoft</li>
            <li>Tenneco</li>
            <li>Walgreens</li>
          </ul>
          <div className="text-xs uppercase mb-1 text-kinetic-navy font-bold">Education, Licenses & Certifications:</div>
          <ul className="list-disc text-sm ml-5">
            <li>MBA, Corporate Finance, DePaul University</li>
            <li>BS, Accounting, DePaul University</li>
            <li>CPA, PMP, MCR</li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-kinetic-copper mb-2">Profile</h2>
        <p className="mb-4 text-base text-gray-700 leading-relaxed">Dale is a CPA, PMP and Certified MCR specializing in corporate strategy, transaction integrations and divestitures and joint ventures focused on operations across various sectors, including automotive, aerospace, biotech, consumer products, financial services, healthcare and technology. Dale’s deal experience spans the entire transaction lifecycle beginning with corporate strategy to playbook design to LOI and due diligence to planning and integration for Day 1 readiness.</p>
        <h3 className="font-semibold text-lg text-kinetic-copper mt-7 mb-2">Consulting Focus</h3>
        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-1 text-green-900 text-sm list-disc ml-5 mb-4">
          <li>Corporate Strategy</li>
          <li>Integration & Separation Planning</li>
          <li>Financial / Operational Due Diligence</li>
          <li>Synergy Planning / Value Creation</li>
          <li>Finance Transformation</li>
          <li>O2C, P2P, R2R Process Improvement</li>
          <li>Financial Due Diligence</li>
          <li>Portfolio Strategic Planning</li>
          <li>BPO / Shared Services</li>
          <li>Financial Planning & Analysis</li>
        </ul>
        <h3 className="font-semibold text-lg text-kinetic-copper mt-9 mb-2">Representative Project Experience</h3>
        <ul className="list-disc ml-5 text-sm text-gray-800 space-y-1">
          <li>Acquisition project lead driving planning and execution for a $1.4b acquisition of a biotech company. Acquisition spanned financial and operational due diligence to Day 1 readiness and post close execution.</li>
          <li>Engineered the LATAM operational separation for a $15b global healthcare and life sciences company. Advised on separation activities, roadmap, deliverables and synergies.</li>
          <li>Managed the F&A integration for parallel acquisitions across 15 F&A sub-functions. Integration planning included assessment of operations and designing operating models across business spectrums.</li>
          <li>PMO and F&A Lead for the integration and separation of a $6b global supplier of automotive products manufacturer. Integration spanned transaction lifecycle from playbook development to due diligence to key deal activities i.e., one-time costs, synergy analysis and TSAs to support the future state operating model.</li>
          <li>Led the separation of a $10b commercial aircraft leasing business from a financial services holding company. Responsible for managing the separation and operational carve-out across the O2C, P2P, R2R, A2R process, defining Day 1 dispositions, targeted operating model and related TSAs.</li>
        </ul>
      </div>
    </div>
  </section>
);

export default DaleCabreiraPage;
