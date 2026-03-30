"use server";

import { Resend } from "resend";

import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { LeadNotification } from "@/emails/lead-notification";
import { LeadConfirmation } from "@/emails/lead-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? "hello@creatinsystems.com";
const SENDER = "Creatin Systems <noreply@creatinsystems.com>";

export type ContactResult = { success: true } | { success: false; error: string };

export async function submitContact(data: ContactFormData): Promise<ContactResult> {
  /* ── Server-side validation (never trust the client) ───── */
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.errors[0];
    return { success: false, error: firstError?.message ?? "Invalid form data" };
  }

  const { name, email, company, headache } = parsed.data;
  const submittedAt = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  });

  try {
    /* ── Send lead notification to agency ──────────────────── */
    const { error: notifError } = await resend.emails.send({
      from: SENDER,
      to: [AGENCY_EMAIL],
      subject: `New Lead: ${name} — ${email}`,
      react: LeadNotification({ name, email, company, headache, submittedAt }),
    });

    if (notifError) {
      console.error("Resend notification error:", notifError);
      return { success: false, error: "Failed to send your request. Please try again." };
    }

    /* ── Send confirmation auto-reply to submitter ─────────── */
    const { error: confirmError } = await resend.emails.send({
      from: SENDER,
      to: [email],
      subject: "We received your audit request — Creatin Systems",
      react: LeadConfirmation({ name }),
    });

    if (confirmError) {
      // Non-critical: agency already got the lead, just log the error
      console.error("Resend confirmation error:", confirmError);
    }

    return { success: true };
  } catch (err) {
    console.error("Unexpected error in submitContact:", err);
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}
