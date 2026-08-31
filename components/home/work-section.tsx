import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { getPublicProjects } from "@/lib/public/queries";

function statusLabel(status: string) {
  return status === "IN_PROGRESS" ? "In progress" : "Delivered";
}

export async function WorkSection() {
  const projects = await getPublicProjects();

  if (projects.length === 0) return null;

  const [feature, ...rest] = projects;
  const more = rest.slice(0, 2);

  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Selected work
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Building for the real world.
          </h2>
        </div>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent"
        >
          View all work
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <Link
        href={`/work/${feature.slug}`}
        className="group mt-14 block overflow-hidden rounded-2xl border transition-colors hover:border-accent/40"
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-64 bg-muted lg:min-h-96">
            {feature.cover_image_url ? (
              <Image
                src={feature.cover_image_url}
                alt=""
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(40,181,177,0.2),transparent_55%)]" />
            )}
          </div>

          <div className="flex flex-col justify-between gap-8 p-8 sm:p-12">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                <span>{statusLabel(feature.status)}</span>
                {feature.client_name && (
                  <>
                    <span className="text-border">•</span>
                    <span>{feature.client_name}</span>
                  </>
                )}
              </div>

              <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {feature.title}
              </h3>

              <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-medium text-accent">
              View project
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </div>
        </div>
      </Link>

      {more.length > 0 && (
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {more.map((project) => (
            <Link
              key={project.id}
              href={`/work/${project.slug}`}
              className="group flex items-start justify-between gap-4 rounded-2xl border p-6 transition-colors hover:border-accent/40"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  <span>{statusLabel(project.status)}</span>
                  {project.client_name && (
                    <>
                      <span className="text-border">•</span>
                      <span>{project.client_name}</span>
                    </>
                  )}
                </div>
                <h3 className="mt-2 font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
