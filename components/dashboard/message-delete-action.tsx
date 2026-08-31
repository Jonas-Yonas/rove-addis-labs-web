"use client";

import { useRouter } from "next/navigation";

import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { deleteMessage } from "@/lib/messages/actions";

export function MessageDeleteAction({
  messageId,
  senderName,
}: {
  messageId: string;
  senderName: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteMessage(messageId);

    if (result.success) {
      router.push("/dashboard/messages");
      router.refresh();
    }

    return result;
  }

  return (
    <DeleteConfirmDialog
      title="Delete Message?"
      description={`This permanently deletes the message from ${senderName}. This action cannot be undone.`}
      actionLabel="Delete Message"
      successMessage="Message deleted."
      onConfirm={handleDelete}
    />
  );
}
