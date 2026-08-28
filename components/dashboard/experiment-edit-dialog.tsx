 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { updateExperiment } from "@/lib/experiments/actions";
import { ExperimentForm } from "./experiment-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ExperimentEditDialogProps {
  experiment: {
    id: string;
    title: string;
    slug: string;
    summary: string;
    content: string | null;
    cover_image_url: string | null;
    status: string;
    featured: boolean;
  };
}

export function ExperimentEditDialog({
  experiment,
}: ExperimentEditDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function action(formData: FormData) {
    await updateExperiment(experiment.id, formData);
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Lab</DialogTitle>
        </DialogHeader>

        <ExperimentForm
          action={action}
          submitLabel="Save changes"
          initial={experiment}
        />
      </DialogContent>
    </Dialog>
  );
}
