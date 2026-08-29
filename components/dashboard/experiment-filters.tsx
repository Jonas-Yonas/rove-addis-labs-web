"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { SelectField } from "@/components/ui/select";

const statuses = [
  "ALL",
  "EXPLORING",
  "PROTOTYPE",
  "EXPERIMENTAL",
  "INCUBATING",
  "ARCHIVED",
] as const;

const STATUS_OPTIONS = statuses.map((item) => ({
  value: item,
  label:
    item === "ALL"
      ? "All statuses"
      : item.charAt(0) + item.slice(1).toLowerCase(),
}));

export function ExperimentFilters({
  search,
  status,
}: {
  search: string;
  status: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(search);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (value === search) return;

      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) params.set("search", value.trim());
      else params.delete("search");

      params.delete("page");
      router.replace(`${pathname}?${params.toString()}`);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [value, search, searchParams, pathname, router]);

  function changeStatus(nextStatus: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextStatus === "ALL") params.delete("status");
    else params.set("status", nextStatus);

    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search labs..."
        className="h-10 min-w-0 flex-1 rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
      />

      <SelectField
        size="lg"
        value={status}
        onValueChange={changeStatus}
        options={STATUS_OPTIONS}
        aria-label="Filter labs by status"
        className="sm:w-48"
      />
    </div>
  );
}
