"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function SettingsThemeSelector() {
  const { theme, setTheme } = useTheme();

  // `theme` is undefined on the server + first client render (matches on
  // hydration), then settles to the stored choice once mounted.
  const active = theme ?? "system";

  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className="grid max-w-md grid-cols-3 gap-2"
    >
      {OPTIONS.map((option) => {
        const Icon = option.icon;
        const selected = active === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setTheme(option.value)}
            className={cn(
              "flex flex-col items-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              selected
                ? "border-primary bg-primary/5 text-foreground"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
            )}
          >
            <Icon className="size-5" />
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
