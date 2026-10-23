import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !email.includes("@") ||
      !email.includes(".")
    ) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 5 characters long." },
        { status: 400 }
      );
    }

    const serviceId = process.env.EMAILJS_SERVICE_ID || "service_default";
    const templateId = process.env.EMAILJS_TEMPLATE_ID || "template_default";
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || "public_key_default";

    if (process.env.EMAILJS_SERVICE_ID && process.env.EMAILJS_TEMPLATE_ID) {
      const emailjsRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: name,
            from_email: email,
            to_email: "saadkashif770@gmail.com",
            message: message,
            reply_to: email,
          },
        }),
      });

      if (!emailjsRes.ok) {
        const errText = await emailjsRes.text();
        console.error("EmailJS API response error:", errText);
      }
    } else {
      console.log("Contact Form Submission Logged for saadkashif770@gmail.com:", {
        recipient: "saadkashif770@gmail.com",
        from_name: name,
        from_email: email,
        message: message,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been sent successfully to saadkashif770@gmail.com.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form submission:", error);
    return NextResponse.json(
      { success: false, error: "Server error handling message submission." },
      { status: 500 }
    );
  }
}
