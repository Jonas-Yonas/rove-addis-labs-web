"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const statuses = [
  "ALL",
  "EXPLORING",
  "PROTOTYPE",
  "EXPERIMENTAL",
  "INCUBATING",
  "ARCHIVED",
] as const;

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
    setValue(search);
  }, [search]);

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

      <select
        value={status}
        onChange={(event) => changeStatus(event.target.value)}
        className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-48"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item === "ALL"
              ? "All statuses"
              : item.charAt(0) + item.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
