"use client";

import { useRouter } from "next/navigation";

import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { deleteTag } from "@/lib/tags/actions";

interface TagDeleteActionProps {
  tagId: string;
  tagName: string;
}

export function TagDeleteAction({ tagId, tagName }: TagDeleteActionProps) {
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteTag(tagId);

    if (result.success) {
      router.refresh();
    }

    return result;
  }

  return (
    <DeleteConfirmDialog
      title="Delete Tag?"
      description={`This permanently deletes "${tagName}" and removes it from any posts. This action cannot be undone.`}
      actionLabel="Delete tag"
      triggerLabel="Delete"
      triggerSize="sm"
      successMessage="Tag deleted."
      onConfirm={handleDelete}
    />
  );
}
