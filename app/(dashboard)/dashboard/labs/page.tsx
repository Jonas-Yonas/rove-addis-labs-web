import Link from "next/link";
import { FlaskConical } from "lucide-react";

import { ExperimentCreateDialog } from "@/components/dashboard/experiment-create-dialog";
import { ExperimentFilters } from "@/components/dashboard/experiment-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { getExperiments } from "@/lib/experiments/queries";

interface LabsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function LabsPage({ searchParams }: LabsPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const status = params.status ?? "ALL";
  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const experiments = await getExperiments({
    search,
    status,
    page,
    pageSize: 9,
  });

  return (
    <div className="w-full min-w-0 space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Labs"
        description="Explore and manage experiments being developed at Rove Addis Labs."
        action={<ExperimentCreateDialog />}
      />

      <ExperimentFilters search={search} status={status} />

      {experiments.data.length === 0 ? (
        <EmptyState
          icon={FlaskConical}
          title={search || status !== "ALL" ? "No labs found" : "No labs yet"}
          description={
            search || status !== "ALL"
              ? "Try adjusting your search or filters."
              : "Create your first lab experiment to start exploring new ideas."
          }
        />
      ) : (
        <>
          <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {experiments.data.map((experiment) => (
              <Link
                key={experiment.id}
                href={`/dashboard/labs/${experiment.id}`}
                className="block min-w-0 rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <FlaskConical className="size-5" />
                  </div>
                  <StatusBadge status={experiment.status} />
                </div>

                <h2 className="mt-5 truncate font-semibold">
                  {experiment.title}
                </h2>

                <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {experiment.summary}
                </p>

                {experiment.featured && (
                  <div className="mt-4 text-xs font-medium text-muted-foreground">
                    Featured
                  </div>
                )}
              </Link>
            ))}
          </div>

          <Pagination
            page={experiments.page}
            pageSize={experiments.pageSize}
            totalItems={experiments.count}
          />
        </>
      )}
    </div>
  );
}
