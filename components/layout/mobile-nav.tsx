"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { Brand } from "@/components/shared/brand";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { mainNavigation } from "@/config/navigation";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground md:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-[85%] max-w-sm flex-col px-6"
      >
        <SheetHeader className="border-b pb-5">
          <SheetTitle>
            <Brand />
          </SheetTitle>
        </SheetHeader>

        <nav
          className="flex flex-1 flex-col gap-2 pt-6"
          aria-label="Mobile navigation"
        >
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="mt-4 rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Let&apos;s talk
          </Link>
        </nav>

        <p className="border-t pt-5 text-xs text-muted-foreground">
          Built in Addis Ababa. Designed for everywhere.
        </p>
      </SheetContent>
    </Sheet>
  );
}
