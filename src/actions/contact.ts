"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { contactSchema, type ContactFormData } from "@/lib/schemas/contact";
import { rateLimit } from "@/lib/rate-limit";
import { LeadNotification } from "@/emails/lead-notification";
import { LeadConfirmation } from "@/emails/lead-confirmation";

const resend = new Resend(process.env.RESEND_API_KEY);

const AGENCY_EMAIL = process.env.AGENCY_EMAIL ?? "hello@creatinsystems.com";
const SENDER = "Creatin Systems <noreply@creatinsystems.com>";

export type ContactResult = { success: true } | { success: false; error: string };

export async function submitContact(data: ContactFormData): Promise<ContactResult> {
  /* ── Rate limiting ──────────────────────────────────────── */
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { limited } = rateLimit(ip);
  if (limited) {
    return {
      success: false,
      error: "Too many requests. Please try again in a minute.",
    };
  }

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
    /* ── Start both emails concurrently ───────────────────── */
    const notifPromise = resend.emails.send({
      from: SENDER,
      to: [AGENCY_EMAIL],
      subject: `New Lead: ${name} — ${email}`,
      react: LeadNotification({ name, email, company, headache, submittedAt }),
    });

    const confirmPromise = resend.emails.send({
      from: SENDER,
      to: [email],
      subject: "We received your audit request — Creatin Systems",
      react: LeadConfirmation({ name }),
    });

    /* ── Only await the critical agency notification ──────── */
    const { error: notifError } = await notifPromise;

    if (notifError) {
      console.error("Resend notification error:", notifError);
      return { success: false, error: "Failed to send your request. Please try again." };
    }

    /* ── Fire-and-forget the auto-reply ───────────────────── */
    confirmPromise
      .then(({ error }) => {
        if (error) console.error("Resend confirmation error:", error);
      })
      .catch((err) => {
        console.error("Resend confirmation unexpected error:", err);
      });

    return { success: true };
  } catch (err) {
    console.error("Unexpected error in submitContact:", err);
    return { success: false, error: "Something went wrong. Please try again later." };
  }
}
