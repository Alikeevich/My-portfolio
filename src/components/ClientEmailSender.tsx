"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

interface EmailFormData {
  name: string;
  email: string;
  message: string;
}

export const sendEmailFromClient = async (
  formData: EmailFormData,
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Initialize EmailJS with your public key
    emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");

    // Send the email using EmailJS directly from the client
    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "alikkenzheb@gmail.com",
      },
    );

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
};
