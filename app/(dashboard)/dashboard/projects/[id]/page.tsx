import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";

import { getProjectById } from "@/lib/projects/queries";
import { Button } from "@/components/ui/button";
import { ProjectCoverImage } from "@/components/dashboard/project-cover-image";
import { ProjectDeleteAction } from "@/components/dashboard/project-delete-action";

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
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
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

        <div className="flex items-center gap-3">
          <Button>
            <Link
              href={`/dashboard/projects/${project.id}/edit`}
              className="flex items-center gap-2"
            >
              <Pencil className="size-4" />
              Edit project
            </Link>
          </Button>

          <ProjectDeleteAction
            projectId={project.id}
            projectTitle={project.title}
          />
        </div>
      </div>

      {/* Cover image */}
      <ProjectCoverImage
        src={project.cover_image_url}
        alt={`${project.title} cover image`}
      />

      {/* Content + details */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Project content */}
        <div className="rounded-xl border bg-card p-6 lg:col-span-2">
          <h2 className="font-semibold">About the project</h2>

          {project.content ? (
            <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
              {project.content}
            </div>
          ) : (
            <div className="mt-4 rounded-lg border border-dashed p-6 text-center">
              <p className="text-sm font-medium">No project content yet</p>

              <p className="mt-1 text-sm text-muted-foreground">
                Add detailed project information from Edit Project.
              </p>

              <Button variant="outline" className="mt-4">
                <Link href={`/dashboard/projects/${project.id}/edit`}>
                  Add project content
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Project details */}
        <div className="rounded-xl border bg-card p-6">
          <h2 className="font-semibold">Project details</h2>

          <dl className="mt-4 space-y-4 text-sm">
            <div>
              <dt className="text-muted-foreground">Status</dt>
              <dd className="mt-1 font-medium">
                {project.status.replace("_", " ")}
              </dd>
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

            <div>
              <dt className="text-muted-foreground">Website</dt>

              <dd className="mt-1">
                {project.website_url ? (
                  <a
                    href={project.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                  >
                    Visit website
                    <ExternalLink className="size-3.5" />
                  </a>
                ) : (
                  <span className="font-medium">—</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
