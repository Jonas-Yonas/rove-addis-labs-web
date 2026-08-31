import { createClient } from "@/lib/supabase/server";

import type { ContactMessage } from "./types";

export { MESSAGE_STATUSES } from "./types";
export type { ContactMessage, MessageStatus } from "./types";

const MESSAGE_SELECT =
  "id, name, email, company, subject, message, status, created_at, updated_at";

export interface GetMessagesOptions {
  search?: string;
  status?: string;
  page?: number;
  pageSize?: number;
}

export async function getMessages({
  search,
  status = "ALL",
  page = 1,
  pageSize = 10,
}: GetMessagesOptions = {}) {
  const supabase = await createClient();

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("contact_messages")
    .select(MESSAGE_SELECT, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search?.trim()) {
    const value = search.trim();

    query = query.or(
      `name.ilike.%${value}%,email.ilike.%${value}%,subject.ilike.%${value}%`,
    );
  }

  if (status && status !== "ALL") {
    query = query.eq("status", status);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Failed to fetch messages:", error);
    throw new Error("Failed to fetch messages.");
  }

  return {
    data: (data ?? []) as ContactMessage[],
    count: count ?? 0,
    page,
    pageSize,
  };
}

export async function getMessageById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact_messages")
    .select(MESSAGE_SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch message:", error);
    throw new Error("Failed to fetch message.");
  }

  return data as ContactMessage | null;
}

/** Count of messages still awaiting a first read. */
export async function getNewMessageCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("contact_messages")
    .select("id", { count: "exact", head: true })
    .eq("status", "NEW");

  if (error) {
    console.error("Failed to count new messages:", error);
    return 0;
  }

  return count ?? 0;
}
