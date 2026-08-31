"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { MESSAGE_STATUSES, type MessageStatus } from "./types";

const MESSAGES_PATH = "/dashboard/messages";

export type MessageActionResult =
  | { success: true }
  | { success: false; error: string };

function toMessage(error: { code?: string; message: string }, fallback: string) {
  if (error.code === "42501" || /row-level security/i.test(error.message)) {
    return "You don't have permission to manage messages.";
  }

  return error.message || fallback;
}

export async function setMessageStatus(
  messageId: string,
  status: MessageStatus,
): Promise<MessageActionResult> {
  if (!MESSAGE_STATUSES.includes(status)) {
    return { success: false, error: "Invalid message status." };
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_messages")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", messageId);

  if (error) {
    console.error("Failed to update message status:", error);
    return { success: false, error: toMessage(error, "Failed to update message.") };
  }

  revalidatePath(MESSAGES_PATH);
  revalidatePath(`${MESSAGES_PATH}/${messageId}`);

  return { success: true };
}

/** Bump NEW -> READ the first time a message is opened. Never downgrades. */
export async function markMessageRead(
  messageId: string,
): Promise<MessageActionResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_messages")
    .update({ status: "READ", updated_at: new Date().toISOString() })
    .eq("id", messageId)
    .eq("status", "NEW");

  if (error) {
    console.error("Failed to mark message read:", error);
    return { success: false, error: toMessage(error, "Failed to update message.") };
  }

  revalidatePath(MESSAGES_PATH);
  revalidatePath(`${MESSAGES_PATH}/${messageId}`);

  return { success: true };
}

export async function deleteMessage(
  messageId: string,
): Promise<MessageActionResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", messageId);

  if (error) {
    console.error("Failed to delete message:", error);
    return { success: false, error: toMessage(error, "Failed to delete message.") };
  }

  revalidatePath(MESSAGES_PATH);

  return { success: true };
}
