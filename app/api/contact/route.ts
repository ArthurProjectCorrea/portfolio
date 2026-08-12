import { NextResponse } from "next/server";
import { Resend } from "resend";

import { socialLinks } from "@/data/socials";
import { isValidEmail } from "@/lib/validation";

interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const emailSocial = socialLinks.find((social) => social.id === "email");
if (!emailSocial?.href) {
  throw new Error(
    "Contact recipient email is not configured in data/socials.ts",
  );
}
const CONTACT_RECIPIENT = emailSocial.href.replace("mailto:", "");
const CONTACT_SENDER = "Portfolio Contact <onboarding@resend.dev>";

function validate(payload: Partial<ContactPayload>): string | null {
  if (!payload.name?.trim()) return "name";
  if (!payload.email?.trim() || !isValidEmail(payload.email.trim())) {
    return "email";
  }
  if (!payload.message?.trim() || payload.message.trim().length < 10) {
    return "message";
  }
  return null;
}

/**
 * Never trusts the client's own validation — a request could reach this
 * route without ever going through the form's UI.
 */
export async function POST(request: Request) {
  const payload = (await request
    .json()
    .catch(() => null)) as Partial<ContactPayload> | null;

  if (!payload) {
    return NextResponse.json(
      { ok: false, error: "invalid_payload" },
      { status: 400 },
    );
  }

  const invalidField = validate(payload);
  if (invalidField) {
    return NextResponse.json(
      { ok: false, error: invalidField },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "not_configured" },
      { status: 500 },
    );
  }

  const { name, email, subject, message } = payload as ContactPayload;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: CONTACT_SENDER,
      to: CONTACT_RECIPIENT,
      replyTo: email.trim(),
      subject: subject?.trim()
        ? `Portfolio contact: ${subject.trim()}`
        : `Portfolio contact from ${name.trim()}`,
      text: `Name: ${name.trim()}\nEmail: ${email.trim()}\nSubject: ${subject?.trim() || "(none)"}\n\n${message.trim()}`,
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: "send_failed" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "send_failed" },
      { status: 502 },
    );
  }
}
