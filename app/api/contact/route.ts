import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
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

    // Process submission cleanly (Simulate fast server processing or log details)
    console.log("Contact form submission received:", { name, email, message, timestamp: new Date().toISOString() });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for reaching out! Your message has been sent successfully.",
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
