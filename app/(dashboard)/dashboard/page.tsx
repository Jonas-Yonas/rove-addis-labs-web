import {
  ArrowUpRight,
  FlaskConical,
  FolderKanban,
  Package,
} from "lucide-react";

const stats = [
  {
    label: "Projects",
    value: "0",
    description: "Active projects",
    icon: FolderKanban,
  },
  {
    label: "Products",
    value: "0",
    description: "Products in development",
    icon: Package,
  },
  {
    label: "Experiments",
    value: "0",
    description: "Lab experiments",
    icon: FlaskConical,
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1600px] space-y-6">
      <section>
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          Workspace
        </p>

        <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Welcome to Rove Addis Labs
            </h2>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
              Your workspace for building, managing, and exploring products and
              experiments.
            </p>
          </div>

          <span className="shrink-0 text-sm text-muted-foreground">
            Overview
          </span>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                  <Icon className="size-5" />
                </div>

                <ArrowUpRight className="size-4 text-muted-foreground" />
              </div>

              <div className="mt-5">
                <p className="text-sm text-muted-foreground">{stat.label}</p>

                <p className="mt-1 text-3xl font-semibold">{stat.value}</p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
        <div>
          <h2 className="text-lg font-semibold">Recent activity</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your latest workspace activity will appear here.
          </p>
        </div>

        <div className="mt-6 flex min-h-32 items-center justify-center rounded-lg border border-dashed sm:min-h-40">
          <p className="text-sm text-muted-foreground">No activity yet.</p>
        </div>
      </section>
    </div>
  );
}
