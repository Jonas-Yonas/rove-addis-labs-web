import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Briefcase } from "lucide-react";

import { PublicHero } from "@/components/public/public-hero";
import { SectionCta } from "@/components/public/section-cta";
import { getPublicProjects } from "@/lib/public/queries";

export const metadata: Metadata = {
  title: "Work",
  description: "Client projects and software solutions delivered by Rove Addis Labs.",
};

function statusLabel(status: string) {
  return status === "IN_PROGRESS" ? "In progress" : "Delivered";
}

export default async function WorkPage() {
  const projects = await getPublicProjects();

  return (
    <>
      <PublicHero
        eyebrow="Selected work"
        title="Software we've built for the real world."
        description="A growing portfolio of products and solutions delivered for businesses and organizations across Ethiopia and beyond."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {projects.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed py-20 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Briefcase className="size-5" />
            </span>
            <p className="mt-4 font-medium">Nothing to show yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Our project work will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-muted">
                  {project.cover_image_url ? (
                    <Image
                      src={project.cover_image_url}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(40,181,177,0.18),transparent_62%)]" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                    <span>{statusLabel(project.status)}</span>
                    {project.client_name && (
                      <>
                        <span className="text-border">•</span>
                        <span>{project.client_name}</span>
                      </>
                    )}
                  </div>

                  <h2 className="mt-2 text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {project.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {project.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    View project
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <SectionCta
          title="Have a project in mind?"
          description="Tell us what you're trying to build and we'll figure out how to help."
          cta="Start a project"
        />
      </div>
    </>
  );
}
