 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

import { deleteExperiment } from "@/lib/experiments/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ExperimentDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    setPending(true);

    try {
      const result = await deleteExperiment(id);

      if (!result.success) {
        throw new Error(result.error);
      }

      setOpen(false);
      router.push("/dashboard/labs");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash2 className="mr-2 size-4" />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete this lab?</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground">
          This action cannot be undone. The lab record will be permanently
          removed.
        </p>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>
            {pending ? "Deleting..." : "Delete lab"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
