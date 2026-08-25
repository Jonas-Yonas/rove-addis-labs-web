"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ProductForm } from "./product-form";
import { updateProduct } from "@/lib/products/actions";
import { Pencil } from "lucide-react";

type ProductStatus =
  | "IDEA"
  | "DEVELOPMENT"
  | "BETA"
  | "LIVE"
  | "PAUSED"
  | "ARCHIVED";

interface ProductEditDialogProps {
  product: {
    id: string;
    name: string;
    slug: string;
    tagline: string | null;
    description: string;
    logo_url: string | null;
    cover_image_url: string | null;
    website_url: string | null;
    status: ProductStatus;
    featured: boolean;
  };
}

export function ProductEditDialog({ product }: ProductEditDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="flex items-center gap-2">
            <Pencil />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
        </DialogHeader>

        <ProductForm
          product={product}
          action={updateProduct}
          submitLabel="Save changes"
          pendingLabel="Saving..."
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
