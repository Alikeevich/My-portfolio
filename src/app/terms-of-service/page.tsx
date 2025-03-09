import React from "react";

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-20 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-white text-center">
        Terms of Service
      </h1>

      <div className="bg-purple-900/20 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 shadow-xl shadow-purple-900/20 text-purple-100">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            1. Introduction
          </h2>
          <p className="mb-4">
            Welcome to Alikeevich's portfolio website. By accessing or using
            this website, you agree to be bound by these Terms of Service. If
            you disagree with any part of these terms, please do not use my
            website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            2. Intellectual Property
          </h2>
          <p className="mb-4">
            The content on this website, including but not limited to text,
            graphics, logos, images, audio clips, digital downloads, and
            software, is owned by me or my licensors and is protected by
            copyright and other intellectual property laws.
          </p>
          <p>
            You may view, download, and print content from this website for your
            personal, non-commercial use only, provided that you do not modify
            the content and that you retain all copyright and other proprietary
            notices.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            3. User Conduct
          </h2>
          <p className="mb-4">When using this website, you agree not to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Use the website in any way that violates any applicable laws or
              regulations
            </li>
            <li>
              Attempt to interfere with the proper functioning of the website
            </li>
            <li>
              Engage in any conduct that restricts or inhibits anyone's use or
              enjoyment of the website
            </li>
            <li>Use the website to transmit any harmful code or material</li>
            <li>
              Attempt to gain unauthorized access to any portion of the website
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            4. Contact Form
          </h2>
          <p className="mb-4">
            When you use the contact form on this website, you agree to provide
            accurate and complete information. I reserve the right to refuse
            service, terminate accounts, or cancel submissions at my discretion.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            5. Disclaimer
          </h2>
          <p className="mb-4">
            This website and its content are provided "as is" and "as available"
            without any warranties of any kind, either express or implied,
            including but not limited to the implied warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement.
          </p>
          <p>
            I do not warrant that the website will be uninterrupted or
            error-free, that defects will be corrected, or that the website or
            the server that makes it available are free of viruses or other
            harmful components.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            6. Limitation of Liability
          </h2>
          <p>
            In no event shall I be liable for any direct, indirect, incidental,
            special, consequential, or punitive damages arising out of or
            relating to your use of, or inability to use, this website or its
            content, whether based on warranty, contract, tort, or any other
            legal theory, and whether or not I have been advised of the
            possibility of such damages.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">
            7. Changes to These Terms
          </h2>
          <p>
            I reserve the right to modify these Terms of Service at any time.
            Any changes will be effective immediately upon posting the updated
            terms on this website. Your continued use of the website after any
            such changes constitutes your acceptance of the new Terms of
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-white">8. Contact</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact me at alikkenzheb@gmail.com.
          </p>
        </section>
      </div>
    </div>
  );
}
