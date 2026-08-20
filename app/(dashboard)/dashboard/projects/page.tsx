import { FolderKanban, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ProjectCreateDialog } from "@/components/dashboard/project-create-dialog";
import { getProjects } from "@/lib/projects/queries";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="w-full min-w-0 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            Workspace
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight">
            Projects
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage the projects you are building at Rove Addis Labs.
          </p>
        </div>

        <ProjectCreateDialog />
      </div>

      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input placeholder="Search projects..." className="pl-9" />
      </div>

      <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/dashboard/projects/${project.id}`}
            className="block min-w-0 rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-start justify-between">
              <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <FolderKanban className="size-5" />
              </div>

              <span className="rounded-full bg-muted px-2 py-1 text-xs">
                {project.status}
              </span>
            </div>

            <h2 className="mt-5 truncate font-semibold">{project.title}</h2>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
