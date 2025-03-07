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

        <ol className="list-decimal pl-5 space-y-2">
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
            provider)
          </li>

          <li>
            Create a new Email Template with the following variables:
            <ul className="list-disc pl-5 mt-1">
              <li>
                <code className="bg-purple-800/50 px-1 rounded">from_name</code>{" "}
                - Sender's name
              </li>
              <li>
                <code className="bg-purple-800/50 px-1 rounded">
                  from_email
                </code>{" "}
                - Sender's email
              </li>
              <li>
                <code className="bg-purple-800/50 px-1 rounded">message</code> -
                Message content
              </li>
              <li>
                <code className="bg-purple-800/50 px-1 rounded">to_email</code>{" "}
                - Your email (alikkenzheb@gmail.com)
              </li>
            </ul>
          </li>

          <li>Get your EmailJS User ID, Service ID, and Template ID</li>

          <li>
            Update the{" "}
            <code className="bg-purple-800/50 px-1 rounded">.env.local</code>{" "}
            file with your credentials:
            <pre className="bg-purple-800/30 p-2 rounded mt-1 overflow-x-auto">
              EMAILJS_SERVICE_ID=your_service_id_here
              EMAILJS_TEMPLATE_ID=your_template_id_here
              EMAILJS_USER_ID=your_user_id_here
            </pre>
          </li>
        </ol>

        <p className="text-yellow-300">
          Important: Keep your EmailJS credentials private and never commit them
          to public repositories.
        </p>
      </div>
    </Card>
  );
};

export default EmailSetupInstructions;
