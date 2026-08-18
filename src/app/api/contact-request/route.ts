import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const requiredFields = ["lawyer_id", "user_name", "user_email", "user_phone", "message"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const contactRequest = {
      id: `cr-${Date.now()}`,
      lawyer_id: body.lawyer_id,
      user_name: body.user_name,
      user_email: body.user_email,
      user_phone: body.user_phone,
      message: body.message,
      topic_slug: body.topic_slug || null,
      timestamp: new Date().toISOString(),
      status: "pending",
    };

    console.log("Contact request received:", contactRequest);

    return NextResponse.json({
      success: true,
      message: "Your contact request has been received. The lawyer will reach out to you shortly.",
      request_id: contactRequest.id,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
