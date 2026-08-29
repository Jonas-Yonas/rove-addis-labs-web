import { FolderKanban } from "lucide-react";

import { ProjectCreateDialog } from "@/components/dashboard/project-create-dialog";
import { getProjects } from "@/lib/projects/queries";
import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { ProjectFilters } from "@/components/dashboard/project-filters";
import { Pagination } from "@/components/shared/pagination";

interface ProjectsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const status = params.status ?? "ALL";

  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const projects = await getProjects({
    search,
    status,
    page,
    pageSize: 9,
  });

  return (
    <div className="w-full min-w-0 space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Projects"
        description="Manage the projects you are building at Rove Addis Labs."
        action={<ProjectCreateDialog />}
      />

      <ProjectFilters search={search} status={status} />

      {projects.data.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="No projects yet"
          description="Create your first project to start building your portfolio."
        />
      ) : (
        <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.data.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/projects/${project.id}`}
              className="block min-w-0 rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <FolderKanban className="size-5" />
                </div>

                <StatusBadge status={project.status} />
              </div>

              <h2 className="mt-5 truncate font-semibold">{project.title}</h2>

              <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                {project.description}
              </p>
            </Link>
          ))}
        </div>
      )}

      <Pagination
        page={projects.page}
        pageSize={projects.pageSize}
        totalItems={projects.count}
        noun="projects"
      />
    </div>
  );
}
