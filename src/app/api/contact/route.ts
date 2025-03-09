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

    // Log environment variables (redacted for security)
    console.log("EmailJS Config:", {
      service_id: process.env.EMAILJS_SERVICE_ID ? "[SET]" : "[NOT SET]",
      template_id: process.env.EMAILJS_TEMPLATE_ID ? "[SET]" : "[NOT SET]",
      public_key: process.env.EMAILJS_PUBLIC_KEY ? "[SET]" : "[NOT SET]",
    });

    // Prepare request payload
    const emailJsPayload = {
      service_id: process.env.EMAILJS_SERVICE_ID || "service_portfolio",
      template_id: process.env.EMAILJS_TEMPLATE_ID || "template_contact_form",
      user_id: process.env.EMAILJS_PUBLIC_KEY, // EmailJS expects user_id for server-side calls
      template_params: {
        from_name: name,
        from_email: email,
        message: message,
        to_email: "alikkenzheb@gmail.com",
      },
    };

    // Send email using Email.js service
    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailJsPayload),
      },
    );

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      // Get more detailed error information
      const errorText = await response.text();
      console.error("EmailJS error response:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });

      return NextResponse.json(
        {
          error: "Failed to send email",
          details: errorText,
          status: response.status,
        },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
