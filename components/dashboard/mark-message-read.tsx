"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { markMessageRead } from "@/lib/messages/actions";

/**
 * Fire-and-forget: promotes a NEW message to READ the first time its detail
 * page is viewed. Renders nothing.
 */
export function MarkMessageRead({ messageId }: { messageId: string }) {
  const router = useRouter();
  const done = useRef(false);

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    void markMessageRead(messageId).then((result) => {
      if (result.success) router.refresh();
    });
  }, [messageId, router]);

  return null;
}
