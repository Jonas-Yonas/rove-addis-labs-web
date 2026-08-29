"use client";

import { useRouter } from "next/navigation";

import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { deleteCategory } from "@/lib/categories/actions";

interface CategoryDeleteActionProps {
  categoryId: string;
  categoryName: string;
}

export function CategoryDeleteAction({
  categoryId,
  categoryName,
}: CategoryDeleteActionProps) {
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteCategory(categoryId);

    if (result.success) {
      router.refresh();
    }

    return result;
  }

  return (
    <DeleteConfirmDialog
      title="Delete category?"
      description={`This permanently deletes "${categoryName}". This action cannot be undone.`}
      actionLabel="Delete category"
      triggerLabel="Delete"
      triggerSize="sm"
      successMessage="Category deleted."
      onConfirm={handleDelete}
    />
  );
}
