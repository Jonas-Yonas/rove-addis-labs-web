"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SelectField } from "@/components/ui/select";
import { setMessageStatus } from "@/lib/messages/actions";
import { MESSAGE_STATUSES, type MessageStatus } from "@/lib/messages/types";

const OPTIONS = MESSAGE_STATUSES.map((status) => ({
  value: status,
  label: status.charAt(0) + status.slice(1).toLowerCase(),
}));

export function MessageStatusSelect({
  messageId,
  status,
}: {
  messageId: string;
  status: MessageStatus;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(next: string) {
    if (next === status) return;

    startTransition(async () => {
      const result = await setMessageStatus(messageId, next as MessageStatus);

      if (!result.success) {
        toast.error(result.error);
        return;
      }

      toast.success("Status updated.");
      router.refresh();
    });
  }

  return (
    <SelectField
      size="lg"
      value={status}
      onValueChange={handleChange}
      options={OPTIONS}
      disabled={isPending}
      aria-label="Message status"
      className="w-40"
    />
  );
}
