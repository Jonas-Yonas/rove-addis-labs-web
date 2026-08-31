import {
  ArrowUpRight,
  CircleCheckBig,
  FileText,
  FlaskConical,
  FolderKanban,
  Mail,
  Package,
  Plus,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  getDashboardStats,
  getRecentActivity,
  type ActivityType,
} from "@/lib/dashboard/queries";

type Tone = "blue" | "violet" | "amber" | "sky" | "emerald" | "rose";

const TONE: Record<Tone, { chip: string; dot: string }> = {
  blue: {
    chip: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  violet: {
    chip: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
  },
  amber: {
    chip: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  sky: {
    chip: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
    dot: "bg-sky-500",
  },
  emerald: {
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  rose: {
    chip: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    dot: "bg-rose-500",
  },
};

const ACTIVITY_META: Record<ActivityType, { icon: LucideIcon; tone: Tone }> = {
  Project: { icon: FolderKanban, tone: "blue" },
  Product: { icon: Package, tone: "violet" },
  Lab: { icon: FlaskConical, tone: "amber" },
  Post: { icon: FileText, tone: "sky" },
};

function relativeTime(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const minutes = Math.round(diffMs / 60_000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;

  const months = Math.round(days / 30);
  if (months < 12) return `${months}mo ago`;

  return `${Math.round(months / 12)}y ago`;
}

function fullDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

// 950 -> "950", 1_200 -> "1.2K", 3_400_000 -> "3.4M"
function compact(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default async function DashboardPage() {
  const [stats, activity] = await Promise.all([
    getDashboardStats(),
    getRecentActivity(6),
  ]);

  const statCards: {
    label: string;
    value: number;
    hint: string;
    href: string;
    icon: LucideIcon;
    tone: Tone;
  }[] = [
    {
      label: "Projects",
      value: stats.projects,
      hint: "In the workspace",
      href: "/dashboard/projects",
      icon: FolderKanban,
      tone: "blue",
    },
    {
      label: "Products",
      value: stats.products,
      hint: "In the workspace",
      href: "/dashboard/products",
      icon: Package,
      tone: "violet",
    },
    {
      label: "Labs",
      value: stats.labs,
      hint: "Experiments in progress",
      href: "/dashboard/labs",
      icon: FlaskConical,
      tone: "amber",
    },
    {
      label: "Posts",
      value: stats.posts,
      hint: `${stats.draftPosts} draft${stats.draftPosts === 1 ? "" : "s"}`,
      href: "/dashboard/posts",
      icon: FileText,
      tone: "sky",
    },
    {
      label: "Published",
      value: stats.publishedPosts,
      hint: `of ${stats.posts} post${stats.posts === 1 ? "" : "s"}`,
      href: "/dashboard/posts?status=PUBLISHED",
      icon: CircleCheckBig,
      tone: "emerald",
    },
    {
      label: "Messages",
      value: stats.messages,
      hint:
        stats.newMessages > 0 ? `${stats.newMessages} new` : "All caught up",
      href: "/dashboard/messages",
      icon: Mail,
      tone: "rose",
    },
  ];

  const publishedShare =
    stats.posts > 0
      ? Math.round((stats.publishedPosts / stats.posts) * 100)
      : 0;

  const quickActions: { label: string; href: string; tone: Tone }[] = [
    { label: "Write a post", href: "/dashboard/posts", tone: "sky" },
    { label: "Add a project", href: "/dashboard/projects", tone: "blue" },
    { label: "Start a lab", href: "/dashboard/labs", tone: "amber" },
    { label: "Review messages", href: "/dashboard/messages", tone: "rose" },
  ];

  return (
    <div className="w-full min-w-0 space-y-8">
      <PageHeader
        eyebrow="Workspace"
        title="Overview"
        description="Everything happening across Rove Addis Labs at a glance."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" render={<Link href="/dashboard/labs" />}>
              <FlaskConical className="size-4" />
              Labs
            </Button>
            <Button render={<Link href="/dashboard/posts" />}>
              <Plus className="size-4" />
              New Post
            </Button>
          </div>
        }
      />

      {stats.newMessages > 0 && (
        <Link
          href="/dashboard/messages"
          className="group flex items-center justify-between gap-4 rounded-xl border border-blue-300/60 bg-blue-500/5 p-4 text-blue-900 transition-colors hover:bg-blue-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:border-blue-900/70 dark:text-blue-200"
        >
          <span className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400">
              <Mail className="size-4" />
            </span>
            <span className="text-sm font-medium">
              {stats.newMessages} new message
              {stats.newMessages === 1 ? "" : "s"} awaiting a reply
            </span>
          </span>
          <span className="flex items-center gap-1 text-sm font-medium">
            Review
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </Link>
      )}

      <section
        aria-label="Workspace statistics"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {statCards.map((card) => {
          const Icon = card.icon;
          const tone = TONE[card.tone];

          return (
            <Link
              key={card.label}
              href={card.href}
              className="group rounded-xl border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-5">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg",
                      tone.chip,
                    )}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span
                    className="text-[1.75rem] font-semibold leading-none tracking-tight tabular-nums"
                    title={card.value.toLocaleString()}
                  >
                    {compact(card.value)}
                  </span>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>

              <p className="mt-4 text-sm font-medium">{card.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{card.hint}</p>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="overflow-hidden rounded-xl border bg-card shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between gap-4 border-b p-5 sm:p-6">
            <div>
              <h2 className="text-lg font-semibold">Recent activity</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Latest projects, products, labs, and posts.
              </p>
            </div>
            <Sparkles className="hidden size-4 text-muted-foreground sm:block" />
          </div>

          {activity.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
              <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                <FolderKanban className="size-5 text-muted-foreground" />
              </span>
              <p className="mt-3 text-sm font-medium">No activity yet</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Create a project, product, lab, or post to get started.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {activity.map((item) => {
                const meta = ACTIVITY_META[item.type];
                const Icon = meta.icon;

                return (
                  <Link
                    key={`${item.type}-${item.id}`}
                    href={item.href}
                    className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          TONE[meta.tone].chip,
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
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

                    <span
                      className="shrink-0 text-xs text-muted-foreground"
                      title={fullDate(item.createdAt)}
                    >
                      {relativeTime(item.createdAt)}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold">Content health</h2>

            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Published</span>
                <span className="font-medium tabular-nums">
                  {stats.publishedPosts} / {stats.posts}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-linear-to-r from-emerald-500 to-emerald-400 transition-all"
                  style={{ width: `${publishedShare}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {publishedShare}% of posts are live · {stats.draftPosts} in
                draft
              </p>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-4 border-t pt-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Labs</dt>
                <dd className="mt-0.5 text-xl font-semibold tabular-nums">
                  {stats.labs}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Messages</dt>
                <dd className="mt-0.5 text-xl font-semibold tabular-nums">
                  {stats.messages}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-semibold">Quick actions</h2>
            <div className="mt-3 flex flex-col gap-2">
              {quickActions.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span
                    className={cn(
                      "size-1.5 shrink-0 rounded-full",
                      TONE[link.tone].dot,
                    )}
                  />
                  {link.label}
                  <ArrowUpRight className="ml-auto size-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
