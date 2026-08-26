import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  label?: ReactNode;
  className?: string;
}

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const normalizedStatus = status.toUpperCase();

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        "border",

        // Completed — success
        normalizedStatus === "COMPLETED" &&
          "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300",

        // In Progress — active
        normalizedStatus === "IN_PROGRESS" &&
          "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-300",

        // Planned — pending
        normalizedStatus === "PLANNED" &&
          "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-300",

        // Archived — inactive
        normalizedStatus === "ARCHIVED" &&
          "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400",

        // Live — currently active
        normalizedStatus === "LIVE" &&
          "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/50 dark:text-violet-300",

        className,
      )}
    >
      {label ?? normalizedStatus.replaceAll("_", " ")}
    </span>
  );
}
