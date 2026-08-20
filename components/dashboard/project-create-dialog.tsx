"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { createProject } from "@/lib/projects/actions";
import { ProjectForm } from "@/components/dashboard/project-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ProjectCreateDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <Plus className="size-4" />
          New project
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create project</DialogTitle>

          <DialogDescription>
            Add a new project to your Rove Addis Labs workspace.
          </DialogDescription>
        </DialogHeader>

        <ProjectForm
          action={createProject}
          submitLabel="Create project"
          pendingLabel="Creating..."
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
