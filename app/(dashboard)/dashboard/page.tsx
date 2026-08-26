import { ArrowUpRight, FolderKanban, Package, Plus } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { getDashboardStats, getRecentActivity } from "@/lib/dashboard/queries";

function formatActivityDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default async function DashboardPage() {
  const [{ projectCount, productCount }, recentActivity] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(5),
  ]);

  const activity = [
    ...recentActivity.projects.map((project) => ({
      id: project.id,
      title: project.title,
      type: "Project" as const,
      status: project.status,
      href: `/dashboard/projects/${project.id}`,
      createdAt: project.created_at,
    })),
    ...recentActivity.products.map((product) => ({
      id: product.id,
      title: product.name,
      type: "Product" as const,
      status: product.status,
      href: `/dashboard/products/${product.id}`,
      createdAt: product.created_at,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <div className="w-full min-w-0 space-y-8">
      <PageHeader
        eyebrow="Workspace"
        title="Welcome to Rove Addis Labs"
        description="Your workspace for building, managing, and exploring products and projects."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline">
              <Link
                href="/dashboard/projects"
                className="flex items-center gap-2"
              >
                <FolderKanban className="size-4" />
                Projects
              </Link>
            </Button>

            <Button>
              <Link
                href="/dashboard/products"
                className="flex items-center gap-2"
              >
                <Plus className="size-4" />
                Products
              </Link>
            </Button>
          </div>
        }
      />

      <section
        aria-label="Workspace statistics"
        className="grid gap-4 sm:grid-cols-2"
      >
        <Link
          href="/dashboard/projects"
          className="group rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-start justify-between">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <FolderKanban className="size-5" />
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <div className="mt-5">
            <p className="text-sm text-muted-foreground">Projects</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {projectCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Projects in your workspace
            </p>
          </div>
        </Link>

        <Link
          href="/dashboard/products"
          className="group rounded-xl border bg-card p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-muted/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <div className="flex items-start justify-between">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Package className="size-5" />
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>

          <div className="mt-5">
            <p className="text-sm text-muted-foreground">Products</p>
            <p className="mt-1 text-3xl font-semibold tracking-tight">
              {productCount}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Products in your workspace
            </p>
          </div>
        </Link>
      </section>

      <section className="overflow-hidden rounded-xl border bg-card shadow-sm">
        <div className="flex items-center justify-between gap-4 border-b p-5 sm:p-6">
          <div>
            <h2 className="text-lg font-semibold">Recent activity</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your latest projects and products.
            </p>
          </div>

          <span className="hidden text-xs text-muted-foreground sm:block">
            Latest 5
          </span>
        </div>

        {activity.length === 0 ? (
          <div className="flex min-h-48 flex-col items-center justify-center px-6 text-center">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <FolderKanban className="size-5 text-muted-foreground" />
            </div>
            <p className="mt-3 text-sm font-medium">No activity yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Create a project or product to get started.
            </p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm">
                <Link href="/dashboard/projects">Create project</Link>
              </Button>
              <Button size="sm">
                <Link href="/dashboard/products">Create product</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="divide-y">
            {activity.map((item) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.href}
                className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none sm:px-6"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                    {item.type === "Project" ? (
                      <FolderKanban className="size-4" />
                    ) : (
                      <Package className="size-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium group-hover:underline">
                      {item.title}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {item.type}
                      </span>
                      <span
                        aria-hidden="true"
                        className="text-xs text-muted-foreground"
                      >
                        ·
                      </span>
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden text-xs text-muted-foreground sm:block">
                    {formatActivityDate(item.createdAt)}
                  </span>
                  <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
