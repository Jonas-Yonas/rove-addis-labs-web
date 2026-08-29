"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  /** Submitted once per selected value when inside a `<form>`. */
  name?: string;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function MultiSelect({
  options,
  name,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select options",
  emptyText = "Nothing to choose from.",
  searchPlaceholder = "Search...",
  disabled,
  className,
  id,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [internal, setInternal] = React.useState<string[]>(defaultValue ?? []);

  const selected = value ?? internal;
  const selectedSet = new Set(selected);

  const labelFor = React.useMemo(() => {
    const map = new Map(options.map((option) => [option.value, option.label]));
    return (v: string) => map.get(v) ?? v;
  }, [options]);

  function commit(next: string[]) {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  }

  function toggle(v: string) {
    commit(
      selectedSet.has(v) ? selected.filter((s) => s !== v) : [...selected, v],
    );
  }

  const filtered = query
    ? options.filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase()),
      )
    : options;

  return (
    <div className={cn("space-y-0", className)}>
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next);
          if (!next) setQuery("");
        }}
      >
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            id={id}
            disabled={disabled}
            className="h-auto min-h-10 w-full justify-between gap-2 px-3 py-1.5 font-normal"
          >
            <span className="flex flex-1 flex-wrap items-center gap-1">
              {selected.length === 0 ? (
                <span className="text-muted-foreground">{placeholder}</span>
              ) : (
                selected.map((v) => (
                  <span
                    key={v}
                    className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5 text-xs font-medium"
                  >
                    {labelFor(v)}
                    <span
                      role="button"
                      tabIndex={-1}
                      aria-label={`Remove ${labelFor(v)}`}
                      onPointerDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        toggle(v);
                      }}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3" />
                    </span>
                  </span>
                ))
              )}
            </span>

            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) p-0"
        >
          <div className="border-b p-2">
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-8 w-full rounded-md border bg-background px-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="max-h-60 overflow-y-auto p-1">
            {filtered.length === 0 ? (
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                {options.length === 0 ? emptyText : "No matches."}
              </p>
            ) : (
              filtered.map((option) => {
                const active = selectedSet.has(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggle(option.value)}
                    className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-sm border",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-input",
                      )}
                    >
                      {active && <Check className="size-3" />}
                    </span>
                    <span className="flex-1 truncate">{option.label}</span>
                  </button>
                );
              })
            )}
          </div>
        </PopoverContent>
      </Popover>

      {name &&
        selected.map((v) => (
          <input key={v} type="hidden" name={name} value={v} />
        ))}
    </div>
  );
}
