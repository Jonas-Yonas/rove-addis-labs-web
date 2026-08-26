"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ProductForm } from "./product-form";
import { createProduct } from "@/lib/products/actions";
import { Plus } from "lucide-react";

export function ProductCreateDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>New product</Button>} />

      <DialogTrigger render={<Button />}>
        <Plus className="size-4" />
        New project
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create product</DialogTitle>
        </DialogHeader>

        <ProductForm
          action={createProduct}
          submitLabel="Create product"
          pendingLabel="Creating..."
          onSuccess={() => {
            setOpen(false);
            router.refresh();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
