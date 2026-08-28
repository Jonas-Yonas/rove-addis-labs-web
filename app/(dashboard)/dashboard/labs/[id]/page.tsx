import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FlaskConical } from "lucide-react";

import { ExperimentDeleteButton } from "@/components/dashboard/experiment-delete-button";
import { ExperimentEditDialog } from "@/components/dashboard/experiment-edit-dialog";
import { StatusBadge } from "@/components/shared/status-badge";
import { getExperimentById } from "@/lib/experiments/queries";

export default async function LabDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const experiment = await getExperimentById(id);

  if (!experiment) {
    return (
      <div className="space-y-6">
        <Link
          href="/dashboard/labs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Labs
        </Link>

        <div className="rounded-xl border p-8 text-center">
          <h1 className="text-xl font-semibold">Lab not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The requested experiment does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      <Link
        href="/dashboard/labs"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to Labs
      </Link>

      <section className="overflow-hidden rounded-xl border bg-card">
        {experiment.cover_image_url ? (
          <div className="relative aspect-16/6 bg-muted">
            <Image
              src={experiment.cover_image_url}
              alt={`${experiment.title} cover`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="flex aspect-16/6 items-center justify-center bg-muted">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <FlaskConical className="size-8" />
              <span className="text-sm">No cover image</span>
            </div>
          </div>
        )}

        <div className="space-y-6 p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={experiment.status} />
                {experiment.featured && (
                  <span className="text-xs font-medium text-muted-foreground">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                {experiment.title}
              </h1>

              <p className="mt-2 max-w-3xl text-base leading-7 text-muted-foreground">
                {experiment.summary}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <ExperimentEditDialog experiment={experiment} />
              <ExperimentDeleteButton id={experiment.id} />
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-semibold">About this experiment</h2>

            {experiment.content ? (
              <div className="mt-3 max-w-3xl whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                {experiment.content}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted-foreground">
                No additional content has been added yet.
              </p>
            )}
          </div>

          <div className="grid gap-4 border-t pt-6 text-sm sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground">Slug</p>
              <p className="mt-1 font-medium">{experiment.slug}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Created</p>
              <p className="mt-1 font-medium">
                {new Intl.DateTimeFormat("en", {
                  dateStyle: "medium",
                }).format(new Date(experiment.created_at))}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
