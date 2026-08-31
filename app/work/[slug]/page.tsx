import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { ArticleLayout, StatusPill } from "@/components/public/article-layout";
import { Prose } from "@/components/public/prose";
import { getProjectBySlug } from "@/lib/public/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const description = project.description.slice(0, 150);

  return {
    title: project.title,
    description,
    openGraph: { title: project.title, description },
    twitter: { title: project.title, description },
  };
}

function statusLabel(status: string) {
  return status === "IN_PROGRESS" ? "In progress" : "Delivered";
}

export default async function WorkProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <ArticleLayout
      backHref="/work"
      backLabel="All work"
      section="Work"
      meta={
        <>
          <StatusPill>{statusLabel(project.status)}</StatusPill>
          {project.client_name && (
            <span className="text-muted-foreground">
              for {project.client_name}
            </span>
          )}
        </>
      }
      aside={
        <>
          {project.client_name && <p>Client: {project.client_name}</p>}
          <p>{statusLabel(project.status)}</p>
          {project.website_url && (
            <a
              href={project.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-foreground"
            >
              Visit site
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </>
      }
      title={project.title}
      lead={project.description}
      coverUrl={project.cover_image_url}
    >
      {project.content ? (
        <Prose text={project.content} />
      ) : (
        <p className="text-muted-foreground">
          A closer look at this project is coming soon.
        </p>
      )}
    </ArticleLayout>
  );
}
