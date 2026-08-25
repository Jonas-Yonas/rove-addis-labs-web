import { ArrowLeft, ExternalLink, Pencil, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectDeleteAction } from "@/components/dashboard/project-delete-action";
import { CoverImage } from "@/components/dashboard/cover-image";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { getProjectById } from "@/lib/projects/queries";

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
      {/* Back */}
      <div>
        <Button variant="ghost" size="sm">
          <Link href="/dashboard/projects" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Projects
          </Link>
        </Button>
      </div>

      {/* Project */}
      <div className="overflow-hidden rounded-xl border bg-card">
        {/* Cover */}
        <CoverImage
          src={project.cover_image_url}
          alt={`${project.title} cover image`}
          item="Project"
        />

        {/* Header + content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {project.title}
                </h1>

                <StatusBadge status={project.status} />

                {project.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                    <Star className="size-3 fill-current" />
                    Featured
                  </span>
                )}
              </div>

              <p className="mt-2 text-muted-foreground">
                {project.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-2">
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

          {/* Content */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
            {/* About */}
            <div>
              <h2 className="font-semibold">About this project</h2>

              {project.content ? (
                <div className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                  {project.content}
                </div>
              ) : (
                <div className="mt-3 rounded-lg border border-dashed p-6 text-center">
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

            {/* Details */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <h2 className="font-semibold">Project details</h2>

              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Client</dt>
                  <dd className="mt-1 font-medium">
                    {project.client_name || "—"}
                  </dd>
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
      </div>
    </div>
  );
}
