"use client";

import { useRouter } from "next/navigation";

import { DeleteConfirmDialog } from "@/components/shared/delete-confirm-dialog";
import { deleteProduct } from "@/lib/products/actions";

interface ProductDeleteActionProps {
  productId: string;
  productName: string;
}

export function ProductDeleteAction({
  productId,
  productName,
}: ProductDeleteActionProps) {
  const router = useRouter();

  async function handleDelete() {
    const result = await deleteProduct(productId);

    if (result.success) {
      router.push("/dashboard/products");
      router.refresh();
    }

    return result;
  }

  return (
    <DeleteConfirmDialog
      title="Delete Product?"
      description={`This will permanently delete "${productName}" and its associated images. This action cannot be undone.`}
      actionLabel="Delete product"
      successMessage="Product deleted successfully."
      onConfirm={handleDelete}
    />
  );
}
