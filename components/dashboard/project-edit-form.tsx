"use client";

import { useRouter } from "next/navigation";

import { ProjectForm } from "@/components/dashboard/project-form";
import { updateProject } from "@/lib/projects/actions";
import type { Project } from "@/lib/projects/types";

interface ProjectEditFormProps {
  project: Project;
}

export function ProjectEditForm({ project }: ProjectEditFormProps) {
  const router = useRouter();

  const action = updateProject.bind(null, project.id);

  return (
    <ProjectForm
      action={action}
      submitLabel="Save changes"
      pendingLabel="Saving..."
      showContentFields
      initialValues={{
        title: project.title,
        description: project.description,
        client_name: project.client_name,
        website_url: project.website_url,
        content: project.content,
        cover_image_url: project.cover_image_url,
        status: project.status,
        featured: project.featured,
      }}
      onSuccess={() => {
        router.push(`/dashboard/projects/${project.id}`);
        router.refresh();
      }}
    />
  );
}
