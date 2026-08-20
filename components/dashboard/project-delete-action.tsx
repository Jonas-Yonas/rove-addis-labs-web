"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { deleteProject } from "@/lib/projects/actions";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";

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
    const result = await deleteProject(projectId);

    if (!result.success) {
      toast.error(result.error);
      return;
    }

    toast.success("Project deleted successfully.");

    router.push("/dashboard/projects");
    router.refresh();
  }

  return (
    <ConfirmDialog
      trigger={
        <Button variant="destructive">
          <Trash2 className="size-4" />
          Delete project
        </Button>
      }
      title="Delete project?"
      description={`This will permanently delete "${projectTitle}" and its cover image. This action cannot be undone.`}
      confirmLabel="Delete project"
      destructive
      onConfirm={handleDelete}
    />
  );
}
