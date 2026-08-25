"use client";

import { useRouter } from "next/navigation";

import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { deleteProduct } from "@/lib/products/actions";

interface ProjectDeleteActionProps {
  projectId: string;
  projectTitle: string;
}

export function ProjectDeleteAction({
  projectId,
  projectTitle,
}: ProjectDeleteActionProps) {
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteProduct(projectId);

    if (result.success) {
      router.push("/dashboard/products");
      router.refresh();
    }

    return result;
  }

  return (
    <DeleteConfirmDialog
      title="Delete project?"
      description={`This will permanently delete "${projectTitle}" and its associated images. This action cannot be undone.`}
      actionLabel="Delete project"
      successMessage="Project deleted successfully."
      onConfirm={handleDelete}
    />
  );
}
