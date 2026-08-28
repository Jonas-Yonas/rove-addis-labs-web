 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { createExperiment } from "@/lib/experiments/actions";
import { ExperimentForm } from "./experiment-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ExperimentCreateDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function action(formData: FormData) {
    const result = await createExperiment(formData);

    if (!result.success) throw new Error(result.error);
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          New Lab
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Lab</DialogTitle>
        </DialogHeader>

        <ExperimentForm action={action} submitLabel="Create Lab" />
      </DialogContent>
    </Dialog>
  );
}
