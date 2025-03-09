import React from "react";
import { Card } from "./ui/card";

const EmailSetupInstructions = () => {
  return (
    <Card className="p-6 bg-purple-900/20 border-purple-500/30 text-white max-w-3xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Email Setup Instructions</h2>

      <div className="space-y-4">
        <p>
          To make the contact form send emails to your address, follow these
          steps:
        </p>

        <ol className="list-decimal pl-5 space-y-4">
          <li>
            Create a free account at{" "}
            <a
              href="https://www.emailjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-300 underline"
            >
              EmailJS
            </a>
          </li>

          <li>
            Create a new Email Service (connect your Gmail or other email
            provider):
            <ul className="list-disc pl-5 mt-1 text-purple-200">
              <li>Go to "Email Services" tab in your EmailJS dashboard</li>
              <li>Click "Add New Service" and select your email provider</li>
              <li>Follow the authentication steps to connect your account</li>
              <li>
                Note down the <strong>Service ID</strong> for later use
              </li>
            </ul>
          </li>

          <li>
            Create a new Email Template with the following variables:
            <ul className="list-disc pl-5 mt-1 text-purple-200">
              <li>
                Go to "Email Templates" tab and click "Create New Template"
              </li>
              <li>Design your email template with a subject line and body</li>
              <li>
                Add these variables to your template (use the {{ variable }}{" "}
                syntax):
              </li>
              <li>
                <code className="bg-purple-800/50 px-1 rounded">
                  {{ from_name }}
                </code>{" "}
                - Sender's name
              </li>
              <li>
                <code className="bg-purple-800/50 px-1 rounded">
                  {{ from_email }}
                </code>{" "}
                - Sender's email
              </li>
              <li>
                <code className="bg-purple-800/50 px-1 rounded">
                  {{ message }}
                </code>{" "}
                - Message content
              </li>
              <li>
                <code className="bg-purple-800/50 px-1 rounded">
                  {{ to_email }}
                </code>{" "}
                - Your email (alikkenzheb@gmail.com)
              </li>
              <li>
                Save the template and note down the <strong>Template ID</strong>
              </li>
            </ul>
          </li>

          <li>
            Get your EmailJS credentials:
            <ul className="list-disc pl-5 mt-1 text-purple-200">
              <li>
                <strong>Service ID</strong>: Found in the Email Services tab
              </li>
              <li>
                <strong>Template ID</strong>: Found in the Email Templates tab
              </li>
              <li>
                <strong>Public Key</strong>: Found in the Account tab → API Keys
                section
              </li>
            </ul>
          </li>

          <li>
            Update the{" "}
            <code className="bg-purple-800/50 px-1 rounded">.env.local</code>{" "}
            file with your credentials:
            <pre className="bg-purple-800/30 p-2 rounded mt-1 overflow-x-auto">
              NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
              NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
              NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
            </pre>
          </li>

          <li>
            Verify the API route configuration:
            <ul className="list-disc pl-5 mt-1 text-purple-200">
              <li>
                Check that{" "}
                <code className="bg-purple-800/50 px-1 rounded">
                  src/app/api/contact/route.ts
                </code>{" "}
                has the correct environment variable names
              </li>
              <li>
                Ensure the{" "}
                <code className="bg-purple-800/50 px-1 rounded">to_email</code>{" "}
                value in the template parameters matches your email
              </li>
            </ul>
          </li>
        </ol>

        <div className="bg-purple-800/30 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold mb-2 text-purple-200">
            Troubleshooting
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-purple-200">
            <li>
              If you see "Failed to send email" errors, check your browser's
              developer tools (Network tab) for more details
            </li>
            <li>
              Verify that all environment variables are correctly set and match
              your EmailJS credentials
            </li>
            <li>
              Make sure your EmailJS service is active and not in a
              trial/limited state
            </li>
            <li>
              Test your template directly in the EmailJS dashboard to ensure it
              works
            </li>
            <li>
              Check that your email service (Gmail, etc.) isn't blocking the
              EmailJS connection
            </li>
          </ul>
        </div>

        <p className="text-yellow-300 mt-4">
          Important: Keep your EmailJS credentials private and never commit them
          to public repositories.
        </p>
      </div>
    </Card>
  );
};

export default EmailSetupInstructions;
