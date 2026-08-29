"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function CategoryFilters({ search }: { search: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(search);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (value === search) return;

      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }

      params.delete("page");

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [value, search, searchParams, pathname, router]);

  return (
    <input
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Search categories..."
      className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring sm:max-w-xs"
    />
  );
}
