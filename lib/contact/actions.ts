"use server";

import { createClient } from "@/lib/supabase/server";

export type ContactResult =
  | { success: true }
  | { success: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitContactMessage(
  formData: FormData,
): Promise<ContactResult> {
  // Honeypot — real users never fill a hidden field. Pretend it worked.
  if (String(formData.get("website") ?? "").trim()) {
    return { success: true };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    return {
      success: false,
      error: "Please fill in your name, email, subject, and message.",
    };
  }

  if (!EMAIL_RE.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (name.length > 120 || subject.length > 200 || message.length > 5000) {
    return { success: false, error: "One of the fields is too long." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("contact_messages").insert({
    name,
    email,
    company: company || null,
    subject,
    message,
    status: "NEW",
  });

  if (error) {
    console.error("Failed to submit contact message:", error);

    if (error.code === "42501" || /row-level security/i.test(error.message)) {
      return {
        success: false,
        error:
          "We couldn't send your message right now. Please try again later.",
      };
    }

    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }

  return { success: true };
}
