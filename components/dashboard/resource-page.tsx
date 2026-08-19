import type { LucideIcon } from "lucide-react";

interface ResourcePageProps {
  eyebrow: string;
  title: string;
  description: string;
  emptyMessage: string;
  icon: LucideIcon;
}

export function ResourcePage({
  eyebrow,
  title,
  description,
  emptyMessage,
  icon: Icon,
}: ResourcePageProps) {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          {description}
        </p>
      </section>

      <section className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-6 text-center shadow-sm">
        <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-5" />
        </div>
        <p className="mt-4 text-sm font-medium">Nothing here yet</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{emptyMessage}</p>
      </section>
    </div>
  );
}
