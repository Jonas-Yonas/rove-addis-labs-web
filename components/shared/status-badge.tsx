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
        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
        normalizedStatus === "COMPLETED" &&
          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
        normalizedStatus === "IN_PROGRESS" &&
          "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        normalizedStatus === "PLANNED" && "bg-muted text-muted-foreground",
        normalizedStatus === "ARCHIVED" && "bg-muted text-muted-foreground",
        className,
      )}
    >
      {label ?? normalizedStatus.replaceAll("_", " ")}
    </span>
  );
}
