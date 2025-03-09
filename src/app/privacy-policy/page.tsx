import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">
        Privacy Policy
      </h1>

      <div className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-900/20 text-purple-100">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            1. Introduction
          </h2>
          <p className="mb-4">
            Welcome to Alikeevich's portfolio website. I respect your privacy
            and am committed to protecting your personal data. This privacy
            policy will inform you about how I look after your personal data
            when you visit my website and tell you about your privacy rights.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            2. The Data I Collect
          </h2>
          <p className="mb-4">
            When you use the contact form on my website, I collect the following
            personal information:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Name</li>
            <li>Email address</li>
            <li>Message content</li>
          </ul>
          <p>
            I do not use cookies or tracking technologies to collect information
            about your browsing behavior.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            3. How I Use Your Data
          </h2>
          <p className="mb-4">
            I use the information you provide through the contact form solely
            to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Respond to your inquiries</li>
            <li>
              Communicate with you about potential collaboration or projects
            </li>
            <li>Provide you with the information you requested</li>
          </ul>
          <p>
            I will never use your personal information for marketing purposes or
            share it with third parties without your explicit consent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            4. Data Security
          </h2>
          <p className="mb-4">
            I implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the Internet or
            electronic storage is 100% secure, so I cannot guarantee absolute
            security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            5. Your Rights
          </h2>
          <p className="mb-4">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Access the personal data I hold about you</li>
            <li>Request correction of your personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Request transfer of your personal data</li>
          </ul>
          <p>
            If you wish to exercise any of these rights, please contact me
            through the contact form or directly at alikkenzheb@gmail.com.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            6. Changes to This Privacy Policy
          </h2>
          <p>
            I may update this privacy policy from time to time. Any changes will
            be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">7. Contact</h2>
          <p>
            If you have any questions about this privacy policy or my data
            practices, please contact me at alikkenzheb@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
}
