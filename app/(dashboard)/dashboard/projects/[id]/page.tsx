import { notFound } from "next/navigation";

import { getProjectById } from "@/lib/projects/queries";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Project
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {project.title}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {project.description}
        </p>
      </div>

      <Button>
        <Link
          href={`/dashboard/projects/${project.id}/edit`}
          className="flex items-center gap-2"
        >
          <Pencil className="size-4" />
          Edit project
        </Link>
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 lg:col-span-2">
          <h2 className="font-semibold">Overview</h2>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
            {project.content || project.description}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold">Project details</h2>

          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="mt-1 font-medium">{project.status}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Client</dt>
              <dd className="mt-1 font-medium">{project.client_name || "—"}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Slug</dt>
              <dd className="mt-1 break-all font-medium">{project.slug}</dd>
            </div>

            <div>
              <dt className="text-muted-foreground">Featured</dt>
              <dd className="mt-1 font-medium">
                {project.featured ? "Yes" : "No"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
