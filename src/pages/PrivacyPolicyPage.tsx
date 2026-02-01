import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const PrivacyPolicyPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl font-bold text-kinetic-navy mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">1. Introduction</h2>
            <p className="text-foreground/80 leading-relaxed">
              Kinetic Consulting Partners ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">2. Information We Collect</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>Personal Information:</strong> Name, email address, phone number, company name, job title, and other contact details you provide.</li>
              <li><strong>Professional Information:</strong> Resume, work history, skills, certifications, and other career-related information for talent network participants.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including IP address, browser type, pages visited, and time spent on pages.</li>
              <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to enhance your experience and analyze website traffic.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">3. How We Use Your Information</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>To provide and maintain our services</li>
              <li>To match talent with consulting opportunities</li>
              <li>To communicate with you about our services, updates, and opportunities</li>
              <li>To improve our website and user experience</li>
              <li>To analyze usage patterns and optimize our services</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li><strong>With Clients:</strong> For talent network participants, we may share your professional information with potential clients seeking consulting services.</li>
              <li><strong>Service Providers:</strong> We may share information with third-party vendors who assist in operating our website and services.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law or to protect our rights and safety.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">5. Data Security</h2>
            <p className="text-foreground/80 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">6. Your Rights</h2>
            <p className="text-foreground/80 leading-relaxed mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2 text-foreground/80">
              <li>Access to your personal data</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Objection to processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">7. Cookies Policy</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our website uses cookies to enhance your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings. Disabling cookies may affect some functionality of the website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">8. Third-Party Links</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">9. Children's Privacy</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">10. Changes to This Policy</h2>
            <p className="text-foreground/80 leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-kinetic-navy mb-4">11. Contact Us</h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <p className="text-foreground/80 mt-4">
              <strong>Email:</strong> info@kineticconsultingpartners.com
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicyPage;
