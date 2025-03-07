import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate the data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 },
      );
    }

    // Send email using Email.js service
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: process.env.EMAILJS_SERVICE_ID || "service_portfolio",
          template_id:
            process.env.EMAILJS_TEMPLATE_ID || "template_contact_form",
          publicKey: process.env.EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY",
          template_params: {
            from_name: name,
            from_email: email,
            message: message,
            to_email: "alikkenzheb@gmail.com",
          },
        }),
      },
    );

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
