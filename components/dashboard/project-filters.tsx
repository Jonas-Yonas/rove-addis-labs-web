"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses = [
  { value: "ALL", label: "All statuses" },
  { value: "PLANNED", label: "Planned" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "COMPLETED", label: "Completed" },
  { value: "ARCHIVED", label: "Archived" },
];

interface ProjectFiltersProps {
  search: string;
  status: string;
}

export function ProjectFilters({ search, status }: ProjectFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(search);

  useEffect(() => {
    const value = searchValue.trim();

    const currentSearch = searchParams.get("search") ?? "";

    if (value === currentSearch) {
      return;
    }

    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("page");

      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }

      router.replace(
        params.toString() ? `${pathname}?${params.toString()}` : pathname,
      );
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchValue, searchParams, pathname, router]);

  function handleStatusChange(value: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    if (!value || value === "ALL") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    router.replace(
      params.toString() ? `${pathname}?${params.toString()}` : pathname,
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          placeholder="Search projects..."
          className="pl-9"
        />
      </div>

      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>

        <SelectContent>
          {statuses.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
