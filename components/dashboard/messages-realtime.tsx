"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";

/**
 * Subscribes to new contact_messages and raises an in-app toast + refreshes
 * server data (so the sidebar unread badge updates). Renders nothing.
 * Requires the table to be in the `supabase_realtime` publication.
 */
export function MessagesRealtime() {
  const router = useRouter();
  const [supabase] = useState(() => createClient());

  useEffect(() => {
    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    (async () => {
      // Make sure the realtime connection carries the user's session so RLS
      // lets permitted users receive the INSERT events.
      await supabase.auth.getSession();
      if (cancelled) return;

      channel = supabase
        .channel("contact-messages-inserts")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "contact_messages" },
          (payload) => {
            const row = payload.new as { name?: string; subject?: string };

            toast.message("New message", {
              description: row?.name
                ? `From ${row.name}${row.subject ? ` — ${row.subject}` : ""}`
                : "A new contact message just arrived.",
              action: {
                label: "View",
                onClick: () => router.push("/dashboard/messages"),
              },
            });

            router.refresh();
          },
        )
        .subscribe();
    })();

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
  }, [router, supabase]);

  return null;
}
