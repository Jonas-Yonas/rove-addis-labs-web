import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ProjectEditForm } from "@/components/dashboard/project-edit-form";
import { getProjectById } from "@/lib/projects/queries";

interface ProjectEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectEditPage({
  params,
}: ProjectEditPageProps) {
  const { id } = await params;

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      <div>
        <Button variant="ghost" size="sm">
          <Link href={`/dashboard/projects/${project.id}`}>
            <ArrowLeft className="size-4" />
            Back to project
          </Link>
        </Button>

        <div className="mt-4">
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Project
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Edit {project.title}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Update project information and content.
          </p>
        </div>
      </div>

      <div className="max-w-3xl rounded-xl border bg-card p-6">
        <ProjectEditForm project={project} />
      </div>
    </div>
  );
}
